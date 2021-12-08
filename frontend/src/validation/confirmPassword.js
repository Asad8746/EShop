export const confirmPasswordValid = (password) => {
  return (confirmPass) => {
    if (confirmPass !== password) {
      return { valid: false, error: "Confirm Password must match Password" };
    } else {
      return { valid: true, error: "" };
    }
  };
};
