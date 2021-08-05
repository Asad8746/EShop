import React from "react";
import PropTypes from "prop-types";
import "./index.style.scss";
export const QtyInput = ({
  qty,
  stockCount,
  check,
  onDecClick,
  onIncClick,
  onQtyChange,
}) => {
  const disabled = check && stockCount === 0;
  return (
    <div className="qty-input">
      <button
        onClick={onDecClick}
        disabled={disabled}
        className="qty-input__btn"
      >
        -
      </button>
      <input
        className="qty-input__field"
        disabled={disabled}
        value={qty}
        onChange={onQtyChange}
      />
      <button
        onClick={onIncClick}
        disabled={disabled}
        className="qty-input__btn"
      >
        +
      </button>
    </div>
  );
};

QtyInput.defaultProps = {
  qty: 0,
  stockCount: 0,
  check: true,
  onDecClick: () => {},
  onIncClick: () => {},
  onQtyChange: () => {},
};
QtyInput.propTypes = {
  qty: PropTypes.number.isRequired,
  stockCount: PropTypes.number.isRequired,
  onDecClick: PropTypes.func.isRequired,
  onIncClick: PropTypes.func.isRequired,
  onQtyChange: PropTypes.func.isRequired,
  check: PropTypes.bool.isRequired,
};
