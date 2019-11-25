import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";
import "./App.css";
import Sidebar from "../sidebar";
import Home from "../course/home";
import GroupManagement from "../course/groups";

const DisplaySidebar = withRouter(({ location }) => (
  <Sidebar active={location.pathname} />
));

export default function App() {
  return (
    <Router>
      <DisplaySidebar />
      <Switch>
        <Route path="/groups">
          <GroupManagement />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
