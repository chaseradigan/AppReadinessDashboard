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
  Input,
  Button
} from "semantic-ui-react";
import ConfigForm from "./ConfigComponents/ConfigForm";

export default class EditConfigurations extends Component {
  constructor() {
    super();
    this.state = {
      appName: "",
      appClick: false,
      names: [
        "app1",
        "app2",
        "app3",
        "app4",
        "app5",
        "app6",
        "app7",
        "app8",
        "app9"
      ],
      capabilities: ["Cap1", "Cap2", "Cap3", "Cap4", "Cap5"],
      activeCapability: ""
    };
  }

  render() {
    console.log(this.state.appName);
    return (
      <React.Fragment>
        <Button
          floated="left"
          color="blue"
          onClick={() => this.props.history.push("/")}
        >
          <Icon name="arrow left" /> Back
        </Button>

        <Container style={{ marginTop: "3em" }}>
          <Header as="h2" block dividing>
            <Icon name="cogs" />
            Configurations
          </Header>
          <Grid columns={3} doubling>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Label as="span" color="blue" ribbon>
                    Capability
                  </Label>

                  <span>
                    <Menu pointing secondary>
                      {this.state.capabilities.map(capability => (
                        <Menu.Item
                          active={this.state.activeCapability === capability}
                          key={capability}
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
                  <Input
                    icon={<Icon name="search" inverted circular link />}
                    placeholder="Search App ..."
                    size="small"
                    fluid
                  />
                  <List
                    size="large"
                    divided
                    animated
                    selection
                    verticalAlign="middle"
                    style={{ height: 300, overflowY: "auto" }}
                  >
                    {this.state.names.map(name => (
                      <List.Item
                        key={name}
                        onClick={() => {
                          if (this.state.appName === name) {
                            this.setState({ appClick: false, appName: "" });
                          } else {
                            this.setState({ appClick: true, appName: name });
                          }
                        }}
                        active={this.state.appName === name}
                      >
                        <List.Content>
                          <List.Header style={{ textTransform: "capitalize" }}>
                            {name}
                          </List.Header>
                        </List.Content>
                      </List.Item>
                    ))}
                  </List>
                </Grid.Column>
              </React.Fragment>
            ) : (
              ""
            )}
            <Grid.Column width={this.state.activeCapability ? 12 : 16}>
              {this.state.appName ? (
                <ConfigForm appName={this.state.appName} />
              ) : (
                <Segment placeholder piled textAlign="center">
                  {this.state.activeCapability ? (
                    <Header as="h2">Select an App.</Header>
                  ) : (
                    <Header as="h2">Select a Capability.</Header>
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
// <Table celled color="grey" inverted selectable>
//               <Table.Header>
//                 <Table.Row>
//                   <Table.HeaderCell>App Name</Table.HeaderCell>
//                   <Table.HeaderCell>Cpu_pct</Table.HeaderCell>
//                   <Table.HeaderCell>Memory</Table.HeaderCell>
//                   <Table.HeaderCell>Disk</Table.HeaderCell>
//                   <Table.HeaderCell>Instances</Table.HeaderCell>
//                 </Table.Row>
//               </Table.Header>

//               <Table.Body>
//                 <ConfigRow />
//               </Table.Body>
//               <Table.Footer fullWidth>
//                 <Table.Row>
//                   <Table.HeaderCell />
//                   <Table.HeaderCell colSpan="4">
//                     <Button
//                       floated="right"
//                       icon
//                       labelPosition="left"
//                       primary
//                       size="small"
//                     >
//                       <Icon name="cog" /> Submit
//                     </Button>
//                   </Table.HeaderCell>
//                 </Table.Row>
//               </Table.Footer>
//             </Table>
