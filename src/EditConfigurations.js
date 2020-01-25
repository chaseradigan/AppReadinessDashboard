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
let cap1Array = [];
let cap2Array = [];
let cap3Array = [];
let cap4Array = [];
let cap5Array = [];
export default class EditConfigurations extends Component {
  constructor() {
    super();
    this.state = {
      appName: "",
      appClick: false,
      cap1Names: [],
      capabilities: ["Cap1", "Cap2", "Cap3", "Cap4", "Cap5"],
      activeCapability: "",
      loading: true
    };
    this.callBack = this.callBack.bind(this);
  }
  setData(caps) {
    for (let i = 0; i < caps.length; i++) {
      let cap = caps[i];
      for (let j = 0; j < cap.capApps.length; j++) {
        switch (i) {
          case 0:
            mapCap1Apps.set(cap.capApps[j].appName, cap.capApps[i]);
            cap1Array.push({ title: cap.capApps[j].appName });
            this.state.cap1Names.push(cap.capApps[j].appName);
            break;
          case 1:
            mapCap2Apps.set(cap.capApps[j].appName, cap.capApps[i]);
            cap2Array.push({ title: cap.capApps[j].appName });
            this.state.cap2Names.push(cap.capApps[j].appName);
            break;
          //more cases....
          default:
            break;
        }
      }
    }
  }
  componentDidMount() {
    axios
      .get("http://localhost:9091/api/pcf/capabilities/all/metrics")
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
  }
  searchSelect(name) {
    //callBack for child SearchBar.js
    this.setState({ appClick: true, appName: name });
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
                    Capability
                  </Label>

                  <span>
                    <Menu pointing secondary fluid widths={5}>
                      {this.state.capabilities.map(capability => (
                        <Menu.Item
                          disabled={this.state.loading}
                          color="blue"
                          key={capability}
                          active={this.state.activeCapability === capability}
                          onClick={() =>
                            this.setState({ activeCapability: capability })
                          }
                        >
                          {capability}
                        </Menu.Item>
                      ))}
                    </Menu>
                  </span>
                </Segment>
              </Grid.Column>
              <Grid.Column floated="right" textAlign="right" width={4}>
                <Segment disabled={this.state.activeCapability.length < 1}>
                  <SearchBar
                    apps={
                      this.state.activeCapability === "Cap1"
                        ? cap1Array
                        : cap2Array
                    }
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
                    size="large"
                    divided
                    animated
                    selection
                    verticalAlign="middle"
                    style={{ height: 300, overflowY: "auto" }}
                  >
                    {this.state.activeCapability === "Cap1" ? (
                      <React.Fragment>
                        {this.state.cap1Names.map(name => (
                          <List.Item
                            key={name}
                            onClick={() => {
                              if (this.state.appName === name) {
                                this.setState({ appClick: false, appName: "" });
                              } else {
                                this.setState({
                                  appClick: true,
                                  appName: name
                                });
                              }
                            }}
                            active={this.state.appName === name}
                          >
                            <List.Content>
                              <List.Header
                                style={{ textTransform: "capitalize" }}
                              >
                                {name}
                              </List.Header>
                            </List.Content>
                          </List.Item>
                        ))}
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                  </List>
                </Grid.Column>
              </React.Fragment>
            ) : (
              ""
            )}
            <Grid.Column width={this.state.activeCapability ? 12 : 16}>
              {this.state.appName ? (
                <ConfigForm
                  callBack={this.callBack}
                  appName={this.state.appName}
                  details={mapCap1Apps.get(this.state.appName)}
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
