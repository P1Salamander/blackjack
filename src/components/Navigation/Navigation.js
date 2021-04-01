import React from "react";
import { Button } from "primereact/button";
import * as authService from "../../services/authService";
import { Chip } from "primereact/chip";
import "./Navigation.css";
import { useNavigate } from "@reach/router";

export default function Navigation(props) {
  const navigate = useNavigate();

  return (
    <div className="navigation p-d-flex p-flex-row-reverse">
      <Button label="Logout" onClick={authService.logout} />
      <Chip label={`balance: ${props.balance}`} />
      <Button
        label={props.user.email}
        className="p-link p-mx-2 p-button-outlined"
        onClick={(e) => navigate("/profile", { replace: false })}
      />
    </div>
  );
}
