import { faFileMedical, faUserMd, faAddressBook } from '@fortawesome/free-solid-svg-icons';

import { synopsisVaccinationsAction, synopsisTopThreeThingsAction, synopsisNhsServicesAction, synopsisCareplanAction } from "../actions/synopsisActions";

export const nonCoreSynopsisActions = [
    // synopsisVaccinationsAction,
    synopsisTopThreeThingsAction,
    synopsisNhsServicesAction,
    synopsisCareplanAction
];

export const nonCoreSynopsisData = [
    // { id: "block-vaccinations", title: "Vaccinations", list: "vaccinations", icon: faSyringe, isActive: true },
    { id: "block-top3Things", title: "Top Three Things", list: "top3Things", icon: faUserMd, isActive: true },
    { id: "block-careplan", title: "My Care Plan", list: "careplan", icon: faFileMedical, isActive: true },
    { id: "block-nhsServices", title: "Help and Advice", list: "help-and-advice", icon: faAddressBook, isActive: true }
];