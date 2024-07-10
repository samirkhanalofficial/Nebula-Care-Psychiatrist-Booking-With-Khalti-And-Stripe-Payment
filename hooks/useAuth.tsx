import React, { useEffect, useState } from "react";

export default function useAuth() {
  const [isSignedIn, setSignedIn] = useState(false);
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [fullName, setFullName] = useState("");
  const [id, setId] = useState("");
  const [nmcNumber, setNmcNumber] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [age, setAge] = useState(0);
  const [price, setPrice] = useState(0);
  useEffect(() => {
    checkSignedIn();
  }, []);
  async function checkSignedIn() {
    const token = await localStorage.getItem("token");
    const role = await localStorage.getItem("role");
    const fullName = await localStorage.getItem("fullName");
    const email = await localStorage.getItem("email");
    const image = await localStorage.getItem("image");
    const age = await localStorage.getItem("age");
    const price = await localStorage.getItem("price");
    const nmcNumber = await localStorage.getItem("nmcNumber");
    const id = await localStorage.getItem("_id");
    if (token && role) {
      setSignedIn(true);
      setRole(role);
      setToken(token);
      setFullName(fullName ?? "");
      setId(id ?? "");
      setNmcNumber(nmcNumber ?? "");
      setEmail(email ?? "");
      setImage(image ?? "");
      setAge(parseInt(age ?? "0") | 0);
      setPrice(parseInt(price ?? "0") | 0);
    }
  }
  return {
    isSignedIn,
    role,
    token,
    fullName,
    email,
    image,
    age,
    price,
    nmcNumber,
    id,
  };
}
