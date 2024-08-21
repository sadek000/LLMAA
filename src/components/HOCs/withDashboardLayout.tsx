import { ComponentType } from "react";
import { DashboardNavbar } from "components";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

/**
 * HOC to wrap a component within DashboardLayout, DashboardNavbar, and Footer.
 * @param WrappedComponent The component to be wrapped.
 * @returns A new component that renders the WrappedComponent within the layout.
 */
function withDashboardLayout<T>(WrappedComponent: ComponentType<T>) {
  // Return a functional component
  return function DashboardPage(props: T) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        {/* Pass all props to the WrappedComponent */}
        <WrappedComponent {...props} />
        <Footer />
      </DashboardLayout>
    );
  };
}

export default withDashboardLayout;
