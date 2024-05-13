import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ closeActiveModal, onAddItem, isAddGarmentOpen }) => {
  // Add the name state
  const [name, setName] = useState("");
  // Handle the name change
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  // Add the URL state
  const [imageUrl, setUrl] = useState("");
  // Handle the URL change
  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };
  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isAddGarmentOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          id="name"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          id="imageUrl"
          className="modal__input"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleUrlChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
