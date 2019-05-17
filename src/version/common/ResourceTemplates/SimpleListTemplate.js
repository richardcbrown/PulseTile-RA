import React, { Component } from "react";
import { connect } from 'react-redux';
import { Route } from "react-router";
import {
    List,
    Filter,
    TextInput,
    Datagrid,
    TextField
} from "react-admin";

import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FilterIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';

import Breadcrumbs from "../../../core/common/Breadcrumbs";
import TableHeader from "../../../core/common/TableHeader";
import ListToolbar from "../../../core/common/Toolbars/ListToolbar";
import EmptyListBlock from "../../../core/common/ResourseTemplates/EmptyListBlock";
import { ITEMS_PER_PAGE } from "../../../core/config/styles";

const listStyles = theme => ({
    mainBlock: {
        margin: 0,
        paddingLeft: 10,
        paddingTop: 15,
        paddingRight: 25,
        border: `1px solid ${theme.palette.borderColor}`,
    },
    list: {
        paddingLeft: 0,
    },
    blockTitle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 49,
        color: "#fff",
        backgroundColor: theme.palette.mainColor,
        fontSize: 18,
        fontWeight: 700,
        paddingLeft: 15,
    },
    emptyBlock: {
        flexGrow: 1,
    },
    title: {
        color: theme.palette.paperColor,
        backgroundColor: theme.palette.mainColor,
        fontSize: 18,
        fontWeight: 700,
    },
    filterIcon: {
        color: `${theme.palette.paperColor} !important`,
        paddingRight: 15,
    },
    expandIcon: {
        height: 20,
        color: `${theme.palette.paperColor} !important`,
        paddingRight: 7,
    },
    filterInput: {
        backgroundColor: theme.palette.mainColor,
        borderRadius: 0,
        boxShadow: "none",
        '& button': {
            color: "#fff",
        },
    },
    inputBlock: {
        width: 'calc(100% - 105px)',
        backgroundColor: "#fff",
        borderRadius: 2,
        paddingLeft: 5,
    },
    tableList: {
        '& thead': {
            '& tr th': {
                paddingLeft: 10,
            },
        },
        '& tbody tr:hover': {
            backgroundColor: theme.palette.mainColor + '!important',
        },
        '& tbody tr:hover td span': {
            color: "#fff"
        }
    }
});

/**
 * This component returns template for List page
 * (it used in List blocks for the plugins Allergies, Contacts, Medications, Problems etc.)
 *
 * @author Richard Brown <richard.brown@synanetics.com>
 */
class ListTemplate extends Component {

    state = {
        isListOpened: true,
        isFilterOpened: false,
        filterText: null,
        key: 0,
    };

    render() {
        const { create, resourceUrl, title, children, classes, history, currentList } = this.props;
        const { key, filterText } = this.state;
        const breadcrumbsResource = [
            { url: "/" + resourceUrl, title: title, isActive: false },
        ];
        const currentListArray = Object.values(currentList);
        const idsNumber = currentListArray.length > 0 ? currentListArray.length : 0;
        return (
            <React.Fragment>
                <Breadcrumbs resource={breadcrumbsResource} />
                <TableHeader resource={resourceUrl} />
                <Grid container spacing={16} className={classes.mainBlock}>
                    <Grid className={classes.list} item xs={12}>
                        <React.Fragment>
                            <div className={classes.blockTitle}>
                                <Typography className={classes.title}>{title}</Typography>
                                <div className={classes.emptyBlock}></div>
                            </div>
                        </React.Fragment>
                        <List
                            resource={resourceUrl}
                            key={key}
                            filter={{ filterText: filterText }}
                            title={title}
                            perPage={ITEMS_PER_PAGE}
                            actions={null}
                            bulkActions={false}
                            pagination={<ListToolbar resourceUrl={resourceUrl} history={history} isCreatePage={false} createPath={""} />}
                            {...this.props}
                        >
                            { (idsNumber > 0) ?
                                <Datagrid className={classes.tableList}>
                                    {children}
                                </Datagrid>
                                :
                                <EmptyListBlock />
                            }
                        </List>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentList: state.admin.resources[ownProps.resource].list.ids,
    };
};

export default connect(mapStateToProps, null)(withStyles(listStyles)(ListTemplate));