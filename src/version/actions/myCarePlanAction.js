import { createRequestTypes } from "../../core/actions/functions";

export const MY_CARE_PLAN_ACTION = createRequestTypes('MY_CARE_PLAN_ACTION');
export const SAVE_MY_CARE_PLAN_ACTION = createRequestTypes('SAVE_MY_CARE_PLAN_ACTION');

export const myCarePlanAction = {
    request: data => ({ type: MY_CARE_PLAN_ACTION.REQUEST, data }),
    success: data => ({ type: MY_CARE_PLAN_ACTION.SUCCESS, data }),
    error:   error => ({ type: MY_CARE_PLAN_ACTION.FAILURE, error }),
};

export const saveMyCarePlanAction = {
    request: data => ({ type: SAVE_MY_CARE_PLAN_ACTION.REQUEST, data }),
    success: data => ({ type: SAVE_MY_CARE_PLAN_ACTION.SUCCESS, data }),
    error:   error => ({ type: SAVE_MY_CARE_PLAN_ACTION.FAILURE, error }),
};