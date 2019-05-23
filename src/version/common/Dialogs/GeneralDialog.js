import React, { Component } from "react"
import get from "lodash/get";
import { connect } from 'react-redux';

import { withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import withMobileDialog from '@material-ui/core/withMobileDialog';


const styles = theme => ({
    dialogBlock: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        [theme.breakpoints.only('xs')]: {
            paddingTop: 0,
            paddingLeft: 20,
            paddingRight: 20,
        },
        [theme.breakpoints.up('sm')]: {
            minHeight: 300,
            minWidth: 500,
            marginBottom: 10,
        },
    },
    titleBlock: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: 48,
        paddingLeft: 20,
        backgroundColor: theme.palette.mainColor,
        color: "#fff",
        fontSize: 18,
        fontWeight: 800,
    },
    description: {
        padding: 20,
        fontSize: 15,
        textAlign: "center",
    },
    toolbar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginRight: 15,
    },
    reloadButton: {
        display: "block",
        width: 140,
        height: 40,
        margin: "8px !important",
        color: "white",
        backgroundColor: theme.palette.dangerColor,
        borderRadius: 25,
        fontSize: 16,
        fontWeight: 800,
        "&:hover": {
            color: theme.palette.dangerColor,
            backgroundColor: "white",
        },
    }
});

class GeneralDialog extends Component {

    render() {
        const { classes, title, message, options, open, onClose, ...rest } = this.props;

        return (
            <React.Fragment>
                <Dialog onBackdropClick={() => onClose()} open={open} {...rest}>
                    <div className={classes.dialogBlock} >
                        <Typography className={classes.titleBlock}>
                            { title }
                        </Typography>
                        <Typography className={classes.description}>{message}</Typography>
                        <div className={classes.toolbar}>
                            {  
                                options.map((o) => (o))
                            }
                        </div>
                    </div>
                </Dialog>
            </React.Fragment>
        );
    }
};

export default withStyles(styles)(withMobileDialog({breakpoint: 'xs'})(GeneralDialog));
