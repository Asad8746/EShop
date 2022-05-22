import { useState } from "react";
import { Container, LoginForm, SignupForm } from "../../Components";
import "./index.style.scss";
export const AuthPage = () => {
  const [active, setActive] = useState("LOGIN");
  const onLoginClick = () => {
    setActive("LOGIN");
  };
  const onSignUpClick = () => {
    setActive("SIGNUP");
  };
  return (
    <Container>
      <div className="auth-container">
        <div className="auth__left" style={{ backgroundImage: `url(/bg.jpg)` }}>
          <div className="auth__nav">
            <input
              name="active"
              type="radio"
              className="auth__nav-radio"
              id="login-radio"
            />

            <label
              htmlFor="login-radio"
              onClick={onLoginClick}
              className={`auth__nav-item ${
                active === "LOGIN" ? "active-item" : ""
              }`}
            >
              Login
            </label>
            <input
              name="active"
              type="radio"
              className="auth__nav-radio"
              id="signup-radio"
            />
            <div className="active"></div>
            <label
              htmlFor="signup-radio"
              onClick={onSignUpClick}
              className={`auth__nav-item ${
                active === "SIGNUP" ? "active-item" : ""
              }`}
            >
              Signup
            </label>
          </div>
        </div>
        <div className="auth__right">
          <h1 className="auth__header">
            {active === "LOGIN" ? "Login to EShop" : "Signup to EShop"}{" "}
          </h1>

          {active === "LOGIN" ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </Container>
  );
};
