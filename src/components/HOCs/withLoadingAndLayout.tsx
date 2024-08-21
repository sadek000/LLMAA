import { withDashboardLayout } from "components";
import { Loading } from "pages/components";
import React from "react";

// Define the props expected by the HOC
type WithLoadingAndLayoutProps = {
  isLoading: boolean;
};

// HOC that wraps the provided component in a DashboardLayout and conditionally shows a loading screen
function withLoadingAndLayout<T>(
  Component: React.ComponentType<T>
): React.FC<T & WithLoadingAndLayoutProps> {
  // Wrap the component with withDashboardLayout HOC
  const ComponentWithLayout = withDashboardLayout(Component);

  // Return a new component that accepts isLoading as part of its props
  return ({ isLoading, ...props }: WithLoadingAndLayoutProps & T) => {
    // Render the Loading component if isLoading is true
    if (isLoading) return <Loading />;

    // Spread the remaining props on the original component
    return <ComponentWithLayout {...(props as T)} />;
  };
}

export default withLoadingAndLayout;

// Usage:
// Assuming useEmployeeData is a hook that returns an isLoading state among other data,
// and ViewAllPage is a component that should be rendered when not loading.

// import withLoadingAndLayout from 'path/to/withLoadingAndLayout';
// const ViewAll = withLoadingAndLayout(ViewAllPage);
// Then in the parent component you could use it like this:
// const employeeData = useEmployeeData();
// <ViewAll isLoading={employeeData.isLoading} {...otherProps} />
