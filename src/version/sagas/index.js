import createFhirSynopsisSaga, { createFhirBundleSaga, createFhirResourceSaga } from "./fhirSaga"
import { SYNOPSIS_TOP_THREE_THINGS_ACTION, synopsisTopThreeThingsAction } from "../actions/synopsisActions"
import { GET_FHIR_RESOURCES_ACTION, getFhirResourcesAction } from "../actions/getFhirResourcesAction"
import { CREATE_FHIR_RESOURCE_ACTION, createFhirResourceAction } from "../actions/createFhirResourceAction"

import { acceptTermsSaga } from "./acceptTermsSagas"
import { getTermsSaga } from "./getTermsSagas"
import { checkTermsSaga } from "./checkTermsSagas"
import { topThreeThingsSaga } from "./topThreeThingsSagas"
import { getNhsServicesSaga } from "./nhsServicesSagas"
import { getLeedsServicesSaga } from "./leedsServicesSagas"
import { getLoopServicesSaga } from "./loopSagas"
import { getPreferencesSaga, savePreferencesSaga } from "./preferencesSagas"

/**
 * This componenr returns array of version sagas
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @return {array}
 */
export default [
  createFhirSynopsisSaga(
    SYNOPSIS_TOP_THREE_THINGS_ACTION,
    synopsisTopThreeThingsAction,
    "Composition",
    "_sort=date&_count=1&type=https://fhir.myhelm.org/STU3/ValueSet/phr-composition-type-1|T3T"
  ),
  createFhirBundleSaga(GET_FHIR_RESOURCES_ACTION, getFhirResourcesAction),
  createFhirResourceSaga(CREATE_FHIR_RESOURCE_ACTION, createFhirResourceAction),
  acceptTermsSaga,
  getTermsSaga,
  checkTermsSaga,
  topThreeThingsSaga,
  getNhsServicesSaga,
  getLeedsServicesSaga,
  getLoopServicesSaga,
  getPreferencesSaga,
  savePreferencesSaga,
]
