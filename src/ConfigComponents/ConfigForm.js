import React, { Component } from "react";
import {
  Form,
  Label,
  Input,
  Segment,
  Header,
  Divider,
  Loader
} from "semantic-ui-react";
import axios from "axios";

export default class ConfigForm extends Component {
  constructor() {
    super();
    this.state = {
      config: {},
      goodRule: {
        cpuPct: 0,
        upTIme: 0,
        disk: 0,
        memory: 0,
        errRate: 0,
        avgResponseTime: 0
      },
      okayRule: {
        cpuPct: 0,
        upTIme: 0,
        disk: 0,
        memory: 0,
        errRate: 0,
        avgResponseTime: 0
      },
      badRule: {
        cpuPct: 0,
        upTIme: 0,
        disk: 0,
        memory: 0,
        errRate: 0,
        avgResponseTime: 0
      },

      submiting: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log("PROPS", this.props.config);
    this.setState({
      config: this.props.config,
      goodRule: this.props.config.goodRule,
      okayRule: this.props.config.okayRule,
      badRule: this.props.config.badRule
    });
  }
  async handleSubmit(e) {
    e.preventDefault();
    this.setState({ submiting: true });
    await axios
      .post(`/api/pcf/app/${this.props.appId}/configrules`, {
        goodRule: this.state.goodRule,
        okayRule: this.state.okayRule,
        badRule: this.state.badRule
      })
      .then(response => {
        console.log(response);
        this.setState({ submiting: false });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleGoodChange(event) {
    let goodRule = this.state.goodRule;
    goodRule[event.target.name] = Number(event.target.value);
    this.setState({ goodRule: this.state.goodRule });
  }
  handleOkayChange(event) {
    let okayRule = this.state.okayRule;
    okayRule[event.target.name] = Number(event.target.value);
    this.setState({ okayRule: this.state.okayRule });
  }
  handleBadChange(event) {
    let badRule = this.state.badRule;
    badRule[event.target.name] = Number(event.target.value);
    this.setState({ badRule: this.state.badRule });
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
        </Header>
        <Form inverted onSubmit={this.handleSubmit}>
          <Divider horizontal inverted></Divider>

          <Form.Group inline>
            <Label
              size="large"
              color="grey"
              style={{ width: 95, marginRight: 10 }}
            >
              CPU
            </Label>
            <Form.Input
              input={
                <Input
                  name="cpuPct"
                  type="number"
                  placeholder="Lower Limit"
                  label={{ color: "green", content: "%" }}
                  value={this.state.goodRule.cpuPct}
                  onChange={e => this.handleGoodChange(e)}
                />
              }
            />

            <Form.Input
              input={
                <Input
                  name="cpuPct"
                  type="number"
                  placeholder="Middle Limit"
                  label={{ color: "yellow", content: "%" }}
                  value={this.state.okayRule.cpuPct}
                  onChange={e => this.handleOkayChange(e)}
                />
              }
            />

            <Form.Input
              input={
                <Input
                  name="cpuPct"
                  type="number"
                  placeholder="Upper Limit"
                  label={{ color: "red", content: "%" }}
                  value={this.state.badRule.cpuPct}
                  onChange={e => this.handleBadChange(e)}
                />
              }
            />
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
            <Form.Input
              input={
                <Input
                  name="memory"
                  type="number"
                  value={this.state.goodRule.memory}
                  onChange={e => this.handleGoodChange(e)}
                  placeholder="Lower Limit"
                  label={{ color: "green", content: "%" }}
                />
              }
            />

            <Form.Input
              input={
                <Input
                  name="memory"
                  type="number"
                  value={this.state.okayRule.memory}
                  onChange={e => this.handleOkayChange(e)}
                  placeholder="Middle Limit"
                  label={{ color: "yellow", content: "%" }}
                />
              }
            />

            <Form.Input
              input={
                <Input
                  name="memory"
                  type="number"
                  value={this.state.badRule.memory}
                  onChange={e => this.handleBadChange(e)}
                  placeholder="Upper Limit"
                  label={{ color: "red", content: "%" }}
                />
              }
            />
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
            <Form.Input
              input={
                <Input
                  name="disk"
                  type="number"
                  value={this.state.goodRule.disk}
                  onChange={e => this.handleGoodChange(e)}
                  placeholder="Lower Limit"
                  label={{ color: "green", content: "%" }}
                />
              }
            />

            <Form.Input
              input={
                <Input
                  name="disk"
                  type="number"
                  value={this.state.okayRule.disk}
                  onChange={e => this.handleOkayChange(e)}
                  placeholder="Middle Limit"
                  label={{ color: "yellow", content: "%" }}
                />
              }
            />

            <Form.Input
              input={
                <Input
                  name="disk"
                  type="number"
                  value={this.state.badRule.disk}
                  onChange={e => this.handleBadChange(e)}
                  placeholder="Upper Limit"
                  label={{ color: "red", content: "%" }}
                />
              }
            />
          </Form.Group>
          <Divider horizontal inverted></Divider>
          <Form.Group inline>
            <Label
              size="large"
              color="grey"
              style={{ width: 95, marginRight: 10 }}
            >
              Error Rate
            </Label>
            <Form.Input
              input={
                <Input
                  name="errRate"
                  type="number"
                  value={this.state.goodRule.errRate}
                  onChange={e => this.handleGoodChange(e)}
                  placeholder="Lower Limit"
                  label={{ color: "green", content: "%" }}
                />
              }
            />

            <Form.Input
              input={
                <Input
                  name="errRate"
                  type="number"
                  value={this.state.okayRule.errRate}
                  onChange={e => this.handleOkayChange(e)}
                  placeholder="Middle Limit"
                  label={{ color: "yellow", content: "%" }}
                />
              }
            />

            <Form.Input
              input={
                <Input
                  name="errRate"
                  type="number"
                  value={this.state.badRule.errRate}
                  onChange={e => this.handleBadChange(e)}
                  placeholder="Upper Limit"
                  label={{ color: "red", content: "%" }}
                />
              }
            />
          </Form.Group>
          <Divider horizontal inverted></Divider>
          <Form.Group inline>
            <Label
              size="large"
              color="grey"
              style={{ width: 95, marginRight: 10 }}
            >
              Avg. Response Time
            </Label>
            <Form.Input
              input={
                <Input
                  name="avgResponseTime"
                  type="number"
                  value={this.state.goodRule.avgResponseTime}
                  onChange={e => this.handleGoodChange(e)}
                  placeholder="Lower Limit"
                  label={{ color: "green", content: "%" }}
                />
              }
            />

            <Form.Input
              input={
                <Input
                  name="avgResponseTime"
                  type="number"
                  value={this.state.okayRule.avgResponseTime}
                  onChange={e => this.handleOkayChange(e)}
                  placeholder="Middle Limit"
                  label={{ color: "yellow", content: "%" }}
                />
              }
            />

            <Form.Input
              input={
                <Input
                  name="avgResponseTime"
                  type="number"
                  value={this.state.badRule.avgResponseTime}
                  onChange={e => this.handleBadChange(e)}
                  placeholder="Upper Limit"
                  label={{ color: "red", content: "%" }}
                />
              }
            />
          </Form.Group>
          <Divider horizontal inverted></Divider>
          <Form.Group inline>
            <Label
              size="large"
              color="grey"
              style={{ width: 95, marginRight: 10 }}
            >
              Up Time
            </Label>
            <Form.Input
              input={
                <Input
                  name="upTIme"
                  type="number"
                  value={this.state.goodRule.upTIme}
                  onChange={e => this.handleGoodChange(e)}
                  placeholder="Lower Limit"
                  label={{ color: "green", content: "%" }}
                />
              }
            />

            <Form.Input
              input={
                <Input
                  name="upTIme"
                  type="number"
                  value={this.state.okayRule.upTIme}
                  onChange={e => this.handleOkayChange(e)}
                  placeholder="Middle Limit"
                  label={{ color: "yellow", content: "%" }}
                />
              }
            />

            <Form.Input
              input={
                <Input
                  name="upTIme"
                  type="number"
                  value={this.state.badRule.upTIme}
                  onChange={e => this.handleBadChange(e)}
                  placeholder="Upper Limit"
                  label={{ color: "red", content: "%" }}
                />
              }
            />
          </Form.Group>
          <Divider horizontal inverted></Divider>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Form.Button
              loading={this.state.submiting}
              disabled={this.state.submiting}
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
