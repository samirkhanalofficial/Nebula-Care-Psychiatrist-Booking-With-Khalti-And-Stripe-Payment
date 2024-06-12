import React from "react";
import { ScaleLoader } from "react-spinners";

export default function Loading({
  onlySpinner = false,
  color = "#03c4ff",
}: {
  onlySpinner?: boolean;
  color?: string;
}) {
  if (onlySpinner) return <ScaleLoader color={color} />;
  return (
    <div
      style={{
        display: "flex",
        height: "200px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ScaleLoader color={color} />
    </div>
  );
}
