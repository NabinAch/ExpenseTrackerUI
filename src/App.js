import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Alert from "react-bootstrap/Alert";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import ManualEntry from "./components/ManaulEntry/ManualEntry";
import "bootstrap/dist/css/bootstrap.min.css";
import Search from "./components/Search/Search";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <>
      <Header />

      <div className="main-container">
        <Router>
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="canvas">
            <Switch>
              <Route path="/history" component={Search} />
              <Route path="/enter" component={ManualEntry} />
            </Switch>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
