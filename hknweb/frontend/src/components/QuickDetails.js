import React, { Component } from "react";

import { Chart } from "./Chart";
import { InfoBar } from "./InfoBar";

import { ELEMENT_NAMES, PROP_NAMES } from "../constants";
import { arrayOfFn, instanceOfFn } from "../lib/utils";
import "../style/QuickDetails.css";


export class QuickDetails extends Component {
    static propTypes = {
        [PROP_NAMES.QUICK_DETAILS_PANELS]: arrayOfFn(ELEMENT_NAMES.QUICKDETAILSPANEL),
    }

    render() {
        return React.createElement(
            ELEMENT_NAMES.DIV,
            {[PROP_NAMES.CLASSNAME]: "quick-details"},
            this.props[PROP_NAMES.QUICK_DETAILS_PANELS]
        )
    }
}


export class QuickDetailsPanel extends Component {
    static propTypes = {
        [PROP_NAMES.INFO_BAR]: instanceOfFn(ELEMENT_NAMES.INFOBAR),
        [PROP_NAMES.CHART]: instanceOfFn(ELEMENT_NAMES.CHART),
    }

    render() {
        return React.createElement(
            ELEMENT_NAMES.DIV,
            {[PROP_NAMES.CLASSNAME]: "quick-details-panel"},
            [
                this.props[PROP_NAMES.INFO_BAR],
                this.props[PROP_NAMES.CHART],
            ]
        )
    }
}
