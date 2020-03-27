import React, { Component } from "react";
import {
  Menu,
  Grid,
  Header,
  Container,
  Label,
  Segment,
  Icon,
  List,
  Button,
  Loader,
  Input
} from "semantic-ui-react";
import ConfigForm from "./ConfigForm";
import axios from "axios";
import matchSorter from "match-sorter";
export default class EditConfigurations extends Component {
  constructor() {
    super();
    this.state = {
      enviornments: [],
      appClick: false,
      capabilities: [],
      activeCapability: "",
      activeEnv: "",
      activeApp: "",
      activeAppName: "",
      apps: [],
      loading: true,
      config: null,
      loadingConfig: false
    };
  }

  handleCapability(capability) {
    if (this.state.activeCapability !== capability.capName) {
      this.setState({
        activeCapability: capability.capId,
        enviornments: capability.allEnvs
      });
    } else {
      this.setState({ activeCapability: "", enviornments: [] });
    }
  }
  async componentDidMount() {
    this.getCapabilities();
  }
  async getCapabilities() {
    await axios
      .get("/api/pcf/capability/all")
      .then(response => {
        console.log(response);
        this.setState({ capabilities: response.data, loading: false });
      })
      .catch(error => {
        console.log(error);
      });
  }
  async handleEnv(envId) {
    if (this.state.activeEnv !== envId) {
      this.setState({ activeEnv: envId });
      await axios
        .get(`/api/pcf/environment/${envId}/app/all`)
        .then(response => {
          console.log(response);
          this.setState({ apps: response.data, originalApps: response.data });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  async getConfigs(appId, appName) {
    if (this.state.activeApp !== appId) {
      this.setState({
        config: null,
        activeApp: appId,
        activeAppName: appName,
        loadingConfig: true
      });
      await axios
        .get(`/api/pcf/app/${appId}/configrules`)
        .then(response => {
          console.log(response);
          this.setState({ config: response.data, loadingConfig: false });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  handleSearch(searchValue) {
    let sorted = matchSorter(this.state.originalApps, searchValue, {
      keys: ["appName"]
    });
    this.setState({ apps: sorted });
  }

  render() {
    return (
      <React.Fragment>
        <Button
          floated="left"
          color="blue"
          onClick={() => this.props.history.push("/")}
        >
          <Icon name="arrow left" /> Back
        </Button>

        <Container style={{ marginTop: "1em" }}>
          <Header as="h2" block dividing>
            <Icon name="cogs" />
            Configurations
          </Header>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Label as="span" color="blue" ribbon>
                    Capabilities
                  </Label>

                  <span>
                    <Menu pointing secondary fluid widths={5}>
                      {this.state.capabilities.map(capability => (
                        <Menu.Item
                          disabled={this.state.loading}
                          color="black"
                          key={capability.capId}
                          active={
                            this.state.activeCapability === capability.capId
                          }
                          onClick={() => this.handleCapability(capability)}
                        >
                          {capability.capName}
                        </Menu.Item>
                      ))}
                    </Menu>

                    {this.state.activeCapability ? (
                      <Menu pointing secondary fluid widths={5}>
                        {this.state.enviornments.map(env => (
                          <Menu.Item
                            disabled={this.state.loading}
                            color="black"
                            key={env.envId}
                            active={this.state.activeEnv === env.envId}
                            onClick={() => this.handleEnv(env.envId)}
                          >
                            {env.envName}
                          </Menu.Item>
                        ))}
                      </Menu>
                    ) : (
                      ""
                    )}
                  </span>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid style={{ paddingTop: 0 }}>
            {this.state.activeEnv ? (
              <React.Fragment>
                <Grid.Column width={4} style={{ paddingTop: 0 }}>
                  <Header
                    dividing
                    style={{ marginTop: 10, marginBottom: 0 }}
                    as="h3"
                  >
                    <Header.Content>App Names</Header.Content>
                  </Header>
                  <Input
                    size="small"
                    style={{ margin: "14px" }}
                    icon="search"
                    fluid
                    placeholder="Search Apps..."
                    disabled={this.state.apps.length < 1}
                    onChange={e => this.handleSearch(e.target.value)}
                  />
                  <List
                    size="medium"
                    divided
                    animated
                    selection
                    verticalAlign="middle"
                    style={{ maxHeight: 400, overflowY: "auto" }}
                  >
                    <React.Fragment>
                      {this.state.apps.map(app => (
                        <List.Item
                          key={app.appId}
                          active={this.state.activeApp === app.appId}
                          onClick={() =>
                            this.getConfigs(app.appId, app.appName)
                          }
                        >
                          <List.Content>
                            <List.Header
                              style={{ textTransform: "capitalize" }}
                            >
                              {app.appName}
                            </List.Header>
                          </List.Content>
                        </List.Item>
                      ))}
                    </React.Fragment>
                  </List>
                </Grid.Column>
              </React.Fragment>
            ) : (
              ""
            )}
            <Grid.Column width={this.state.activeCapability ? 12 : 16}>
              {this.state.config ? (
                <ConfigForm
                  capId={this.state.activeCapability}
                  appId={this.state.activeApp}
                  appName={this.state.activeAppName}
                  config={this.state.config}
                />
              ) : (
                <Segment placeholder piled textAlign="center">
                  {this.state.activeCapability ? (
                    <React.Fragment>
                      {this.state.loadingConfig ? (
                        <Segment vertical basic>
                          <Segment basic>Gathering Configurations...</Segment>
                          <Loader inline active />
                        </Segment>
                      ) : (
                        <React.Fragment>
                          {this.state.activeEnv ? (
                            <Header as="h3">Select an App.</Header>
                          ) : (
                            <Header as="h3">Select an Enviornment.</Header>
                          )}
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Header as="h3">Select a Capability.</Header>
                    </React.Fragment>
                  )}
                </Segment>
              )}
            </Grid.Column>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}
