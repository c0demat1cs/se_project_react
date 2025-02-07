import React from "react";
import "./DeleteItemModal.css"; // Import CSS for styling

const DeleteItemModal = ({ card, isOpen, onClose, onDeleteItem }) => {
  const handleDeleteItem = () => {
    onDeleteItem(card._id);
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal_opened">
      <div className="modal__container">
        <h2 className="modal__title">
          Are you sure you want to delete this item?
        </h2>
        <p className="modal__title">This action is irreversible.</p>
        <div className="modal__buttons">
          <button
            onClick={handleDeleteItem}
            className="modal__button modal__button_confirm"
          >
            Yes, delete item
          </button>
          <button
            onClick={onClose}
            className="modal__button modal__button_cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteItemModal;
