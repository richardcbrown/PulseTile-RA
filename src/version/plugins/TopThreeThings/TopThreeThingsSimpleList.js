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

export default class TopThreeThingsSimpleList extends Component {
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

        return (
            <React.Fragment>
                <Breadcrumbs resource={breadcrumbsResource} />
                <TableHeader resource={"top3Things"} />

                <Grid xs={12}>
                    <React.Fragment>
                        <div>
                            <Typography>{title}</Typography>
                            <div></div>
                        </div>
                    </React.Fragment>
                    <BundleList
                        componentKey={bundleListKey}
                        resourceType="Composition"
                        query={{
                            _sort: "-date",
                            _count: 1,
                            type: "https://fhir.myhelm.org/STU3/ValueSet/phr-composition-type-1|T3T",
                        }}
                        headProvider={() => {
                            return (
                                <TableHead>
                                    <TableCell>
                                        <Typography>Date Created</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>#1</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>#2</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>#3</Typography>
                                    </TableCell>
                                </TableHead>
                            )
                        }}
                        rowProvider={(resource) => {
                            const flattened = flattenComposition(resource)

                            const { date } = flattened

                            return (
                                <TableRow>
                                    <TableCell>{moment(date).format("DD/MM/YYYY")}</TableCell>
                                    <TableCell>{flattened.name1}</TableCell>
                                    <TableCell>{flattened.name2}</TableCell>
                                    <TableCell>{flattened.name3}</TableCell>
                                </TableRow>
                            )
                        }}
                    />
                </Grid>
            </React.Fragment>
        )
    }
}
