import React, { Component } from "react";
import {
  Form,
  Label,
  Input,
  Segment,
  Header,
  Checkbox,
  Divider,
  Icon
} from "semantic-ui-react";
import axios from "axios";

export default class ConfigForm extends Component {
  constructor() {
    super();
    this.state = {
      priority: false,
      cpuGood: "",
      cpuOkay: "",
      cpuBad: "",
      diskGood: "",
      diskOkay: "",
      diskBad: "",
      memGood: "",
      memOkay: "",
      memBad: "",
      uptimeGood: "",
      uptimeOkay: "",
      uptimeBad: "",
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log(this.props.details);
    let config = this.props.details.configRule;
    if (config) {
      this.setState({
        priority: config.priority,
        cpuGood: config.goodRules.cpu_Pct,
        cpuOkay: config.okayRules.cpu_Pct,
        cpuBad: config.badRules.cpu_Pct,
        diskGood: config.goodRules.disk,
        diskOkay: config.okayRules.disk,
        diskBad: config.badRules.disk,
        memGood: config.goodRules.memory,
        memOkay: config.okayRules.memory,
        memBad: config.badRules.memory,
        uptimeGood: config.goodRules.uptime,
        uptimeOkay: config.okayRules.uptime,
        uptimeBad: config.badRules.uptime
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.props.details.configRule);
    if (prevProps.appName !== this.props.appName) {
      let config = this.props.details.configRule;

      this.setState({
        priority: config.priority,
        cpuGood: config.goodRules.cpu_Pct,
        cpuOkay: config.okayRules.cpu_Pct,
        cpuBad: config.badRules.cpu_Pct,
        diskGood: config.goodRules.disk,
        diskOkay: config.okayRules.disk,
        diskBad: config.badRules.disk,
        memGood: config.goodRules.memory,
        memOkay: config.okayRules.memory,
        memBad: config.badRules.memory,
        uptimeGood: config.goodRules.uptime,
        uptimeOkay: config.okayRules.uptime,
        uptimeBad: config.badRules.uptime
      });

      return true;
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit() {
    this.setState({ loading: true });
    let configRule = {
      priority: this.state.priority,
      goodRules: {
        upTime: this.state.uptimeGood,

        memory: this.state.memGood,

        disk: this.state.diskGood,

        cpu_Pct: this.state.cpuGood
      },
      badRules: {
        upTime: this.state.uptimeBad,

        memory: this.state.memBad,

        disk: this.state.diskBad,

        cpu_Pct: this.state.cpuBad
      },
      okayRules: {
        upTime: this.state.uptimeOkay,

        memory: this.state.memOkay,

        disk: this.state.diskOkay,

        cpu_Pct: this.state.cpuOkay
      },
      capId: this.props.capId,
      appId: this.props.details.appId,
      addedBy: ""
    };

    axios
      .post(
        "http://localhost:9091/api/pcf/configurations",

        configRule
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });

    this.props.callBack(this.props.appName, configRule);
    this.setState({ loading: false });
  }

  render() {
    return (
      <Segment
        inverted
        style={{
          backgroundColor: "#dcdcdc",
          borderStyle: "solid",
          borderColor: "rgba(0,0,0,0.1)",
          borderWidth: 1
        }}
      >
        <Header
          dividing
          style={{
            textTransform: "capitalize",
            color: "black"
          }}
          as="h2"
        >
          {this.props.appName}
          <Header.Subheader>
            Previously Configured:{" "}
            {this.props.details.configured ? (
              <Icon name="check circle" />
            ) : (
              <Icon name="x" />
            )}
          </Header.Subheader>
        </Header>
        <Form inverted onSubmit={this.handleSubmit}>
          <Divider horizontal inverted></Divider>
          <Form.Group inline>
            <Label
              size="large"
              color="grey"
              style={{ width: 95, marginRight: 10 }}
            >
              High Priority
            </Label>
            <Form.Field>
              <Checkbox
                checked={this.state.priority}
                fitted
                toggle
                onChange={() =>
                  this.setState({ priority: !this.state.priority })
                }
              />
            </Form.Field>
          </Form.Group>
          <Divider horizontal inverted></Divider>
          <Form.Group inline>
            <Label
              size="large"
              color="grey"
              style={{ width: 95, marginRight: 10 }}
            >
              CPU
            </Label>
            <Form.Field>
              <Input
                name="cpuGood"
                placeholder="Lower Limit"
                label={{ color: "green", content: "%" }}
                value={this.state.cpuGood}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Input
                name="cpuOkay"
                placeholder="Middle Limit"
                label={{ color: "yellow", content: "%" }}
                value={this.state.cpuOkay}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Input
                name="cpuBad"
                placeholder="Upper Limit"
                label={{ color: "red", content: "%" }}
                value={this.state.cpuBad}
                onChange={this.handleChange}
              />
            </Form.Field>
          </Form.Group>
          <Divider horizontal inverted></Divider>
          <Form.Group inline>
            <Label
              size="large"
              color="grey"
              style={{ width: 95, marginRight: 10 }}
            >
              Memory
            </Label>
            <Form.Field>
              <Input
                name="memGood"
                value={this.state.memGood}
                onChange={this.handleChange}
                placeholder="Lower Limit"
                label={{ color: "green", content: "%" }}
              />
            </Form.Field>
            <Form.Field>
              <Input
                name="memOkay"
                value={this.state.memOkay}
                onChange={this.handleChange}
                placeholder="Middle Limit"
                label={{ color: "yellow", content: "%" }}
              />
            </Form.Field>

            <Form.Field>
              <Input
                name="memBad"
                value={this.state.memBad}
                onChange={this.handleChange}
                placeholder="Upper Limit"
                label={{ color: "red", content: "%" }}
              />
            </Form.Field>
          </Form.Group>
          <Divider horizontal inverted></Divider>
          <Form.Group inline>
            <Label
              size="large"
              color="grey"
              style={{ width: 95, marginRight: 10 }}
            >
              Disk
            </Label>
            <Form.Field>
              <Input
                name="diskGood"
                value={this.state.diskGood}
                onChange={this.handleChange}
                placeholder="Lower Limit"
                label={{ color: "green", content: "%" }}
              />
            </Form.Field>
            <Form.Field>
              <Input
                name="diskOkay"
                value={this.state.diskOkay}
                onChange={this.handleChange}
                placeholder="Middle Limit"
                label={{ color: "yellow", content: "%" }}
              />
            </Form.Field>
            <Form.Field>
              <Input
                name="diskBad"
                value={this.state.diskBad}
                onChange={this.handleChange}
                placeholder="Upper Limit"
                label={{ color: "red", content: "%" }}
              />
            </Form.Field>
          </Form.Group>
          <Divider horizontal inverted></Divider>

          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Form.Button
              disabled={this.state.loading}
              type="submit"
              value="submit"
              color="blue"
            >
              Submit
            </Form.Button>
          </div>
        </Form>
      </Segment>
    );
  }
}
// <Form.Group inline>
//             <Label
//               size="large"
//               color="grey"
//               style={{ width: 95, marginRight: 10 }}
//             >
//               Instances
//             </Label>
//             <Form.Field>
//               <Input placeholder="Upper Limit" label="#" />
//             </Form.Field>
//             <Form.Field>
//               <Input placeholder="Middle Limit" label="#" />
//             </Form.Field>
//             <Form.Field>
//               <Input placeholder="Lower Limit" label="#" />
//             </Form.Field>
//           </Form.Group>
