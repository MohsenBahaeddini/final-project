import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Header/Navbar";
import Homepage from "./Pages/Homepage";
import Login from "./Header/Login";
import Signup from "./Header/Signup";
import Post from "./Pages/PostAd";
import GlobalStyles from "./GlobalStyles";
import AdDetails from "./Pages/AdDetails";
import Profile from "./Pages/Profile";
import MyMessages from "./Pages/MyMessages";

const App = () => {
  return (
    <>
      <Router>
        <GlobalStyles />
        <Navbar />
        <Switch>
          <Route exact path="/" component={Homepage}></Route>
          <Route exact path="/ad/:id">
            <AdDetails />
          </Route>
          {/* <Route exact path="/login">
            <Login />
          </Route> */}
          <Route exact path="login"></Route>
          <Route exact path="logout"></Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/post-ad">
            <Post />
          </Route>
          <Route exact path="/profile/:id">
            <Profile />
          </Route>
          <Route exact patch="/messages/:id">
            <MyMessages />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
