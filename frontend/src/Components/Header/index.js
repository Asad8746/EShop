import { useState } from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import domains from "../../domains";
import MenuDropDown from "../DropDown";
import DropDownItem from "../DropDownItem";
import { Container } from "../Container";
import { logout } from "../../actions";
import "./index.style.scss";
export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuth, data } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const onLogoutClick = () => {
    dispatch(logout());
  };
  return (
    <header className="header">
      <Container>
        <>
          {isOpen && (
            <div className="dropdown-modal" onClick={() => setIsOpen(false)} />
          )}
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
              {!isAuth ? (
                <li className="header-nav__link">
                  <Link to={domains.auth}>
                    <i className="fas fa-user"></i>
                    Sign In
                  </Link>
                </li>
              ) : (
                <li
                  className="header-nav__link"
                  onClick={() => {
                    setIsOpen((prev) => !prev);
                  }}
                >
                  <span style={{ marginRight: 5 }}>{data.name}</span>
                  <i className="fas fa-caret-down"></i>
                  {isOpen && (
                    <MenuDropDown>
                      <div className="setting-dropdown">
                        <DropDownItem
                          label="Edit Your Profile"
                          link="/"
                          isLink
                        />
                        <DropDownItem
                          label="Orders"
                          link={domains.orders}
                          isLink
                        />

                        <DropDownItem
                          label="Log out"
                          onItemClick={onLogoutClick}
                        >
                          Logout
                        </DropDownItem>
                      </div>
                    </MenuDropDown>
                  )}
                </li>
              )}
            </ul>
          </nav>
        </>
      </Container>
    </header>
  );
};
