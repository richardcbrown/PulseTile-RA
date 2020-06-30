import createSynopsisSagas from "../../core/sagas/createSynopsisSagas"
import createFhirSynopsisSaga, { createFhirBundleSaga } from "./fhirSaga"
import { SYNOPSIS_VACCINATIONS_ACTION, synopsisVaccinationsAction,
    SYNOPSIS_TOP_THREE_THINGS_ACTION, synopsisTopThreeThingsAction,
} from "../actions/synopsisActions";
import { GET_FHIR_RESOURCES_ACTION, getFhirResourcesAction } from "../actions/getFhirResourcesAction"

import { acceptTermsSaga } from "./acceptTermsSagas";
import { getTermsSaga } from "./getTermsSagas";
import { checkTermsSaga } from "./checkTermsSagas";
import { topThreeThingsSaga } from "./topThreeThingsSagas";
import { getNhsServicesSaga } from "./nhsServicesSagas";
import { getLeedsServicesSaga } from "./leedsServicesSagas";
import { getLoopServicesSaga } from "./loopSagas";

/**
 * This componenr returns array of version sagas
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @return {array}
 */
export default [
    createSynopsisSagas(SYNOPSIS_VACCINATIONS_ACTION, synopsisVaccinationsAction, "vaccinations"),
    createFhirSynopsisSaga(
        SYNOPSIS_TOP_THREE_THINGS_ACTION,
        synopsisTopThreeThingsAction,
        "Composition",
        "_sort=-date&_count=1&type=https://fhir.myhelm.org/STU3/ValueSet/phr-composition-type-1|T3T"
    ),
    createFhirBundleSaga(GET_FHIR_RESOURCES_ACTION, getFhirResourcesAction),
    acceptTermsSaga,
    getTermsSaga,
    checkTermsSaga,
    topThreeThingsSaga,
    getNhsServicesSaga,
    getLeedsServicesSaga,
    getLoopServicesSaga
];
