// NON-CORE PLUGINS CONFIGURATION LIST

// TOP THREE THINGS
import TopThreeThingsCreate from "../plugins/TopThreeThings/TopThreeThingsCreate";

// NHS WIDGETS
import NhsWidgets from "../plugins/NhsWidgets/NhsWidgets";
// CarePlan
import CarePlanView from "../plugins/CarePlan/CarePlanView";
// LEEDS REPOSITORY
import Directory from "../pages/Directory";

export default [
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
    },
    {
        name: "loop",
        label: "LOOP",
        list: Directory
    }
];
