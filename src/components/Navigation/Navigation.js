import React from "react";
import { Button } from "primereact/button";
import * as authService from "../../services/authService";
import { Chip } from "primereact/chip";

import "./Navigation.css";

export default function Navigation(props) {
  return (
    <div className="navigation p-d-flex p-flex-row-reverse">
      <Button label="Logout" onClick={authService.logout}></Button>
      <Chip label={`balance: ${props.user.balance}`} />
      <Button
        label={props.user.email}
        className="p-link p-mx-2 p-button-outlined"
      ></Button>
    </div>
  );
}
