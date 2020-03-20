import { faFileMedical, faCommentMedical, faUserMd, faAddressBook, faSearch } from '@fortawesome/free-solid-svg-icons';
import { 
    synopsisLeedsServicesAction, 
    synopsisTopThreeThingsAction, 
    synopsisNhsServicesAction, 
    synopsisCareplanAction, 
    synopsisLoopServicesAction 
} from "../actions/synopsisActions";

export const nonCoreSynopsisActions = [
    synopsisLeedsServicesAction,
    synopsisTopThreeThingsAction,
    synopsisNhsServicesAction,
    synopsisCareplanAction,
    synopsisLoopServicesAction
];

export const nonCoreSynopsisData = [
    { id: "block-top3Things", title: "Top Three Things", list: "top3Things", icon: faUserMd, isActive: true },
    { id: "block-nhsServices", title: "NHS Resources", list: "nhs-resources", icon: faAddressBook, isActive: true },
    { id: "block-leedsServices", title: "Health and Advice", list: "health-and-advice", icon: faCommentMedical, isActive: true, listOnly: true },
    { id: "block-careplan", title: "My Care Plan", list: "careplan", icon: faFileMedical, isActive: true },
    { id: "block-loop", title: "Leeds Information", list: "leeds-information", icon: faSearch, isActive: true },
];