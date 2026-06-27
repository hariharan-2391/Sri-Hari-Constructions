import React from "react";
import { logoImg } from "../config/images";

export function LogoMark({ size = 48 }) {
  return (
    <img
      src={logoImg}
      alt="Sri Hari Constructions Logo"
      style={{
        height: size,
        width: "auto",
        display: "block",
        objectFit: "contain",
      }}
    />
  );
}
