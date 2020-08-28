import React, { Component } from 'react';

import BaseApp from './BaseApp';

import '../style/QuickDetails.css';
import {
    ELEMENT_NAMES,
    PROP_NAMES,
} from '../constants'


class QuickDetails extends BaseApp {
    render() {
        const items = this.state.data.map(dataset => {
            const [datapath, mapping_fn] = dataset;
            return React.createElement(
                QuickDetailsPanel,
                {
                    [PROP_NAMES.DATAPATH]: datapath,
                    [PROP_NAMES.MAPPING_FN]: mapping_fn,
                    [PROP_NAMES.KEY]: `quick-details-panel-${datapath}`,
                }
            );
        });

        return React.createElement(
            ELEMENT_NAMES.DIV,
            {[PROP_NAMES.CLASSNAME]: "quick-details"},
            items
        )
    }
}

export default QuickDetails;


class QuickDetailsPanel extends BaseApp {
    render() {
        let items = [];
        if (this.state.data && this.state.data.some(v => v)) {
            const data = this.state.data[0];
            const to_display = data[2];
            const p = data.slice(0, 2);
            items = [
                React.createElement(
                    InfoBar,
                    {
                        [PROP_NAMES.TO_DISPLAY]: to_display,
                        [PROP_NAMES.KEY]: 'info-bar',
                    }   
                ),
                React.createElement(
                    Chart,
                    {
                        [PROP_NAMES.DATAPATH]: p[0],
                        [PROP_NAMES.MAPPING_FN]: p[1],
                        [PROP_NAMES.KEY]: 'chart',
                    }
                ),
            ]
        }
        return React.createElement(
            ELEMENT_NAMES.DIV,
            {[PROP_NAMES.CLASSNAME]: "quick-details-panel"},
            items
        )
    }
}


/**
 * @requires props.to_display: Array
 */
class InfoBar extends Component {
    render() {
        const to_display = this.props[PROP_NAMES.TO_DISPLAY];
        const items = !(to_display && to_display.some(v => v)) ?
            [] : to_display.map((item_info) => {
            const [datapath, mapping_fn, data] = item_info;
            return React.createElement(
                InfoBarItem,
                {
                    [PROP_NAMES.DATAPATH]: datapath,
                    [PROP_NAMES.MAPPING_FN]: mapping_fn,
                    [PROP_NAMES.DATA]: data,
                }
            )
        });
        return React.createElement(
            ELEMENT_NAMES.DIV,
            {[PROP_NAMES.CLASSNAME]: "info-bar"},
            items
        )
    }
}

class InfoBarItem extends BaseApp {
    render() {
        const item_to_display = this.state.data[0] || "";
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


class Chart extends BaseApp {
    render() {
        const items = !this.state.data.some(v => v) ? [] : this.state.data.map(p => {
            const [datapath, mapping_fn] = p;
            return React.createElement(
                ChartRow,
                {
                    [PROP_NAMES.DATAPATH]: datapath,
                    [PROP_NAMES.MAPPING_FN]: mapping_fn,
                    [PROP_NAMES.KEY]: `chart-row-${datapath}`,
                }
            )
        });

        return React.createElement(
            ELEMENT_NAMES.TABLE,
            {[PROP_NAMES.CLASSNAME]: "chart"},
            React.createElement(
                ELEMENT_NAMES.TBODY,
                null,
                items
            )
        )
    }
}


class ChartRow extends BaseApp {
    render() {
        let data = this.state.data;
        let items = [];
        if (data && data.some(v => v)) {
            const data = this.state.data[0];
            items = [
                React.createElement(
                    ELEMENT_NAMES.TD,
                    {[PROP_NAMES.CLASSNAME]: "chart-row-description-container"},
                    React.createElement(
                        ELEMENT_NAMES.DIV,
                        {[PROP_NAMES.CLASSNAME]: "chart-row-description"},
                        data[PROP_NAMES.DESCRIPTION]
                    )
                ),
                React.createElement(
                    ELEMENT_NAMES.TD,
                    {[PROP_NAMES.CLASSNAME]: "chart-row-bubble-container"},
                    React.createElement(
                        ValueBubble,
                        {
                            [PROP_NAMES.VALUE]: data[PROP_NAMES.VALUE],
                            [PROP_NAMES.MAX_VALUE]: data[PROP_NAMES.MAX_VALUE],
                            [PROP_NAMES.INVERTED]: data[PROP_NAMES.INVERTED],
                            [PROP_NAMES.KEY]: "value-bubble",
                        }
                    )
                )
            ]
        }
        return React.createElement(
            ELEMENT_NAMES.TR,
            {[PROP_NAMES.CLASSNAME]: "chart-row"},
            items
        )
    }
}


/**
 * @requires props.description
 * @requires props.color
 */
class Bubble extends Component {
    constructor(props) {
        super(props);
        this.color = props.color || "white";
        this.description = props.description || "";
    }

    render() {
        const style = {...this.props.style};
        style[PROP_NAMES.BACKGROUNDCOLOR] = this.color;
        return React.createElement(
            ELEMENT_NAMES.DIV,
            {[PROP_NAMES.CLASSNAME]: "bubble"},
            [
                React.createElement(
                    ELEMENT_NAMES.DIV,
                    {
                        [PROP_NAMES.CLASSNAME]: "bubble-background",
                        [PROP_NAMES.STYLE]: style,
                    },
                    ELEMENT_NAMES.NBSP
                ),
                React.createElement(
                    ELEMENT_NAMES.SPAN,
                    {[PROP_NAMES.CLASSNAME]: "bubble-text"},
                    this.description
                )
            ]
        )
    }
}


/**
 * @requires props.value
 * @requires props.max_value
 * @requires props.inverted
 */
class ValueBubble extends Component {
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
