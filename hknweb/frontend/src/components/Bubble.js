import React, { Component } from "react";

import PropTypes from "prop-types";

import { ELEMENT_NAMES, PROP_NAMES} from "../constants";
import '../style/Bubble.css';


export class Bubble extends Component {
    static propTypes = {
        [PROP_NAMES.COLOR]: PropTypes.string.isRequired,
        [PROP_NAMES.DESCRIPTION]: PropTypes.string.isRequired,
        [PROP_NAMES.STYLE]: PropTypes.object,
    }

    render() {
        const style = {...this.props[PROP_NAMES.STYLE]};
        style[PROP_NAMES.BACKGROUNDCOLOR] = this.props[PROP_NAMES.COLOR];
        return React.createElement(
            ELEMENT_NAMES.DIV,
            {[PROP_NAMES.CLASSNAME]: "bubble"},
            [
                React.createElement(
                    ELEMENT_NAMES.DIV,
                    {
                        [PROP_NAMES.CLASSNAME]: "bubble-background",
                        [PROP_NAMES.STYLE]: style,
                        [PROP_NAMES.KEY]: "bubble-background",
                    },
                    ELEMENT_NAMES.NBSP
                ),
                React.createElement(
                    ELEMENT_NAMES.SPAN,
                    {
                        [PROP_NAMES.CLASSNAME]: "bubble-text",
                        [PROP_NAMES.KEY]: "bubble-text",
                    },
                    this.props[PROP_NAMES.DESCRIPTION]
                )
            ]
        )
    }
}


export class ValueBubble extends Component {
    static propTypes = {
        [PROP_NAMES.VALUE]: PropTypes.number.isRequired,
        [PROP_NAMES.MAX_VALUE]: PropTypes.number.isRequired,
        [PROP_NAMES.INVERTED]: PropTypes.bool.isRequired,   
    }

    innerBubble() {
        const value = this.props[PROP_NAMES.VALUE];
        const max_value = this.props[PROP_NAMES.MAX_VALUE];
        const inverted = this.props[PROP_NAMES.INVERTED];

        const description = `${value} / ${max_value}`;
        
        let width = Math.floor(value * 100 / max_value);
        if (inverted) {
            width = 100 - width;
        }
        const color = (width > 75) ?  "#77c265" : (width > 50) ? "#f6e68b" : "#ed8d86";
        const display_width = `${width}%`;
        return [color, description, display_width];
    }

    render() {
        const [inner_color, inner_description, inner_width] = this.innerBubble();

        return React.createElement(
            ELEMENT_NAMES.DIV,
            {
                [PROP_NAMES.CLASSNAME]: "value-bubble",
                [PROP_NAMES.STYLE]: {[PROP_NAMES.BACKGROUNDCOLOR]: "white"},
            },
            React.createElement(
                Bubble,
                {
                    [PROP_NAMES.COLOR]: inner_color,
                    [PROP_NAMES.DESCRIPTION]: inner_description,
                    [PROP_NAMES.STYLE]: {[PROP_NAMES.WIDTH]: inner_width},
                }
            )
        )
    }
}
