import React from "react";

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
    createButton: {
        display: "block",
        width: 100,
        height: 40,
        margin: 8,
        padding: 0,
        backgroundColor: "white",
        color: theme.palette.mainColor,
        border: `1px solid ${theme.palette.mainColor}`,
        borderRadius: 25,
        fontSize: 16,
        fontWeight: 800,
        "&:hover": {
            backgroundColor: theme.palette.mainColor,
            color: "white",
        }
    }
});

/**
 * This component returns Edit button
 *
 * @author Richard Brown
 * @param {shape}  classes
 * @param {shape}  history
 * @param {string} redirectPath
 */
const AcceptButton = ({ classes, onClick }) => (
    <Tooltip title="Accept">
        <IconButton aria-label="Accept" className={classes.createButton} onClick={() => { console.log("click"); onClick() }}>
            <AddIcon /> Accept
        </IconButton>
    </Tooltip>
);

export default withStyles(styles)(AcceptButton);