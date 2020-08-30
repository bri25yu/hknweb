import React, { Component } from "react";

import PropTypes from "prop-types";

import { ELEMENT_NAMES, PROP_NAMES } from "../constants";
import "../style/SelectorPanel.css";


export class SelectorPanel extends Component {
    static propTypes = {
        [PROP_NAMES.SELECTIONS]: PropTypes.arrayOf(PropTypes.string).isRequired,
        [PROP_NAMES.VALUE]: PropTypes.any.isRequired,
        [PROP_NAMES.ONCLICK_FN]: PropTypes.func.isRequired,
    }

    render() {
        const items = [];
        this.props[PROP_NAMES.SELECTIONS].forEach(s => {
            items.push(React.createElement(
                Selection,
                {
                    [PROP_NAMES.DESCRIPTION]: s,
                    [PROP_NAMES.ONCLICK_FN]: this.props[PROP_NAMES.ONCLICK_FN],
                }
            ));
            items.push(" / ");
        });
        items.pop();

        return React.createElement(
            ELEMENT_NAMES.DIV,
            {
                [PROP_NAMES.CLASSNAME]: "selector-panel",
                [PROP_NAMES.KEY]: "selector-panel",
            },
            [
                React.createElement(
                    ELEMENT_NAMES.DIV,
                    {
                        [PROP_NAMES.CLASSNAME]: "selection-bar",
                        [PROP_NAMES.KEY]: "selection-bar",
                    },
                    items
                ),
                React.createElement(
                    ELEMENT_NAMES.DIV,
                    null,
                    this.props[PROP_NAMES.VALUE],
                ),
            ]
        )
    }
}

export class Selection extends Component {
    static propTypes = {
        [PROP_NAMES.DESCRIPTION]: PropTypes.string.isRequired,
        [PROP_NAMES.ONCLICK_FN]: PropTypes.func.isRequired,
    }

    render() {
        return React.createElement(
            ELEMENT_NAMES.BUTTON,
            {
                [PROP_NAMES.CLASSNAME]: "selection",
                [PROP_NAMES.KEY]: this.props[PROP_NAMES.DESCRIPTION],
                [PROP_NAMES.ONCLICK]: this.props[PROP_NAMES.ONCLICK_FN],
                [PROP_NAMES.VALUE]: this.props[PROP_NAMES.DESCRIPTION],
            },
            this.props[PROP_NAMES.DESCRIPTION]
        )
    }
}
