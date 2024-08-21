import { withDashboardLayout } from "components";
import ViewAllPage from "./pages/ViewAll";
import CreatePage from "./pages/CreateDataSources";
export const ViewAllDataSoruces: React.FC = withDashboardLayout(ViewAllPage);
export const CreateDataSoruces: React.FC = withDashboardLayout(CreatePage);
