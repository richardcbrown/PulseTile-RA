// NON-CORE PLUGINS CONFIGURATION LIST

// TOP THREE THINGS
import TopThreeThingsCreate from "../plugins/TopThreeThings/TopThreeThingsCreate";

// LEEDS REPOSITORY
import  { DirectoryList } from "../plugins/Directory/DirectoryList";
import Directory from "../pages/Directory";
// NHS WIDGETS
import NhsWidgets from "../plugins/NhsWidgets/NhsWidgets";

export default [
    {
        name: "top3Things",
        label: "Top Three Things",
        list: TopThreeThingsCreate
    },
    {
        name: "loop",
        label: "LOOP",
        list: Directory,
    },
    {
        name: "nhs-resources",
        label: "NHS Resources",
        list: NhsWidgets
    }
];
