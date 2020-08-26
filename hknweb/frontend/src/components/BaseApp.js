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

  fetchData(rerender=false) {
    if (this.datapath) {
      fetch(this.datapath)
      .then(response => {
        if (response.status > 400) {
          this.state.placeholder = "Something went wrong!";
          return;
        }
        return response.json();
      })
      .then(data => {
        if (data) {
          if (rerender) {
            this.setState(() => {
              data = data.map(this.mapping_fn);
              return {
                data,
                loaded: true
              };
            });
          } else {
            this.state.data = data.map(this.mapping_fn);
          }
        }
      });
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
