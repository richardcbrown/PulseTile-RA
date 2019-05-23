import { takeEvery, put } from 'redux-saga/effects';
import { domainName, token } from "../../core/token";

import { GET_TERMS_ACTION, getTermsAction } from "../actions/getTermsAction";
import { userLogout } from 'ra-core';

export const getTermsSaga = takeEvery(GET_TERMS_ACTION.REQUEST, function * (action) {
    const url = domainName + '/api/initialise/terms';
    let options = {
        method: 'GET'
    };
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers = {
        Authorization: "Bearer " + token,
        'X-Requested-With': "XMLHttpRequest",
    };
    try {
        const result = yield fetch(url, options)
            .then(res => {
                
                if (res.status !== 200) {
                    return false;
                }

                return res.json()
            })
            .then(response => {

                return response ? response.policies : response;
            });

        if (result === false) {
            yield put(userLogout());
        } else {    
            yield put(getTermsAction.success(result));
        }

    } catch (e) {
        yield put(getTermsAction.error(e));
    }
});