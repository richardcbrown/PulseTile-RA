import React from "react"
import { takeEvery, put } from 'redux-saga/effects';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import { SYNOPSIS_LOOPSERVICES_ACTION, synopsisLoopServicesAction } from "../actions/synopsisActions";

export const getLoopServicesSaga = takeEvery(SYNOPSIS_LOOPSERVICES_ACTION.REQUEST, function * (action) {
    yield put(synopsisLoopServicesAction.success({
        heading: "loop",
        synopsis: [
            {
                text:   (<Typography>
                            <Link to="/loop/search-whole-directory" color="inherit" aria-label="Search Whole Directory">Search Whole Directory</Link>
                        </Typography>)
            }, 
            {
                text:   (<Typography>
                            <Link to="/loop/search-diabetes" color="inherit" aria-label="Search Diabetes">Search Diabetes</Link>
                        </Typography>)
            }
        ]
    }));
});