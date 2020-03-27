import React, { Component } from "react";
import { Table, Container, Loader, Input, Checkbox } from "semantic-ui-react";
import axios from "axios";
import CapEnvMenu from "./CapEnvMenu";
import matchSorter from "match-sorter";
import moment from "moment";
import PriorityApps from "./PriorityApps";
export default class AllAppsTable extends Component {
  constructor() {
    super();
    this.state = {
      apps: null,
      originalapps: null,
      loading: true,
      activeRow: "",
      checkedApps: [],
      priorityApps: []
    };
  }

  componentDidMount() {
    this.getApps();
    this.getPriorityApps();
    // sortedCapData.sort((a, b) => {
    //   if (a.state && !b.state) return -1; // if a is state and b is not, then put a above b
    //   if (!a.state && b.state) return 1;
    //   console.log(a.state, b.state);
    //   if (a.state === b.state) {
    //     return 0;
    //   }

    //   if (a.state === "GOOD") {
    //     return -1;
    //   }
    //   if (a.state === "BAD") {
    //     return 1;
    //   }
    //   if (b.state === "GOOD") {
    //     return 1;
    //   }
    //   if (b.state === "BAD") {
    //     return -1;
    //   }
    // });
  }
  async getPriorityApps() {
    await axios
      .get(`/api/pcf/capability/${this.props.match.params.cap}/priority/apps`)
      .then(response => {
        console.log(response);
        this.setState({ priorityApps: response.data });
        let temp = [];
        for (let i = 0; i < response.data.length; i++) {
          temp.push(response.data[i].appId);
        }
        this.setState({ checkedApps: temp });
      })
      .catch(error => {
        console.log(error);
      });
  }
  async getApps() {
    await axios
      .get(`/api/pcf/environment/${this.props.match.params.env}/app/all`)
      .then(response => {
        console.log(response);
        this.setState({
          apps: response.data,
          originalapps: response.data,
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  async handlePriority(res) {
    if (!this.state.checkedApps.includes(res.appId)) {
      let temp = this.state.checkedApps;
      let tempPriority = this.state.priorityApps;
      tempPriority.push(res);
      temp.push(res.appId);
      this.setState({ checkedApps: temp, priorityApps: tempPriority });

      let payload = [res.appId];
      await axios({
        url: `/api/pcf/capability/${this.props.match.params.cap}/priority/apps`,
        headers: { addApps: true },
        method: "post",
        data: payload
      })
        .then(response => {
          //this.getPriorityApps();
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  async removePriority(appId) {
    if (this.state.checkedApps.includes(appId)) {
      let checkedApps = this.state.checkedApps;
      let temp = [];
      let tempPriority = [];
      for (let i = 0; i < checkedApps.length; i++) {
        if (checkedApps[i] !== appId) {
          temp.push(checkedApps[i]);
        }
      }
      for (let i = 0; i < this.state.priorityApps.length; i++) {
        if (this.state.priorityApps[i].appId !== appId) {
          tempPriority.push(this.state.priorityApps[i]);
        }
      }
      this.setState({ checkedApps: temp, priorityApps: tempPriority });
      let payload = [appId];
      await axios({
        url: `/api/pcf/capability/${this.props.match.params.cap}/priority/apps`,
        headers: { addApps: false },
        method: "post",
        data: payload
      })
        .then(response => {
          //this.getPriorityApps();
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  handleSearch(searchValue) {
    let sorted = matchSorter(this.state.originalapps, searchValue, {
      keys: ["appName"]
    });
    this.setState({ apps: sorted });
  }
  handleRowClick(res) {
    if (this.state.activeRow !== res.appId) {
      this.setState({ activeRow: res.appId });
      this.props.history.push(
        `/${this.props.match.params.cap}/${this.props.match.params.env}/${res.appId}`
      );
    } else {
      this.setState({ activeRow: "" });
    }
  }

  render() {
    return (
      <React.Fragment>
        <CapEnvMenu {...this.props} />
        {this.state.priorityApps.length > 0 && this.state.apps.length > 0 ? (
          <PriorityApps
            {...this.props}
            apps={this.state.priorityApps}
            checkedApps={this.state.checkedApps}
            removePriority={appId => this.removePriority(appId)}
          />
        ) : (
          ""
        )}
        {this.state.loading ? (
          <Loader active />
        ) : (
          <Container style={{ marginTop: 28, marginBottom: 28 }}>
            {this.state.apps !== null ? (
              <Table compact size="small" color="black" celled selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan="1">
                      <Input
                        fluid
                        className="icon"
                        icon="search"
                        placeholder="Search Apps..."
                        onChange={e => this.handleSearch(e.target.value)}
                      />
                    </Table.HeaderCell>
                    <Table.HeaderCell colSpan="9" />
                  </Table.Row>
                </Table.Header>
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
                    <Table.HeaderCell textAlign="center">
                      Priority
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body style={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
                  {this.state.apps.map(res => (
                    <React.Fragment>
                      {this.state.checkedApps.includes(res.appId) ? (
                        <React.Fragment />
                      ) : (
                        <Table.Row
                          style={{ cursor: "pointer" }}
                          active={this.state.activeRow === res.appId}
                          onDoubleClick={() => this.handleRowClick(res)}
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
                          <Table.Cell>
                            {res.curMetricDetails.errRate}
                          </Table.Cell>
                          <Table.Cell>
                            {res.curMetricDetails.avgResponseTime}
                          </Table.Cell>
                          <Table.Cell>{res.curMetricDetails.state}</Table.Cell>
                          <Table.Cell>{res.curMetricDetails.memory}</Table.Cell>
                          <Table.Cell>{res.curMetricDetails.disk}</Table.Cell>
                          <Table.Cell>
                            {res.curMetricDetails.totalInstances}
                          </Table.Cell>

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
                              checked={this.state.checkedApps.includes(
                                res.appId
                              )}
                              onChange={() => this.handlePriority(res)}
                            />
                          </Table.Cell>
                        </Table.Row>
                      )}
                    </React.Fragment>
                  ))}
                </Table.Body>
              </Table>
            ) : (
              ""
            )}
          </Container>
        )}
      </React.Fragment>
    );
  }
}
