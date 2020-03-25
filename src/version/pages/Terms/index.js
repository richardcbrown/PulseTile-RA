import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from "@material-ui/core/Typography";
import ConfirmButton from "../../common/Buttons/ConfirmButton";
import { acceptTermsAction } from "../../actions/acceptTermsAction";
import { getTermsAction } from "../../actions/getTermsAction";
import TopBarNoUser from "../../common/TopBarNoUser";
import backgroundImage from "../../images/Artboard.png";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import GeneralDialog from "../../common/Dialogs/GeneralDialog";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Hidden, Paper } from "@material-ui/core";

const styles = {
    termsBackground: {
        width: "100%",
        display: "flex",
        flexGrow: 1,
        background: `url(${backgroundImage}) 0 0 repeat`,
        flexDirection: "column"
    },
    termsContainer: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        width: "100%"
    },
    policyContainer: {
        flexGrow: 1,
        marginBottom: "24px",
        padding: "12px",
        maxHeight: "500px",
        overflowY: "auto"
    },
    policyAcceptContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%"
    },
    contentContainer: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        margin: 0,
        flexWrap: "nowrap",
        height: "100%",
        width: "100%",
        overflowY: "auto"
    },
    policiesContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        margin: 0,
        flexGrow: 1,
        width: "100%",
        flexWrap: "wrap"
    },
    declarationContainer: {
        overflowY: "auto"
    },
    policyAndAcceptContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    continueContainer: {
        alignSelf: "flex-end",
        margin: 0,
        width: "100%"
    },
    continue: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        padding: "10px"
    },
    mobileHeader: {
        width: "100%",
        margin: 0
    }
};

class Terms extends Component {

    constructor(props) {
        super(props);

        this.state = {
            acceptedPolicies: [],
            expandedPolicies: {}
        };
    }

    componentDidMount() {
        this.props.getTermsAction();
    }
    
    render() {

        const { policies, classes, error } = this.props;
        const { closeDialog } = this;
        const allAccepted = this.allPoliciesAccepted();
        const { expandedPolicies } = this.state;

        return (
            <div className={ classes.termsContainer }>
                <TopBarNoUser />

                <div className={ classes.termsBackground }>
                    <Grid container spacing={24}  className={ classes.contentContainer }>
                        <Hidden mdUp>
                            <Grid container spacing={24} style={{ display: "block", margin: 0, width: "100%" }}>
                                <Grid item xs={12}>
                                    <Paper>
                                        <Grid container spacing={16} style={{ width: "100%", margin: 0 }}>
                                            <Grid item xs={12}>
                                                <Typography>
                                                    Important, please read to ensure you understand how your information will be processed 
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>

                                {
                                    error ?
                                    
                                    <GeneralDialog 
                                        open={ true } 
                                        onClose={ closeDialog } 
                                        title={ error.title } 
                                        message={ error.message }
                                        options={ [
                                            <ConfirmButton label="Ok" onClick={() => this.closeDialog() } />
                                        ]}
                                    />

                                    :

                                    policies.map((p, key) => {
                                        const shouldShow = !!expandedPolicies[key] || Object.values(expandedPolicies).every((val) => !!!val)

                                        return (
                                            <React.Fragment>
                                                {
                                                    shouldShow &&

                                                    <Grid item xs={12}>
                                                        <ExpansionPanel 
                                                            style={{ borderRadius: 4, marginBottom: 16 }} 
                                                            expanded={expandedPolicies[key] === true} 
                                                            onChange={() => this.handleExpand(key)}>
                                                            <ExpansionPanelSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                                aria-controls={`panel-${key}-content`}
                                                                id={`panel-${key}-header`}
                                                            >
                                                                <Typography className={classes.heading}>{p.name}</Typography>
                                                            </ExpansionPanelSummary>
                                                            <div  style={{ overflowY: "auto", height: 200 }}>
                                                                <ExpansionPanelDetails>
                                                                    <Typography>
                                                                        <div dangerouslySetInnerHTML={{__html: p.narrative}}></div>
                                                                    </Typography>
                                                                </ExpansionPanelDetails>
                                                            </div>
                                                        </ExpansionPanel>

                                                        <Card className={ classes.policyAcceptContainer }>
                                                            <Checkbox
                                                                checked={this.policyAccepted(p)}
                                                                color="primary"
                                                                onChange={() => this.acceptPolicy(p)}
                                                            />
                                                            <Typography>I accept</Typography>
                                                        </Card>
                                                    </Grid>
                                                }
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </Grid>

                            <Grid container spacing={24} className={ classes.continueContainer } style={{ display: "block" }}>
                                {
                                    <Grid item xs={12}>
                                        <Card className={ classes.continue }>
                                            <ConfirmButton label="Continue" disabled={ !allAccepted } onClick={() => this.accept()} />
                                            <a href="https://myhelm.org" onClick={ () => this.closeDialog() }>
                                                <Typography>I do not want to use Helm ></Typography>
                                            </a>
                                        </Card>
                                    </Grid>
                                }
                            </Grid>
                        </Hidden>

                        <Hidden smDown>
                            <Grid container spacing={24} className={ classes.policiesContainer }>
                                {
                                    error ?
                                    
                                    <GeneralDialog 
                                        open={ true } 
                                        onClose={ closeDialog } 
                                        title={ error.title } 
                                        message={ error.message }
                                        options={ [
                                            <ConfirmButton label="Ok" onClick={() => this.closeDialog() } />
                                        ]}
                                    />

                                    :

                                    policies.map((p, key) => {
                                        return (
                                            <Grid item xs={12} sm={12} md={6} lg={6} key={key} className={ classes.policyAndAcceptContainer }>
                                                
                                                <Card className={ classes.policyContainer }>
                                                    <div className={ classes.declarationContainer }>
                                                        <Typography>
                                                            <div dangerouslySetInnerHTML={{__html: p.narrative}}></div>
                                                        </Typography>
                                                    </div>
                                                </Card>

                                                <Card className={ classes.policyAcceptContainer }>
                                                    <Checkbox
                                                        checked={this.policyAccepted(p)}
                                                        color="primary"
                                                        onChange={() => this.acceptPolicy(p)}
                                                    />
                                                    <Typography>I accept</Typography>
                                                </Card>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>

                            <Grid container spacing={24} className={ classes.continueContainer }>
                                {
                                    <Grid item xs={12}>
                                        <Card className={ classes.continue }>
                                            <ConfirmButton label="Continue" disabled={ !allAccepted } onClick={() => this.accept()} />
                                            <a href="https://myhelm.org" onClick={ () => this.closeDialog() }>
                                                <Typography>I do not want to use Helm ></Typography>
                                            </a>
                                        </Card>
                                    </Grid>
                                }
                            </Grid>
                        </Hidden>                        
                    </Grid>
                </div>
            </div>
        )
    }

    handleExpand = (key) => {
        let { expandedPolicies } = this.state;

        expandedPolicies[key] = !!!expandedPolicies[key];

        Object.keys(expandedPolicies).forEach((item) => {
            if (item !== `${key}`) {
                expandedPolicies[item] = false
            }
        })

        this.setState({ expandedPolicies });
    }

    accept = () => {

        const { acceptedPolicies } = this.state;

        if (!this.allPoliciesAccepted()) {
            return;
        }

        this.props.acceptTermsAction(acceptedPolicies);
    }

    acceptPolicy = (policy) => {
        const { acceptedPolicies, expandedPolicies } = this.state;

        Object.keys(expandedPolicies).forEach((item) => {
            expandedPolicies[item] = false
        })

        if (acceptedPolicies.find((p) => p.id === policy.id)) {
            this.setState({ acceptedPolicies: acceptedPolicies.filter((p) => p.id !== policy.id), expandedPolicies });
            return;
        }

        this.setState({ acceptedPolicies: [ ...acceptedPolicies, policy ], expandedPolicies });
    }

    policyAccepted = (policy) => {

        const { acceptedPolicies } = this.state;

        return !!acceptedPolicies.find((p) => p.id === policy.id)
    }

    allPoliciesAccepted = () => {
        const { policies } = this.props;

        for (let i = 0; i < policies.length; i++) {
            if (!this.policyAccepted(policies[i])) {
                return false;
            } 
        }

        return true;
    }

    closeDialog = () => {

        document.cookie = 'JSESSIONID=;';
        document.cookie = 'META=;'
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        return false;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        acceptTermsAction(policies) {
            dispatch(acceptTermsAction.request(policies));
        },
        getTermsAction() {
            dispatch(getTermsAction.request());
        }
    };
};

const mapStateToProps = state => {
    
    const { terms } = state.custom;
    const policies = state.custom.terms.data || [];
    
    return {
        policies,
        error: terms.error
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Terms));