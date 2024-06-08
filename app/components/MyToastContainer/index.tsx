"use client";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function MyToastContainer() {
  return <ToastContainer style={{ zIndex: "9999" }} position="bottom-right" />;
}
