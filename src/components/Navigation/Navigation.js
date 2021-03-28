import React from "react";
import UserProvider, { UserContext } from "../../providers/UserProvider";
import { useContext } from "react";
import { Button } from "primereact/button";
import "./Navigation.css";
import { TabMenu } from "primereact/tabmenu";

export default function Navigation() {
  const user = useContext(UserContext);

  return (
    <div className="navigation p-d-flex p-flex-row-reverse">
      <Button
        label={user.email}
        className="p-link p-mx-2 p-button-outlined"
      ></Button>
    </div>
  );
}
