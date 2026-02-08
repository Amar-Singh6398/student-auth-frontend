import { Navigate } from "react-router-dom";

export default function RedirectHome() {
  const token = localStorage.getItem("token");

  return token ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}
