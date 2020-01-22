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
  Input
} from "semantic-ui-react";
import ConfigForm from "./TableComponents/ConfigForm";

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
      ]
    };
  }

  render() {
    console.log(this.state.appName);
    return (
      <Container style={{ marginTop: "3em" }}>
        <Header as="h2" dividing>
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
                  <Menu
                    items={[
                      { key: "1", name: "link-1", content: "Cap1" },
                      { key: "2", name: "link-2", content: "Cap2" },
                      { key: "3", name: "link-3", content: "Cap3" },
                      { key: "4", name: "link-3", content: "Cap4" },
                      { key: "5", name: "link-3", content: "Cap5" }
                    ]}
                    pointing
                    secondary
                  />
                </span>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid style={{ paddingTop: 0 }}>
          <Grid.Column width={4} style={{ paddingTop: 0 }}>
            <Header dividing style={{ marginTop: 10, marginBottom: 0 }} as="h3">
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
          <Grid.Column width={12}>
            {this.state.appClick ? (
              <ConfigForm appName={this.state.appName} />
            ) : (
              ""
            )}
          </Grid.Column>
        </Grid>
      </Container>
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
