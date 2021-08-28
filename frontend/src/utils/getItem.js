export const getItem = (label, returnType, parse = false) => {
  const value = localStorage.getItem(label);
  if (parse) {
    return value ? JSON.parse(value) : returnType;
  }
  return value ? value : returnType;
};
