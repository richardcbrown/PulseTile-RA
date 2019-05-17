// NON-CORE PLUGINS CONFIGURATION LIST

// VACCINATIONS
import VaccinationsList from "../plugins/Vaccinations/VaccinationsList";

// TOP THREE THINGS
import TopThreeThingsList from "../plugins/TopThreeThings/TopThreeThingsList";

import TopThreeThingsDashboard from "../plugins/TopThreeThings/TopThreeThingsDashboard";
import TopThreeThingsEdit from "../plugins/TopThreeThings/TopThreeThingsEdit";
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
