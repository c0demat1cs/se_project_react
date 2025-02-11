import React, { useEffect, useState } from "react"; // import hooks useState and useEffect
import ModalWithForm from "../ModalWithForm/ModalWithForm"; // import the ModalWithForm component

const AddItemModal = ({ closeActiveModal, onAddItem, isAddGarmentOpen }) => {
  // Add the name state
  const [name, setName] = useState("");
  // Add the imageUrl state
  const [imageUrl, setImageUrl] = useState("");
  // Add the weather state
  const [weather, setWeather] = useState("");
  // handle url change
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  // handle url change
  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
  };
  // handle weather change
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };
  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
  };
  // reset form values when modal opens
  useEffect(() => {
    if (isAddGarmentOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
    }
  }, [isAddGarmentOpen]); // run effect

  return (
    <ModalWithForm
      title="New garment"
      isOpen={isAddGarmentOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name{" "}
        <input
          type="text"
          id="add__name"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label className="modal__label">
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
        <label className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            value="hot"
            checked={weather === "hot"}
            onChange={handleWeatherChange}
          />
          Hot
        </label>
        <label className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            value="warm"
            checked={weather === "warm"}
            onChange={handleWeatherChange}
          />
          Warm
        </label>
        <label className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            value="cold"
            checked={weather === "cold"}
            onChange={handleWeatherChange}
          />
          Cold
        </label>
        <button type="submit" className="modal__submit">
          Add garment
        </button>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
