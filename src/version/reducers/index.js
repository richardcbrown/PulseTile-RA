import contrastMode from "./contrastModeReducer";
import selectedFeedsList from "./selectedFeedsReducer";
import terms from "./termsReducer";
import {
    SYNOPSIS_TOP_THREE_THINGS_ACTION,
    SYNOPSIS_VACCINATIONS_ACTION,
    SYNOPSIS_NHSSERVICES_ACTION,
    SYNOPSIS_LEEDSSERVICES_ACTION,
    SYNOPSIS_CAREPLAN_ACTION,
    SYNOPSIS_LOOPSERVICES_ACTION
} from "../actions/synopsisActions";
import { MY_CARE_PLAN_ACTION } from "../actions/myCarePlanAction";
import createCustomReducer from "../../core/reducers/createCustomReducer";

/**
 * This component returns version reducers
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @return {shape}
 */
export default {
    vaccinationsSynopsis: createCustomReducer(SYNOPSIS_VACCINATIONS_ACTION, "data.synopsis"),
    top3ThingsSynopsis: createCustomReducer(SYNOPSIS_TOP_THREE_THINGS_ACTION, "data.synopsis"),
    "nhs-resourcesSynopsis": createCustomReducer(SYNOPSIS_NHSSERVICES_ACTION, "data.synopsis"),
    "health-and-adviceSynopsis": createCustomReducer(SYNOPSIS_LEEDSSERVICES_ACTION, "data.synopsis"),
    myCarePlan: createCustomReducer(MY_CARE_PLAN_ACTION, "data"),
    careplanSynopsis: createCustomReducer(SYNOPSIS_CAREPLAN_ACTION, "data.synopsis"),
    "loopSynopsis": createCustomReducer(SYNOPSIS_LOOPSERVICES_ACTION, "data.synopsis"),
    contrastMode,
    selectedFeedsList,
    terms
};
