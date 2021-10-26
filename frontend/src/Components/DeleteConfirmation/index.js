import React from "react";
import { Modal } from "../Modal";
import { Container } from "../Container";
import PropTypes from "prop-types";
import "./index.style.scss";
export const DeleteConfirmationModal = ({
  title,
  message,
  onSuccessClick,
  onCancelClick,
}) => {
  const onContainerClick = (e) => {
    e.stopPropagation();
  };
  return (
    <Modal>
      <Container>
        <div className="confirmation-modal" onClick={onContainerClick}>
          <i className="fas fa-trash confirmation-modal__delete-icon"></i>
          <h2 className="confirmation-modal__title">{title}</h2>

          <p className="confirmation-modal__message">{message}</p>
          <div className="confirmation-modal__actions">
            <button
              className="confirmation-modal__cancel"
              onClick={onCancelClick}
            >
              <i className="fas fa-times"></i>
              No
            </button>
            <button
              className="confirmation-modal__delete"
              onClick={onSuccessClick}
            >
              <i className="fas fa-check"></i>
              Yes
            </button>
          </div>
        </div>
      </Container>
    </Modal>
  );
};

DeleteConfirmationModal.defaultProps = {
  onSuccessClick: () => {},
  onCancelClick: () => {},
};
DeleteConfirmationModal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onSuccessClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
};
