import React from "react";
import { DisabledInput, TextInput, DateInput, LongTextInput } from "react-admin";

import { withStyles } from '@material-ui/core/styles';

import CreateTemplate from "../../../core/common/ResourseTemplates/CreateTemplate";

const styles = {
    labelBlock: {
        '& > div': {
            marginBottom: "0px !important",
        },
    },
};

/**
 * This component returns TopThreeThings creation form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const TopThreeThingsCreate = ({ classes, ...rest }) => (
    <CreateTemplate blockTitle="Top Three Things" {...rest}>
        <TextInput className={classes.labelBlock}  source="name1" label="Issue #1" />
        <LongTextInput className={classes.labelBlock} source="description1" label="Description #1" />
        <TextInput className={classes.labelBlock}  source="name2" label="Issue #2" />
        <LongTextInput className={classes.labelBlock} source="description2" label="Description #2" />
        <TextInput className={classes.labelBlock}  source="name3" label="Issue #3" />
        <LongTextInput className={classes.labelBlock} source="description3" label="Description #3" />
        <DateInput className={classes.labelBlock} source="dateCreated" label="Date created" disabled={true}  />
        <DisabledInput className={classes.labelBlock} source="source" label="Source" />
    </CreateTemplate>
);

export default withStyles(styles)(TopThreeThingsCreate);
