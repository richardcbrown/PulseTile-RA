import React from 'react';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import moment from 'moment'
import { Typography } from '@material-ui/core'

export const CarePlanResultsTable = ({ carePlanTableData }) => {

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell style={{ paddingLeft: 8, paddingRight: 8 }}>
                        Result
                    </TableCell>
                    <TableCell style={{ paddingLeft: 8, paddingRight: 8 }}>
                        Year
                    </TableCell>
                    <TableCell style={{ paddingLeft: 8, paddingRight: 8 }}>
                        Quarter
                    </TableCell>
                    <TableCell style={{ paddingLeft: 8, paddingRight: 8 }}>
                        Month
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    carePlanTableData.map((ctd, index) => {
                        const { value, date } = ctd;
                        
                        const momentDate = moment(date);

                        return (
                            <TableRow key={index}>
                                <TableCell style={{ paddingLeft: 8, paddingRight: 8 }}>
                                    <Typography>
                                        { value }
                                    </Typography>
                                </TableCell>
                                <TableCell style={{ paddingLeft: 8, paddingRight: 8 }}>
                                    <Typography>
                                        { momentDate.format("YYYY") }
                                    </Typography>
                                </TableCell>
                                <TableCell style={{ paddingLeft: 8, paddingRight: 8 }}>
                                    <Typography>
                                        Qtr { momentDate.quarter() }
                                    </Typography>
                                </TableCell>
                                <TableCell style={{ paddingLeft: 8, paddingRight: 8 }}>
                                    <Typography>
                                        { momentDate.format("MMMM") }
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    )
}