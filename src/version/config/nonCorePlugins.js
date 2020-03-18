// NON-CORE PLUGINS CONFIGURATION LIST

// VACCINATIONS
import VaccinationsList from "../plugins/Vaccinations/VaccinationsList";

// TOP THREE THINGS
import TopThreeThingsCreate from "../plugins/TopThreeThings/TopThreeThingsCreate";

// CarePlan
import CarePlanView from "../plugins/CarePlan/CarePlanView";
// NHS WIDGETS
import NhsWidgets from "../plugins/NhsWidgets/NhsWidgets";

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
        name: "CarePlan",
        label: "My Care Plan",
        list: CarePlanView
    },
    {
        name: "help-and-advice",
        label: "Help and Advice",
        list: NhsWidgets
    }
];
