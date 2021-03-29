import React from "react";
import Game from "../Game/Game";
import Navigation from "../Navigation/Navigation";
import "./Main.css";

export default function Main(props) {
  return (
    <div className="main p-d-flex p-flex-column">
      <div style={{ height: "7%", width: "100%" }}>
        <Navigation user={props.user} />
      </div>
      <div style={{ height: "100%" }}>
        <Game user={props.user} />
      </div>
    </div>
  );
}
