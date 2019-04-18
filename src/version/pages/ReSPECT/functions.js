import get from "lodash/get";
import moment from "moment";

import { STATUS_INCOMPLETE, STATUS_IN_PROGRESS, STATUS_COMPLETED, TOTAL_ROWS_NUMBER, DATE_FORMAT } from "./statuses";
import sections from "./sections";

export function getAuthorName() {
    return localStorage.getItem('username') ? localStorage.getItem('username') : '-';
}

export const getSectionStatus = (data, totalNumber) => {
    const filledNumber = Object.values(data).length;
    const filledRation = filledNumber / totalNumber;
    return (filledRation > 0.5) ? STATUS_COMPLETED : STATUS_INCOMPLETE;
};

/**
 * This function returns the object with filled values
 * If user completes sections - it returns store information about section
 * If user reviewed versions - it returns store information about version
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}   sectionsInfo
 * @param {shape}   latestVersionInfo
 * @param {shape}   sectionStoreData
 * @param {string}  sectionName
 * @param {boolean} isVersionInfo
 * @param {shape}   defaultValues
 * @return {shape}
 */
export function getFilledValues(sectionsInfo, latestVersionInfo, sectionStoreData, sectionName, isVersionInfo, defaultValues) {
    const latestStoreData = get(latestVersionInfo, sectionName, null);
    let result = Object.assign({}, defaultValues, latestStoreData);
    if (isVersionInfo) {
        const versionStoreData = get(sectionsInfo, sectionName, null);
        result = Object.assign({}, defaultValues, versionStoreData);
    } else if (sectionStoreData) {
        result = Object.assign({}, defaultValues, sectionStoreData);
    }

    return result;
}

export function getStateData(props, toSearch, defaultValue = null) {
    const { isVersionInfo, sectionsInfo, latestVersionInfo } = props;
    let result = get(latestVersionInfo, toSearch, defaultValue);
    if (isVersionInfo) {
        result = get(sectionsInfo, toSearch, defaultValue);
    } else if (get(props, toSearch, null)) {
        result = get(props, toSearch, defaultValue);
    }
    return result;
}

export function getInitialRangeLine(props, toSearch, leftValue, rightValue, defaultValue = null) {
    const { isVersionInfo, sectionsInfo, latestVersionInfo } = props;
    let result = get(latestVersionInfo, toSearch, defaultValue);
    if (isVersionInfo) {
        result = get(sectionsInfo, toSearch, defaultValue);
    } else if (get(props, toSearch, null)) {
        result = get(props, toSearch, defaultValue);
    }
    let focusValue = 50;
    if (result === leftValue) {
        focusValue = 5;
    } else if (result === rightValue) {
        focusValue = 95;
    }
    return [focusValue];
}

export function getVersionData(sectionName, formData, otherSectionsInfo) {
    return {
        sections: {
            personalDetails: (sectionName === 'personalDetails')
                ? formData
                : get(otherSectionsInfo, 'personalDetails', {
                    nhsNumber: null,
                    dateCompleted: null,
                    preferredName: null,
                    firstName: null,
                    surname: null,
                    streetAddress: null,
                    addressSecondLine: null,
                    city: null,
                    county: null,
                    postCode: null,
                    country: null,
                    birthDate: null,
                    status: null
                }),
            summaryInformation: (sectionName === 'summaryInformation')
                ? formData
                : get(otherSectionsInfo, 'summaryInformation', {
                    dateCompleted: null,
                    summary: null,
                    details: null,
                    status: null,
                }),
            personalPreferences: (sectionName === 'personalPreferences')
                ? formData
                : get(otherSectionsInfo, 'personalPreferences', {
                    dateCompleted: null,
                    preferencesText: null,
                    preferencesValue: null,
                    status: null
                }),
            clinicalRecommendations: (sectionName === 'clinicalRecommendations')
                ? formData
                : get(otherSectionsInfo, 'clinicalRecommendations', {
                    clinicalSignatureFirst: null,
                    clinicalSignatureSecond: null,
                    dateCompleted: null,
                    clinicalGuidance: null,
                    cprValue: null,
                    focusValue: null,
                    status: null,
                }),


            capacityAndRepresentation: (sectionName === 'capacityAndRepresentation')
                ? formData
                : get(otherSectionsInfo, 'capacityAndRepresentation', {
                    dateCompleted: null,
                    capacityFirst: null,
                    capacitySecond: null,
                    status: null,
                }),
            involvement: (sectionName === 'involvement')
                ? formData
                : get(otherSectionsInfo, 'involvement', {
                    dateCompleted: null,
                    records: null,
                    variant: null,
                    status: null,
                }),
            clinicalSignatures: (sectionName === 'clinicalSignatures')
                ? formData
                : get(otherSectionsInfo, 'clinicalSignatures', {
                    dateCompleted:null,
                    signaturesArray: null,
                    status: null,
                }),
            emergencyContacts: (sectionName === 'emergencyContacts')
                ? formData
                : get(otherSectionsInfo, 'emergencyContacts', {
                    dateCompleted: null,
                    contactsArray: null,
                    status: null,
                }),
            confirmation: (sectionName === 'confirmation')
                ? formData
                : get(otherSectionsInfo, 'confirmation', {
                    dateCompleted: null,
                    confirmationsArray: null,
                    status: null,
                }),
            emergencyView: (sectionName === 'emergencyView')
                ? formData
                : get(otherSectionsInfo, 'emergencyView', {
                    status: null,
                    dateCompleted: null,
                    author: null,
                }),
        },
        status: getVersionStatus(otherSectionsInfo),
        dateCompleted: moment().format(DATE_FORMAT),
        author: localStorage.getItem('username'),
    }
}

function getVersionStatus(sectionsInfo) {
    let completedSectionsCount = 0;
    sections.forEach(item => {
        if (get(sectionsInfo, [item.name, 'status'], null) === STATUS_COMPLETED) {
            completedSectionsCount++;
        }
    });
    let result = STATUS_INCOMPLETE;
    if (completedSectionsCount === TOTAL_ROWS_NUMBER) {
        result = STATUS_COMPLETED;
    } else if (completedSectionsCount > 0) {
        result = STATUS_IN_PROGRESS;
    }
    return result;
}