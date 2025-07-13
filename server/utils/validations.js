export function validateUserInput(userData) {
  const { email, password, password_confirm, username } = userData;
  if (!email || !password || !password_confirm || !username) {
    return "Missing input data";
  }
  if (password !== password_confirm) {
    return "Not matching passwords";
  }

  return null;
}
