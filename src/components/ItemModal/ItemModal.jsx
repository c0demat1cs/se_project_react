import "./ItemModal.css"; // import the ItemModal component styles
import { useContext } from "react"; // Import the useContext hook
import CurrentUserContext from "../../contexts/CurrentUserContext";

// ItemModal component
function ItemModal({ card, isOpen, onClose, handleOpenDelete }) {
  const { currentUser } = useContext(CurrentUserContext);
  // Checking if the current user is the owner of the current clothing item
  const isOwn = card.owner === currentUser._id;

  const itemDeleteButtonClassName = `modal__footer_delete-button ${
    isOwn ? "" : "modal__delete-button_hidden"
  }`;

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
              onClick={handleOpenDelete}
              className={itemDeleteButtonClassName}
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
