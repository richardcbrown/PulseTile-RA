import { takeEvery, put } from 'redux-saga/effects';
import get from "lodash/get";

import { domainName, token } from "../../core/token";
import { ACCEPT_TERMS_ACTION, acceptTermsAction } from "../actions/acceptTermsAction";
import { userLogout } from 'ra-core';

export const acceptTermsSaga = takeEvery(ACCEPT_TERMS_ACTION.REQUEST, function*(action) {
    const url = domainName + '/api/initialise/terms/accept';
    let options = {
        method: 'POST',
        body: JSON.stringify(action.data)
    };
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers = {
        Authorization: "Bearer " + token,
        'X-Requested-With': "XMLHttpRequest",
        'Content-Type': 'application/json'
    };
    try {
        const result = yield fetch(url, options).then(res => res.json())
            .then(response => {

                if (response.status !== 200) {
                    return false;
                }

                const redirectUrl = get(response, 'redirectURL', null);
                const status = get(response, 'status', null);

                if (redirectUrl) {
                    window.location.href = redirectUrl;
                    return response
                } else if (status === 'login') {
                    window.location.href = '/#/login';
                }
                
                return response;
            });

        if (result === false) {
            yield put(userLogout());
        } else {    
            yield put(acceptTermsAction.success(result));
        }
    } catch(e) {
        yield put(acceptTermsAction.error(e))
    }
});