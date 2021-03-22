import { Router } from "@reach/router";
import Home from "./components/Home/Home";
import "primereact/resources/themes/arya-purple/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import SignIn from "./components/SignIn/SignIn";

function App() {
  return (
    <Router className="router">
      <Home path="/">
        <SignIn path="/"></SignIn>
      </Home>
    </Router>
  );
}

export default App;
