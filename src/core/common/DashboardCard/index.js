import React from "react";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ItemsList from "./ItemsList";
import { SHOW_ALL } from "../../pages/PatientSummary/config";

/**
 * This component returns list of empty rows if information is loading
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 */
const LoadingItems = ({ classes }) => {
    return (
        <List className={classes.list}>
            <li className={classes.listItem}>
                <Typography>Loading...</Typography>
            </li>
            <div className={classes.emptyRows}></div>
        </List>
    );
};

/**
 * This component returns list block
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}   classes
 * @param {array}   items
 * @param {shape}   list
 * @param {shape}   history
 */
const ListBlock = ({ classes, items, list, history, listOnly }) => {
    if (items) {
        return (
            <ItemsList classes={classes} items={items} list={list} history={history} listOnly={listOnly} />
        );
    }
    return (
        <LoadingItems classes={classes} />
    );
};

/**
 * This component returns one single Dashboard Card
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param props
 * @constructor
 */
export default props => {
    const { id, classes, title, items, loading, icon, list, history, showMode, showHeadings, listOnly, hideList } = props;

    if (Object.values(showHeadings).indexOf(list) === -1) {
        return null;
    }

    const clickHandler = listOnly ? () => {} : () => history.push('/' + list)

    return (
        <Grid item xs={12} sm={6} md={6} lg={3}>
            <Card className={classes.card}>
                <div id={id} className={listOnly ? classes.topBlockListOnly : classes.topBlock} aria-label={title} onClick={clickHandler}>
                    <FontAwesomeIcon icon={icon} size="2x" className={classes.icon} />
                    <h1 className={classes.mainHeading}>
                        <Typography className={classes.title}>
                            {title}
                        </Typography>
                    </h1>
                </div>
                { ((showMode === SHOW_ALL || !showMode || listOnly) && !hideList) &&
                <ListBlock loading={loading} classes={classes} items={items} list={list} history={history} listOnly={listOnly} />
                }
            </Card>
        </Grid>
    );
}
