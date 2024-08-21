import { ViewAllAssisstant, CreateAssisstant } from "pages/views/assistants";
import { CreateDataSoruces, ViewAllDataSoruces } from "pages/views/datasources";
import { CreateEmployee, EditEmployee, ViewAllEmployees } from "pages/views/employees";

const routes = [
  {
    type: "collapse",
    name: "users",
    key: "users",
    icon: "people",
    collapse: [
      {
        name: "view_users",
        key: "users",
        route: "/users",
        icon: "table_view",
        component: <ViewAllEmployees />,
      },
      {
        name: "add_user",
        key: "users-add",
        route: "/users/add",
        icon: "add",
        component: <CreateEmployee />,
      },
      {
        name: "user_details",
        key: "user-details",
        route: "/users/:id",
        hidden: true,
        component: <EditEmployee />,
      },
    ],
  },
  {
    type: "collapse",
    name: "assistants",
    key: "assistants",
    icon: "people",
    collapse: [
      {
        name: "view_assistants",
        key: "assistants",
        route: "/assistants",
        icon: "table_view",
        component: <ViewAllAssisstant />,
      },
      {
        name: "add_assistants",
        key: "assistants-add",
        route: "/assistants/add",
        icon: "add",
        component: <CreateAssisstant />,
      },
      {
        name: "assistants_details",
        key: "assistants-details",
        route: "/assistants/:id",
        hidden: true,
        component: <CreateAssisstant />,
      },
    ],
  },
  {
    type: "collapse",
    name: "datasoruces",
    key: "datasoruces",
    icon: "people",
    collapse: [
      {
        name: "view_datasoruces",
        key: "datasoruces",
        route: "/datasoruces",
        icon: "table_view",
        component: <ViewAllDataSoruces />,
      },
      {
        name: "add_datasoruces",
        key: "datasoruces-add",
        route: "/datasoruces/add",
        icon: "add",
        component: <CreateDataSoruces />,
      },
      {
        name: "datasoruces_details",
        key: "datasoruces-details",
        route: "/datasoruces/:id",
        hidden: true,
        component: <CreateDataSoruces />,
      },
    ],
  },
];

export default routes;
