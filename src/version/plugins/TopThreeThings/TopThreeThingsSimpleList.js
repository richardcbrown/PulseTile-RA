import React from "react";
import { DateField, TextField } from "react-admin";

import SimpleListTemplate from "../../common/ResourceTemplates/SimpleListTemplate";

/**
 * This component returns block with Top Three Things list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
const TopThreeThingsSimpleList = ({ classes, ...rest }) => (
    <SimpleListTemplate
        resourceUrl="top3Things"
        title="Top Three Things"
        resource="top3Things"
        basePath="/top3Things"
        {...rest}
    >
        <DateField sortable={ false } source="dateCreated" label="Date created"  />
        <TextField sortable={ false } source="name1" label="#1" />
        <TextField sortable={ false } source="name2" label="#2" />
        <TextField sortable={ false } source="name3" label="#3" />
        <TextField sortable={ false } source="source" label="Source" />
    </SimpleListTemplate>
);

export default TopThreeThingsSimpleList;