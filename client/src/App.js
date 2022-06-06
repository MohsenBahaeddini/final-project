import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Header/Navbar";
import Homepage from "./Pages/Homepage";
import Login from "./Header/Login";
import Signup from "./Header/Signup";
import Post from "./Pages/PostAd";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" comppnent={Homepage}></Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/post-ad">
            <Post />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
