export const products = [
  {
    price: 89.99,
    rating: 4.5,
    stockCount: 10,
    numReviews: 2,
    _id: "60f2bf0d6ef96338007a2a90",
    name: "Airpods Wireless Bluetooth Headphones",
    description:
      "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
    brand: "Apple",
    category: "Electronics",
    user: "60f2bf0d6ef96338007a2a8d",
    image: "60f2bf0d6ef96338007a2a90",
  },
  {
    _id: "60f2bf0d6ef96338007a2a91",
    name: "iPhone 11 Pro 256GB Memory",
    description:
      "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
    brand: "Apple",
    category: "Electronics",
    price: 599.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
    user: "60f2bf0d6ef96338007a2a8d",
    image: "60f2bf0d6ef96338007a2a90",
  },
  {
    _id: "60f2bf0d6ef96338007a2a92",
    user: "60f2bf0d6ef96338007a2a8d",
    image: "60f2bf0d6ef96338007a2a90",

    name: "Cannon EOS 80D DSLR Camera",
    description:
      "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",
    brand: "Cannon",
    category: "Electronics",
    price: 929.99,
    countInStock: 5,
    rating: 3,
    numReviews: 12,
  },
  {
    _id: "60f2bf0d6ef96338007a2a93",
    user: "60f2bf0d6ef96338007a2a8d",
    image: "60f2bf0d6ef96338007a2a90",

    name: "Sony Playstation 4 Pro White Version",
    description:
      "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
    brand: "Sony",
    category: "Electronics",
    price: 399.99,
    countInStock: 11,
    rating: 5,
    numReviews: 12,
  },
  {
    _id: "60f2bf0d6ef96338007a2a94",
    user: "60f2bf0d6ef96338007a2a8d",
    image: "60f2bf0d6ef96338007a2a90",
    name: "Logitech G-Series Gaming Mouse",
    description:
      "Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience",
    brand: "Logitech",
    category: "Electronics",
    price: 49.99,
    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
  },
  {
    _id: "60f2bf0d6ef96338007a2a95",
    user: "60f2bf0d6ef96338007a2a8d",
    image: "60f2bf0d6ef96338007a2a90",

    name: "Sony HeadPhones",
    description:
      "Meet Sony HeadPhones - Our most popular smart HeadPhones with a fabric design. It is our most compact smart HeadPhones that fits perfectly into small space",
    brand: "Amazon",
    category: "Electronics",
    price: 29.99,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
  },
];
export const searchedProducts = [
  {
    _id: "60f2bf0d6ef96338007a2a95",
    user: "60f2bf0d6ef96338007a2a8d",
    image: "60f2bf0d6ef96338007a2a90",

    name: "Sony HeadPhones",
    description:
      "Meet Sony HeadPhones - Our most popular smart HeadPhones with a fabric design. It is our most compact smart HeadPhones that fits perfectly into small space",
    brand: "Amazon",
    category: "Electronics",
    price: 29.99,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
  },
  {
    _id: "60f2bf0d6ef96338007a2a93",
    user: "60f2bf0d6ef96338007a2a8d",
    image: "60f2bf0d6ef96338007a2a90",

    name: "Sony Playstation 4 Pro White Version",
    description:
      "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
    brand: "Sony",
    category: "Electronics",
    price: 399.99,
    countInStock: 11,
    rating: 5,
    numReviews: 12,
  },
];
export const reviews = [
  {
    _id: "1",
    user: {
      _id: "user_1",
      name: "Asad khan",
    },
    rating: 4,
    comment: "nice product",
  },
];

export const localHostUrl = (path) => {
  return new URL(path, "http://localhost:5000").toString();
};
