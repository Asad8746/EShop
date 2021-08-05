const bcryptjs = require("bcryptjs");
const users = [
  {
    name: "Asad khan",
    email: "asad@gmail.com",
    password: bcryptjs.hashSync("12345", 10),
    isAdmin: true,
  },
  {
    name: "Sangeen khan",
    email: "sangeen@gmail.com",
    password: bcryptjs.hashSync("12345", 10),
    isAdmin: true,
  },
];

module.exports = users;
