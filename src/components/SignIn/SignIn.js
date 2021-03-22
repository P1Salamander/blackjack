import { InputText } from "primereact/inputtext";
import { useState, useRef } from "react";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import * as authService from "../../services/authService";
import { Toast } from "primereact/toast";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useRef(null);

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    const respons = await authService.signInWithGoogle().catch((error) => {
      toast.current.show({
        severity: "error",
        summary: "Something went wrong",
        detail: error.message,
        life: 3000,
      });
    });
    if (respons) {
      console.log(respons);
    }
  };

  const signIn = async (e) => {
    e.preventDefault();
    const respons = await authService.signIn(email, password).catch((error) => {
      toast.current.show({
        severity: "error",
        summary: "Wrong Credentials",
        detail: "Wrong email or password",
        life: 3000,
      });
    });
    if (respons) {
      console.log(respons);
    }
  };

  return (
    <div className="signin">
      <Toast ref={toast} position="top-right"></Toast>
      <div className="p-fluid">
        <div className="p-field p-py-2">
          <span className="p-float-label">
            <InputText
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
          </span>
        </div>

        <div className="p-field p-py-2">
          <span className="p-float-label">
            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              toggleMask
              feedback={false}
            />
            <label htmlFor="password">Password</label>
          </span>
        </div>

        <div className="p-grid">
          <div className="p-col">
            <Button
              label="Sign In"
              type="submit"
              className="p-button-outlined"
              onClick={(e) => signIn(e)}
            />
          </div>

          <div className="p-col">
            <Button
              label="Sign In With"
              className="p-button-outlined p-button-warning"
              onClick={(e) => signInWithGoogle(e)}
              icon="pi pi-google"
              iconPos="right"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
