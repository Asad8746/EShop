import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, CustomLoader, Input, Message } from "../../Components";
import { useFormValidation } from "../../hooks";
import { emptyValidator } from "../../validation";
import { editProfile } from "../../actions";
import "./index.style.scss";
export const EditProfilePage = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((store) => store.user);
  const { loading, error } = useSelector((store) => store.editProfile);

  const name = useFormValidation(data.name, emptyValidator, "Name is required");
  const password = useFormValidation(
    "",
    emptyValidator,
    "Password is required"
  );
  const disabled = !name.isValid;
  const onNameChange = useCallback(
    (value) => {
      name.setValue(value);
    },
    [name]
  );
  const onNameBlur = useCallback(
    (value) => {
      name.setBlur(value);
    },
    [name]
  );
  const onPasswordChange = useCallback(
    (value) => {
      password.setValue(value);
    },
    [password]
  );
  const onPasswordBlur = useCallback(
    (value) => {
      password.setBlur(value);
    },
    [password]
  );
  const onFormSubmit = (e) => {
    e.preventDefault();
    const updatedData = {};
    if (name.value !== data.name) {
      updatedData["name"] = name.value;
    } else if (password.value) {
      updatedData["password"] = password.value;
    }
    if (Object.keys(updatedData).length > 0) {
      dispatch(editProfile(updatedData));
    }
  };
  return (
    <Container>
      <div className="edit-profile">
        {loading ? (
          <CustomLoader />
        ) : (
          <>
            <h4 className="edit-profile__header">Edit Your Profile</h4>
            <form onSubmit={onFormSubmit}>
              <Input
                type="text"
                fieldName="name"
                placeholder="Name"
                value={name.value}
                blur={name.blur}
                error={name.error}
                label="Name"
                onChange={onNameChange}
                onBlur={onNameBlur}
              />
              <Input
                type="password"
                fieldName="password"
                placeholder="Password"
                label="Password"
                blur={password.blur}
                error={password.error}
                value={password.value}
                onChange={onPasswordChange}
                onBlur={onPasswordBlur}
              />

              <div className="error-container">
                {error && <Message variant="error" message={error} />}
              </div>
              <div className="btn__center-container">
                <button className="btn--primary" disabled={disabled}>
                  Save
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </Container>
  );
};

export default EditProfilePage;
