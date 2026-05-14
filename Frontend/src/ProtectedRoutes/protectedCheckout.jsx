import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  const { token } = useSelector((state) => state.signinUser);
  const storedToken = localStorage.getItem("token");
  const auth = token || storedToken;
  console.log("Protected Routes token====>", token);
  return auth ? children : <Navigate to="/signin" replace></Navigate>;
}
