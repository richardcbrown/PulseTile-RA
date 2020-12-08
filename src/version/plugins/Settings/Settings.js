import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
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
import { ReactComponent as Tick } from "../../images/Icons/Tick.svg"
import { useEffect } from "react"
import ConfirmButton from "../../common/Buttons/ConfirmButton"
import Breadcrumbs from "../../../core/common/Breadcrumbs"
import TableHeader from "../../../core/common/TableHeader"
import { usePrimaryCheckboxStyles, usePrimaryRadioStyles } from "../../common/Styles/CheckboxStyles"

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

function getEditorForPreferenceItem(item, value, setValue) {
  switch (item.editor) {
    case "radio": {
      const radioStyles = usePrimaryRadioStyles()

      return (
        <FormControl margin="normal" component="fieldset">
          <FormLabel component="legend">{item.title}</FormLabel>
          <RadioGroup
            aria-label={item.description || item.title}
            name={item.title}
            value={value}
            onChange={(_, value) => setValue(value)}
          >
            {item.enum.map((enumval, index) => (
              <FormControlLabel
                value={enumval}
                control={<Radio color="primary" className={radioStyles.muiRadioRoot} />}
                label={(item.enumLabels && item.enumLabels[index]) || enumval}
              />
            ))}
          </RadioGroup>
          <FormHelperText>{item.description}</FormHelperText>
        </FormControl>
      )
    }
    default: {
      return null
    }
  }
}

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

  const checkboxStyles = usePrimaryCheckboxStyles()

  return (
    <React.Fragment>
      <Breadcrumbs resource={breadcrumbsResource} />
      <TableHeader resource={resourceUrl} />
      <Grid container spacing={4} className={classes.createBlock}>
        {Object.keys(schema).map((schemaItem, index) => {
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
                  aria-controls={`panel${index}a-content`}
                  id={`panel${index}a-header`}
                  className={accordionStyles.mainHeader}
                >
                  <Typography variant="h5">{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    {Object.keys(preferences).map((pref) => {
                      const item = preferences[pref]
                      const settingKey = [schemaItem, "preferences", pref].join(".")

                      if (item.editor) {
                        return getEditorForPreferenceItem(
                          item,
                          getPreferenceValue(settingKey, item.defaultValue),
                          (value) => setPreferenceValue(settingKey, value)
                        )
                      }

                      switch (item.type) {
                        case "boolean": {
                          return (
                            <FormControl margin="normal">
                              <FormControlLabel
                                aria-label={item.description || item.title}
                                control={
                                  <Checkbox
                                    className={checkboxStyles.muiCheckboxRoot}
                                    checked={getPreferenceValue(settingKey, false)}
                                    color="primary"
                                    checkedIcon={
                                      <SvgIcon
                                        viewBox="0 0 27 20"
                                        fontSize="small"
                                        className={checkboxStyles.checkboxIcon}
                                      >
                                        <Tick />
                                      </SvgIcon>
                                    }
                                    onChange={() =>
                                      setPreferenceValue(settingKey, !getPreferenceValue(settingKey, false))
                                    }
                                  />
                                }
                                label={<Typography>{item.title}</Typography>}
                              />
                              <FormHelperText>{item.description}</FormHelperText>
                            </FormControl>
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
                  </FormGroup>
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
