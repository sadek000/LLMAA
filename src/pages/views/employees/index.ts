// Components
import { withDashboardLayout } from "components";

// Pages
import ViewAllPage from "./pages/ViewAll";
import CreatePage from "./pages/CreateEmployee";
import EditPage from "./pages/EditEmployee";

export const ViewAllEmployees: React.FC = withDashboardLayout(ViewAllPage);
export const CreateEmployee: React.FC = withDashboardLayout(CreatePage);
export const EditEmployee: React.FC = withDashboardLayout(EditPage);
