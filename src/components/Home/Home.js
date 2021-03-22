import "./Home.css";
import { Card } from "primereact/card";

function Home(props) {
  return (
    <div className="home p-grid p-align-center p-m-0">
      <Card className="p-md-6 p-sm-10 p-lg-3 p-d-block p-mx-auto">
        {props.children}
      </Card>
    </div>
  );
}

export default Home;
