import Api from "../Api";

export const getPaypalKey = async (cb) => {
  try {
    const { data } = await Api.get("/config/paypal");
    cb(data);
  } catch (err) {
    console.log(err.message);
  }
};
