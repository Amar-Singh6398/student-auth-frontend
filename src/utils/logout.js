export default function logout(navigate) {
  localStorage.removeItem("token");
  localStorage.removeItem("activeTab");
  navigate("/login");
}
