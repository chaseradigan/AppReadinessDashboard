import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EditConfigurations from "./ConfigComponents/EditConfigurations";
import Capabilities from "./HomeComponents/Capabilities";
import "./App.css";
import AllAppsTable from "./HomeComponents/AllAppsTable";
import InstancesTable from "./HomeComponents/InstancesTable";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Capabilities} />
        <Route exact path="/config" component={EditConfigurations} />
        <Route exact path="/:cap/:env" component={AllAppsTable} />
        <Route exact path="/:cap/:env/:app" component={InstancesTable} />
      </Switch>
    </Router>
  );
}

export default App;
