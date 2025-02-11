import React, { useEffect, useState, useContext } from "react"; // import hooks useState and useEffect
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

// component for editing user data
// should be opened when user clicks edit profile button on the profile page.
// current user's data should be filled in the form.
// make an API call that sends new user name and the avatar URL to the server.

const EditProfileModal = ({
  closeActiveModal,
  onEditProfile,
  isEditProfileOpen,
}) => {
  const { currentUser } = useContext(CurrentUserContext); // get the current user data

  const [name, setName] = useState(currentUser?.name); // Declare the name state variable
  const [avatar, setAvatar] = useState(currentUser?.avatar); // Declare the avatar state variable

  useEffect(() => {
    if (isEditProfileOpen) {
      setName(currentUser?.name);
      setAvatar(currentUser?.avatar);
    }
  }, [isEditProfileOpen, currentUser]); // run effect

  // input handlers
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  // handle form submit
  const handleEditProfile = (e) => {
    e.preventDefault();
    onEditProfile({ name, avatar });
  };

  return (
    <ModalWithForm
      title="Edit profile"
      isOpen={isEditProfileOpen}
      onClose={closeActiveModal}
      onSubmit={handleEditProfile}
    >
      <label className="modal__label">
        Name{" "}
        <input
          type="text"
          id="edit__name"
          className="modal__input"
          value={name}
          placeholder="Name"
          onChange={handleNameChange}
          required
        />
      </label>
      <label className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          id="edit__avatar"
          className="modal__input"
          value={avatar}
          placeholder="Avatar URL"
          onChange={handleAvatarChange}
          required
        />
      </label>
      <button type="submit" className="modal__submit">
        Save changes
      </button>
    </ModalWithForm>
  );
};

export default EditProfileModal;
