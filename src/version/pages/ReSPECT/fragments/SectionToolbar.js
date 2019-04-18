import React from "react";
import { Toolbar, SaveButton } from "react-admin";

import { withStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
    toolbar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    saveButton: {
        display: "block",
        width: 150,
        height: 40,
        paddingTop: "6px !important",
        paddingLeft: "8px !important",
        backgroundColor: "#fff",
        border: `1px solid ${theme.palette.mainColor}`,
        color: theme.palette.mainColor,
        borderRadius: 20,
        fontSize: 16,
        fontWeight: 800,
        "& svg": {
            marginRight: 2,
        },
        "& span": {
            textTransform: "capitalize",
        },
        "&:hover": {
            backgroundColor: theme.palette.mainColor,
            color: "#fff",
        }
    },
    cancelButton: {
        display: "block",
        width: 150,
        height: 40,
        paddingTop: "6px !important",
        paddingLeft: "8px !important",
        color: theme.palette.dangerColor,
        fontSize: 16,
        fontWeight: 800,
        "& svg": {
            marginRight: 2,
        },
        "& span": {
            textAlign: "right",
            textTransform: "capitalize",
        },
    }
});

const SectionToolbar = ({ classes, onRowClick }) => {
    return (
        <Toolbar className={classes.toolbar}>
            <Tooltip title="Finished" disableHoverListener={true}>
                <IconButton type="submit" className={classes.saveButton}>
                    Save
                    <DoneIcon />
                </IconButton>
            </Tooltip>
            <Button className={classes.cancelButton} onClick={() => onRowClick(null)}>Cancel</Button>
        </Toolbar>
    );
};

export default withStyles(styles)(SectionToolbar);