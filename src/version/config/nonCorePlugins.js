// NON-CORE PLUGINS CONFIGURATION LIST

// VACCINATIONS
import VaccinationsList from "../plugins/Vaccinations/VaccinationsList";

// TOP THREE THINGS
import TopThreeThingsCreate from "../plugins/TopThreeThings/TopThreeThingsCreate";

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
        name: "nhs",
        lable: "NHS Widgets",
        list: NhsWidgets
    }
];
