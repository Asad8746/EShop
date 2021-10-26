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
  return (
    <>
      {signUpState.loading ? (
        <CustomLoader height={70} width={70} />
      ) : (
        <form className="signup" onSubmit={onSubmit}>
          {signUpState.error && (
            <div className="error-container">
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
            onChange={name.setValue}
            onBlur={name.setBlur}
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
            onChange={email.setValue}
            onBlur={email.setBlur}
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
            onChange={password.setValue}
            onBlur={password.setBlur}
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
            onChange={confirmPassword.setValue}
            onBlur={confirmPassword.setBlur}
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
