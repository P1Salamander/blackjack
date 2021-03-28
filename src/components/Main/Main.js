import React from "react";
import Game from "../Game/Game";
import Navigation from "../Navigation/Navigation";
import "./Main.css";

export default function Main() {
  return (
    <div className="main p-align-stretch p-grid p-dir-col">
      <div className="p-col-2">
        <Navigation></Navigation>
      </div>
      <div className="p-col-10">
        <Game></Game>
      </div>
    </div>
  );
}
