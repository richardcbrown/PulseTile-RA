import React, { Component } from "react";
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TableFooter from '@material-ui/core/TableFooter';

import { versionsAction } from "../../actions/ReSPECT/versionsAction";
import { versionsServerAction } from "../../actions/ReSPECT/versionsServerAction";

import Breadcrumbs from "../../../core/common/Breadcrumbs";
import RespectPageHeader from "./fragments/RespectPageHeader";
import TableHeadBlock from "./fragments/versions/TableHeadBlock";
import TableBodyBlock from "./fragments/versions/TableBodyBlock";
import CurrentVersionBlock from "./fragments/versions/CurrentVersionBlock";
import EmptyRow from "./fragments/versions/EmptyRow";

const styles = theme => ({
    root: {
        width: '100%',
    },
    mainBlock: {
        padding: 10,
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
    title: {
        color: "#fff",
        backgroundColor: theme.palette.mainColor,
        fontSize: 18,
        fontWeight: 400,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    tableList: {
        '& thead': {
            backgroundColor: "#e5e5e5",
            '& tr th span span': {
                color: "#000",
            },
            '& tr th': {
                paddingLeft: 10,
            },
            '& tr': {
                height: 48,
            },
        },
        '& tbody tr td': {
            paddingLeft: 10,
        },
        '& tbody tr:hover': {
            backgroundColor: theme.palette.mainColor,
        },
        '& tbody tr:hover td span': {
            color: "#fff"
        }
    },
});

class VersionsTable extends Component {

    state = {
        currentVersion: null,
    };

    componentDidMount() {
        // this.props.getVersionsInfo();

        this.props.getVersionsFromServer();
    };

    showVersion = (version, sourceId) => {
        this.setState(
            state => ({ currentVersion: version }),
            () => this.props.getOneVersion(sourceId, version)
        );
    };

    returnToVersions = () => {
        this.setState({
            currentVersion: null,
        })
    };

    render() {
        const { classes, versionsInfo, toggleMode } = this.props;
        const { currentVersion } = this.state;
        let breadcrumbsResource = [
            { url: "/summary", title: "Patient Summary", isActive: true },
            { url: null, title: "ReSPECT", isActive: false }
        ];
        if (currentVersion) {
            breadcrumbsResource = [
                { url: "/summary", title: "Patient Summary", isActive: true },
                { url: null, title: "ReSPECT", isActive: false, onClickAction: () => this.returnToVersions() },
                { url: null, title: `Version ${currentVersion}`, isActive: false }
            ];
        }
        let versionsNumber = Array.isArray(versionsInfo) ? versionsInfo.length : 0;
        return (
            <React.Fragment>
                <RespectPageHeader />
                <Breadcrumbs resource={breadcrumbsResource} />
                <Grid container spacing={16} className={classes.mainBlock}>
                    <Grid className={classes.list} item xs={12} sm={currentVersion ? 6 : 12}>
                        <div className={classes.blockTitle}>
                            <Typography className={classes.title}>ReSPECT Versions</Typography>
                        </div>
                        { versionsNumber === 0
                            ? <EmptyRow toggleMode={toggleMode} />
                            :
                                <Paper className={classes.root}>
                                    <div className={classes.tableWrapper}>
                                        <Table className={classes.tableList} aria-labelledby="tableTitle">
                                            <TableHeadBlock />
                                            <TableBodyBlock currentVersion={currentVersion} toggleMode={toggleMode} showVersion={this.showVersion} versionsInfo={versionsInfo} />
                                        </Table>
                                    </div>
                                </Paper>
                        }

                    </Grid>
                    {
                        currentVersion &&
                            <CurrentVersionBlock
                                toggleMode={toggleMode}
                                currentVersion={currentVersion}
                            />
                    }
                </Grid>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        versionsInfo: state.custom.versionsServerInfo.data,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getVersionsFromServer() {
            dispatch(versionsServerAction.request());
        },
        getOneVersion(sourceId, version) {
            dispatch(versionsServerAction.requestOne(sourceId, version));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VersionsTable));