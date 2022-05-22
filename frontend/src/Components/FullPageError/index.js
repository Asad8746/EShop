import React from "react";
import { ReactComponent } from "../../images/down.svg";
import PropTypes from "prop-types";
import "./index.style.scss";
export function FullPageError({ error, render }) {
  const className = "full-page-error__svg";
  return (
    <div className="full-page-error">
      {render(className) ? (
        render(className)
      ) : (
        <ReactComponent className={className} />
      )}
      <p className="full-page-error__message" data-testid="full-page-error">
        {error}
      </p>
    </div>
  );
}

FullPageError.defaultProps = {
  error: "Oops Something Goes Wrong",
  render: () => null,
};
FullPageError.propTypes = {
  error: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};
