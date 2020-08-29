import React, { Component } from "react";

import { ELEMENT_NAMES, PROP_NAMES } from "../constants"


export class BaseApp extends Component {
    render() {
        if (this.loaded()) {
            return this._render();
        }
        return React.createElement(ELEMENT_NAMES.DIV);
    }

    componentDidMount() {
        this.updateData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps[PROP_NAMES.DATAPATH] !== this.props[PROP_NAMES.DATAPATH]) {
            this.updateData();
        }
    }

    loaded() {
        return this.state.data && this.state.data.some(v => v);
    }

    _render() {
        return React.createElement(ELEMENT_NAMES.DIV);
    }

    updateData() {
        this.setState(() => {});
    }

    static fetchData(datapath) {
        return fetch(datapath).then(response => response.json());
    }
}


export class DataFetchApp extends BaseApp {
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

    updateData() {
        if (this.props[PROP_NAMES.DATAPATH]) {
            this.state.data = [];
            fetch(this.props[PROP_NAMES.DATAPATH])
            .then(this.responseCallback)
            .then(data => this.dataCallback(data, this.props[PROP_NAMES.MAPPING_FN]));
        }
    }
}
