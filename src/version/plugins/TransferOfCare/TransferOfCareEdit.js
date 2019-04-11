import React from "react";

import EditTemplate from "../../../core/common/ResourseTemplates/EditTemplate";
import Inputs from "./fragments/Inputs";

/**
 * This component returns block with edit form for TransferOfCare
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
const TransferOfCareEdit = ({ classes, ...rest }) => (
    <EditTemplate blockTitle="Transfer Of Care"  {...rest}>
        <Inputs />
    </EditTemplate>
);

export default TransferOfCareEdit;