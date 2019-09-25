// NON-CORE PLUGINS CONFIGURATION LIST

// TOP THREE THINGS
import TopThreeThingsCreate from "../plugins/TopThreeThings/TopThreeThingsCreate";

// LEEDS REPOSITORY
import  { DirectoryList } from "../plugins/Directory/DirectoryList";
import Directory from "../pages/Directory";

export default [
    {
        name: "top3Things",
        label: "Top Three Things",
        list: TopThreeThingsCreate
    },
    {
        name: "directory",
        label: "Leeds Directory",
        list: Directory
    }
];
