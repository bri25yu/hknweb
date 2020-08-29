import React, { Component } from "react";

import PropTypes from "prop-types";

import { ELEMENT_NAMES, PROP_NAMES } from "../constants";
import { arrayOfFn } from "../lib/utils";
import "../style/InfoBar.css";


export class InfoBar extends Component {
    static propTypes = {
        [PROP_NAMES.TO_DISPLAY]: arrayOfFn(ELEMENT_NAMES.INFOBARITEM),
    }

    render() {
        return React.createElement(
            ELEMENT_NAMES.DIV,
            {[PROP_NAMES.CLASSNAME]: "info-bar"},
            this.props[PROP_NAMES.TO_DISPLAY]
        )
    }
}


export class InfoBarItem extends Component {
    static propTypes = {
        [PROP_NAMES.ITEM_TO_DISPLAY]: PropTypes.any.isRequired,
    }

    render() {
        const item_to_display = this.props[PROP_NAMES.ITEM_TO_DISPLAY];
        return React.createElement(
            ELEMENT_NAMES.DIV,
            {
                [PROP_NAMES.CLASSNAME]: "info-bar-item",
                [PROP_NAMES.KEY]: item_to_display,
            },
            item_to_display
        )
    }
}
