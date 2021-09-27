import { rest } from "msw";
import { setupServer } from "msw/node";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { ProductDetail } from "../ProductDetail";
import store from "../../store";

const server = setupServer(
  rest.get("http://localhost:5000/products/:id", (req, res, ctx) => {
    const id = req.params.id;
    // console.log(id);
    return res(ctx.status(200), ctx.json({}));
  })
);

beforeAll(() => {
  server.listen(); // Start listening to Requests and resolve them using mock request handlers
});
afterEach(() => {
  server.resetHandlers(); // Reset runTime handlers that are added on runtime
});

afterAll(() => {
  server.close(); // close Server
});

describe("ProductDetail", () => {
  it("Must fetch the product with required id from Api and show it on the screen", () => {
    const history = createBrowserHistory();
    history;
    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductDetail />
        </Router>
      </Provider>
    );
  });
});
