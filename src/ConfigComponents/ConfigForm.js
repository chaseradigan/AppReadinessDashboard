import React, { Component } from "react";
import {
  Form,
  Label,
  Input,
  Segment,
  Header,
  Checkbox
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
      <Segment color="grey" inverted>
        <Header dividing style={{ textTransform: "capitalize" }} as="h2">
          {this.props.appName}
        </Header>
        <Form inverted>
          <Form.Group inline>
            <Label
              size="large"
              color="grey"
              style={{ width: 75, marginRight: 10 }}
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
          <Form.Group inline>
            <Label
              size="large"
              color="blue"
              style={{ width: 75, marginRight: 10 }}
            >
              CPU
            </Label>
            <Form.Field>
              <Input placeholder="Red" label="%" />
            </Form.Field>
            <Form.Field>
              <Input placeholder="Yellow" label="%" />
            </Form.Field>
            <Form.Field>
              <Input placeholder="Green" label="%" />
            </Form.Field>
          </Form.Group>
          <Form.Group inline>
            <Label
              size="large"
              color="blue"
              style={{ width: 75, marginRight: 10 }}
            >
              Memory
            </Label>
            <Form.Field>
              <Input placeholder="Red" label="%" />
            </Form.Field>
            <Form.Field>
              <Input placeholder="Yellow" label="%" />
            </Form.Field>
            <Form.Field>
              <Input placeholder="Green" label="%" />
            </Form.Field>
          </Form.Group>
          <Form.Group inline>
            <Label
              size="large"
              color="blue"
              style={{ width: 75, marginRight: 10 }}
            >
              Disk
            </Label>
            <Form.Field>
              <Input placeholder="Red" label="%" />
            </Form.Field>
            <Form.Field>
              <Input placeholder="Yellow" label="%" />
            </Form.Field>
            <Form.Field>
              <Input placeholder="Green" label="%" />
            </Form.Field>
          </Form.Group>
          <Form.Group inline>
            <Label
              size="large"
              color="blue"
              style={{ width: 75, marginRight: 10 }}
            >
              Instances
            </Label>
            <Form.Field>
              <Input placeholder="Red" label="#" />
            </Form.Field>
            <Form.Field>
              <Input placeholder="Yellow" label="#" />
            </Form.Field>
            <Form.Field>
              <Input placeholder="Green" label="#" />
            </Form.Field>
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </Segment>
    );
  }
}
