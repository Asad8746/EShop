const connectDb = require("./startup/db");
const Product = require("./models/Product");
const User = require("./models/User");
const Order = require("./models/Order");
const Image = require("./models/Image");
const products = require("./products");
const users = require("./users");
const orders = require("./order");

const importOrDeleteData = async (delFlag = false) => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();
    await Image.deleteMany();
    if (!delFlag) {
      const storedUsers = await User.insertMany(users);
      const adminUser = storedUsers.find((item) => item.isAdmin);

      let sampleProducts = products.map((item) => {
        return { ...item, user: adminUser._id };
      });
      sampleProducts = await Product.insertMany(sampleProducts);
      const product = sampleProducts[0];
      const orderItems = [
        {
          name: product.name,
          qty: 1,
          id: product._id,
          price: product.price,
          image: product.image,
          stockCount: product.stockCount,
        },
      ];
      let sampleOrders = orders.map((order) => {
        const tax_price = product.price * 0.1;
        return {
          ...order,
          user: adminUser._id,
          orderItems,
          total_price: Number(tax_price) + Number(product.price),
          delivery_price: 100,
          tax_price,
        };
      });
      await Order.insertMany(sampleOrders);
      console.log("Data is Imported");
    } else {
      console.log("Data is Deleted");
    }
    process.exit();
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
connectDb();
importOrDeleteData(process.argv[2] === "-d" || false);
