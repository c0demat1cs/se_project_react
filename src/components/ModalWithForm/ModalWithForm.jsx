import "./ModalWithForm.css"; // Import the ModalWithForm component styles
import { useState } from "react"; // Import the useState hook

// ModalWithForm component
function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  handleLoginClick,
}) {
  return (
    <div className={isOpen ? "modal modal_opened" : "modal"}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          {/* Close */}
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__submit-buttons">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
            {/* If the handleLoginClick function is passed as a prop, display the "or Log In" button */}
            {handleLoginClick && (
              <button
                type="button"
                className="modal__submit modal__submit-alt"
                onClick={handleLoginClick}
              >
                or Log In
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
// Export the ModalWithForm component
export default ModalWithForm;
