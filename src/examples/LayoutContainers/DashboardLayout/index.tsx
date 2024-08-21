import { useEffect, ReactNode } from "react";

// react-router-dom components
import { useLocation } from "react-router-dom";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";

// ALDR Tech Dashboard context
import { directionState, layoutState, miniSidenavState } from "state/atoms";
import { useRecoilState, useRecoilValue } from "recoil";

function DashboardLayout({ children }: { children: ReactNode }): JSX.Element {
  const [layout, setLayout] = useRecoilState(layoutState);
  const miniSidenav = useRecoilValue(miniSidenavState);
  const direction = useRecoilValue(directionState);
  const { pathname } = useLocation();

  useEffect(() => {
    // Only update layout state if it's different to avoid unnecessary re-renders
    if (layout !== "dashboard") {
      setLayout("dashboard");
    }
  }, [pathname, layout, setLayout]);

  return (
    <ATBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        p: 3,
        position: "relative",

        [breakpoints.up("xl")]: {
          marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      {children}
    </ATBox>
  );
}

export default DashboardLayout;
