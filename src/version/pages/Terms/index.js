import React, { Component } from "react";
import { connect } from "react-redux";
import Checkbox from '@material-ui/core/Checkbox';
import Typography from "@material-ui/core/Typography";
import AcceptButton from "../../common/Buttons/AcceptButton";
import { acceptTermsAction } from "../../actions/acceptTermsAction";
import { getTermsAction } from "../../actions/getTermsAction";

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

        const { policies } = this.props;
        
        const allAccepted = this.allPoliciesAccepted();

        return (
            <div>
                <div>Terms</div>

                {
                    policies.map((p, key) => {
                        return (
                            <div key={key}>
                                { p.narrative }

                                <div>
                                    <Checkbox
                                        //className={classes.checkbox}
                                        checked={() => this.policyAccepted(p)}
                                        color="primary"
                                        onChange={() => this.acceptPolicy(p)}
                                    />
                                    <Typography>I accept</Typography>
                                </div>
                            </div>
                        )
                    })
                }

                {
                    allAccepted ?

                    <AcceptButton onClick={() => this.accept()} /> :
                    
                    null
                }
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
    
    console.log(state)

    const policies = state.custom.terms.data;
    
    return {
        policies
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Terms);