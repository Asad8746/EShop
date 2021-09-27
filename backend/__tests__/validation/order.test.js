const fakeProducts = require("../../products");
const mongoose = require("mongoose");
const { validateOrderBody } = require("../../validation/order");
const items = fakeProducts.slice(0, 2).map((item) => {
  const qty = 1;
  const price = qty * item.price;
  return {
    id: mongoose.Types.ObjectId().toString(),
    name: item.name,
    qty,
    image: item.image,
    stockCount: item.stockCount,
    price,
  };
});
// const validateOrderBody = (body) => {
//     const body_schema = joi.object({
//       items: joi
//         .array()
//         .items({
//           name: joi.string().required(),
//           qty: joi.number().required(),
//           id: joi.string().required(),
//           price: joi.number().required(),
//           image: joi.string().required(),
//           stockCount: joi.number().required(),
//         })
//         .min(1)
//         .required(),
//       paymentMethod: joi.string().valid("cod", "paypal").required(),
//       tax_price: joi.number().required(),
//       delivery_price: joi.number().required(),
//       total_price: joi.number().required(),
//     });
// address: joi
// .object({
//     address: joi.string().required(),
//     city: joi.string().required(),
//     postalCode: joi.string().required(),
//     country: joi.string().required(),
//   })
//     return body_schema.validate(body);
//   };

// const validateOrderBody = (body) => {
//     const body_schema = joi.object({
//       items: joi
//         .array()
//         .items({
//           name: joi.string().required(),
//           qty: joi.number().required(),
//           id: joi.string().required(),
//           price: joi.number().required(),
//           image: joi.string().required(),
//           stockCount: joi.number().required(),
//         })
//         .min(1)
//         .required(),
//       address: joi
//         .object({
//           address: joi.string().required(),
//           city: joi.string().required(),
//           postalCode: joi.string().required(),
//           country: joi.string().required(),
//         })
//         .required(),
//       paymentMethod: joi.string().valid("cod", "paypal").required(),
//     });
//     return body_schema.validate(body);
//   };
describe("validateOrderBody", () => {
  let order;
  beforeEach(() => {
    order = {
      items,
      address: {
        address: "HNO 123 Earth",
        city: "Humanistan",
        postalCode: "12345",
        country: "Earth",
      },
      paymentMethod: "cod",
    };
  });
  it("Must return a error object with message if items length is 0", () => {
    order.items = [];
    const { error } = validateOrderBody(order);
    expect(error.details[0].message).toBeDefined();
  });
  it("Must return a error object with message if address is an empty", () => {
    order.address = {};
    const { error } = validateOrderBody(order);
    expect(error.details[0].message).toBeDefined();
  });
  it("Must return a error object with message if address field inside Address Object is an empty string", () => {
    order.address = {
      ...order.address,
      address: "",
    };
    const { error } = validateOrderBody(order);
    expect(error.details[0].message).toBeDefined();
  });
  it("Must return a error object with message if city field inside Address Object is an empty string", () => {
    order.address = {
      ...order.address,
      city: "",
    };
    const { error } = validateOrderBody(order);
    expect(error.details[0].message).toBeDefined();
  });
  it("Must return a error object with message if postalcode field inside Address Object is an empty string", () => {
    order.address = {
      ...order.address,
      postalCode: "",
    };
    const { error } = validateOrderBody(order);
    expect(error.details[0].message).toBeDefined();
  });
  it("Must return a error object with message if country field inside Address Object is an empty string", () => {
    order.address = {
      ...order.address,
      country: "",
    };
    const { error } = validateOrderBody(order);
    expect(error.details[0].message).toBeDefined();
  });
  it("Must return a error object with message if paymentMethod is other than cod or paypal", () => {
    order.paymentMethod = "SomeOtherGateWay";
    const { error } = validateOrderBody(order);
    expect(error.details[0].message).toBeDefined();
  });
});
