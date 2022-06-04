import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Header/Navbar";
import Homepage from "./Homepage/Homepage";
import Login from "./Header/Login";
import Signup from "./Header/Signup";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
