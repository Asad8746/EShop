export const checkEmpty = (object, label, returnValue) => {
  return object[label] ? object[label] : returnValue;
};
