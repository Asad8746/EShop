import { setupServer } from "msw/node";
import { Route } from "react-router-dom";
import { homeHandlers, searchedProducts } from "../../mocks";
import { SearchPage } from "../SearchPage";
import { customRender, screen } from "../../test-utils";
const server = setupServer(...homeHandlers);
describe("SearchPage", () => {
  let q;
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });
  beforeEach(() => {
    q = "so";
    server.resetHandlers();
  });
  const renderSearchPage = () => {
    customRender(
      <Route>
        <SearchPage />
      </Route>,
      { route: `/search?q=${q}` }
    );
  };
  it("renders all products with specified query", async () => {
    renderSearchPage();
    for (let product of searchedProducts) {
      const heading = await screen.findByRole("heading", {
        name: new RegExp(product.name, "i"),
      });
      expect(heading).toBeVisible();
    }
  });
  it("renders not found message if no product is found regarding specified query", async () => {
    q = "random";
    renderSearchPage();
    const message = await screen.findByText(/no products found/i);
    expect(message).toBeVisible();
  });
});
