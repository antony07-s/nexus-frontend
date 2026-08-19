import { createContext, useContext, useState } from "react";
import { loginAdmin } from "../api/client.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("nexus_admin_token"));
  const [username, setUsername] = useState(() => localStorage.getItem("nexus_admin_username"));

  const login = async (u, p) => {
    const res = await loginAdmin(u, p);
    const { token, username } = res.data.data;
    localStorage.setItem("nexus_admin_token", token);
    localStorage.setItem("nexus_admin_username", username);
    setToken(token);
    setUsername(username);
  };

  const logout = () => {
    localStorage.removeItem("nexus_admin_token");
    localStorage.removeItem("nexus_admin_username");
    setToken(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ token, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}