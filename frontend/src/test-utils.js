/* eslint react/prop-types: 0 */
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
const AllProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};

export const customRender = (ui, options = {}) => {
  const route = options?.route;
  if (route) {
    window.history.pushState({}, "Testing Purpose", route);
  }
  return render(ui, { wrapper: AllProvider, ...options });
};

export * from "@testing-library/react";
