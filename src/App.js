import { Router } from "@reach/router";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import "primereact/resources/themes/arya-purple/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import SignIn from "./components/SignIn/SignIn";
import UserProvider from "./providers/UserProvider";

function App() {
  return (
    <UserProvider>
      <Router className="router">
        <Home path="/">
          <SignIn path="/"></SignIn>
          <SignUp path="/signUp"></SignUp>
        </Home>
      </Router>
    </UserProvider>
  );
}

export default App;
