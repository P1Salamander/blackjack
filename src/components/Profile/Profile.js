import { Card } from "primereact/card";
import "./Profile.css";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import * as userService from "../../services/userService";
import { useState, useRef } from "react";
import { showSuccessMessage } from "../../utils/messages";
import { Toast } from "primereact/toast";
import { useNavigate } from "@reach/router";

function Profile(props) {
  const [balance, setBalance] = useState(props.user.balance);
  const toast = useRef(null);
  const navigate = useNavigate();

  const save = async (e) => {
    e.preventDefault();
    userService.updateBalance(props.user, balance);
    showSuccessMessage(toast, "Profile Updated");
    setTimeout(() => {
      navigate("/", { replace: false });
    }, 1000);
  };

  return (
    <div className="profile p-grid p-align-center p-m-0">
      <Toast ref={toast} position="top-right"></Toast>
      <Card className="p-md-6 p-sm-10 p-lg-3 p-d-block p-mx-auto">
        <div className="p-fluid">
          <div className="p-field p-py-2">
            <div className="name p-col p-col-align-center">
              <h1>{props.user.email}</h1>
            </div>
          </div>
          <div className="p-field p-py-2">
            <span className="p-float-label">
              <InputNumber
                id="balance"
                value={props.user.balance}
                onChange={(e) => setBalance(e.value)}
              />
              <label htmlFor="balance">Balance</label>
            </span>
          </div>
          <div className="p-grid">
            <div className="p-col">
              <Button
                label="Save"
                className="p-button-outlined"
                onClick={(e) => save(e)}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Profile;
