const connectDb = require("./startup/db");
const Product = require("./models/Product");
const User = require("./models/User");
const Order = require("./models/Order");
const products = require("./products");
const users = require("./users");

const importOrDeleteData = async (delFlag = false) => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();
    if (!delFlag) {
      const storedUsers = await User.insertMany(users);
      const adminUser = storedUsers.find((item) => item.isAdmin);

      const sampleProducts = products.map((item) => {
        return { ...item, user: adminUser._id };
      });
      await Product.insertMany(sampleProducts);
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
