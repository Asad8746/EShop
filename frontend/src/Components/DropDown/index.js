import "./index.style.scss";
import PropTypes from "prop-types";
const DropDownMenu = ({ children }) => {
  return (
    <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
};

DropDownMenu.propTypes = {
  children: PropTypes.element,
};

export default DropDownMenu;
