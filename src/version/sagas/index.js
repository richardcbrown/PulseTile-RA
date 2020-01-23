import createSynopsisSagas from "../../core/sagas/createSynopsisSagas";
import {
    SYNOPSIS_VACCINATIONS_ACTION, synopsisVaccinationsAction,
    SYNOPSIS_TOP_THREE_THINGS_ACTION, synopsisTopThreeThingsAction,
} from "../actions/synopsisActions";
import { acceptTermsSaga } from "./acceptTermsSagas";
import { getTermsSaga } from "./getTermsSagas";
import { checkTermsSaga } from "./checkTermsSagas";
import { topThreeThingsSaga } from "./topThreeThingsSagas";
import { getNhsServicesSaga } from "./nhsServicesSagas";

/**
 * This componenr returns array of version sagas
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @return {array}
 */
export default [
    createSynopsisSagas(SYNOPSIS_VACCINATIONS_ACTION, synopsisVaccinationsAction, 'vaccinations'),
    createSynopsisSagas(SYNOPSIS_TOP_THREE_THINGS_ACTION, synopsisTopThreeThingsAction, 'top3Things'),
    acceptTermsSaga,
    getTermsSaga,
    checkTermsSaga,
    topThreeThingsSaga,
    getNhsServicesSaga
];
