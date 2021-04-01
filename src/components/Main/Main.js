import React, { useState } from "react";
import Game from "../Game/Game";
import Navigation from "../Navigation/Navigation";
import "./Main.css";

export default function Main(props) {
  const [balance, setBalance] = useState(props.user.balance);

  return (
    <div className="main p-d-flex p-flex-column">
      <div style={{ height: "7%", width: "100%" }}>
        <Navigation user={props.user} balance={balance} />
      </div>
      <div style={{ height: "100%" }}>
        <Game user={props.user} balance={balance} updateBalance={setBalance} />
      </div>
    </div>
  );
}
