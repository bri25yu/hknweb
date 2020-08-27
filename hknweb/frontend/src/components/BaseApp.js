import { Component } from "react";

class BaseApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data || [],
    };
  }

  responseCallback(response) {
    if (response.status > 400) {
      this.state.placeholder = "Something went wrong!";
      return;
    }
    return response.json();
  }

  dataCallback(data, mapping_fn) {
    if (data) {
      data = Array.isArray(data) ? data : [data];
      data = data.map(mapping_fn);
      this.setState({data});
    }
  }

  fetchData() {
    if (this.props.datapath) {
      this.state.data = [];
      fetch(this.props.datapath)
      .then(this.responseCallback)
      .then(data => this.dataCallback(data, this.props.mapping_fn));
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.datapath !== this.props.datapath) {
      this.fetchData();
    }
  }
}

export default BaseApp;
