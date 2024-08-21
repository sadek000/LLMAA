import React from "react";

const Error = ({ err }: any) => {
  return (
    <div className="errorMessage">
      An error occurred - {err.message}. Refresh the page and try again later.
    </div>
  );
};

export default Error;
