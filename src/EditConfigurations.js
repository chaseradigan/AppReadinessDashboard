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
  Button
} from "semantic-ui-react";
import ConfigForm from "./ConfigComponents/ConfigForm";
import axios from "axios";
import SearchBar from "./ConfigComponents/SearchBar";
let mapCap1Apps = new Map();
let mapCap2Apps = new Map();
let mapCap3Apps = new Map();
let mapCap4Apps = new Map();
let mapCap5Apps = new Map();
let activeMap;
let cap1Array = [];
let cap2Array = [];
let cap3Array = [];
let cap4Array = [];
let cap5Array = [];
let activeArray;
export default class EditConfigurations extends Component {
  constructor() {
    super();
    this.state = {
      appName: "",
      appClick: false,
      capabilities: [],
      activeCapability: "",
      loading: true,
      details: {}
    };
    this.callBack = this.callBack.bind(this);
    this.capabilityChange = this.capabilityChange.bind(this);
  }
  setData(caps) {
    for (let i = 0; i < caps.length; i++) {
      let cap = caps[i];
      this.state.capabilities.push(cap.capName);
      for (let j = 0; j < cap.capApps.length; j++) {
        switch (i) {
          case 0:
            mapCap1Apps.set(cap.capApps[j].appName, cap.capApps[j]);
            cap1Array.push({ title: cap.capApps[j].appName });
            break;
          case 1:
            mapCap2Apps.set(cap.capApps[j].appName, cap.capApps[j]);
            cap2Array.push({ title: cap.capApps[j].appName });
            break;
          //more cases....
          default:
            break;
        }
      }
    }
  }
  capabilityChange(capability) {
    if (this.state.activeCapability !== capability) {
      this.setState({ activeCapability: capability, appName: "" });
      switch (capability) {
        case this.state.capabilities[0]:
          activeMap = mapCap1Apps;
          activeArray = cap1Array;
          break;
        case this.state.capabilities[1]:
          activeMap = mapCap2Apps;
          activeArray = cap2Array;
          break;
        case this.state.capabilities[2]:
          activeMap = mapCap3Apps;
          activeArray = cap3Array;
          break;
        case this.state.capabilities[3]:
          activeMap = mapCap4Apps;
          activeArray = cap4Array;
          break;
        case this.state.capabilities[4]:
          activeMap = mapCap5Apps;
          activeArray = cap5Array;
          break;
        default:
          break;
      }
    } else {
      this.setState({ activeCapability: "", appName: "" });
    }
  }
  async componentDidMount() {
    await axios
      .get("/api/pcf/capabilities/all/metrics?configOrNot=true")
      .then(response => {
        console.log(response);

        let caps = response.data.capabilities;
        this.setData(caps);
        this.setState({ loading: false });
      });
  }
  callBack(appName, configs) {
    console.log(appName);
    console.log(configs);
    let app = activeMap.get(appName);
    app.configRule = configs;
    app.configured = true;
    mapCap1Apps.set(appName, app);
    console.log(app);
  }
  searchSelect(name) {
    //callBack for child SearchBar.js
    this.setState({
      appClick: true,
      appName: name,
      details: activeMap.get(name)
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.appName !== this.state.appName) {
      this.setState({ details: activeMap.get(this.state.appName) });
      return true;
    }
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
          <Grid columns={2} doubling>
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
                          color="blue"
                          key={capability}
                          active={this.state.activeCapability === capability}
                          onClick={() => this.capabilityChange(capability)}
                        >
                          {String(capability).toUpperCase()}
                        </Menu.Item>
                      ))}
                    </Menu>
                  </span>
                </Segment>
              </Grid.Column>
              <Grid.Column floated="right" textAlign="right" width={4}>
                <Segment disabled={this.state.activeCapability.length < 1}>
                  <SearchBar
                    apps={activeArray}
                    searchSelect={name => {
                      this.searchSelect(name);
                    }}
                    disabled={this.state.activeCapability.length < 1}
                  />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid style={{ paddingTop: 0 }}>
            {this.state.activeCapability ? (
              <React.Fragment>
                <Grid.Column width={4} style={{ paddingTop: 0 }}>
                  <Header
                    dividing
                    style={{ marginTop: 10, marginBottom: 0 }}
                    as="h3"
                  >
                    <Header.Content>App Names</Header.Content>
                  </Header>

                  <List
                    size="medium"
                    divided
                    animated
                    selection
                    verticalAlign="middle"
                    style={{ maxHeight: 400, overflowY: "auto" }}
                  >
                    <React.Fragment>
                      {activeArray.map(name => (
                        <List.Item
                          key={name.title}
                          onClick={() => {
                            if (this.state.appName === name.title) {
                              this.setState({
                                appClick: false,
                                appName: ""
                              });
                            } else {
                              this.setState({
                                appClick: true,
                                appName: name.title,
                                details: activeMap.get(name.title)
                              });
                            }
                          }}
                          active={this.state.appName === name.title}
                        >
                          <List.Content>
                            <List.Header
                              style={{ textTransform: "capitalize" }}
                            >
                              {name.title}
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
              {this.state.appName ? (
                <ConfigForm
                  capId={this.state.activeCapability}
                  callBack={this.callBack}
                  appName={this.state.appName}
                  details={this.state.details}
                />
              ) : (
                <Segment placeholder piled textAlign="center">
                  {this.state.activeCapability ? (
                    <Header as="h3">Select an App.</Header>
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
