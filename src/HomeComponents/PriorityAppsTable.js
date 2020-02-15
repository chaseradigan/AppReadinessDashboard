import React, { Component } from 'react'
import {Table, Icon} from 'semantic-ui-react';

export default class PriorityAppsTable extends Component {
    render() {
        console.log(this.props.data);
        return (
            <div>
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
            </div>
        )
    }
}
