import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "../sidebar";
import Home from "../course/home";
import GroupManagement from "../course/groups";

export default function App() {
  return (
    <Router>
      <Sidebar active={window.location.pathname} />
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
