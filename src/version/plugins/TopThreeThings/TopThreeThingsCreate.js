import React, { Component, useEffect, useState } from "react"
import { connect } from "react-redux"
import moment from "moment"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import CreateFormToolbar from "../../common/Toolbars/CreateFormDialogToolbar"
import TableHeader from "../../../core/common/TableHeader"
import Breadcrumbs from "../../../core/common/Breadcrumbs"
import backgroundImage from "../../images/Artboard.png"
import { Typography, TextField, Paper, FormGroup, FormControl, FormHelperText } from "@material-ui/core"
import { flattenComposition, transformComposition } from "../../fhir/composition"
import { getFhirResourcesAction } from "../../actions/getFhirResourcesAction"
import querystring from "query-string"
import { getFromBundle } from "../../fhir/GetFromBundle"
import { createFhirResourceAction } from "../../actions/createFhirResourceAction"

const styles = {
  createBlock: {
    padding: "24px",
    background: `url(${backgroundImage})`,
    backgroundSize: "cover",
  },
}

const CharacterCount = ({ value, limit }) => {
  if (!limit) {
    return null
  }

  const remaining = limit - (value ? value.length : 0)

  return (
    <Typography>
      {remaining}/{limit} characters remaining
    </Typography>
  )
}

const conditionalRequired = (message, target) => (value, allValues) => {
  const targetValue = allValues[target]

  if (targetValue && !value) {
    return message
  }

  return undefined
}

/** @type {fhir.Questionnaire} */
const questionnaire = {
  resourceType: "Questionnaire",
  status: "active",
  identifier: [
    {
      system: "http://test.com",
      value: "test",
    },
  ],
  item: [
    {
      linkId: "item1",
      type: "group",
      item: [
        {
          linkId: "title1",
          type: "string",
          text: "#1",
          maxLength: 75,
        },
        {
          linkId: "description1",
          type: "text",
          text: "Description #1",
          maxLength: 500,
        },
      ],
    },
    {
      linkId: "item2",
      type: "group",
      item: [
        {
          linkId: "title2",
          type: "string",
          text: "#2",
          maxLength: 75,
        },
        {
          linkId: "description2",
          type: "text",
          text: "Description #2",
          maxLength: 500,
        },
      ],
    },
    {
      linkId: "item3",
      type: "group",
      item: [
        {
          linkId: "title3",
          type: "string",
          text: "#3",
          maxLength: 75,
        },
        {
          linkId: "description3",
          type: "text",
          text: "Description #3",
          maxLength: 500,
        },
      ],
    },
  ],
}

/**
 * @typedef {Object} QuestionnaireResponseItemCreatorProps
 * @property {fhir.QuestionnaireItem} item
 * @property {fhir.QuestionnaireResponseItem} responseItem
 * @property {(item: fhir.QuestionnaireResponseItem) => void} onItemChange
 */

/**
 * @type {import('react').FunctionComponent<QuestionnaireResponseItemCreatorProps>}
 */
const QuestionnaireResponseItemCreator = ({ item, onItemChange, responseItem, initialResponseItem }) => {
  const { type } = item

  const [value, setValue] = useState("")
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    window.analytics.page({ url: window.location.hash })
  }, [])

  useEffect(() => {
    const maxLengthError = value && value.length > item.maxLength

    /** @type {fhir.QuestionnaireResponseItem} */
    const responseItem = {
      linkId: item.linkId,
      text: item.text,
      answer: [{ valueString: value }],
    }

    onItemChange(responseItem)

    if (maxLengthError) {
      setError(true)
      setErrorMessage(`Must be ${item.maxLength} characters or less`)
      return
    }

    setError(false)
    setErrorMessage("")
  }, [value])

  useEffect(() => {
    if (!initialResponseItem) {
      return
    }

    const value = getValue(initialResponseItem)

    setValue(value)
  }, [initialResponseItem])

  function getResponseItem(item, responseItem) {
    const responseItems = (responseItem && responseItem.item) || []

    const response = responseItems.find((ri) => ri.linkId === item.linkId) || null

    return response
  }

  /**
   * @param {fhir.QuestionnaireResponseItem} responseItem
   */
  function getValue(responseItem) {
    return ((responseItem && (responseItem.answer || [])[0]) || {}).valueString || ""
  }

  switch (type) {
    case "group": {
      const subItems = item.item || []

      const groupItemChanged = (response) => {
        const items = (responseItem && responseItem.item) || []

        const newItems = items.filter((i) => i.linkId !== response.linkId)

        newItems.push(response)

        onItemChange({ linkId: item.linkId, item: newItems })
      }

      return (
        <>
          {subItems.map((si) => (
            <QuestionnaireResponseItemCreator
              responseItem={getResponseItem(si, responseItem)}
              item={si}
              onItemChange={groupItemChanged}
              initialResponseItem={getResponseItem(si, initialResponseItem)}
            />
          ))}
        </>
      )
    }
    case "string":
    case "text": {
      return (
        <FormControl>
          <TextField
            error={error}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            label={item.text}
            fullWidth={type === "text"}
          />
          {!error ? (
            <CharacterCount limit={item.maxLength} value={value} />
          ) : (
            <FormHelperText error={error}>{errorMessage}</FormHelperText>
          )}
        </FormControl>
      )
    }
    default: {
      throw Error(`Type ${type} not supported`)
    }
  }
}

/**
 * @typedef {Object} QuestionnaireResponseCreatorProps
 * @property {fhir.Questionnaire} questionnaire
 * @property {(response: fhir.QuestionnaireResponse) => void} createQuestionnaireResponse
 */

/**
 * @type {import('react').FunctionComponent<QuestionnaireResponseCreatorProps>}
 */
const QuestionnaireResponseCreator = ({ questionnaire, createQuestionnaireResponse, questionnaireResponse }) => {
  const { item } = questionnaire

  const [response, setResponse] = useState({ resourceType: "QuestionnaireResponse" })

  useEffect(() => {
    if (questionnaireResponse) {
      const item = questionnaireResponse.item || []

      setResponse({ resourceType: "QuestionnaireResponse", item })
    }
  }, [questionnaireResponse])

  function updateResponse(responseItem) {
    const { item = [] } = response

    const newItems = item.filter((i) => i.linkId !== responseItem.linkId)

    newItems.push(responseItem)

    setResponse({ ...response, item: newItems })
  }

  function getResponseItem(item, response) {
    if (!response) {
      return null
    }

    const responseItems = response.item || []

    const responseItem = responseItems.find((ri) => ri.linkId === item.linkId) || null

    return responseItem
  }

  if (!item) {
    return null
  }

  return (
    <Grid container spacing={0} style={{ margin: 0, width: "100%" }}>
      <Grid item container spacing={4} style={{ margin: 0, width: "100%" }} xs={12}>
        <Grid item xs={12}>
          <FormGroup>
            {item.map((qItem) => (
              <QuestionnaireResponseItemCreator
                responseItem={getResponseItem(qItem, response)}
                item={qItem}
                onItemChange={updateResponse}
                initialResponseItem={getResponseItem(qItem, questionnaireResponse)}
              />
            ))}

            <FormControl>
              <TextField
                // className={classes.labelBlock}
                label="Author"
                defaultValue={localStorage.getItem("username")}
                disabled={true}
                fullWidth
              />
            </FormControl>
            <FormControl>
              <TextField
                // className={classes.labelBlock}
                label="Date"
                defaultValue={moment().format("MM/DD/YYYY")}
                disabled={true}
                fullWidth
              />
            </FormControl>
          </FormGroup>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <CreateFormToolbar
          handleSave={() => {
            /** @type {fhir.QuestionnaireResponse} */
            const questionnaireResponse = { ...response, status: "completed", authored: new Date().toISOString() }

            questionnaireResponse.questionnaire = {
              reference: `${questionnaire.resourceType}/${questionnaire.id}`,
            }

            createQuestionnaireResponse(questionnaireResponse)
          }}
          disabled={false}
        />
      </Grid>
    </Grid>
  )
}

/**
 * This component returns TopThreeThings creation form
 *
 * @author Richard Brown
 * @param {Object} classes
 * @param {Object} rest
 */
class TopThreeThingsCreate extends Component {
  constructor(props) {
    super(props)

    this.nameOneValidator = conditionalRequired("Subject is required", "description1")
    this.nameTwoValidator = conditionalRequired("Subject is required", "description2")
    this.nameThreeValidator = conditionalRequired("Subject is required", "description3")

    this.state = {
      responseRequested: false,
    }
  }

  componentDidMount() {
    const { resourceType, query, getBundle, componentKey } = this.props
    getBundle("TopThreeThings", "Questionnaire", querystring.stringify({ identifier: "http://test.com|test" }))
  }

  componentDidUpdate() {
    const { questionnaire, getBundle } = this.props
    const { responseRequested } = this.state

    if (!questionnaire || responseRequested) {
      return
    }

    this.setState({ responseRequested: true })

    getBundle(
      "TopThreeThings",
      "QuestionnaireResponse",
      querystring.stringify({
        questionnaire: `${questionnaire.resourceType}/${questionnaire.id}`,
        _sort: "-authored",
      })
    )
  }

  render() {
    const { classes, createResource, questionnaire, questionnaireResponse } = this.props

    const resourceUrl = "top3Things"
    const title = "Top Three Things"

    const breadcrumbsResource = [{ url: "/" + resourceUrl, title: title, isActive: false }]

    return (
      <React.Fragment>
        <Breadcrumbs resource={breadcrumbsResource} />
        <TableHeader resource={resourceUrl} />
        <Grid item xs={12} sm={12} className={classes.createBlock}>
          {questionnaire ? (
            <Paper elevation={0}>
              <QuestionnaireResponseCreator
                questionnaire={questionnaire}
                questionnaireResponse={questionnaireResponse}
                createQuestionnaireResponse={(response) => createResource(response)}
              />
            </Paper>
          ) : null}
        </Grid>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { fhir } = state.custom

  //const { componentKey, resourceType } = ownProps

  const componentKey = "TopThreeThings"
  const resourceType = "Questionnaire"

  const questionnaireBundle =
    (fhir[componentKey] && fhir[componentKey][resourceType] && fhir[componentKey][resourceType].data) || null

  const questionnaireResponseBundle =
    (fhir[componentKey] &&
      fhir[componentKey]["QuestionnaireResponse"] &&
      fhir[componentKey]["QuestionnaireResponse"].data) ||
    null

  const questionnaire = /** @type {fhir.Questionnaire | null} */ ((questionnaireBundle &&
    getFromBundle(questionnaireBundle, "Questionnaire")[0]) ||
    null)

  const questionnaireResponse = /** @type {fhir.QuestionnaireResponse | null} */ ((questionnaireResponseBundle &&
    getFromBundle(questionnaireResponseBundle, "QuestionnaireResponse")[0]) ||
    null)

  return {
    questionnaire,
    questionnaireResponse,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBundle: (key, resourceType, query) => dispatch(getFhirResourcesAction.request(key, resourceType, query)),
    createResource: (resource) =>
      dispatch(createFhirResourceAction.request("TopThreeThings", "QuestionnaireResponse", resource)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TopThreeThingsCreate))
