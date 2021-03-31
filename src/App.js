import { Router } from "@reach/router";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import "primereact/resources/themes/arya-purple/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import SignIn from "./components/SignIn/SignIn";
import { UserContext } from "./providers/UserProvider";
import { useContext } from "react";
import Main from "./components/Main/Main";
import Profile from "./components/Profile/Profile";

function App() {
  const user = useContext(UserContext);

  return user ? (
    <Router className="router">
      <Profile path="/profile" user={user} />
      <Main path="/" user={user} />
    </Router>
  ) : (
    <Router className="router">
      <Home path="/">
        <SignIn path="/" />
        <SignUp path="/signUp" />
      </Home>
    </Router>
  );
}

export default App;
