import { ReactNode, FC, forwardRef, createContext, useContext, useMemo } from "react";

//  ALDR Tech Dashboard components
import ATBox from "components/ATBox";

// Custom styles for ATPagination
import ATPaginationItemRoot from "components/ATPagination/ATPaginationItemRoot";

// The Pagination main context
const Context = createContext<any>(null);

// Declare props types for ATPagination
interface Props {
  item?: boolean;
  variant?: "gradient" | "contained";
  color?:
    | "white"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "light"
    | "dark";
  size?: "small" | "medium" | "large";
  active?: boolean;
  children: ReactNode;
  [key: string]: any;
}

const ATPagination: FC<Props | any> = forwardRef(
  ({ item, variant, color, size, active, children, ...rest }, ref) => {
    const context: any = useContext(Context);
    const paginationSize = context ? context.size : undefined;

    const providerValue = useMemo(
      () => ({
        variant,
        color,
        size,
      }),
      [variant, color, size]
    );

    return (
      <Context.Provider value={providerValue}>
        {item ? (
          <ATPaginationItemRoot
            {...rest}
            ref={ref}
            variant={active ? context.variant : "outlined"}
            color={active ? context.color : "secondary"}
            iconOnly
            circular
            ownerState={{ variant, active, paginationSize }}
          >
            {children}
          </ATPaginationItemRoot>
        ) : (
          <ATBox
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ listStyle: "none" }}
          >
            {children}
          </ATBox>
        )}
      </Context.Provider>
    );
  }
);

// Declaring default props for ATPagination
ATPagination.defaultProps = {
  item: false,
  variant: "gradient",
  color: "info",
  size: "medium",
  active: false,
};

export default ATPagination;
