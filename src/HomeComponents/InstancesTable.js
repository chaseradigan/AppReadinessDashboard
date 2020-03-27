import React, { Component } from "react";
import axios from "axios";
import { Table, Container, Loader, Header } from "semantic-ui-react";
import CapEnvMenu from "./CapEnvMenu";

import moment from "moment";
export default class InstancesTable extends Component {
  constructor() {
    super();
    this.state = {
      instances: [],
      loading: true,
      appName: ""
    };
  }
  componentDidMount() {
    this.getInstances(this.props.match.params.app);
  }
  async getInstances(appId) {
    await axios
      .get(`/api/pcf/app/${appId}/curinstance/all`)
      .then(response => {
        console.log(response);
        if (response.data && response.data.length > 0) {
          this.setState({ instances: response.data });
        }
        let appName = "";
        appName = this.props.match.params.app;
        let temp = appName.split("_");
        console.log(temp);
        this.setState({ loading: false, appName: temp[1] });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <React.Fragment>
        <CapEnvMenu {...this.props} />
        {this.state.loading ? (
          <Loader active />
        ) : (
          <Container style={{ marginTop: 28, marginBottom: 28 }}>
            <Header as="h3">{this.state.appName}</Header>
            <Table color="black" celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>State</Table.HeaderCell>
                  <Table.HeaderCell>Memory</Table.HeaderCell>
                  <Table.HeaderCell>Disk</Table.HeaderCell>
                  <Table.HeaderCell>Cpu %</Table.HeaderCell>
                  <Table.HeaderCell>Up Time</Table.HeaderCell>

                  <Table.HeaderCell>Metric Date</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body style={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
                {this.state.instances.map(res => (
                  <Table.Row key={res.instanceId}>
                    <Table.Cell>{res.curMetric.state}</Table.Cell>
                    <Table.Cell>{res.curMetric.memory}</Table.Cell>
                    <Table.Cell>{res.curMetric.disk}</Table.Cell>
                    <Table.Cell>{res.curMetric.cpuPct}</Table.Cell>

                    <Table.Cell>{res.curMetric.upTIme}</Table.Cell>
                    <Table.Cell>
                      {moment(res.curMetric.metricDate)
                        .format("ddd MMM Do, h:mm A")
                        .toString()}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Container>
        )}
      </React.Fragment>
    );
  }
}
