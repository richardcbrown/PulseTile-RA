import backgroundImage from "../../version/images/Artboard.png";
import cardBackgroundImage from "../../version/images/blue-ring-01.png";
import tableHeaderImage from "../../version/images/table-header.png";

import ThemeTopbar from "../common/Topbar";
import PatientSummary from "../../core/pages/PatientSummary";

export const themeShortMenu = [
    { url: '/summary', label: 'Patient Summary' },
    { url: '/top3Things', label: 'TopThreeThings' },
    { url: '/nhs-resources', label: 'NHS Resources' },
    { url: '/careplan', label: 'My Care Plan' },
    { url: '/loop', label: 'LOOP' },
    { url: '/help-and-advice', label: 'Help and Advice' }
];

export const themeFullMenu = [
    { url: '/summary', label: 'Patient Summary' },
    { url: '/top3Things', label: 'TopThreeThings' },
    { url: '/nhs-resources', label: 'NHS Resources' },
    { url: '/careplan', label: 'My Care Plan' },
    { url: '/loop', label: 'LOOP' },
    { url: '/help-and-advice', label: 'Help and Advice' }
];

export const themeCommonElements = {
    topbar: ThemeTopbar,
    homePage: PatientSummary,
    isFooterAbsent: true,
};

export const themeImages = {
    backgroundImage: backgroundImage,
    cardBackgroundImage: cardBackgroundImage,
    tableHeaderImage: tableHeaderImage,
};
