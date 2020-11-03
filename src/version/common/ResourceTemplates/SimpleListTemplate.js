import React, { Component } from "react"
import { connect } from "react-redux"
import { List, Datagrid } from "react-admin"

import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

import Breadcrumbs from "../../../core/common/Breadcrumbs"
import TableHeader from "../../../core/common/TableHeader"
import SimpleListToolbar from "../../common/Toolbars/SimpleListToolbar"
import EmptyListBlock from "../../../core/common/ResourseTemplates/EmptyListBlock"
import { ITEMS_PER_PAGE } from "../../../core/config/styles"

const listStyles = (theme) => ({
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
    "& button": {
      color: "#fff",
    },
  },
  inputBlock: {
    width: "calc(100% - 105px)",
    backgroundColor: "#fff",
    borderRadius: 2,
    paddingLeft: 5,
  },
  tableList: {
    "& thead": {
      "& tr th": {
        paddingLeft: 10,
      },
    },
    "& tbody tr:hover": {
      backgroundColor: theme.palette.mainColor + "!important",
    },
    "& tbody tr:hover td span": {
      color: "#fff",
    },
  },
})

/**
 * This component returns template for List page
 * (it used in List blocks for the plugins Allergies, Contacts, Medications, Problems etc.)
 *
 * @author Richard Brown <richard.brown@synanetics.com>
 */
class ListTemplate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isListOpened: true,
      isFilterOpened: false,
      filterText: null,
      key: 0,
    }
  }

  render() {
    const { resourceUrl, title, children, classes, history, currentList } = this.props
    const { key } = this.state

    const breadcrumbsResource = [
      { url: "/" + resourceUrl, title: title, isActive: true },
      { url: `/${resourceUrl}/history`, title: "History", isActive: false },
    ]

    const currentListArray = Object.values(currentList)
    const idsNumber = currentListArray.length > 0 ? currentListArray.length : 0
    return (
      <React.Fragment>
        <Breadcrumbs resource={breadcrumbsResource} />
        <TableHeader resource={resourceUrl} />
        <Grid container spacing={4} className={classes.mainBlock}>
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
              title={title}
              perPage={ITEMS_PER_PAGE}
              actions={null}
              bulkActions={false}
              pagination={
                <SimpleListToolbar
                  resourceUrl={`${resourceUrl}/history`}
                  history={history}
                  sort={{ field: "dateCreated", order: "DESC" }}
                />
              }
              sort={{ field: "dateCreated", order: "DESC" }}
              {...this.props}
            >
              {idsNumber > 0 ? <Datagrid className={classes.tableList}>{children}</Datagrid> : <EmptyListBlock />}
            </List>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentList: state.admin.resources[ownProps.resource] || {},
  }
}

export default connect(mapStateToProps, null)(withStyles(listStyles)(ListTemplate))
