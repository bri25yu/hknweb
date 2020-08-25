import { Component } from "react";

class BaseApp extends Component {
  DATAPATH = "api/"
  MAPPING_FN = null

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
    this.datapath = props.datapath || this.DATAPATH;
    this.mapping_fn = props.mapping_fn || this.MAPPING_FN;
  }

  componentDidMount() {
    if (this.datapath) {
      fetch(this.datapath)
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        this.setState(() => {
          data = data.map(this.mapping_fn);
          return {
            data,
            loaded: true
          };
        });
      });
    }
  }
}

export default BaseApp;
