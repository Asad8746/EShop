import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import domains from "../../domains";
import "./index.style.scss";
export const SearchBox = () => {
  const history = useHistory();
  const location = useLocation();

  const [value, setValue] = useState("");

  const onInputChange = (e) => {
    setValue(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (value.trim().length !== 0) {
      history.push(`${domains.searchPage}?q=${value}`);
    }
  };
  useEffect(() => {
    if (location.pathname !== domains.searchPage && value) {
      setValue("");
    }
  }, [location.pathname]);
  return (
    <div className="search-box">
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          value={value}
          className="search-box__input"
          placeholder="Search"
          onChange={onInputChange}
        />
        <button className="search-box__btn">
          <i className="fas fa-search"></i>
        </button>
      </form>
    </div>
  );
};
