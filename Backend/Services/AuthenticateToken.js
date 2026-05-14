import JWT from "jsonwebtoken";
const secret = 'omg5papag';

export function tokenForUser(user) {
  const token = JWT.sign({ id: user._id, email: user.email, role: user.role }, secret);
  return token;
};