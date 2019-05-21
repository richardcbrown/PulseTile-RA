
import React from "react";

import { withStyles } from "@material-ui/core/styles";

import CustomPaginator from "../../../core/common/Buttons/CustomPaginator";

const styles = {
    paginationBlock: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 45,
    },
};

/**
 * This component returns toolbar for List
 *
 * @author Richard Brown
 * @param {shape}   classes
 * @param {string}  resourceUrl
 * @param {shape}   history
 * @param {number}  total
 */
const SimpleListToolbar = ({ classes, resourceUrl, history, total }) => (
    <div className={classes.paginationBlock}>
        <CustomPaginator resourceUrl={resourceUrl} history={history} itemsPerPage={10} total={total} />
    </div>
);

export default withStyles(styles)(SimpleListToolbar);