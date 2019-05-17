import React, { Component } from "react";

import CreateTemplate from "../../../core/common/ResourseTemplates/CreateTemplate";
import Inputs from "./fragments/Inputs";
import { connect } from "react-redux";
import { synopsisTopThreeThingsAction } from "../../actions/synopsisActions";
import get from "lodash/get";
import customDataProvider from "../../../core/dataProviders/dataProvider";
import { DisabledInput, TextInput, DateInput, LongTextInput, Create, SimpleForm } from "react-admin";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import CreateFormToolbar from "../../common/Toolbars/CreateFormDialogToolbar";
import TableHeader from "../../../core/common/TableHeader";
import Breadcrumbs from "../../../core/common/Breadcrumbs";


// const TopThreeThingsCreate = ({ classes, ...rest }) => (
//     <CreateTemplate blockTitle="Problems / Issues" {...rest}>
//         <Inputs />
//     </CreateTemplate>
// );

/**
 * This component returns TopThreeThings creation form
 *
 * @author Richard Brown
 * @param {shape} classes
 * @param {shape} rest
 */
class TopThreeThingsCreate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loaded: false
        };
    }

    componentDidMount() {
        this.props.getTopThreeThingsSynopsis();

        console.log(this.props);
    }

    componentDidUpdate() {

        if (!this.state.loaded && this.props.latestTopThreeThings.id) {
            customDataProvider("GET_ONE", "top3Things", { id: this.props.latestTopThreeThings.id })
                .then(res => {
                    this.setState({ ...res.data, loaded: true })
                });
        }
    }

    render() {

        let rest = { ...this.props };

        const resourceUrl="top3Things";
        const title="Top Three Things";

        let classes = {};

        const breadcrumbsResource = [
            { url: "/" + resourceUrl, title: title, isActive: false },
        ];

        return (
            <React.Fragment>
                <Breadcrumbs resource={breadcrumbsResource} />
                <TableHeader resource={resourceUrl} />            
                <Grid item xs={12} sm={12} className={classes.createBlock}>
                    <Create {...rest}>
                        <SimpleForm className={classes.createForm} toolbar={<CreateFormToolbar />}>
                            <TextInput 
                                className={classes.labelBlock}  
                                source="name1" 
                                label="#1"
                                defaultValue={ this.state.name1 } 
                            />
                            <LongTextInput 
                                className={classes.labelBlock} 
                                source="description1" 
                                label="Description #1" 
                                fullWidth
                                defaultValue={ this.state.description1 } 
                            />
                            <TextInput 
                                className={classes.labelBlock}  
                                source="name2" 
                                label="#2"
                                defaultValue={ this.state.name2 } 
                            />
                            <LongTextInput 
                                className={classes.labelBlock} 
                                source="description2" 
                                label="Description #2" 
                                fullWidth
                                defaultValue={ this.state.description2 } 
                            />
                            <TextInput 
                                className={classes.labelBlock}  
                                source="name3" 
                                label="#3"
                                defaultValue={ this.state.name3 } 
                            />
                            <LongTextInput 
                                className={classes.labelBlock} 
                                source="description3" 
                                label="Description #3" 
                                fullWidth
                                defaultValue={ this.state.description3 } 
                            />
                            <TextInput className={classes.labelBlock} source="author" label="Author" defaultValue={localStorage.getItem('username')} disabled={true} fullWidth />
                            <DateInput className={classes.labelBlock} source="dateCreated" label="Date" defaultValue={moment().format('MM/DD/YYYY')} disabled={true} fullWidth />
                        </SimpleForm>
                    </Create>
                </Grid>
            </React.Fragment>
            // <CreateTemplate blockTitle="Problems / Issues" {...rest}>
            //     <TextInput 
            //         className={classes.labelBlock}  
            //         source="name1" 
            //         label="#1"
            //         defaultValue={ this.state.name1 } 
            //     />
            //     <LongTextInput 
            //         className={classes.labelBlock} 
            //         source="description1" 
            //         label="Description #1" 
            //         fullWidth
            //         defaultValue={ this.state.description1 } 
            //     />
            //     <TextInput 
            //         className={classes.labelBlock}  
            //         source="name2" 
            //         label="#2"
            //         defaultValue={ this.state.name2 } 
            //     />
            //     <LongTextInput 
            //         className={classes.labelBlock} 
            //         source="description2" 
            //         label="Description #2" 
            //         fullWidth
            //         defaultValue={ this.state.description2 } 
            //     />
            //     <TextInput 
            //         className={classes.labelBlock}  
            //         source="name3" 
            //         label="#3"
            //         defaultValue={ this.state.name3 } 
            //     />
            //     <LongTextInput 
            //         className={classes.labelBlock} 
            //         source="description3" 
            //         label="Description #3" 
            //         fullWidth
            //         defaultValue={ this.state.description3 } 
            //     />
            //     <TextInput className={classes.labelBlock} source="author" label="Author" defaultValue={localStorage.getItem('username')} disabled={true} fullWidth />
            //     <DateInput className={classes.labelBlock} source="dateCreated" label="Date" defaultValue={moment().format('MM/DD/YYYY')} disabled={true} fullWidth />
            // </CreateTemplate>
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

export default connect(mapStateToProps, mapDispatchToProps)(TopThreeThingsCreate);

//export default TopThreeThingsCreate;
