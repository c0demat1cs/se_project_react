import "./ItemModal.css"; // import the ItemModal component styles

// ItemModal component
function ItemModal({ card, activeModal, onClose }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <img className="modal__image" src={card.link} alt={card.name} />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="card__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}
// Export the ItemModal component
export default ItemModal;
