import React from "react";
import PropTypes from "prop-types";
import "./index.style.scss";
export const Container = (props) => {
  return <div className="container">{props.children}</div>;
};

Container.propTypes = {
  children: PropTypes.element.isRequired,
};
