// react-flatpickr components
import Flatpickr from "react-flatpickr";

// react-flatpickr styles
import "flatpickr/dist/flatpickr.css";

//  ALDR Tech Dashboard components
import React, { forwardRef } from "react";

// types
interface Props {
  input?: {
    [key: string]: any;
  };
  renderInput?: (params: any, ref: any) => JSX.Element;
  [key: string]: any;
}

const ATDatePicker = forwardRef(({ input, renderInput, ...rest }: Props, ref) => {
  return (
    <Flatpickr
      {...rest}
      render={(props, ref) => renderInput(props, ref)}
      // The ref here is now forwarded to the renderInput function
    />
  );
});

ATDatePicker.defaultProps = {
  input: {},
};

export default ATDatePicker;
