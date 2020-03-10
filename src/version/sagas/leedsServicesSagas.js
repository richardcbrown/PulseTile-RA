import React from "react";
import { takeEvery, put } from 'redux-saga/effects';

import { SYNOPSIS_LEEDSSERVICES_ACTION, synopsisLeedsServicesAction } from "../actions/synopsisActions";

export const getLeedsServicesSaga = takeEvery(SYNOPSIS_LEEDSSERVICES_ACTION.REQUEST, function * (action) {
    yield put(synopsisLeedsServicesAction.success({
        heading: "Leeds",
        synopsis: [
            {
                text: <a href="https://www.commlinks.co.uk/?service=linking-leeds" noopener noreferrer target="_blank">Linking Leeds</a>
            }, 
            {
                text: <a href="https://www.mindwell-leeds.org.uk" noopener noreferrer target="_blank">Mindwell</a>
            }, 
            {
                text: <a href="https://www.mindmate.org.uk" noopener noreferrer target="_blank">Mindmate</a>
            },
            {
                text: <a href="https://leeds.omnitherapy.org" noopener noreferrer target="_blank">Omnihealth</a>
            }
        ]
    }));
});