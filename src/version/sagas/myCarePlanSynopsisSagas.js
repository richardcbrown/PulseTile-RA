import React from "react"
import { takeEvery, put } from 'redux-saga/effects';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

import { SYNOPSIS_CAREPLAN_ACTION, synopsisCareplanAction } from "../actions/synopsisActions";

export const getCareplanSaga = takeEvery(SYNOPSIS_CAREPLAN_ACTION.REQUEST, function * (action) {
    yield put(synopsisCareplanAction.success({
        heading: "careplan",
        synopsis: [
            {
                text:   (<React.Fragment>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography>Test Results</Typography>
                                <div style={{ 
                                    height: 20, 
                                    borderRadius: 10, 
                                    paddingLeft: 4, 
                                    paddingRight: 4, 
                                    color: "#FFF", 
                                    backgroundColor: "#3596f4", 
                                    fontWeight: "bold",
                                    fontSize: 12,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    lineHeight: "1px"
                                }}>
                                    <span>NEW</span>
                                </div>
                            </div>
                        </React.Fragment>),
            }, 
            {
                text: "What Matters To You"
            }, 
            {
                text: "Goals"
            }
        ]
    }));
});