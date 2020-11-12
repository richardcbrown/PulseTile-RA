import React, { Component } from "react"
import { Grid, withStyles, Card } from "@material-ui/core"
import NhsWidgetDisplay from "./NhsWidgetDisplay"
import TableHeader from "../../../core/common/TableHeader"
import Breadcrumbs from "../../../core/common/Breadcrumbs"
import backgroundImage from "../../images/Artboard.png"

const nhsWidgets = [
  "https://api-bridge.azurewebsites.net/conditions/?uid=aW5mb0BteWhlbG0ub3Jn",
  "https://api-bridge.azurewebsites.net/livewell/?uid=aW5mb0BteWhlbG0ub3Jn",
  "https://api-bridge.azurewebsites.net/conditions/?uid=aW5mb0BteWhlbG0ub3Jn&p=social-care-and-support-guide",
]

const styles = {
  createBlock: {
    padding: "24px",
    background: `url(${backgroundImage})`,
    backgroundSize: "cover",
    margin: 0,
  },
}

class NhsWidgets extends Component {
  componentDidMount() {
    window.analytics.page({ url: window.location.hash })
  }

  render() {
    const { classes } = this.props

    const resourceUrl = "nhs-resources"
    const title = "NHS Resources"

    const breadcrumbsResource = [{ url: "/" + resourceUrl, title: title, isActive: false }]

    return (
      <React.Fragment>
        <Breadcrumbs resource={breadcrumbsResource} />
        <TableHeader resource={resourceUrl} />
        <Grid item container spacing={4} xs={12} sm={12} className={classes.createBlock}>
          {nhsWidgets.map((widget, index) => {
            return (
              <Grid item xs={12} sm={6} lg={4}>
                <Card>
                  <NhsWidgetDisplay height={500} src={widget} id={index} />
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(NhsWidgets)
