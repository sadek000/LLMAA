// Components
import { withDashboardLayout } from "components";

// Pages
import ViewAllPage from "./pages/ViewAll";
import CreatePage from "./pages/CreateAssistant";

export const ViewAllAssisstant: React.FC = withDashboardLayout(ViewAllPage);
export const CreateAssisstant: React.FC = withDashboardLayout(CreatePage);
// export const EditEmployee: React.FC = withDashboardLayout(EditPage);
