import React from "react";
import { CustomLoader } from "../Loader";
import "./index.style.scss";
export const FullPageLoader = () => {
  return (
    <div className="full-page-loader">
      <CustomLoader width={70} height={70} />
    </div>
  );
};
