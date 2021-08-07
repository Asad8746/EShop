const returnError = (errStack) => {
  return errStack.response && errStack.response.data
    ? errStack.response.data.message
    : errStack.message;
};
export default returnError;
