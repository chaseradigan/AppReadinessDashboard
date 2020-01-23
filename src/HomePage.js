import React, { Component } from "react";
import { Container, Icon, Button, Header, Menu } from "semantic-ui-react";

export default class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      capabilities: ["Cap1", "Cap2", "Cap3", "Cap4", "Cap5"],
      activeCapability: ""
    };
  }
  render() {
    return (
      <React.Fragment>
        <Button href="/config">
          <Icon name="cogs" /> Configurations
        </Button>
        <Container style={{ marginTop: "3em" }}>
          <Header as="h2" dividing>
            App Readiness
          </Header>
          <Menu pointing secondary fluid widths={5} size="massive">
            {this.state.capabilities.map(capability => (
              <Menu.Item
                active={this.state.activeCapability === capability}
                key={capability}
                onClick={() => this.setState({ activeCapability: capability })}
              >
                {capability}
              </Menu.Item>
            ))}
          </Menu>
        </Container>
      </React.Fragment>
    );
  }
}
