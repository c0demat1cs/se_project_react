import "./ItemModal.css"; // import the ItemModal component styles

// ItemModal component
function ItemModal({ card, isOpen, onClose, onDeleteItem }) {
  const handleDeleteItem = () => {
    onDeleteItem(card._id);
  };
  return (
    <div className={isOpen ? "modal modal_opened" : "modal"}>
      <div className="modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <img className="modal__image" src={card.imageUrl} alt={card.name} />
        <div className="modal__footer">
          <div className="modal__footer_heading">
            <h2 className="modal__caption">{card.name}</h2>
            <button
              onClick={handleDeleteItem}
              className="modal__footer_delete-button"
            >
              Delete Item
            </button>
          </div>
          <p className="modal__footer_card-weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}
// Export the ItemModal component
export default ItemModal;
