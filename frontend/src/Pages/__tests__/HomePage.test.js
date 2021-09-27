import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { HomePage } from "../HomePage";
import { Provider } from "react-redux";
import store from "../../store";
const products = [
  {
    price: 89.99,
    rating: 4.5,
    stockCount: 10,
    numReviews: 12,
    _id: "60f2bf0d6ef96338007a2a90",
    name: "Airpods Wireless Bluetooth Headphones",
    image: "/images/airpods.jpg",
    description:
      "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
    brand: "Apple",
    category: "Electronics",
    user: "60f2bf0d6ef96338007a2a8d",
    reviews: [],
  },
];
const server = setupServer(
  rest.get("http://localhost:5000/products", (req, res, ctx) => {
    return res(ctx.json(products));
  })
);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
describe("Home Page", () => {
  it("Must show all fetched Products from Api and show it on the Screen", async () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
    await waitFor(() => screen.getByText(products[0].name));
    expect(screen.getByText(products[0].name)).toHaveTextContent(
      products[0].name
    );
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
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
    await waitFor(() => screen.getByText("Oops something goes wrong"));
    expect(screen.queryByText("Oops something goes wrong")).not.toBeNull();
  });
});
