import React, { Component } from "react";
import matchSorter from "match-sorter";
import { Search, Icon } from "semantic-ui-react";

export default class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      results: []
    };
  }
  handleSelect(appName) {
    console.log(appName);
    this.props.searchSelect(appName);
  }
  render() {
    return (
      <Search
        disabled={this.props.disabled}
        onSearchChange={e => {
          this.setState({
            results: matchSorter(this.props.apps, e.target.value, {
              keys: ["appName"]
            })
          });
        }}
        onResultSelect={(e, { result }) => this.handleSelect(result.appName)}
        results={this.state.results}
        icon={<Icon name="search" inverted circular link />}
        placeholder={`Search Apps...`}
        size="small"
        fluid
      />
    );
  }
}
