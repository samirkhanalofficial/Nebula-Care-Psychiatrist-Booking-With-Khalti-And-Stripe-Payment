import React, { useEffect, useState } from "react";

export default function useAuth() {
  const [isSignedIn, setSignedIn] = useState(false);
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  useEffect(() => {
    checkSignedIn();
  }, []);
  async function checkSignedIn() {
    const token = await localStorage.getItem("token");
    const role = await localStorage.getItem("role");
    if (token && role) {
      setSignedIn(true);
      setRole(role);
      setToken(token);
    }
  }
  return { isSignedIn, role, token };
}
