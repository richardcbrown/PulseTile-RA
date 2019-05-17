import React, { Component } from "react";
import { connect } from "react-redux";
import { synopsisTopThreeThingsAction } from "../../actions/synopsisActions";
import get from "lodash/get";
import customDataProvider from "../../../core/dataProviders/dataProvider";
import TopThreeThingsEdit from "./TopThreeThingsEdit";
import TopThreeThingsCreate from "./TopThreeThingsCreate";
import { Resource } from "react-admin";
import Admin from "react-admin/lib/Admin";

class TopThreeThingsDashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            topThreeThings: null
        };
    }

    componentDidMount() {
        this.props.getTopThreeThingsSynopsis();

        console.log(this.props);
    }

    componentDidUpdate() {

        if (this.props.latestTopThreeThings.id) {
            this.props.history.push('/top3Things/' + this.props.latestTopThreeThings.id)
        }

        if (!this.state.topThreeThings) {
            customDataProvider("GET_ONE", "top3Things", { id: this.props.latestTopThreeThings.id })
                .then(res => {
                    this.setState({ topThreeThings: res.data })
                });
        }
    }

    render() {

        const record = this.state.topThreeThings;

        return (
            <div>
                <div>Top 3 Things</div>
                
            </div>
        );
    }
}

const mapStateToProps = state => {

    const props = get(state, ['custom', 'top3ThingsSynopsis', 'data'], []);
    
    const latestTopThreeThings = {
        
    };

    if (props && props.length) {
        latestTopThreeThings.id = props[0].sourceId;
    }

    return Object.assign({}, { latestTopThreeThings });
};

const mapDispatchToProps = dispatch => {

    const synopsisActions = [synopsisTopThreeThingsAction];

    return {
        getTopThreeThingsSynopsis() {
            synopsisActions.map(item => {
                return dispatch(item.request());
            });
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TopThreeThingsDashboard);