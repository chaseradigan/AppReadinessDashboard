import React, { Component } from "react";
import { Container, Icon, Button, Header, Menu, Table } from "semantic-ui-react";
import "../StyleSheets/Home.css";
import axios from 'axios';

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      capabilities: ["Cap1", "Cap2", "Cap3", "Cap4", "Cap5"],
      activeCapability: "Cap1"
    };
  }

  componentDidMount(){

    axios.get('http://localhost:9091/api/pcf/capabilities/all/metrics')
    .then(response=>{
      console.log(response.data);
    })

  }

  render() {
    return (
      <React.Fragment>
        
        <Container style={{ marginTop: "1.5em" }}>
          <Header as="h2" dividing>
            App Readiness
            <Button className="right" href="/config">
                <Icon name="cogs" /> Configurations
            </Button>
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
          <Header as="h4">
          PRIORITY APPLICATIONS
          </Header>
          <Table celled>
          <Table.Header>
          <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Disk</Table.HeaderCell>
              <Table.HeaderCell>CPU</Table.HeaderCell>
              <Table.HeaderCell>Memory</Table.HeaderCell>
          </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
                <Table.Cell>No Name Specified</Table.Cell>
                <Table.Cell>Unknown</Table.Cell>
                <Table.Cell negative>None</Table.Cell>
                <Table.Cell negative>None</Table.Cell>
                <Table.Cell negative>None</Table.Cell>
            </Table.Row>
            <Table.Row positive>
                <Table.Cell>Jimmy</Table.Cell>
                <Table.Cell>
                  <Icon name='checkmark' />
                  Approved
                </Table.Cell>
                <Table.Cell>None</Table.Cell>
                <Table.Cell negative>None</Table.Cell>
                <Table.Cell negative>None</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>Jamie</Table.Cell>
                <Table.Cell>Unknown</Table.Cell>
                <Table.Cell positive>
                  <Icon name='close' />
                  Requires call
                </Table.Cell>
                <Table.Cell negative>None</Table.Cell>
                <Table.Cell negative>None</Table.Cell>
            </Table.Row>
            <Table.Row negative>
                <Table.Cell>Jill</Table.Cell>
                <Table.Cell>Unknown</Table.Cell>
                <Table.Cell>None</Table.Cell>
                <Table.Cell negative>None</Table.Cell>
                <Table.Cell negative>None</Table.Cell>
            </Table.Row>
            <Table.Row negative>
                <Table.Cell>Jill</Table.Cell>
                <Table.Cell>Unknown</Table.Cell>
                <Table.Cell>None</Table.Cell>
                <Table.Cell negative>None</Table.Cell>
                <Table.Cell negative>None</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <Header as="h4">
          ALL APPLICATIONS
        </Header>
          <Table celled>
          <Table.Header>
          <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Notes</Table.HeaderCell>
          </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
                <Table.Cell>No Name Specified</Table.Cell>
                <Table.Cell>Unknown</Table.Cell>
                <Table.Cell negative>None</Table.Cell>
            </Table.Row>
            <Table.Row positive>
                <Table.Cell>Jimmy</Table.Cell>
                <Table.Cell>
                  <Icon name='checkmark' />
                  Approved
                </Table.Cell>
                <Table.Cell>None</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>Jamie</Table.Cell>
                <Table.Cell>Unknown</Table.Cell>
                <Table.Cell positive>
                  <Icon name='close' />
                  Requires call
                </Table.Cell>
            </Table.Row>
            <Table.Row negative>
                <Table.Cell>Jill</Table.Cell>
                <Table.Cell>Unknown</Table.Cell>
                <Table.Cell>None</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>


        </Container>
      </React.Fragment>
    );
  }
}


export default HomePage;
