import React, { Component } from "react";
import {
  Container,
  Icon,
  Button,
  Header,
  Menu,
  Dimmer,
  Loader,
  Message
} from "semantic-ui-react";
import AppTable from "./AllAppsTable";
import PriorityTable from "./PriorityAppsTable";
import "../StyleSheets/Home.css";
import axios from "axios";

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      activeCapability: [],
      priorityData: [],
      allAppsData: null,
      loading: true,
      visible: true
    };
  }

  async componentWillMount() {
    //console.log("Priority Data:")
    //console.log(this.state.priorityData);
    await axios
      .get("/api/pcf/capabilities/all/metrics")
      .then(response => {
        this.setState({
          loading: false,
          allAppsData: response.data,
          activeCapability: response.data.capabilities[0].capName
        });
        console.log(response.data);
        axios
          .get(
            "/api/pcf/capabilities/" +
              this.state.activeCapability +
              "/all/priority/apps"
          )
          .then(response => {
            //console.log(response.data);
            this.setState({ priorityData: response.data });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDismiss = () => {
    //this.setState({ visible: false })

    setTimeout(() => {
      this.setState({ visible: true });
    }, 2000);
  };

  render() {
    return (
      <React.Fragment>
        <Container style={{ marginTop: "1.5em", marginBottom: "1.5em" }}>
          <Header as="h2" dividing>
            App Readiness
            <Button className="right" href="/config">
              <Icon name="cogs" /> Configurations
            </Button>
          </Header>

          {this.state.loading ? (
            <Dimmer active inverted>
              <Loader inverted content="Loading" />
            </Dimmer>
          ) : (
            <React.Fragment>
              <Menu
                fluid
                //widths={5}
                inverted
                size="large"
              >
                {this.state.allAppsData.capabilities.map(capability => (
                  <Menu.Item
                    active={this.state.activeCapability === capability.capName}
                    key={capability}
                    color={
                      capability.state === "GOOD"
                        ? "green"
                        : capability.state === "OKAY"
                        ? "yellow"
                        : "red"
                    }
                    onClick={() =>
                      this.setState({ activeCapability: capability.capName })
                    }
                    style={{
                      textTransform: "capitalize"
                    }}
                  >
                    {capability.capName}
                  </Menu.Item>
                ))}
              </Menu>
              {this.state.priorityData.length === 0 ? (
                <div>Priority Not Populated</div>
              ) : (
                <React.Fragment>
                  {this.state.priorityData.capApps !== null ? (
                    <React.Fragment>
                      <Header as="h4">PRIORITY APPLICATIONS</Header>
                      <PriorityTable />
                    </React.Fragment>
                  ) : (
                    <Message
                      //onDismiss={this.handleDismiss}
                      content="There are no priority applications under this capability.
                   You can change the configurations if you want to add a priority app."
                    />
                  )}
                </React.Fragment>
              )}

              <div>
                <Header as="h4">ALL APPLICATIONS</Header>
                {this.state.allAppsData !== null ? (
                  <AppTable
                    activecap={this.state.activeCapability}
                    data={this.state.allAppsData}
                  />
                ) : (
                  ""
                )}
              </div>
            </React.Fragment>
          )}
        </Container>
      </React.Fragment>
    );
  }
}

export default HomePage;
