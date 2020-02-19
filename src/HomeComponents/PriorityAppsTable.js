import React, { Component } from "react";
import { Table, Icon } from "semantic-ui-react";

export default class PriorityAppsTable extends Component {
  render() {
    console.log(this.props.data);
    return (
      <div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>App Name</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Memory</Table.HeaderCell>
              <Table.HeaderCell>Disk</Table.HeaderCell>
              <Table.HeaderCell>CPU_PCT</Table.HeaderCell>
              <Table.HeaderCell>Avg Response Time</Table.HeaderCell>
              <Table.HeaderCell>Error Rate</Table.HeaderCell>
              <Table.HeaderCell>State</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>None</Table.Cell>
              <Table.Cell>None</Table.Cell>
              <Table.Cell>None</Table.Cell>
              <Table.Cell>None</Table.Cell>
              <Table.Cell>None</Table.Cell>
              <Table.Cell>None</Table.Cell>
              <Table.Cell>None</Table.Cell>
              <Table.Cell>None</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }
}
