import { Component } from "react";

class BaseApp extends Component {
  DATAPATH = null
  MAPPING_FN = null

  constructor(props) {
    super(props);
    this.state = {
      data: props.data || [],
      loaded: false,
      placeholder: "Loading"
    };
    this.datapath = props.datapath || this.DATAPATH;
    this.mapping_fn = props.mapping_fn || this.MAPPING_FN;
  }

  responseCallback(response) {
    if (response.status > 400) {
      this.state.placeholder = "Something went wrong!";
      return;
    }
    return response.json();
  }

  dataCallback(data, rerender) {
    if (data) {
      data = Array.isArray(data) ? data : [data];
      data = data.map(this.mapping_fn);
      if (rerender) {
        this.setState(() => {
          return {
            data,
            loaded: true
          };
        });
      } else {
        this.state.data = data;
      }
    }
  }

  fetchData(rerender=false) {
    if (this.datapath) {
      fetch(this.datapath)
      .then(this.responseCallback)
      .then(data => this.dataCallback(data, rerender));
    }
  }

  componentDidMount() {
    this.fetchData(true);
  }

  componentDidUpdate() {
    this.fetchData();
  }
}

export default BaseApp;
