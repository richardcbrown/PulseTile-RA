import React, { Component } from "react";
import { connect } from "react-redux";
import { synopsisTopThreeThingsAction } from "../../actions/synopsisActions";
import get from "lodash/get";
import customDataProvider from "../../../core/dataProviders/dataProvider";
import { TextInput, DateInput, LongTextInput, Create, SimpleForm, maxLength } from "react-admin";
import moment from "moment";
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import CreateFormToolbar from "../../common/Toolbars/CreateFormDialogToolbar";
import TableHeader from "../../../core/common/TableHeader";
import Breadcrumbs from "../../../core/common/Breadcrumbs";
import backgroundImage from "../../images/Artboard.png";
import { Typography } from "@material-ui/core";

const styles = {
    createBlock: {
        padding: "24px",
        background: `url(${backgroundImage})`,
        backgroundSize: "cover"
    }
};

const CharacterCount = ({ form, formItem, limit, show }) => {
    
    const showCount = form && show;
    
    if (!showCount) {
        return (null);
    }

    const remaining = limit - (form.values && form.values[formItem] ? form.values[formItem].length : 0);

    return (
        <Typography>{ remaining }/{ limit } characters remaining</Typography>
    )
}

const conditionalRequired = (message, target) => (value,  allValues) => {
    
    const targetValue = allValues[target];

    if (targetValue && !value) {
        return message;
    }

    return undefined
}

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

        this.nameOneValidator = conditionalRequired("Subject is required", "description1");
        this.nameTwoValidator = conditionalRequired("Subject is required", "description2");
        this.nameThreeValidator = conditionalRequired("Subject is required", "description3");

        this.state = {
            loaded: false
        };
    }

    componentDidMount() {
        this.props.getTopThreeThingsSynopsis();
    }

    componentDidUpdate() {

        if (!this.state.loaded && this.props.latestTopThreeThings.id) {
            customDataProvider("GET_ONE", "top3Things", { id: this.props.latestTopThreeThings.id })
                .then(res => {
                    this.setState({ ...res.data, loaded: true })
                });
        }
    }

    formChanged = (form) => {
        if (!form) {
            return false;
        }

        form.fields = form.fields || {};

        form.fields["name1"] = { touched: true, visited: true };
        form.fields["name2"] = { touched: true, visited: true };
        form.fields["name3"] = { touched: true, visited: true };

        for (const prop in form.values) {
            if (form.values.hasOwnProperty(prop)) {
                const initialValue = form.initial[prop];
                const currentValue = form.values[prop];

                if (!initialValue && currentValue) {
                    return true;
                }

                if (initialValue && currentValue !== initialValue) {
                    return true;
                }
            }
        }

        return false;
    } 

    handleSave = () => {

        const { form } = this.props;

        if (this.formChanged(form) && !form.syncErrors) {
            this.refs.formRef.props.save(form.values, '/top3Things');
        }
    }

    showCount = (key) => {
        const { form } = this.props;

        return form && (!form.syncErrors || !form.syncErrors[key]);
    }

    render() {

        const { classes, form, ...rest } = this.props;

        const resourceUrl="top3Things";
        const title="Top Three Things";

        const breadcrumbsResource = [
            { url: "/" + resourceUrl, title: title, isActive: false },
        ];

        return (
            <React.Fragment>
                <Breadcrumbs resource={breadcrumbsResource} />
                <TableHeader resource={resourceUrl} />            
                <Grid item xs={12} sm={12} className={classes.createBlock}>
                    <Create {...rest}>
                        <SimpleForm 
                            className={classes.createForm}
                            toolbar={<CreateFormToolbar { ...rest } handleSave={ this.handleSave } disabled={ !form || !this.formChanged(form) || form.syncErrors } />}
                            onSubmit={ this.submit }
                            ref="formRef"
                        >
                            <TextInput 
                                className={classes.labelBlock}  
                                source="name1" 
                                label="#1"
                                defaultValue={ this.state.name1 }
                                validate={ [this.nameOneValidator, maxLength(75)] } 
                            />
                            <CharacterCount limit={ 75 } form={ form } formItem="name1" show={ this.showCount("name1") } />
                            <LongTextInput 
                                className={classes.labelBlock} 
                                source="description1" 
                                label="Description #1" 
                                fullWidth
                                defaultValue={ this.state.description1 }
                                validate={ maxLength(500) } 
                            />
                            <CharacterCount limit={ 500 } form={ form } formItem="description1" show={ this.showCount("description1") } />
                            <TextInput 
                                className={classes.labelBlock}  
                                source="name2" 
                                label="#2"
                                defaultValue={ this.state.name2 }
                                validate={ [this.nameTwoValidator, maxLength(75)] }  
                            />
                            <CharacterCount limit={ 75 } form={ form } formItem="name2" show={ this.showCount("name2") } />
                            <LongTextInput 
                                className={classes.labelBlock} 
                                source="description2" 
                                label="Description #2" 
                                fullWidth
                                defaultValue={ this.state.description2 }
                                validate={ maxLength(500) } 
                            />
                            <CharacterCount limit={ 500 } form={ form } formItem="description2" show={ this.showCount("description2") } />
                            <TextInput 
                                className={classes.labelBlock}  
                                source="name3" 
                                label="#3"
                                defaultValue={ this.state.name3 }
                                validate={ [this.nameThreeValidator, maxLength(75)] }  
                            />
                            <CharacterCount limit={ 75 } form={ form } formItem="name3" show={ this.showCount("name3") } />
                            <LongTextInput 
                                className={classes.labelBlock} 
                                source="description3" 
                                label="Description #3" 
                                fullWidth
                                defaultValue={ this.state.description3 }
                                validate={ maxLength(500) } 
                            />
                            <CharacterCount limit={ 500 } form={ form } formItem="description3" show={ this.showCount("description3") } />
                            <TextInput className={classes.labelBlock} source="author" label="Author" defaultValue={localStorage.getItem('username')} disabled={true} fullWidth />
                            <DateInput className={classes.labelBlock} source="dateCreated" label="Date" defaultValue={moment().format('MM/DD/YYYY')} disabled={true} fullWidth />
                        </SimpleForm>
                    </Create>
                </Grid>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {

    const props = get(state, ['custom', 'top3ThingsSynopsis', 'data'], []);
    
    const form = get(state, ['form', 'record-form'], null);

    const latestTopThreeThings = {
        
    };

    if (props && props.length) {
        latestTopThreeThings.id = props[0].sourceId;
    }

    return Object.assign({}, { latestTopThreeThings }, { form });
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TopThreeThingsCreate));
