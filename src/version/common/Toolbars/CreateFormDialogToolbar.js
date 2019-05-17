import React, { Component } from "react";
import { Toolbar, SaveButton, ListButton } from "react-admin";

import { withStyles } from '@material-ui/core/styles';
import BlockIcon from '@material-ui/icons/Block';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import CustomSaveButton from "../../../core/common/Buttons/CustomSaveButton";
import GeneralDialog from "../Dialogs/GeneralDialog";

const styles = theme => ({
    listButton: {
        display: "block",
        width: 120,
        height: 40,
        paddingTop: "6px !important",
        paddingLeft: "8px !important",
        backgroundColor: theme.palette.dangerColor,
        border: `1px solid ${theme.palette.dangerColor}`,
        color: "#fff",
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
            backgroundColor: "#fff",
            color: theme.palette.dangerColor,
        }
    },
    toolbar: {
        backgroundColor: theme.palette.toolbarColor,
    }
});

// /**
//  * This component returns toolbar without delete button for create forms
//  *
//  * @author Bogdan Shcherban <bsc@piogroup.net>
//  * @param {shape} classes
//  * @param {shape} props
//  */
// const CreateFormToolbar = ({ classes, ...props}) => {    
//     return (
//         <Toolbar className={classes.toolbar} {...props} >
//             {/* <CustomSaveButton {...props} /> */}
//             <button onClick={  }>Update</button>

//             <Link to="/top3Things/history">Show previous entries</Link>
//         </Toolbar>
//     );
// };

class CreateFormDialogToolbar extends Component {
    
    state = {
        showDialog: false
    };
    
    render() {

        const { classes } = this.props;

        return (
            <Toolbar className={classes.toolbar} {...this.props} >
                {/* <CustomSaveButton {...props} /> */}
                <Tooltip title="Update">
                    <IconButton aria-label="Update" className={classes.createButton} onClick={() => this.setState({ showDialog: true })}>
                        <AddIcon /> Update
                    </IconButton>
                </Tooltip>
                <GeneralDialog 
                    open={ this.state.showDialog }
                    onClose={ () => this.setState({ showDialog: false }) }
                    title="Don’t forget:"
                    message="Do not enter anything that requires assistance or urgent attention. If you need urgent medical attention please contact your GP surgery, ring 111 or 999. You remain responsible for acting on the health concerns you may have.
                    The information you enter here will be shared with health and care practitioners involved in your care." 
                    options={[
                        <button>Cancel</button>,
                        <CustomSaveButton {...this.props} />
                    ]}
                />
                <Link to="/top3Things/history">Show previous entries</Link>
            </Toolbar>
        );
    }
}

export default withStyles(styles)(CreateFormDialogToolbar);