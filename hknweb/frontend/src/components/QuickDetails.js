import React, { Component } from 'react';

import BaseApp from './BaseApp';


class QuickDetails extends BaseApp {
    render() {
        const items = [];
        for (const [datapath, mapping_fn] in this.state.data.panels) {
            items.push(<QuickDetailsPanel
                datapath={datapath}
                mapping_fn={mapping_fn}
            />)
        }
        return React.createElement(
            "div",
            {className: "quick-details"},
            items
        )
    }
}

export default QuickDetails;


class QuickDetailsPanel extends BaseApp {
    render() {
        const to_display = this.state.data.to_display;
        const datapath = this.state.data.datapath;
        const mapping_fn = this.state.data.mapping_fn;
        return React.createElement(
            "div",
            {className: "quick-details-panel"},
            [
                <InfoBar to_display={to_display} />,
                <Chart datapath={datapath} mapping_fn={mapping_fn} />,
            ]
        )
    }
}


/**
 * @requires props.to_display: Array
 */
class InfoBar extends Component {
    render() {
        const items = []
        for (var item_to_display in this.props.to_display) {
            items.push(React.createElement(<div className="info-bar-item">
                {item_to_display}
            </div>))
        }
        return React.createElement(
            "div",
            {className: "info-bar"},
            items
        )
    }
}


class Chart extends BaseApp {
    render() {
        const items = [];
        for (var [datapath, mapping_fn] in this.state.data) {
            items.push(
            <ChartRow
                datapath={datapath}
                mapping_fn={mapping_fn}
            />)
        }
        return React.createElement(
            "div",
            {className: "chart"},
            items
        )
    }
}


class ChartRow extends BaseApp {
    render() {
        return <div className="chart-row">
            {this.state.data.description}
            <ValueBubble
                value={this.state.data.value}
                max_value={this.state.data.max_value}
                inverted={this.state.data.inverted}
            />
        </div>
    }
}


/**
 * @requires props.description
 * @requires props.color
 */
class Bubble extends Component {
    constructor(props) {
        super(props);
        this.color = props.color;
        this.description = props.description;
    }

    render() {
        return <div className="bubble" color={this.color}>
            {this.description}
        </div>
    }
}


/**
 * @requires props.value
 * @requires props.max_value
 * @requires props.inverted
 */
class ValueBubble extends Bubble {
    constructor(props) {
        let color;
        if (this.props.value) {
            const scaled = this.props.value / this.props.max_value;
            const r = (scaled < 0.66) ? 255 : 0;
            const g = (scaled > 0.33) ? 255 : 0;
            color = (this.props.inverted) ? `rgb(${g}, ${r}, 0)` : `rgb(${r}, ${g}, 0)`;
        } else {
            color = "white"
        }

        const description = `${this.props.value} / ${this.props.max_value}`;

        props.color = color;
        props.description = description;

        super(props);
    }
}
