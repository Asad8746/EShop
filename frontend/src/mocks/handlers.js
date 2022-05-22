import { rest } from "msw";
import { products, reviews, localHostUrl, searchedProducts } from "./helpers";
const product = products[0];

export const ProductDetailhandlers = [
  rest.get(localHostUrl("/products/:id/reviews"), (req, res, ctx) => {
    const id = req.params?.id;
    if (id === product._id) return res(ctx.status(200), ctx.json({ reviews }));
    return res(
      ctx.status(404),
      ctx.json({ message: `Product with ${id} Not Found` })
    );
  }),
  rest.get(localHostUrl("/products/:id"), (req, res, ctx) => {
    const id = req.params.id;

    if (id === product._id) {
      return res(ctx.status(200), ctx.json(product));
    }
    return res(
      ctx.status(404),
      ctx.json({ message: `Product with ${id} Not Found` })
    );
  }),
];

export const homeHandlers = [
  rest.get("http://localhost:5000/products", (req, res, ctx) => {
    const q = req.url.searchParams.get("q") || "";
    if (q === "so") {
      return res(ctx.json({ products: searchedProducts, totalPages: 1 }));
    } else if (!q) {
      return res(ctx.json({ products, totalPages: 1 }));
    } else {
      return res(ctx.json({ products: [], totalPages: 1 }));
    }
  }),
];
