import React, { Component } from "react"
import { DateField, TextField } from "react-admin"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import { BundleList } from "../../common/ResourceTemplates/BundleList"
import { v4 as uuidv4 } from "uuid"
import { flattenComposition } from "../../fhir/composition"
import Breadcrumbs from "../../../core/common/Breadcrumbs"
import TableHeader from "../../../core/common/TableHeader"
import moment from "moment"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles";

const listStyles = theme => ({
    mainBlock: {
        margin: 0,
        paddingLeft: 10,
        paddingTop: 15,
        paddingRight: 25,
        border: `1px solid ${theme.palette.borderColor}`,
        height: "100%"
    },
    list: {
        paddingLeft: 0,
        display: "flex",
        flexDirection: "column"
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
        '& tbody': {
            '& tr td': {
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
 * This component returns block with Top Three Things list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} rest
 * @constructor
 */
// const TopThreeThingsSimpleList = ({ classes, ...rest }) => (
//     <BundleList key={uuidv4()} resourceType="Composition" query="" rowProvider={
//         (resource) => {
//             return (
//                 <Tab
//             )
//         }
//     } />
//     // <SimpleListTemplate
//     //     resourceUrl="Composition"
//     //     title="Top Three Things"
//     //     resource="Composition"
//     //     basePath="/top3Things"
//     //     {...rest}
//     // >
//     //     <DateField sortable={false} source="dateCreated" label="Date created" />
//     //     <TextField sortable={false} source="name1" label="#1" />
//     //     <TextField sortable={false} source="name2" label="#2" />
//     //     <TextField sortable={false} source="name3" label="#3" />
//     //     <TextField sortable={false} source="source" label="Source" />
//     // </SimpleListTemplate>
// )

class TopThreeThingsSimpleList extends Component {
    constructor(props) {
        super(props)

        this.bundleListKey = uuidv4()
    }

    render() {
        const { bundleListKey } = this

        const title = "Top Three Things"

        const breadcrumbsResource = [
            { url: "/top3Things", title: title, isActive: true },
            { url: `/top3Things/history`, title: "History", isActive: false },
        ]

        const { classes } = this.props

        return (
            <React.Fragment>
                <Breadcrumbs resource={breadcrumbsResource} />
                <TableHeader resource={"top3Things"} />

                <Grid container spacing={16} className={classes.mainBlock}>
                    <Grid className={classes.list} item xs={12}>
                        <React.Fragment>
                            <div className={classes.blockTitle}>
                                <Typography className={classes.title}>{title}</Typography>
                                <div className={classes.emptyBlock}></div>
                            </div>
                        </React.Fragment>
                        <BundleList
                            componentKey={bundleListKey}
                            tableClass={classes.tableList}
                            resourceType="Composition"
                            query={{
                                _sort: "-date",
                                _count: 1,
                                type: "https://fhir.myhelm.org/STU3/ValueSet/phr-composition-type-1|T3T",
                            }}
                            headProvider={() => {
                                return (
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <span>Date Created</span>
                                            </TableCell>
                                            <TableCell>
                                                <span>#1</span>
                                            </TableCell>
                                            <TableCell>
                                                <span>#2</span>
                                            </TableCell>
                                            <TableCell>                                               
                                                <span>#3</span>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                )
                            }}
                            rowProvider={(resource) => {
                                const flattened = flattenComposition(resource)

                                const { date } = flattened

                                return (
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="body1">{moment(date).format("DD/MM/YYYY")}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body1">{flattened.name1}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body1">{flattened.name2}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body1">{flattened.name3}</Typography>
                                        </TableCell>
                                    </TableRow>
                                )
                            }}
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

export default withStyles(listStyles)(TopThreeThingsSimpleList)