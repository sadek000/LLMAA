import { useEffect, ReactNode } from "react";

// react-router-dom components
import { useLocation } from "react-router-dom";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";
import { useRecoilState } from "recoil";
import { layoutState } from "state/atoms";

// Declaring props types for PageLayout
interface Props {
  background?: "white" | "light" | "default";
  children: ReactNode;
}

function PageLayout({ background, children }: Props): JSX.Element {
  const [, setLayout] = useRecoilState(layoutState);
  const { pathname } = useLocation();

  useEffect(() => {
    // This effect runs when the pathname changes.
    // It updates the layout state to "page", affecting the global state.
    setLayout("page");
  }, [pathname, setLayout]);

  return (
    <ATBox
      width="100vw"
      height="100%"
      minHeight="100vh"
      bgColor={background}
      sx={{ overflowX: "hidden" }}
    >
      {children}
    </ATBox>
  );
}

// Declaring default props for PageLayout
PageLayout.defaultProps = {
  background: "default",
};

export default PageLayout;
