import { InputText } from "primereact/inputtext";
import { useState, useRef } from "react";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import * as authService from "../../services/authService";
import { Toast } from "primereact/toast";
import { Link } from "@reach/router";
import { showErrorMessage } from "../../utils/messages";
import * as userService from "../../services/userService";
import { useNavigate } from "@reach/router";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useRef(null);
  const navigate = useNavigate();

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      const { user } = await authService.signInWithGoogle();
      userService.createUserDocument(user);

      navigate("/", { replace: true });
    } catch (error) {
      showErrorMessage(toast, "Something went wrong", error.message);
    }
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const { user } = await authService.signIn(email, password);
      userService.createUserDocument(user);

      navigate("/", { replace: true });
    } catch (error) {
      showErrorMessage(toast, "Something went wrong", error.message);
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

        <div className="p-field p-py-2">
          New here? <Link to="/signUp">Create account</Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
