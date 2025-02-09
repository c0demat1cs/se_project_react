import React, { useEffect, useState } from "react"; // import hooks useState and useEffect
import ModalWithForm from "../ModalWithForm/ModalWithForm"; // reuse the ModalWithForm component

// RegisterModal is the component for user registration with the necessary state variables
const RegisterModal = ({
  closeActiveModal,
  onRegistration,
  isRegisterOpen,
  handleLoginClick,
}) => {
  const [email, setEmail] = useState(""); // Declare the email state variable
  const [password, setPassword] = useState(""); // Declare the password state variable
  const [name, setName] = useState(""); // Declare the name state variable
  const [avatar, setAvatar] = useState(""); // Declare the avatar state variable

  // input handlers
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  // handle form submit
  const handleRegistration = (e) => {
    e.preventDefault();
    onRegistration({ email, password, name, avatar });
  };

  // reset form values when modal opens
  useEffect(() => {
    if (isRegisterOpen) {
      setEmail("");
      setPassword("");
      setName("");
      setAvatar("");
    }
  }, [isRegisterOpen]); // run effect

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign Up"
      isOpen={isRegisterOpen}
      onClose={closeActiveModal}
      onSubmit={handleRegistration}
      handleLoginClick={handleLoginClick}
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          id="register__email"
          className="modal__input"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          type="password"
          id="register__password"
          className="modal__input"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          id="register__name"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar{" "}
        <input
          type="url"
          id="register__avatar"
          className="modal__input"
          placeholder="Avatar URL"
          value={avatar}
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
