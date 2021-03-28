import React from "react";
import { Card } from "primereact/card";

export default function GameCard(props) {
  return (
    <div className="p-mr-2">
      <img
        src={props.url}
        alt={props.value}
        style={{ display: "block", borderRadius: "10%" }}
        className="p-shadow-16"
        height="100"
      />
    </div>
  );
}
