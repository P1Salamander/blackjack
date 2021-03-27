import React from "react";
import { Card } from "primereact/card";

export default function GameCard(props) {
  return (
    <div className="p-d-block p-mx-auto">
      <Card
        className="p-col p-col-align-center"
        style={{ height: "10em", width: "5em" }}
      >
        ACE!
      </Card>
    </div>
  );
}
