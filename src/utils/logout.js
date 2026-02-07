import { setAuthToken } from "../api/axios";

export default function logout(navigate) {
  localStorage.removeItem("token");
  setAuthToken(null); // remove Authorization header
  navigate("/login");
}
