import { InputText } from "primereact/inputtext";
import { useState, useRef } from "react";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Link } from "@reach/router";
import * as authService from "../../services/authService";
import { showErrorMessage } from "../../utils/messages";
import * as userService from "../../services/userService";
import { useNavigate } from "@reach/router";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setrepeatPassword] = useState("");
  const toast = useRef(null);
  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();
    if (repeatPassword !== password) {
      showErrorMessage(
        toast,
        "Password doesnt match!",
        "Password and Reapeat Password must be the same!"
      );

      return;
    }
    if (password.length < 6) {
      showErrorMessage(
        toast,
        "Password too short!",
        "Password has to be at least 6 characters!"
      );

      return;
    }
    try {
      const { user } = await authService.signUp(email, password);
      userService.createUserDocument(user);

      navigate("/", { replace: true });
    } catch (error) {
      showErrorMessage(toast, "Something went wrong", error.message);
    }
  };

  return (
    <div className="signup">
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
              feedback={true}
            />
            <label htmlFor="password">Password</label>
          </span>
        </div>
        <div className="p-field p-py-2">
          <span className="p-float-label">
            <Password
              id="repeatPassword"
              value={repeatPassword}
              onChange={(e) => setrepeatPassword(e.target.value)}
              toggleMask
              feedback={true}
            />
            <label htmlFor="repeatPassword">Repeat Password</label>
          </span>
        </div>
        <div className="p-grid">
          <div className="p-col">
            <Button
              label="Sign Up"
              className="p-button-outlined"
              onClick={(e) => signUp(e)}
            />
          </div>
        </div>

        <div className="p-field p-py-2">
          Already have an account? <Link to="/">SignIn</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
