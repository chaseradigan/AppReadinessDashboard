import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EditConfigurations from "./EditConfigurations";
import HomePage from "./HomePage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/config" component={EditConfigurations} />
        <React.Fragment>
          <HomePage />
        </React.Fragment>
      </Switch>
    </Router>
  );
}

export default App;
