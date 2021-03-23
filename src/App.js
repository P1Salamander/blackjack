import { Router } from "@reach/router";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import "primereact/resources/themes/arya-purple/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import SignIn from "./components/SignIn/SignIn";
import UserProvider, { UserContext } from "./providers/UserProvider";
import { useContext } from "react";
import Game from "./components/Game/Game";

function App() {
  const user = useContext(UserContext);

  return user ? (
    <Router className="router">
      <Game path="/"></Game>
    </Router>
  ) : (
    <Router className="router">
      <Home path="/">
        <SignIn path="/"></SignIn>
        <SignUp path="/signUp"></SignUp>
      </Home>
    </Router>
  );
}

export default App;
