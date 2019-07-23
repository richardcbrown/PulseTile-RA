// NON-CORE PLUGINS CONFIGURATION LIST

// VACCINATIONS
import VaccinationsList from "../plugins/Vaccinations/VaccinationsList";

// TOP THREE THINGS
import TopThreeThingsCreate from "../plugins/TopThreeThings/TopThreeThingsCreate";

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
];
