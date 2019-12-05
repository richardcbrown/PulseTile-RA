import React, { Component } from "react";
import { connect } from "react-redux";
import get from "lodash/get";
import TableHeader from "../../../core/common/TableHeader";
import Breadcrumbs from "../../../core/common/Breadcrumbs";
import { myCarePlanAction, saveMyCarePlanAction } from "../../actions/myCarePlanAction";
import { Typography, Grid, TextField, Checkbox, Button, withStyles, Paper } from "@material-ui/core";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from "moment";
import backgroundImage from "../../images/Artboard.png";

const styles = {
    mainBackground: {
        padding: "24px",
        background: `url(${backgroundImage}) 0 0 repeat`
    }
};

const stages = ["test-result", "summary"];

class CarePlanView extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            questionnaires: null,
            goal: null,
            stage: stages[0]
        }
    }

    componentDidMount() {
        this.props.getCarePlan();
    }

    componentDidUpdate() {
        if (this.state.questionnaires) {
            return
        }

        const { carePlan } = this.props;

        let text = (carePlan && carePlan.text) || null;

        if (!text) {
            return;
        }

        let questionnaires = text.questionnaires || null;
        let goal = text.goal || null;

        this.setState({ questionnaires, goal });
    }

    render() {
        const breadcrumbsResource = [
            { url: window.location.pathname, title: "My Care Plan", isActive: false }
        ];

        const { carePlan, classes } = this.props;

        const resourceUrl = "myCarePlan";

        let careplan = (carePlan && carePlan.careplan) || null;
        let text = (carePlan && carePlan.text) || null;

        const { questionnaires, goal, stage } = this.state;

        const hasAllDetails = careplan && text && questionnaires

        if (!hasAllDetails) {
            return (
                <React.Fragment>
                    <Breadcrumbs resource={breadcrumbsResource} />
                    <TableHeader resource={resourceUrl} />
                </React.Fragment>
            )
        }

        return (
            <React.Fragment>
                <Breadcrumbs resource={breadcrumbsResource} />
                <TableHeader resource={resourceUrl} />

                <Grid item xs={12} sm={12} className={classes.mainBackground}>
                { 
                    stage === stages[0] ?
                    <React.Fragment>
                        <CarePlanTestResultsView 
                            testResults={text.testResults}
                            questionnaires={questionnaires}
                            questionnaireUpdated={(questionnaire) => this.updateQuestionnaire(questionnaire)}
                            questions={text.tests} 
                            data={careplan}
                        />
                        <Button onClick={() => this.setState({ stage: stages[1] })}>Next</Button>
                    </React.Fragment>
                    : null  
                }

                {
                    stage === stages[1] ? 
                    <React.Fragment>
                        <CarePlanConcernsAndGoals
                            questionnaires={questionnaires}
                            questionnaireUpdated={(questionnaire) => this.updateQuestionnaire(questionnaire)} 
                            concerns={text.concerns}
                            matters={text.matters}
                            goal={goal}
                            goalDetails={text.goalDetails}
                            goalUpdated={(goal) => this.goalUpdated(goal)} 
                        />
                        <Button onClick={() => this.setState({ stage: stages[0] })}>Back</Button>
                        <Button onClick={() => this.saveCarePlan()}>Save</Button>
                    </React.Fragment>
                    : null
                }
                </Grid>
            </React.Fragment>
        )
    }

    saveCarePlan() {
        const { questionnaires } = this.state;

        const questionnaireResources = []

        questionnaires.forEach((q) => {
            questionnaireResources.push(q.questionnaire);
            questionnaireResources.push(q.response);
        })

        const resources = [this.state.goal, ...questionnaireResources];

        this.props.saveCarePlan(resources);

        this.setState({ stage: stages[0] })
    }

    updateQuestionnaire(questionnaire) {
        const { questionnaires } = this.state;

        const qIndex = questionnaires.findIndex((q) => q.questionnaire.name === questionnaire.questionnaire.name);

        if (qIndex === -1) {
            return;
        }

        questionnaires[qIndex] = questionnaire;

        this.setState({ questionnaires });
    }

    goalUpdated(goal) {
        this.setState({ goal });
    }
}

class QuestionnaireQuestion extends Component {
    constructor(props) {
        super(props);
    }

    getInputForType(questionItem, responseItem, onResponseChanged) {
        if (questionItem.type === "string") {

            const value = (responseItem && responseItem.answer && responseItem.answer[0].valueString) || ""

            return <TextField multiline value={value} onChange={(event) => {
                let response = responseItem

                if (!response) {
                    response = {
                        linkId: questionItem.linkId,
                        answer: [
                            {
                                valueString: event.target.value
                            }
                        ]
                    }
                } else {
                    response.answer[0] = {
                        valueString: event.target.value
                    }
                }

                onResponseChanged(questionItem, response);
            }} />
        } else if (questionItem.type === "group") {

            const groupResponseChanged = (qi, ri) => {
                let response = responseItem

                if (!response) {
                    response = {
                        linkId: questionItem.linkId,
                        item: [
                            ri
                        ]
                    }
                } else {
                    const itemIndex = response.item.findIndex((item) => item.linkId === ri.linkId);

                    if (itemIndex === -1) {
                        response.item.push(ri);
                    } else {
                        response.item[itemIndex] = ri;
                    }
                }

                onResponseChanged(questionItem, response);
            }

            return (
                <Grid container spacing={2}>
                    {
                        questionItem.item.map((item) => {
                            const responseGroupItem = (responseItem && responseItem.item && responseItem.item.find((i) => i.linkId === item.linkId)) || null;

                            return this.getInputForType(item, responseGroupItem, groupResponseChanged)
                        })
                    }
                </Grid>
            )
        } else if (questionItem.type === "boolean") {

            const value = (responseItem && responseItem.answer && responseItem.answer[0].valueBoolean) || false

            return (
                <Grid item xs={3}>
                    <Checkbox
                        checked={value}
                        color="primary"
                        onChange={(event) => {
                            let response = responseItem
            
                            if (!response) {
                                response = {
                                    linkId: questionItem.linkId,
                                    answer: [
                                        {
                                            valueBoolean: !value
                                        }
                                    ]
                                }
                            } else {
                                response.answer[0] = {
                                    valueBoolean: !value
                                }
                            }
            
                            onResponseChanged(questionItem, response);
                        }}
                    />
                    <Typography>{questionItem.text}</Typography>
                </Grid>
            )
        }
    }

    render() {

        const { questionnaire, question, questionnaireUpdated } = this.props;

        const questionItem = questionnaire.questionnaire.item.find((item) => item.linkId === question);

        const responseItem = questionnaire.response.item && questionnaire.response.item.find((item) => item.linkId === question);

        const questionResponseChanged = (questionItem, responseItem) => {
            const responseItemIndex = questionnaire.response.item ? questionnaire.response.item.findIndex((item) => item.linkId === question) : -1;

            if (responseItemIndex !== -1) {
                questionnaire.response.item[responseItemIndex] = responseItem;
            } else {
                questionnaire.response.item = questionnaire.response.item || [];

                questionnaire.response.item.push(responseItem);
            }

            questionnaireUpdated(questionnaire);
        }

        return (
            <React.Fragment>
                <Typography>{ questionItem.text }</Typography>

                {
                    this.getInputForType(questionItem, responseItem, questionResponseChanged)
                } 
            </React.Fragment>
        )
    }
}

class QuestionnaireQuestions extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { questionnaire, questions, questionnaireUpdated } = this.props;

        return (
            <React.Fragment>
                {
                    questions.map((q) => {
                        return <QuestionnaireQuestion 
                            questionnaire={questionnaire} 
                            question={q}
                            questionnaireUpdated={questionnaireUpdated} 
                        />
                    })
                }
            </React.Fragment>
        )
    }
}

class CarePlanTestResultsView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { testResults, data, questionnaires, questions, questionnaireUpdated } = this.props;

        const { title, tests } = testResults;

        const questionnaire = questionnaires.find((q) => questions.questionnaire === q.questionnaire.name);

        return (
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <Paper>
                        <Typography>{ title }</Typography>
                    </Paper>
                </Grid>
                {
                    tests.map((test) => {
                        return (
                            <Grid item xs={12}>
                               <CarePlanTestResult test={test} data={data} />
                            </Grid>
                        ) 
                    })
                }

                <Grid item xs={12}>
                    <Paper>
                        <QuestionnaireQuestions 
                            questions={questions.questions} 
                            questionnaire={questionnaire}
                            questionnaireUpdated={questionnaireUpdated} 
                        />
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

function flattenCoding(coding) {
    let flattened = [];

    // fhir.Coding[]
    if (Array.isArray(coding)) {
        flattened = [...coding];
    } else if ((coding).coding) {
        const codes = (coding).coding || [];

        flattened = [...codes];
    } else {
        flattened = [coding];
    }

    return flattened;
}

function matchCoding(
    coding,
    targetCoding
) {
    if (!coding || !targetCoding) {
        return false;
    }

    const base = flattenCoding(coding);
    const target = flattenCoding(targetCoding);

    if (!base.length) {
        throw Error("No coding provided to compare");
    }

    if (!target.length) {
        throw Error("No coding to compare to");
    }

    return target.some((searchCode) => {
        return !!base.find((c) => c.code === searchCode.code && c.system === searchCode.system);
    });
}

function formatBloodPressureReadings(readings, bloodPressureCodes) {
    const formatted = [];

    readings.forEach((reading) => {
        const { component, effectiveDateTime } = reading;

        if (!component) {
            return;
        }

        const values = [];

        bloodPressureCodes.forEach((bpc) => {
            const com = component.find((c) => matchCoding(c.code, bpc));

            if (com) {
                values.push(com.valueQuantity);
            }
        });

        if (values.length !== bloodPressureCodes.length) {
            return;
        }

        formatted.push({
            value: `${values[0].value}/${values[1].value} ${values[0].unit}`,
            date: moment(effectiveDateTime).format('Do MMM YY')
        });
    });

    return formatted;
}

function getReadingsForDisplay(mainCode, subCodes, readingsCount, readingsFormatter, data) {
    const observations = data.entry.filter((entry) => entry.resource.resourceType === "Observation").map((entry) => entry.resource);

    const matchingObservations = observations
        .filter((obs) => matchCoding(obs.code, mainCode))
        .sort(function(a,b){
            return new Date(b.effectiveDateTime) - new Date(a.effectiveDateTime);
        });

    const displayReadings = matchingObservations.slice(0, readingsCount);

    switch (readingsFormatter) {
        case "bloodpressure": {
            return formatBloodPressureReadings(displayReadings, subCodes);
        }
        default: {
            throw Error("not implemented");
        }
    }
}

class ReadingDisplay extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        
        const {
            mainCode, 
            subCodes, 
            readingsCount,
            readingsFormatter,
            data
        } = this.props;
        
        const readings = getReadingsForDisplay(mainCode, subCodes, readingsCount, readingsFormatter, data);

        return (
            <React.Fragment>
                {
                    readings.map((reading) => {
                        return (
                            <Grid item xs={12}>
                                <Typography>- { reading.value } ({ reading.date })</Typography>
                            </Grid>
                        )
                    })
                }
            </React.Fragment>
        )
    }
}

class CarePlanConcernsAndGoals extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { 
            concerns, 
            matters, 
            questionnaires, 
            goalDetails, 
            goal, 
            questionnaireUpdated,
            goalUpdated 
        } = this.props

        const concernsQuestionnaire = questionnaires.find((q) => concerns.questionnaire === q.questionnaire.name);

        const mattersQuestionnaire = questionnaires.find((q) => matters.questionnaire === q.questionnaire.name);

        return (
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <Paper>
                        <QuestionnaireQuestions 
                            questions={matters.questions} 
                            questionnaire={mattersQuestionnaire} 
                            questionnaireUpdated={questionnaireUpdated} 
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <QuestionnaireQuestions 
                            questions={concerns.questions} 
                            questionnaire={concernsQuestionnaire} 
                            questionnaireUpdated={questionnaireUpdated} 
                        />
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper>
                        <CarePlanGoal goalDetails={goalDetails} goal={goal} goalUpdated={goalUpdated} />
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

class CarePlanGoal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { goalDetails, goal, goalUpdated } = this.props;
        const { titles, subTitles } = goalDetails;

        const goalText = (goal && goal.description && goal.description.text) || ""

        return (
            <Grid item xs={12}>
                {
                    (titles && titles.map((title) => {
                        return (
                            <Grid item xs={12}>
                                <Typography>{title}</Typography>
                            </Grid>
                        )
                    })) || null
                }
                {
                    (subTitles && subTitles.map((title) => {
                        return (
                            <Grid item xs={12}>
                                <Typography>{title}</Typography>
                            </Grid>
                        )
                    })) || null
                }

                <Grid item xs={12}>
                    <TextField multiline value={goalText} onChange={(event) => {
                        const text = event.target.value;

                        let updatedGoal = goal;

                        if (!updatedGoal) {
                            updatedGoal = {
                                resourceType: "Goal",
                                description: {
                                    text
                                }
                            };
                        } else {
                            updatedGoal.description.text = text;
                        }

                        goalUpdated(updatedGoal)
                    }} />
                </Grid>
            </Grid>
        )
    }
}

class CarePlanTestResult extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const { 
            title, 
            description, 
            readingsTitle, 
            readingsCount, 
            readingsFormatter,
            mainCode,
            subCodes 
        } = this.props.test;

        const { data } = this.props

        return (
            <div>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{ title }</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container spacing={16}>
                            {
                                description.map((description) => {
                                    return (<Grid item xs={12}><Typography>{ description }</Typography></Grid>)
                                })
                            }

                            <Grid item xs={12}>
                                <Typography>{readingsTitle}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <ReadingDisplay 
                                    mainCode={mainCode} 
                                    subCodes={subCodes} 
                                    readingsCount={readingsCount}
                                    readingsFormatter={readingsFormatter}
                                    data={data} 
                                />
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        )
    }
}

const mapStateToProps = state => {

    const carePlanData = get(state, ['custom', 'myCarePlan', 'data'], null);
    
    return {
        carePlan: carePlanData
    };
};

const mapDispatchToProps = dispatch => {

    const myCarePlanActions = [myCarePlanAction];

    return {
        getCarePlan() {
            myCarePlanActions.map(item => {
                return dispatch(item.request());
            });
        },
        saveCarePlan(careplanResources) {
            dispatch(saveMyCarePlanAction.request(careplanResources));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CarePlanView));