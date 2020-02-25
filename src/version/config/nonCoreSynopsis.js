import { faSyringe, faUserMd, faAddressBook } from '@fortawesome/free-solid-svg-icons';

import { synopsisVaccinationsAction, synopsisTopThreeThingsAction, synopsisNhsServicesAction } from "../actions/synopsisActions";

export const nonCoreSynopsisActions = [
    // synopsisVaccinationsAction,
    synopsisTopThreeThingsAction,
    synopsisNhsServicesAction
];

export const nonCoreSynopsisData = [
    // { id: "block-vaccinations", title: "Vaccinations", list: "vaccinations", icon: faSyringe, isActive: true },
    { id: "block-top3Things", title: "Top Three Things", list: "top3Things", icon: faUserMd, isActive: true },
    { id: "block-nhsServices", title: "Help and Advice", list: "help-and-advice", icon: faAddressBook, isActive: true }
];