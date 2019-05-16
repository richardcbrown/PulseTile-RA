import { GET_TERMS_ACTION } from "../actions/getTermsAction";

const initialState = {
    data: [],
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_TERMS_ACTION.REQUEST:
            return {
                ...state,
                loading: true,
                data: state.data,
            };
        case GET_TERMS_ACTION.SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.data
            };
        default:
            return state;
    }
}