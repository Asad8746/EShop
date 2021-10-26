import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../actions/user";
import useFormValidation from "../../hooks/useFormValidation";
import { emailValidator, emptyValidator } from "../../validation";

import { Input } from "../Input";
import { CustomLoader } from "../Loader";
import { Message } from "../Message";
import "./index.style.scss";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const loginState = useSelector((store) => store.login);
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const email = useFormValidation("", emailValidator);
  const password = useFormValidation(
    "",
    emptyValidator,
    "Password is not Suppose to be Empty"
  );
  const btnDisabled =
    !email.isValid || !password.isValid || email.error || password.error;
  const onSuccess = () => {
    history.push(redirect);
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserAction(email.value, password.value, onSuccess));
  };
  return (
    <>
      {loginState.loading ? (
        <CustomLoader height={70} width={70} />
      ) : (
        <form className="login" onSubmit={onFormSubmit}>
          {loginState.error && (
            <div className="error-container">
              <Message variant="error" message={loginState.error} />
            </div>
          )}
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
          <div className="login__btn-container">
            <button className="btn--primary" disabled={btnDisabled}>
              Login
            </button>
          </div>
        </form>
      )}
    </>
  );
};
