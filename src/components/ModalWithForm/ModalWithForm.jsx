import "./ModalWithForm.css"; // Import the ModalWithForm component styles

// ModalWithForm component
function ModalWithForm({ children, title, isOpen, onClose, onSubmit }) {
  return (
    <div className={isOpen ? "modal modal_opened" : "modal"}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          {/* Close */}
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__submit-buttons"></div>
        </form>
      </div>
    </div>
  );
}
// Export the ModalWithForm component
export default ModalWithForm;
