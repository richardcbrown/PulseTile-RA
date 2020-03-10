import { faFileMedical, faUserMd } from '@fortawesome/free-solid-svg-icons';

import { synopsisVaccinationsAction, synopsisTopThreeThingsAction } from "../actions/synopsisActions";

export const nonCoreSynopsisActions = [
    // synopsisVaccinationsAction,
    synopsisTopThreeThingsAction,
];

export const nonCoreSynopsisData = [
    // { id: "block-vaccinations", title: "Vaccinations", list: "vaccinations", icon: faSyringe, isActive: true },
    { id: "block-top3Things", title: "Top Three Things", list: "top3Things", icon: faUserMd, isActive: true },
    { id: "block-careplan", title: "My Care Plan", list: "careplan", icon: faFileMedical, isActive: true, hideList: true },
];