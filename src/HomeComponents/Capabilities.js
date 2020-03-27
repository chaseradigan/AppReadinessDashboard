import React, { Component } from "react";
import axios from "axios";
import { Container, Grid, Card, Header, Divider } from "semantic-ui-react";
import CapEnvMenu from "./CapEnvMenu";

export default class Capabilities extends Component {
  constructor() {
    super();
    this.state = {
      capabilities: [],
      envs: [],
      clickedCap: ""
    };
  }
  componentDidMount() {
    this.getCapabilities();
  }
  async getCapabilities() {
    await axios
      .get("http://localhost:9090/api/pcf/capability/all")
      .then(response => {
        console.log(response);
        if (response.data) {
          this.setState({ capabilities: response.data });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  handleCapClick(cap) {
    if (this.state.clickedCap === cap.capId)
      this.setState({ envs: [], clickedCap: "" });
    else this.setState({ envs: cap.allEnvs, clickedCap: cap.capId });
  }
  render() {
    return (
      <React.Fragment>
        <CapEnvMenu {...this.props} />

        <Container>
          <Header style={{ marginTop: 28 }} as="h1" textAlign="center">
            Capabilities
          </Header>
          <Grid>
            <Grid.Row>
              {this.state.capabilities.map(cap => (
                <Grid.Column key={cap.capId}>
                  <Card
                    onClick={() => this.handleCapClick(cap)}
                    className={
                      cap.state === "GOOD"
                        ? "bGreen"
                        : cap.state === "OKAY"
                        ? "bYellow"
                        : "bRed"
                    }
                  >
                    <Card.Content
                      style={{ padding: 40, paddingTop: 60, paddingBottom: 60 }}
                      textAlign="center"
                    >
                      <Card.Header style={{ color: "white" }}>
                        {cap.capName}
                      </Card.Header>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              ))}
            </Grid.Row>
            {this.state.envs.length > 0 ? <Divider /> : <React.Fragment />}
          </Grid>
          {this.state.envs.length > 0 ? (
            <Header as="h2" textAlign="center">
              Enviornments
            </Header>
          ) : (
            <React.Fragment />
          )}
          <Grid>
            <Grid.Row>
              {this.state.envs.length > 0 ? (
                <React.Fragment>
                  {this.state.envs.map(env => (
                    <Grid.Column key={env.envId}>
                      <Card
                        onClick={() =>
                          this.props.history.push(
                            `/${this.state.clickedCap}/${env.envId}`
                          )
                        }
                        className={
                          env.state === "GOOD"
                            ? "bGreen"
                            : env.state === "OKAY"
                            ? "bYellow"
                            : "bRed"
                        }
                      >
                        <Card.Content
                          style={{ padding: 28 }}
                          textAlign="center"
                        >
                          <Card.Header style={{ color: "white" }}>
                            {env.envName}
                          </Card.Header>
                        </Card.Content>
                      </Card>
                    </Grid.Column>
                  ))}
                </React.Fragment>
              ) : (
                <React.Fragment></React.Fragment>
              )}
            </Grid.Row>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}
