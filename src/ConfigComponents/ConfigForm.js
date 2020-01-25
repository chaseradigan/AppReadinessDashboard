import React, { Component } from "react";
import {
  Form,
  Label,
  Input,
  Segment,
  Header,
  Checkbox,
  Divider
} from "semantic-ui-react";
import axios from "axios";

export default class ConfigForm extends Component {
  constructor() {
    super();
    this.state = {
      priority: false,
      cpuGood: 0,
      cpuOkay: 0,
      cpuBad: 0,
      diskGood: 0,
      diskOkay: 0,
      diskBad: 0,
      memGood: 0,
      memOkay: 0,
      memBad: 0,
      uptimeGood: 0,
      uptimeOkay: 0,
      uptimeBad: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log(this.props.details);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.appName !== this.props.appName) {
      this.setState({ priority: false });
      return true;
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: Number(event.target.value) });
  }

  handleSubmit() {
    let configRule = {
      priority: this.state.priority,
      goodRules: {
        upTime: this.state.uptimeGood,

        memory:
          (this.state.memGood / 100) *
          this.props.details.memory *
          Math.pow(10, 6),

        disk:
          (this.state.diskGood / 100) *
          this.props.details.disk *
          Math.pow(10, 6),

        cpu_Pct: this.state.cpuGood / 100
      },
      badRules: {
        upTime: this.state.uptimeBad,

        memory:
          (this.state.memBad / 100) *
          this.props.details.memory *
          Math.pow(10, 6),

        disk:
          (this.state.diskBad / 100) *
          this.props.details.disk *
          Math.pow(10, 6),

        cpu_Pct: this.state.cpuBad / 100
      },
      okayRules: {
        upTime: this.state.uptimeOkay,

        memory:
          (this.state.memOkay / 100) *
          this.props.details.memory *
          Math.pow(10, 6),

        disk:
          (this.state.diskOkay / 100) *
          this.props.details.disk *
          Math.pow(10, 6),

        cpu_Pct: this.state.cpuOkay / 100
      },
      appId: "capability1dice-zen-util-othersdlab03assetv2",
      addedBy: ""
    };
    axios
      .post("http://localhost:9091/api/pcf/configurations", configRule)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    this.props.callBack(this.props.appName, this.state.cpuBad);
  }

  render() {
    console.log(this.state);
    console.log(typeof this.state.cpuBad);
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
                type="number"
                name="cpuBad"
                placeholder="Upper Limit"
                label={{ color: "red", content: "%" }}
                value={this.state.cpuBad}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Input
                type="number"
                name="cpuOkay"
                placeholder="Middle Limit"
                label={{ color: "yellow", content: "%" }}
                value={this.state.cpuOkay}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Input
                type="number"
                name="cpuGood"
                placeholder="Lower Limit"
                label={{ color: "green", content: "%" }}
                value={this.state.cpuGood}
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
                type="number"
                name="memBad"
                value={this.state.memBad}
                onChange={this.handleChange}
                placeholder="Upper Limit"
                label={{ color: "red", content: "%" }}
              />
            </Form.Field>
            <Form.Field>
              <Input
                type="number"
                name="memOkay"
                value={this.state.memOkay}
                onChange={this.handleChange}
                placeholder="Middle Limit"
                label={{ color: "yellow", content: "%" }}
              />
            </Form.Field>
            <Form.Field>
              <Input
                type="number"
                name="memGood"
                value={this.state.memGood}
                onChange={this.handleChange}
                placeholder="Lower Limit"
                label={{ color: "green", content: "%" }}
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
                type="number"
                name="diskBad"
                value={this.state.diskBad}
                onChange={this.handleChange}
                placeholder="Upper Limit"
                label={{ color: "red", content: "%" }}
              />
            </Form.Field>
            <Form.Field>
              <Input
                type="number"
                name="diskOkay"
                value={this.state.diskOkay}
                onChange={this.handleChange}
                placeholder="Middle Limit"
                label={{ color: "yellow", content: "%" }}
              />
            </Form.Field>
            <Form.Field>
              <Input
                type="number"
                name="diskGood"
                value={this.state.diskGood}
                onChange={this.handleChange}
                placeholder="Lower Limit"
                label={{ color: "green", content: "%" }}
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
              Instances
            </Label>
            <Form.Field>
              <Input placeholder="Upper Limit" label="#" />
            </Form.Field>
            <Form.Field>
              <Input placeholder="Middle Limit" label="#" />
            </Form.Field>
            <Form.Field>
              <Input placeholder="Lower Limit" label="#" />
            </Form.Field>
          </Form.Group>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Form.Button type="submit" value="submit" color="blue">
              Submit
            </Form.Button>
          </div>
        </Form>
      </Segment>
    );
  }
}
