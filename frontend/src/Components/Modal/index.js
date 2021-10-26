import React from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router";
import "./index.style.scss";
export const Modal = ({ children }) => {
  const history = useHistory();
  const onModalOverlayClick = () => {
    history.goBack();
  };
  return ReactDOM.createPortal(
    <div className="modal__overlay" onClick={onModalOverlayClick}>
      <div className="modal__children">{children}</div>
    </div>,
    document.querySelector("#modal")
  );
};
