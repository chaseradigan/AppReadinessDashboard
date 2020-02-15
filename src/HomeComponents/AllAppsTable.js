import React, { Component } from 'react';
import {Table} from 'semantic-ui-react';
export default class AllAppsTable extends Component {


    constructor() {
        super();
        this.state = {
            capabilityData:null
        }
    }

    componentDidMount(){
        //console.log("DidMount")
        this.props.data.capabilities.map(cap=>{
            console.log("IN MAP")
            console.log(cap.capName);
            console.log(this.props.activecap);
            console.log(cap.capApps);
            if(cap.capName===this.props.activecap){
                this.setState({capabilityData:cap.capApps},()=>{ console.log(this.state.capabilityData);
                
                    this.state.capabilityData.map(res=>{
                        console.log(res.appRunningInstances[0].appInstanceMetric[(res.appRunningInstances[0].appInstanceMetric.length)-1].memory);
                    })}
                    
                    );
               
            }
           
        })
            
    }


    render() {
        //console.log(this.props.data.capabilities);
        //console.log(this.props.activecap)
        console.log(this.state.capabilityData);

        return (
            <div>
            {this.state.capabilityData!==null ?

                <Table celled>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>App Name</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Memory</Table.HeaderCell>
                    <Table.HeaderCell>Disk</Table.HeaderCell>
                    <Table.HeaderCell>CPU_PCT</Table.HeaderCell>
                    <Table.HeaderCell>State</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
    
                <Table.Body>
                {this.state.capabilityData.map(res=>
                    
                    <Table.Row>
                    <Table.Cell>{res.appName}</Table.Cell>
                    <Table.Cell>{res.state}</Table.Cell>
                    <Table.Cell>{res.appRunningInstances[0].appInstanceMetric[(res.appRunningInstances[0].appInstanceMetric.length)-1].memory}</Table.Cell>
                    <Table.Cell>{res.appRunningInstances[0].appInstanceMetric[(res.appRunningInstances[0].appInstanceMetric.length)-1].disk}</Table.Cell>
                    <Table.Cell>{res.appRunningInstances[0].appInstanceMetric[(res.appRunningInstances[0].appInstanceMetric.length)-1].cpu_Pct}</Table.Cell>
                    <Table.Cell>{res.appRunningInstances[0].appInstanceMetric[(res.appRunningInstances[0].appInstanceMetric.length)-1].state}</Table.Cell>
                    </Table.Row>
                )}
                
                </Table.Body>
               
                
               
               
              </Table>

              :

              ""
            
            }
            
  
            </div>
        )
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