import React, { Component } from "react";
import { withRouter } from 'react-router'
import { withStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import Tooltip from '@material-ui/core/Tooltip';

const styles = {
    userPanel: {
        minWidth: 220,
        padding: 12,
    },
    userName: {
        marginBottom: 7,
        fontSize: 18,
        fontWeight: 800,
    },
    userRole: {
        fontSize: 14,
        marginBottom: 7,
    }
};

/**
 * This component returns Accessability button
 *
 */
class AccessabilityButton extends Component {

    constructor(props) {
        super(props);
        this.button = React.createRef();
    }

    render() {
        const { classes, history } = this.props;
        return (
            <div className={classes.rightBlockItem} ref={this.button}>
                <Tooltip title="Accessability statement">
                    <IconButton
                        id="icon-accessability"
                        className={classes.rightBlockButton}
                        aria-owns={'menu-appbar'}
                        aria-haspopup="true"
                        onClick={() => history.push("/accessability")}
                        color="inherit"
                        aria-label="Accessability statement"
                    >
                        <PersonIcon />
                    </IconButton>
                </Tooltip>
            </div>
        );
    }
}

export default  withStyles(styles)(withRouter(AccessabilityButton));
