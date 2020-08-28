import { Component } from "react";
import {
    ELEMENT_NAMES,
    PROP_NAMES,
} from "../constants"

class BaseApp extends Component {
    constructor(props) {
        super(props);
            this.state = {
            [PROP_NAMES.DATA]: props.data || [],
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
        if (this.props[PROP_NAMES.DATAPATH]) {
            this.state.data = [];
            fetch(this.props[PROP_NAMES.DATAPATH])
            .then(this.responseCallback)
            .then(data => this.dataCallback(data, this.props[PROP_NAMES.MAPPING_FN]));
        }
    }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps[PROP_NAMES.DATAPATH] !== this.props[PROP_NAMES.DATAPATH]) {
      this.fetchData();
    }
  }
}

export default BaseApp;
