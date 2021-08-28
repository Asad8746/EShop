import React from "react";
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./index.style.scss";
export const CustomLoader = ({ type, height, width, color }) => {
  return (
    <div className="loader-container">
      <Loader type={type} color={color} width={height} height={width} />
    </div>
  );
};

CustomLoader.defaultProps = {
  type: "Oval",
  width: 80,
  height: 80,
  color: "#1d3557",
};

CustomLoader.propTypes = {
  type: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};
