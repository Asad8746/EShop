import React from "react";
import { Container } from "../Container";
import { Link } from "react-router-dom";
import domains from "../../domains";
import "./index.style.scss";
export const Header = () => {
  return (
    <header className="header">
      <Container>
        <nav className="header-nav">
          <Link to={domains.home} className="header-nav__logo">
            EShop
          </Link>
          <ul>
            <li className="header-nav__link">
              <Link to={domains.cart}>
                <i className="fas fa-shopping-cart"></i>
                Cart
              </Link>
            </li>
            <li className="header-nav__link">
              <i className="fas fa-user"></i>
              Sign In
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};
