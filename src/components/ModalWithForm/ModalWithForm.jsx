import "./ModalWithForm.css"; // Import the ModalWithForm component styles

// ModalWithForm component
function ModalWithForm({ children, buttonText, title, isOpen, onClose }) {
  return (
    <div className={isOpen ? "modal modal_opened" : "modal"}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          {/* Close */}
        </button>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
// Export the ModalWithForm component
export default ModalWithForm;
