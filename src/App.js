import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { List, Button } from "semantic-ui-react";
import EditConfigurations from "./EditConfigurations";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/config" component={EditConfigurations} />
        <div>
          <Button primary href="/config">
            Edit Config
          </Button>
          <List>
            <List.Item>
              <List.Icon name="users" />
              <List.Content>Semantic UI</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="marker" />
              <List.Content>New York, NY</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="mail" />
              <List.Content>
                <a href="mailto:jack@semantic-ui.com">jack@semantic-ui.com</a>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="linkify" />
              <List.Content>
                <a href="http://www.semantic-ui.com">semantic-ui.com</a>
              </List.Content>
            </List.Item>
          </List>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
