import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Header/Navbar";
import Homepage from "./Pages/Homepage";
import Post from "./Pages/PostAd";
import GlobalStyles from "./GlobalStyles";
import AdDetails from "./Pages/AdDetails";
import Profile from "./Pages/Profile";
import MyMessages from "./Pages/MyMessages";
import SingleConversation from "./Pages/SingleConversation";

const App = () => {
  // localStorage.setItem("items", []);
  return (
    <>
      <Router>
        <GlobalStyles />
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/ad/:id">
            <AdDetails />
          </Route>
          <Route exact path="login"></Route>
          <Route exact path="logout"></Route>
          <Route exact path="/post-ad">
            <Post />
          </Route>
          <Route exact path="/profile/:id">
            <Profile />
          </Route>
          <Route exact path="/messages/:id">
            <MyMessages />
          </Route>
          <Route exact path="/conversation/:id">
            <SingleConversation />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
