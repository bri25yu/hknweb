import React, { Component } from "react";

import PropTypes from "prop-types";

import { ELEMENT_NAMES, PROP_NAMES } from "../constants";
import { arrayOfFn } from "../lib/utils";
import "../style/Chart.css";


export class Chart extends Component {
    static propTypes = {
        [PROP_NAMES.CHART_ROWS]: arrayOfFn(ELEMENT_NAMES.CHARTROW),
    }

    render() {
        return React.createElement(
            ELEMENT_NAMES.TABLE,
            {[PROP_NAMES.CLASSNAME]: "chart"},
            React.createElement(
                ELEMENT_NAMES.TBODY,
                null,
                this.props[PROP_NAMES.CHART_ROWS]
            )
        )
    }
}


export class ChartRow extends Component {
    static propTypes = {
        [PROP_NAMES.DESCRIPTION]: PropTypes.string.isRequired,
        [PROP_NAMES.VALUE]: PropTypes.any.isRequired,
    }

    render() {
        return React.createElement(
            ELEMENT_NAMES.TR,
            {
                [PROP_NAMES.CLASSNAME]: "chart-row",
                [PROP_NAMES.KEY]: `${this.props[PROP_NAMES.DESCRIPTION]}-${this.props[PROP_NAMES.VALUE]}`,
            },
            [
                React.createElement(
                    ELEMENT_NAMES.TD,
                    {
                        [PROP_NAMES.CLASSNAME]: "chart-row-description-container",
                        [PROP_NAMES.KEY]: "chart-row-description-container",
                    },
                    React.createElement(
                        ELEMENT_NAMES.DIV,
                        {[PROP_NAMES.CLASSNAME]: "chart-row-description"},
                        this.props[PROP_NAMES.DESCRIPTION]
                    )
                ),
                React.createElement(
                    ELEMENT_NAMES.TD,
                    {
                        [PROP_NAMES.CLASSNAME]: "chart-row-value-container",
                        [PROP_NAMES.KEY]: "chart-row-value-container",
                    },
                    this.props[PROP_NAMES.VALUE]
                )
            ]
        )
    }
}
