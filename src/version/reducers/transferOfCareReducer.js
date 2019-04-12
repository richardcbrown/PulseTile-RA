import get from "lodash/get";

import { TRANSFER_OF_CARE_ACTION } from "../actions/transferOfCareAction";

const initialState = {
    data: false,
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TRANSFER_OF_CARE_ACTION.CREATE:
        case TRANSFER_OF_CARE_ACTION.REQUEST:
            return {
                ...state,
                loading: false,
                data: state,
            };
        case TRANSFER_OF_CARE_ACTION.SUCCESS:
            return {
                ...state,
                loading: false,
                data: get(action, 'data', []),
            };
        case TRANSFER_OF_CARE_ACTION.LIST:
            return {
                ...state,
                loading: false,
                list: get(action, 'data', []),
            };
        case TRANSFER_OF_CARE_ACTION.FAILURE:
            return {
                ...state,
                loading: false,
                error: get(action, "error", null),
            };
        default:
            return state;
    }
}