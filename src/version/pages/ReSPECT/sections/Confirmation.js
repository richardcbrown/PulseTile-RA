import React, { Component } from 'react';
import get from "lodash/get";
import { connect } from 'react-redux';
import { LocalForm, Control, actions } from 'react-redux-form';
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';

import { confirmationAction } from "../../../actions/ReSPECT/confirmationAction";
import SystemInformationBlock from "../fragments/SystemInformationBlock";
import MainFormBlock from "../fragments/MainFormBlock";
import SectionToolbar from "../fragments/SectionToolbar";
import AddNewButton from "../fragments/AddNewButton";
import TableOfRows from "../fragments/TableOfRows";
import Signature from "../fragments/Signature";
import { TOTAL_ROWS_NUMBER, STATUS_COMPLETED, STATUS_INCOMPLETE } from "../statuses";

const defaultValues = {
    dateCompleted: moment().format('DD-MMM-YYYY'),
    nhsNumber: localStorage.getItem('userId'),
};

const styles = {
    formGroup: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        boxSizing: "border-box",
    },
    smallFormGroup: {
        display: "inline-block",
        width: "50%",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        boxSizing: "border-box",
    },
    mainFormLabel: {
        display: "block",
        fontWeight: 800,
        color: "#000",
        fontSize: 14,
        marginBottom: 5,
    },
    formLabel: {
        display: "block",
        color: "#000",
        fontSize: 12,
        marginBottom: 5,
    },
    formInput: {
        width: '100%',
        height: 25,
        paddingLeft: 10,
    },
    formSelect: {
        width: '100%',
        height: 30,
        paddingLeft: 10,
        backgroundColor: "#fff",
    },
    formTextarea: {
        width: '98%',
        height: 180,
        padding: 10,
    },
    formHelpText: {
        marginBottom: 5,
    },
};

const tableHeadersArray = [
    { id: 'clinicialName', label: 'Clinician Name', isNumeric: false, isBinary: false, isDate: false, disablePadding: true },
    { id: 'designation', label: 'Designation', isNumeric: false, isBinary: false, isDate: false, disablePadding: true },
    { id: 'reviewDate', label: 'Date', isNumeric: false, isBinary: false, isDate: true, disablePadding: false },
];

class Confirmation extends Component {

    state = {
        isMainPanel: true,
        reviewDate: null,
        rowsArray: get(this.props, 'confirmationRow.confirmationsArray', []),
    };

    attachDispatch(dispatch) {
        this.formDispatch = dispatch;
    }

    submitForm = data => {
        const { rowsArray } = this.state;
        const additionalData = {
            confirmationsArray: rowsArray,
            status: (rowsArray.length > 0) ? STATUS_COMPLETED : STATUS_INCOMPLETE,
            dateCompleted: moment().format('DD-MMM-YYYY'),
        };
        const formData = Object.assign({}, data, additionalData);
        this.props.addConfirmations(formData);
        const nextStep = (this.props.currentRow > TOTAL_ROWS_NUMBER) ? null : (this.props.currentRow + 1);
        this.props.onRowClick(nextStep);
    };

    togglePanel = () => {
        this.setState({
            isMainPanel: !this.state.isMainPanel,
        });
    };

    changeReviewDate = value => {
        this.setState({
            reviewDate: value,
        })
    };

    addNewRow = values => {
        const { rowsArray, reviewDate } = this.state;
        const additionalData = {
            reviewDate: reviewDate,
        };
        const newRow = Object.assign({}, values, additionalData);
        const newRowsArray = rowsArray.concat(newRow);
        this.setState({
            rowsArray: newRowsArray,
            reviewDate: null,
        });
        this.formDispatch(actions.reset('confirmationRow'));
    };

    addSignature = (name, ref) => {
        this.setState({
            [name]: ref,
        });
    };

    render() {
        const { classes, confirmation, title, onRowClick } = this.props;
        const { isMainPanel, rowsArray, reviewDate } = this.state;
        const filledValues = Object.assign({}, defaultValues, confirmation);
        return (
            <React.Fragment>
                <MainFormBlock isMainPanel={isMainPanel} classes={classes} title={title} togglePanel={this.togglePanel}>
                    { (rowsArray && rowsArray.length > 0) &&
                        <TableOfRows headers={tableHeadersArray} rowsArray={rowsArray} />
                    }
                    <LocalForm model="confirmationRow" onSubmit={values => this.addNewRow(values)} getDispatch={(dispatch) => this.attachDispatch(dispatch)}>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.mainFormLabel}>Clinician Signature</FormLabel>
                        </FormGroup>
                        <FormGroup className={classes.smallFormGroup}>
                            <FormLabel className={classes.formLabel}>Review date</FormLabel>
                            <DatePicker
                                className={classes.formInput}
                                selected={reviewDate}
                                onChange={value => this.changeReviewDate(value)}
                            />
                        </FormGroup>
                        <FormGroup className={classes.smallFormGroup}>
                            <FormLabel className={classes.formLabel}>Designation (grade / speciality)</FormLabel>
                            <Control.text className={classes.formInput} model="confirmationRow.designation" required />
                        </FormGroup>
                        <FormGroup className={classes.smallFormGroup}>
                            <FormLabel className={classes.formLabel}>Clinicial name</FormLabel>
                            <Control.text className={classes.formInput} model="confirmationRow.clinicialName" required />
                        </FormGroup>
                        <FormGroup className={classes.smallFormGroup}>
                            <FormLabel className={classes.formLabel}>GMC / NMC / HCPC number</FormLabel>
                            <Control.text className={classes.formInput} model="confirmationRow.gmcNumber" required />
                        </FormGroup>
                        <Signature name="signature" onEnd={this.addSignature} isSubTitle={true} />
                        <AddNewButton />
                    </LocalForm>

                    <LocalForm model="confirmation" onSubmit={values => this.submitForm(values)}>
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.mainFormLabel}>Date Completed</FormLabel>
                            <Control.text className={classes.formInput} model="confirmation.dateCompleted" defaultValue={filledValues.dateCompleted} disabled />
                        </FormGroup>
                        <SectionToolbar onRowClick={onRowClick} />
                    </LocalForm>

                </MainFormBlock>
                <SystemInformationBlock isMainPanel={isMainPanel} togglePanel={this.togglePanel} classes={classes} info={confirmation} />
            </React.Fragment>
        );
    }
};

const mapStateToProps = state => {
    return {
        confirmation: state.custom.confirmation.data,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addConfirmations(data) {
            dispatch(confirmationAction.create(data));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Confirmation));