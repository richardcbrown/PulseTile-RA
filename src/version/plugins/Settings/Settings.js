import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Grid,
  makeStyles,
  SvgIcon,
  Typography,
} from "@material-ui/core"
import get from "lodash/get"
import React, { useState } from "react"
import backgroundImage from "../../images/Artboard.png"
import { connect } from "react-redux"
import { savePreferencesAction } from "../../actions/preferencesActions"
import { usePrimaryAccordionStyles } from "../../common/Styles/AccordionStyles"
import { ReactComponent as ChevronUp } from "../../images/Icons/Chevron-down.svg"
import { useEffect } from "react"
import ConfirmButton from "../../common/Buttons/ConfirmButton"
import Breadcrumbs from "../../../core/common/Breadcrumbs"
import TableHeader from "../../../core/common/TableHeader"

const useStyles = makeStyles({
  createBlock: {
    background: `url(${backgroundImage})`,
    backgroundSize: "cover",
    margin: 0,
    width: "100%",
    height: "100%",
    alignContent: "flex-start",
  },
})

const Settings = (props) => {
  const { savePreferences } = props

  const [selectedPreferences, setSelectedPreferences] = useState({})

  useEffect(() => {
    const preferences = (props.preferences && props.preferences.data && props.preferences.data.preferences) || {}

    setSelectedPreferences(preferences)
  }, [props.preferences])

  const classes = useStyles()

  const accordionStyles = usePrimaryAccordionStyles()

  const { data, loading } = props.preferences

  if (!data) {
    return null
  }

  const { schema } = data

  function getPreferenceValue(key, defaultValue) {
    return selectedPreferences[key] !== undefined ? selectedPreferences[key] : defaultValue
  }

  function setPreferenceValue(key, value) {
    const newPreferences = { ...selectedPreferences }

    newPreferences[key] = value

    setSelectedPreferences(newPreferences)
  }

  const resourceUrl = "settings"
  const title = "Settings"

  const breadcrumbsResource = [{ url: "/" + resourceUrl, title: title, isActive: false }]

  return (
    <React.Fragment>
      <Breadcrumbs resource={breadcrumbsResource} />
      <TableHeader resource={resourceUrl} />
      <Grid container spacing={4} className={classes.createBlock}>
        {JSON.stringify(data)}

        {Object.keys(schema).map((schemaItem) => {
          const { title, preferences } = schema[schemaItem]

          return (
            <Grid item xs={12}>
              <Accordion className={accordionStyles.container}>
                <AccordionSummary
                  expandIcon={
                    <SvgIcon viewBox="0 0 18 11" fontSize="small" className={accordionStyles.icon}>
                      <ChevronUp />
                    </SvgIcon>
                  }
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className={accordionStyles.mainHeader}
                >
                  <Typography variant="h5">{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {Object.keys(preferences).map((pref) => {
                    const item = preferences[pref]
                    const settingKey = [schemaItem, "preferences", pref].join(".")

                    switch (item.type) {
                      case "boolean": {
                        return (
                          <Checkbox
                            checked={getPreferenceValue(settingKey, false)}
                            onChange={() => setPreferenceValue(settingKey, !getPreferenceValue(settingKey, false))}
                          />
                        )
                      }
                      case "link": {
                        return (
                          <a href={item.url} target={item.target} rel="noopener noreferrer">
                            {item.title}
                          </a>
                        )
                      }
                      default: {
                        return null
                      }
                    }
                  })}
                </AccordionDetails>
              </Accordion>
            </Grid>
          )
        })}

        <Grid item xs={12} style={{ flexBasis: "initial", flexGrow: 1, display: "flex", alignItems: "flex-end" }}>
          <ConfirmButton label="Save" onClick={() => savePreferences(selectedPreferences)} />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  const preferences = get(state, "custom.preferences", {})
  return {
    preferences,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    savePreferences: (preferences) => dispatch(savePreferencesAction.request(preferences)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
