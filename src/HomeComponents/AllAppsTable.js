import React, { Component } from "react";
import { Table } from "semantic-ui-react";
export default class AllAppsTable extends Component {
  constructor() {
    super();
    this.state = {
      capabilityData: null
    };
  }

  componentDidMount() {
    //console.log("DidMount")
    this.props.data.capabilities.map(cap => {
      console.log("IN MAP");
      console.log(cap.capName);
      console.log(this.props.activecap);
      console.log(cap.capApps);
      if (cap.capName === this.props.activecap) {
        let sortedCapData = [];
        sortedCapData = cap.capApps;
        // this.setState({ capabilityData: cap.capApps });
        // It is expected to return a negative value if first argument is less than second argument, zero if they're equal and a positive value otherwise.
        sortedCapData.sort((a, b) => {
          if (a.state && !b.state) return -1; // if a is state and b is not, then put a above b
          if (!a.state && b.state) return 1;
          console.log(a.state, b.state);
          if (a.state === b.state) {
            return 0;
          }

          if (a.state === "GOOD") {
            return 1;
          }
          if (a.state === "BAD") {
            return -1;
          }
          if (b.state === "GOOD") {
            return -1;
          }
          if (b.state === "BAD") {
            return 1;
          }
        });
        this.setState({ capabilityData: sortedCapData });
      }
    });
  }

  render() {
    //console.log(this.props.data.capabilities);
    //console.log(this.props.activecap)
    console.log(this.state.capabilityData);

    return (
      <div>
        {this.state.capabilityData !== null ? (
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

            <Table.Body style={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
              {this.state.capabilityData.map(res => (
                <Table.Row
                  negative={res.state === "BAD"}
                  warning={res.state === "OKAY"}
                  positive={res.state === "GOOD"}
                  key={res.appName}
                >
                  <Table.Cell>{res.appName}</Table.Cell>
                  <Table.Cell>{res.state}</Table.Cell>
                  <Table.Cell>
                    {res.appRunningInstances
                      ? Number(
                          res.appRunningInstances[0].appInstanceMetric[
                            res.appRunningInstances[0].appInstanceMetric
                              .length - 1
                          ].memory
                        ).toFixed(3)
                      : "N/A"}
                  </Table.Cell>
                  <Table.Cell>
                    {res.appRunningInstances
                      ? Number(
                          res.appRunningInstances[0].appInstanceMetric[
                            res.appRunningInstances[0].appInstanceMetric
                              .length - 1
                          ].disk
                        ).toFixed(3)
                      : "N/A"}
                  </Table.Cell>
                  <Table.Cell>
                    {res.appRunningInstances
                      ? Number(
                          res.appRunningInstances[0].appInstanceMetric[
                            res.appRunningInstances[0].appInstanceMetric
                              .length - 1
                          ].cpu_Pct
                        ).toFixed(3)
                      : "N/A"}
                  </Table.Cell>

                  <Table.Cell>
                    {res.avgRespTime
                      ? Number(res.avgRespTime).toFixed(3)
                      : "N/A"}
                  </Table.Cell>
                  <Table.Cell>
                    {res.errorRate ? Number(res.errorRate).toFixed(3) : "N/A"}
                  </Table.Cell>
                  <Table.Cell>
                    {res.appRunningInstances
                      ? res.appRunningInstances[0].appInstanceMetric[
                          res.appRunningInstances[0].appInstanceMetric.length -
                            1
                        ].state
                      : "null"}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          ""
        )}
      </div>
    );
  }
}

/*


 <Table.Body>
               
                {this.state.capabilityData.map(res=>
                    <React.Fragment>
                    <Table.Row>
                    <Table.Cell>jbjhb</Table.Cell>
                    <Table.Cell>nkjnkj</Table.Cell>
                    <Table.cell>{res.appRunningInstances[0].appInstanceMetric[(res.appRunningInstances[0].appInstanceMetric.length)-1].memory}</Table.cell>
                    <Table.cell>bhdbh</Table.cell>
                    <Table.cell>hdsah</Table.cell>
                    <Table.Cell></Table.Cell>
                    </Table.Row>
                    </React.Fragment>)}
    
               
    
                  
                </Table.Body>






    




 <Table.Body>
           
            {this.state.capabilityData.map(res=>
                <React.Fragment>
                <Table.Row>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.cell>{res.appInstanceMetric[res.appInstanceMetric.length-1].memory}</Table.cell>
                <Table.cell>{res.appInstanceMetric[res.appInstanceMetric.length-1].disk}</Table.cell>
                <Table.cell>{res.appInstanceMetric[res.appInstanceMetric.length-1].cpu_Pct}</Table.cell>
                <Table.Cell></Table.Cell>
                </Table.Row>
                </React.Fragment>)}

           

              
            </Table.Body>











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
              </Table.Row>*/
