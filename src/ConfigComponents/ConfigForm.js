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

export default class ConfigForm extends Component {
  constructor() {
    super();
    this.state = {
      priority: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.appName !== this.props.appName) {
      this.setState({ priority: false });
      return true;
    }
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
        //color="blue"
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
        <Form inverted>
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
                placeholder="Upper Limit"
                label={{ color: "red", content: "%" }}
              />
            </Form.Field>
            <Form.Field>
              <Input
                placeholder="Middle Limit"
                label={{ color: "yellow", content: "%" }}
              />
            </Form.Field>
            <Form.Field>
              <Input
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
              Memory
            </Label>
            <Form.Field>
              <Input
                placeholder="Upper Limit"
                label={{ color: "red", content: "%" }}
              />
            </Form.Field>
            <Form.Field>
              <Input
                placeholder="Middle Limit"
                label={{ color: "yellow", content: "%" }}
              />
            </Form.Field>
            <Form.Field>
              <Input
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
                placeholder="Upper Limit"
                label={{ color: "red", content: "%" }}
              />
            </Form.Field>
            <Form.Field>
              <Input
                placeholder="Middle Limit"
                label={{ color: "yellow", content: "%" }}
              />
            </Form.Field>
            <Form.Field>
              <Input
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
            <Form.Button color="blue">Submit</Form.Button>
          </div>
        </Form>
      </Segment>
    );
  }
}
