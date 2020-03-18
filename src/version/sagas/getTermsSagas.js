import { takeEvery, put } from 'redux-saga/effects';
import { domainName, token } from "../../core/token";
import get from "lodash/get";

import { GET_TERMS_ACTION, getTermsAction } from "../actions/getTermsAction";
import { userLogout } from 'ra-core';

export const getTermsSaga = takeEvery(GET_TERMS_ACTION.REQUEST, function * (action) {
    const url = domainName + '/api/initialise/terms';
    let options = {
        method: 'GET',
        credentials: "same-origin"
    };
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers = {
        Authorization: "Bearer " + token,
        'X-Requested-With': "XMLHttpRequest",
    };
    try {

        let statusCode;

        const result = yield fetch(url, options)
            .then(res => {
                
                statusCode = res.status;

                return res.json()
            })
            .then(response => {

                if (Number(statusCode) === 400 && response.error && response.error.includes('JWT')) {
                    document.cookie = 'JSESSIONID=;';
                    document.cookie = 'META=;'
                    localStorage.removeItem('userId');
                    localStorage.removeItem('username');
                    localStorage.removeItem('role');
                    window.location.href = '/#/login';
                    return;
                }

                if (Number(statusCode) === 400 && response.error && response.error.includes('patient_notfound')) {
                    return {
                        title: 'Error',
                        message: 'You are not currently enrolled to use Helm, please try again later.'
                    };
                }

                const status = get(response, 'status', null);

                if (status === 'login') {
                    window.location.href = '/#/login';
                    return;
                }

                return response.resources;
            });

            if (result.message) {
                yield put(getTermsAction.error(result))
            } else {
                yield put(getTermsAction.success(result));
            }

    } catch (e) {
        yield put(getTermsAction.error(e));
    }
});