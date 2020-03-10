import get from "lodash/get";
import { takeEvery, put } from 'redux-saga/effects';

import { token, domainName } from "../../core/token";
import { httpErrorAction } from '../../core/actions/httpErrorAction';

let responseInfo = {};

export default function createCustomSagas(actionName, actionType, pluginName) {
    return takeEvery(actionName.REQUEST, function*(action) {
        const patientId = localStorage.getItem('patientId') ? localStorage.getItem('patientId') : localStorage.getItem('userId');
        
        let url = domainName + '/api/careplan/' + patientId;
        let options = {};
        options.method = "GET";
        if (!options.headers) {
            options.headers = new Headers({Accept: 'application/json'});
        }
        options.headers = {
            Authorization: "Bearer " + token,
            'X-Requested-With': "XMLHttpRequest",
        };

        try {
            const result = yield fetch(url, options)
                .then(res => {
                    responseInfo.status = get(res, 'status', null);
                    return res.json()
                })
                .then(res => {
                    if (responseInfo.status !== 200) {
                        responseInfo.errorMessage = get(res, 'error', null);
                        return false;
                    }

                    const status = get(res, 'status', null);

                    if (status && status === 'sign_terms') {
                        window.location.href = '/#/login';
                        return null;
                    }

                    return res;
                });

            if (responseInfo.status === 200) {
                yield put(actionType.success(result))
            } else {
                yield put(httpErrorAction.save({
                    status: responseInfo.status,
                    message: responseInfo.errorMessage
                }));
            }

        } catch(e) {
            yield put(actionType.error(e))
        }
    });
}

export function createCarePlanPutSagas(actionName, actionType, pluginName) {
    return takeEvery(actionName.REQUEST, function*(action) {
        const patientId = localStorage.getItem('patientId') ? localStorage.getItem('patientId') : localStorage.getItem('userId');
        
        let url = domainName + '/api/careplan/save/' + patientId;
        let options = {};
        options.method = "PUT";
        if (!options.headers) {
            options.headers = new Headers({Accept: 'application/json'});
        }
        options.headers = {
            Authorization: "Bearer " + token,
            'X-Requested-With': "XMLHttpRequest",
            'Content-Type': "application/json"
        };

        options.body = JSON.stringify(action.data);

        try {
            const result = yield fetch(url, options)
                .then(res => {
                    responseInfo.status = get(res, 'status', null);
                    return res.json()
                })
                .then(res => {
                    if (responseInfo.status !== 200) {
                        responseInfo.errorMessage = get(res, 'error', null);
                        return false;
                    }

                    const status = get(res, 'status', null);

                    if (status && status === 'sign_terms') {
                        window.location.href = '/#/login';
                        return null;
                    }

                    return res;
                });

            if (responseInfo.status === 200) {
                yield put(actionType.success(result))
            } else {
                yield put(httpErrorAction.save({
                    status: responseInfo.status,
                    message: responseInfo.errorMessage
                }));
            }

        } catch(e) {
            yield put(actionType.error(e))
        }
    });
}