import contrastMode from "./contrastModeReducer";
import selectedFeedsList from "./selectedFeedsReducer";
import terms from "./termsReducer";
import {
    SYNOPSIS_TOP_THREE_THINGS_ACTION,
    SYNOPSIS_VACCINATIONS_ACTION
} from "../actions/synopsisActions";

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
    contrastMode,
    selectedFeedsList,
    terms
};
