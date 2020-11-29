import React, { Component } from "react"
import get from "lodash/get"
import { connect } from "react-redux"
import { Layout } from "react-admin"

import { withStyles } from "@material-ui/core/styles"

import CustomSidebar from "./Sidebar"
import CustomTopBar from "./Topbar"
import CustomFooter from "./Footer"

import { getCurrentTheme } from "../config/styles"
import { getPreferencesAction } from "../../version/actions/preferencesActions"

const styles = {
  root: {
    flexDirection: "column",
    zIndex: 1,
    minHeight: "100vh",
    position: "relative",
    maxWidth: "100% !important",
    minWidth: "100% !important",
    "& > div": {
      minHeight: "100vh",
      overflowX: "hidden !important",
      margin: 0,
    },
    "& main > div": {
      padding: 0,
      width: "100%",
    },
  },
}

/**
 * This component returns custom layout
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @constructor
 */
const CustomLayout = ({ classes, preferences, getPreferences, ...rest }) => {
  const { data, loading } = preferences

  if (!data && !loading) {
    getPreferences()
  }

  return (
    <Layout
      {...rest}
      className={classes.root}
      appBar={CustomTopBar}
      sidebar={CustomSidebar}
      notification={CustomFooter}
    />
  )
}

const mapStateToProps = (state) => {
  const preferences = get(state, "custom.preferences", {})

  const userPrefs = (preferences && preferences.data && preferences.data.preferences) || {}

  const contrastMode = get(userPrefs, "general.preferences.contrastMode", false)

  return {
    theme: getCurrentTheme(contrastMode),
    preferences,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPreferences: () => dispatch(getPreferencesAction.request()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CustomLayout))
