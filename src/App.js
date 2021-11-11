import React from "react";
import { Switch } from "react-router";
import { Route } from "react-router-dom";

import { StudentProvider } from "./contexts/StudentContext";
import Addpage from "./pages/AddPage";
import Viewpage from "./pages/ViewPage";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div>
      <NavBar />
      <StudentProvider>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/addpage">
            <Addpage />
          </Route>
          <Route exact path="/viewpage">
            <Viewpage />
          </Route>
        </Switch>
      </StudentProvider>
    </div>
  );
};

export default App;
