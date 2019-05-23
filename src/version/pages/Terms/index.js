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

const styles = {
    termsBackground: {
        width: "100%",
        display: "flex",
        flexGrow: 1,
        background: `url(${backgroundImage}) 0 0 repeat` 
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
        margin: 0
    },
    policiesContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        margin: 0,
        flexGrow: 1,
        width: "100%"
    },
    declarationContainer: {
        overflowY: "auto"
    },
    policyAndAcceptContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
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
    }
};

class Terms extends Component {

    constructor(props) {
        super(props);

        this.state = {
            acceptedPolicies: []
        };
    }

    componentDidMount() {
        this.props.getTermsAction();
    }
    
    render() {

        const { policies, classes } = this.props;
        
        const allAccepted = this.allPoliciesAccepted();

        return (
            <div className={ classes.termsContainer }>
                <TopBarNoUser />

                <div className={ classes.termsBackground }>
                    <Grid container spacing={24} className={ classes.contentContainer }>
                        <Grid container spacing={24} className={ classes.policiesContainer }>
                            {
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
                                        <a href="https://myhelm.org">
                                            <Typography>I do not want to use Helm ></Typography>
                                        </a>
                                    </Card>
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }

    accept = () => {

        const { acceptedPolicies } = this.state;

        if (!this.allPoliciesAccepted()) {
            return;
        }

        this.props.acceptTermsAction(acceptedPolicies);
    }

    acceptPolicy = (policy) => {
        const { acceptedPolicies } = this.state;

        if (acceptedPolicies.find((p) => p.id === policy.id)) {
            this.setState({ acceptedPolicies: acceptedPolicies.filter((p) => p.id !== policy.id) });
            return;
        }

        this.setState({ acceptedPolicies: [ ...acceptedPolicies, policy ] });
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
    
    const policies = state.custom.terms.data;
    
    return {
        policies
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Terms));