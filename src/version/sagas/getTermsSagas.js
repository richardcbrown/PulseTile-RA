import { takeEvery, put } from 'redux-saga/effects';
import get from "lodash/get";

import { domainName, token } from "../../core/token";
import { ACCEPT_TERMS_ACTION, acceptTermsAction } from "../actions/acceptTermsAction";

import { GET_TERMS_ACTION, getTermsAction } from "../actions/getTermsAction";

// export const initialiseSuccessSaga = takeEvery(INITIALIZE_ACTION.SUCCESS, function*(action) {
//     try {
        
//         if (action.data.status === 'sign_terms') {
//             window.location.href = '/#/terms';

//             yield put(acceptTermsAction.request());
//         } else {

//             yield put(acceptTermsAction.success())
//         }
//     } catch(e) {
//         yield put(acceptTermsAction.error(e));
//     }
// });

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
            .then(res => res.json())
            .then(response => {
                // const redirectUrl = get(response, 'redirectURL', null);
                // const status = get(response, 'status', null);

                // if (redirectUrl) {
                //     window.location.href = redirectUrl;
                //     return response
                // } else if (status === 'login') {
                //     window.location.href = '/#/login';
                // }
                return response.policies;
            });

        yield put(getTermsAction.success(result));
    } catch (e) {
        yield put(getTermsAction.error(e));
    }
});