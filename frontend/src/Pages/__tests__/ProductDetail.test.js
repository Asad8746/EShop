import { rest } from "msw";
import { setupServer } from "msw/node";
import { Route } from "react-router-dom";

import { customRender, screen, waitFor } from "../../test-utils";
import { ProductDetail } from "../ProductDetail";

import { ProductDetailhandlers, products, reviews } from "../../mocks";

const product = products[0];
const server = setupServer(...ProductDetailhandlers);

beforeAll(() => {
  server.listen(); // Start listening to Requests and resolve them using mock request handlers
});
afterEach(() => {
  server.resetHandlers(); // Reset runTime handlers that are added on runtime
});

afterAll(() => {
  server.close(); // close Server
});
const renderProductDetail = (id = product._id) => {
  customRender(
    <Route path="/product/:id">
      <ProductDetail />
    </Route>,
    { route: `/product/${id}` }
  );
};
describe("ProductDetail", () => {
  it("Must fetch the product and reviews with required id from Api and show it on the screen", async () => {
    renderProductDetail();
    await waitFor(() => screen.getByTestId("product-title"));
    expect(screen.getByTestId("product-img")).toHaveAttribute(
      "src",
      expect.stringContaining(`/image/${product.image}`)
    );
    expect(screen.getByTestId("product-price")).toHaveTextContent(
      product.price
    );
    expect(screen.getByTestId("product-description")).toHaveTextContent(
      product.description
    );
    expect(screen.getByTestId("product-status")).toHaveTextContent(
      product.price > 0 ? /in stock/i : /out of stock/i
    );
    const review = await screen.findByRole("heading", {
      name: reviews[0].user.name,
    });
    expect(review).toBeVisible();
    expect(
      screen.getByText(reviews[0].comment, { exact: false })
    ).toBeVisible();
  });
  it("Must show not found Error if Product with specified id is not found", async () => {
    renderProductDetail("1");
    await waitFor(() => screen.getByTestId("full-page-error"));
    expect(screen.getByTestId("full-page-error")).toBeVisible();
  });
  it("Must show a Error if Server sends 500 Error", async () => {
    server.use(
      rest.get("http://localhost:5000/products/:id", (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ message: "Something goes Wrong" })
        );
      })
    );
    renderProductDetail();
    await waitFor(() => screen.getByTestId("full-page-error"));
    expect(screen.getByTestId("full-page-error")).toBeVisible();
  });
});
