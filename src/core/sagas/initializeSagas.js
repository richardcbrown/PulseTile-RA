import { takeEvery, put } from "redux-saga/effects"
import get from "lodash/get"

import { domainName } from "../token"
import { INITIALIZE_ACTION, initializeAction } from "../actions/initializeAction"
import { userLogout } from "ra-core"

export default takeEvery(INITIALIZE_ACTION.REQUEST, function* (action) {
    const url = domainName + "/api/initialise"
    let options = {
        credentials: "same-origin",
    }
    if (!options.headers) {
        options.headers = new Headers({ Accept: "application/json" })
    }
    options.headers = {
        "X-Requested-With": "XMLHttpRequest",
    }
    try {
        const result = yield fetch(url, options)
            .then((res) => res.json())
            .then((response) => {
                const redirectUrl = get(response, "redirectURL", null)
                const status = get(response, "status", null)

                if (response.error) {
                    return false
                } else if (redirectUrl) {
                    window.location.href = redirectUrl
                } else if (status === "sign_terms") {
                    window.location.href = "/#/terms"
                } else if (status === "login") {
                    window.location.href = "/"
                } else {
                    window.location.href = "/#/login"
                }

                return response
            })

        if (result === false) {
            yield put(userLogout())
        } else {
            yield put(initializeAction.success(result))
        }
    } catch (e) {
        yield put(initializeAction.error(e))
    }
})
