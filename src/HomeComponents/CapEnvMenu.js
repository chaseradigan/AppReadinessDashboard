import React, { Component } from "react";
import { Menu, Icon, Card } from "semantic-ui-react";
import axios from "axios";
export default class CapEnvMenu extends Component {
  constructor() {
    super();
    this.state = {
      capabilities: [],
      envs: [],
      clickedCap: "",
      clickedEnv: ""
    };
  }
  componentDidMount() {
    this.getCapabilities();
  }
  async getCapabilities() {
    await axios
      .get("http://localhost:9090/api/pcf/capability/all")
      .then(response => {
        console.log(response);
        this.setState({ capabilities: response.data });
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].capId === this.props.match.params.cap) {
            this.setState({
              clickedCap: this.props.match.params.cap,
              clickedEnv: this.props.match.params.env,
              envs: response.data[i].allEnvs
            });
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  handleCapClick(cap) {
    if (this.state.clickedCap === cap.capId)
      this.setState({ envs: [], clickedCap: "" });
    else this.setState({ envs: cap.allEnvs, clickedCap: cap.capId });
  }
  hanldeEnvClick(env) {
    if (env.envId !== this.state.clickedEnv || this.props.match.params.app) {
      this.setState({ clickedEnv: env.envId });
      this.props.history.push(`/${this.state.clickedCap}/${env.envId}`);
    }
  }
  render() {
    return (
      <div
        style={{
          backgroundColor: "#DCDCDC",
          boxShadow: "0 1px 1px 0 rgba(34,36,38,.20)"
        }}
      >
        <Menu size="massive" fluid style={{ borderRadius: 0, marginBottom: 7 }}>
          <Menu.Item>
            <Icon name="check circle" />
            AppReadiness
          </Menu.Item>
          <Menu.Item name="Home" onClick={() => this.props.history.push("/")} />

          <Menu.Item
            onClick={() => this.props.history.push("/config")}
            position="right"
          >
            <Icon name="cog" /> Configurations
          </Menu.Item>
        </Menu>
        {this.props.location.pathname === "/" ? (
          <React.Fragment />
        ) : (
          <React.Fragment>
            <Menu
              style={{ border: "none", backgroundColor: "#DCDCDC" }}
              attached="bottom"
              size="massive"
              fluid
              pointing
              secondary
            >
              {this.state.capabilities.map(cap => (
                <Menu.Item
                  key={cap.capId}
                  as={Card}
                  className={
                    cap.state === "GOOD"
                      ? "bGreen"
                      : cap.state === "OKAY"
                      ? "bYellow"
                      : "bRed"
                  }
                  name={cap.capName}
                  active={this.state.clickedCap === cap.capId}
                  onClick={() => this.handleCapClick(cap)}
                />
              ))}
            </Menu>
            {this.state.clickedCap ? (
              <Menu pointing secondary fluid>
                {this.state.envs.map(env => (
                  <Menu.Item
                    style={{ marginBottom: 7 }}
                    key={env.envId}
                    as={Card}
                    className={
                      env.state === "GOOD"
                        ? "bGreen"
                        : env.state === "OKAY"
                        ? "bYellow"
                        : "bRed"
                    }
                    name={env.envName}
                    active={this.state.clickedEnv === env.envId}
                    onClick={() => this.hanldeEnvClick(env)}
                  />
                ))}
              </Menu>
            ) : (
              <React.Fragment />
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}
