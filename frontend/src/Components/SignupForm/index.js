import { useLocation, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../actions";
import { Input } from "../Input";
import { Message } from "../Message";
import { CustomLoader } from "../Loader";
import { useFormValidation } from "../../hooks/useFormValidation";
import { emailValidator, emptyValidator } from "../../validation";
import "./index.style.scss";
export const SignupForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const signUpState = useSelector((store) => store.signup);
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const name = useFormValidation(
    "",
    emptyValidator,
    "Name is not suppose to be Empty"
  );
  const email = useFormValidation("", emailValidator);
  const password = useFormValidation(
    "",
    emptyValidator,
    "Password is not suppose to be Empty"
  );
  const confirmPassword = useFormValidation("", (value) => {
    if (value !== password.value) {
      return { valid: false, error: "Confirm Password must match Password" };
    } else {
      return { valid: true, error: "" };
    }
  });
  const btnDisabled =
    !name.isValid ||
    !email.isValid ||
    !password.isValid ||
    !confirmPassword.isValid;
  const onSubmit = (e) => {
    e.preventDefault();
    if (password.value === confirmPassword.value) {
      dispatch(
        registerUser(
          {
            name: name.value,
            email: email.value,
            password: password.value,
          },
          () => {
            history.push(redirect);
          }
        )
      );
    }
  };
  const onEmailChange = (e) => {
    email.setValue(e.target.value);
  };
  const onPasswordChange = (e) => {
    password.setValue(e.target.value);
  };
  const onConfirmPasswordChange = (e) => {
    confirmPassword.setValue(e.target.value);
  };
  const onNameChange = (e) => {
    name.setValue(e.target.value);
  };
  const onNameBlur = () => {
    if (!name.blur) {
      name.setBlur(true);
    }
  };
  const onEmailBlur = () => {
    if (!email.blur) {
      email.setBlur(true);
    }
  };
  const onConfirmPasswordBlur = () => {
    if (!confirmPassword.blur) {
      confirmPassword.setBlur(true);
    }
  };

  const onPasswordBlur = () => {
    if (!password.blur) {
      password.setBlur(true);
    }
  };
  return (
    <>
      {signUpState.loading ? (
        <CustomLoader height={70} width={70} />
      ) : (
        <form className="signup" onSubmit={onSubmit}>
          {signUpState.error && (
            <div className="login__error-container">
              <Message variant="error" message={signUpState.error} />
            </div>
          )}
          <Input
            fieldName="name"
            type="text"
            label="Name"
            id="login-name"
            error={name.error}
            blur={name.blur}
            placeholder="Name"
            value={name.value}
            onChange={onNameChange}
            onBlur={onNameBlur}
          />
          <Input
            fieldName="email"
            type="email"
            label="Email"
            id="login-email"
            error={email.error}
            blur={email.blur}
            placeholder="Email"
            value={email.value}
            onChange={onEmailChange}
            onBlur={onEmailBlur}
          />
          <Input
            fieldName="password"
            type="password"
            label="Password"
            id="login-password"
            placeholder="Password"
            value={password.value}
            error={password.error}
            blur={password.blur}
            onChange={onPasswordChange}
            onBlur={onPasswordBlur}
          />
          <Input
            fieldName="Confirm password"
            type="password"
            label="Confirm Password"
            id="cofirm-password"
            placeholder="Confirm Password"
            value={confirmPassword.value}
            error={confirmPassword.error}
            blur={confirmPassword.blur}
            onChange={onConfirmPasswordChange}
            onBlur={onConfirmPasswordBlur}
          />
          <div className="signup__btn-container">
            <button className="btn--primary" disabled={btnDisabled}>
              Signup
            </button>
          </div>
        </form>
      )}
    </>
  );
};
