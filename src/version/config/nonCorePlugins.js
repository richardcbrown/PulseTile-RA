// NON-CORE PLUGINS CONFIGURATION LIST

// VACCINATIONS
import VaccinationsList from "../plugins/Vaccinations/VaccinationsList";

// TOP THREE THINGS
import TopThreeThingsCreate from "../plugins/TopThreeThings/TopThreeThingsCreate";

// NHS WIDGETS
import NhsWidgets from "../plugins/NhsWidgets/NhsWidgets";
// CarePlan
import CarePlanView from "../plugins/CarePlan/CarePlanView";

export default [
    {
        name: "vaccinations",
        label: "Vaccinations",
        list: VaccinationsList,
    },
    {
        name: "top3Things",
        label: "Top Three Things",
        list: TopThreeThingsCreate
    },
    {
        name: "nhs-resources",
        label: "NHS Resources",
        list: NhsWidgets,
    },
    {
        name: "CarePlan",
        label: "My Care Plan",
        list: CarePlanView
    }
];
