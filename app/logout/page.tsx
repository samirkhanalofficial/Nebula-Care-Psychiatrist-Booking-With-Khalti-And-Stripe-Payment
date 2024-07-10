"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Logout() {
  const router = useRouter();
  useEffect(() => {
    localStorage.clear();
    router.push("/");
  });
  return <div></div>;
}
