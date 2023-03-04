import React from "react";
import PropTypes from "prop-types";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  isSuccess,
  isError,
}: {
  isOpen: any;
  onClose: ()=> void;
  title: any;
  children:any;
  isSuccess:any;
  isError:any;
}) => {
  return (
    <>
      {isOpen && (
        <div
          className={`modal ${isSuccess ? "success" : ""} ${
            isError ? "error" : ""
          }`}
        >
          <div className="modal-content">
            <h2 style={{ color: isSuccess ? "#008000" : "#ff0000" }}>
              {title}
            </h2>
            {children}
            <button
              className="modal-close"
              onClick={onClose}
              style={{ backgroundColor: isSuccess ? "#008000" : "#ff0000" }}
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isSuccess: PropTypes.bool,
  isError: PropTypes.bool,
};

export default Modal;
