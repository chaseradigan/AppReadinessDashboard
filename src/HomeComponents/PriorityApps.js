import React, { Component } from "react";
import { Container, Table, Checkbox } from "semantic-ui-react";
import moment from "moment";
export default class PriorityApps extends Component {
  constructor() {
    super();
    this.state = {
      apps: [],
      checkedApps: []
    };
  }
  componentDidMount() {
    this.setState({
      apps: this.props.apps,
      checkedApps: this.props.checkedApps
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.apps !== this.props.apps) {
      this.setState({ apps: this.props.apps });
    }
    if (prevProps.checkedApps !== this.props.checkedApps) {
      this.setState({ checkedApps: this.props.checkedApps });
    }
  }
  render() {
    return (
      <Container style={{ marginTop: 28, marginBottom: 28 }}>
        {this.state.apps !== null ? (
          <Table compact size="small" color="black" celled selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>App Name</Table.HeaderCell>
                <Table.HeaderCell>Error Rate</Table.HeaderCell>
                <Table.HeaderCell>Avg. Response Time</Table.HeaderCell>
                <Table.HeaderCell>State</Table.HeaderCell>
                <Table.HeaderCell>Memory</Table.HeaderCell>
                <Table.HeaderCell>Disk</Table.HeaderCell>
                <Table.HeaderCell>Total Instances</Table.HeaderCell>
                <Table.HeaderCell>Running Instances</Table.HeaderCell>
                <Table.HeaderCell>Metric Date</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Priority</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body style={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
              {this.state.apps.map(res => (
                <Table.Row
                  style={{ cursor: "pointer" }}
                  active={this.state.activeRow === res.appId}
                  onDoubleClick={() =>
                    this.props.history.push(
                      `/${this.props.match.params.cap}/${this.props.match.params.env}/${res.appId}`
                    )
                  }
                  key={res.appName}
                  className={
                    res.state === "GOOD"
                      ? "bGreen"
                      : res.state === "OKAY"
                      ? "bYellow"
                      : "bRed"
                  }
                >
                  <Table.Cell>{res.appName}</Table.Cell>
                  <Table.Cell>{res.curMetricDetails.errRate}</Table.Cell>
                  <Table.Cell>
                    {res.curMetricDetails.avgResponseTime}
                  </Table.Cell>
                  <Table.Cell>{res.curMetricDetails.state}</Table.Cell>
                  <Table.Cell>{res.curMetricDetails.memory}</Table.Cell>
                  <Table.Cell>{res.curMetricDetails.disk}</Table.Cell>
                  <Table.Cell>{res.curMetricDetails.totalInstances}</Table.Cell>

                  <Table.Cell>
                    {res.curMetricDetails.runningInstances}
                  </Table.Cell>
                  <Table.Cell>
                    {moment(res.curMetricDetails.metricDate)
                      .format("ddd MMM Do, h:mm A")
                      .toString()}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Checkbox
                      checked={this.state.checkedApps.includes(res.appId)}
                      onChange={() => this.props.removePriority(res.appId)}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          ""
        )}
      </Container>
    );
  }
}
