import React from "react";

import CreateTemplate from "../../../core/common/ResourseTemplates/CreateTemplate";
import Inputs from "./fragments/Inputs";

/**
 * This component returns TopThreeThings creation form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 */
const TopThreeThingsCreate = ({ classes, ...rest }) => (
    <CreateTemplate blockTitle="About Me" {...rest}>
        <Inputs />
    </CreateTemplate>
);

export default TopThreeThingsCreate;
