import React, { Component } from "react";
import { connect } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import Tooltip from '@material-ui/core/Tooltip';

/**
 * Thic component returns Feedback button
 *
 * @author Richard Brown <richard.brown@synanetics.com>
 */
class FeedbackButton extends Component {

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.rightBlockItem}>
                <Tooltip title="Feedback">
                    <IconButton >
                    <a
                        className={classes.rightBlockButton}                        
                        color="inherit"
                        aria-label="Feedback"
                        href="mailto:test@test.com"
                    >
                        <CommentIcon />
                    </a>
                </Tooltip>
            </div>
        );
    }
};

export default FeedbackButton;
