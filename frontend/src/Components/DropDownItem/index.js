import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const DropDownItem = ({ label, link, isLink, onItemClick }) => {
  return (
    <>
      {!isLink ? (
        <div onClick={onItemClick} className="dropdown-item">
          {label}
        </div>
      ) : (
        <Link className="dropdown-item" to={link}>
          {label}
        </Link>
      )}
    </>
  );
};
DropDownItem.defaultProps = {
  label: "",
  link: "/",
  isLink: false,
  onItemClick: () => {},
};
DropDownItem.propTypes = {
  label: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  isLink: PropTypes.bool.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default DropDownItem;
