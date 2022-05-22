import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { HomePage } from "../HomePage";
import { products, homeHandlers } from "../../mocks";
import { customRender, screen, waitFor } from "../../test-utils";
import domains from "../../domains";
const server = setupServer(...homeHandlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
const renderHomePage = () => {
  customRender(<HomePage />, { route: domains.home });
};
describe("Home Page", () => {
  it("Must show all fetched Products from Api and show it on the Screen", async () => {
    renderHomePage();
    await waitFor(() => screen.getByText(products[0].name));
    for (let product of products) {
      expect(
        screen.getByRole("heading", { name: new RegExp(product.name, "i") })
      ).toBeVisible();
    }
  });
  it("Must show an Error if something goes wrong from Api end", async () => {
    server.use(
      rest.get("http://localhost:5000/products", (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({ message: "Oops something goes wrong" })
        );
      })
    );
    renderHomePage();
    await waitFor(() => screen.getByTestId("full-page-error"));
    expect(screen.getByTestId("full-page-error")).toBeVisible();
  });
});
