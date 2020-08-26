import React, { Component } from 'react';

import BaseApp from './BaseApp';


class QuickDetails extends BaseApp {
    render() {
        const items = this.state.data.map(dataset => {
            const [datapath, mapping_fn] = dataset;
            console.log(mapping_fn);
            return <QuickDetailsPanel
                datapath={datapath}
                mapping_fn={mapping_fn}
            />
        });

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
        // console.log(`quickdetailspanel: ${this.state.data}`);
        const to_display = this.state.data[2];
        const p = this.state.data.slice(0, 2);
        return React.createElement(
            "div",
            {className: "quick-details-panel"},
            [
                <InfoBar to_display={to_display} />,
                <Chart datapath={p[0]} mapping_fn={p[1]} />,
            ]
        )
    }
}


/**
 * @requires props.to_display: Array
 */
class InfoBar extends Component {
    render() {
        const items = !this.props.to_display.some(v => v) ?
            [] : this.props.to_display.map((item_to_display) => {
            return <div className="info-bar-item">
                {item_to_display}
            </div>
        });
        return React.createElement(
            "div",
            {className: "info-bar"},
            items
        )
    }
}


class Chart extends BaseApp {
    render() {
        const items = !this.state.data.some(v => v) ? [] : this.state.data.map((p) => {
            const [datapath, mapping_fn] = p;
            return <ChartRow
                datapath={datapath}
                mapping_fn={mapping_fn}
            />;
        });

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
        this.color = props.color || "white";
        this.description = props.description || "";
    }

    render() {
        return <div className="bubble" style={{color: this.color}}>
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
        super(props);

        let color;
        if (props.value) {
            const scaled = props.value / props.max_value;
            const r = (scaled < 0.66) ? 255 : 0;
            const g = (scaled > 0.33) ? 255 : 0;
            color = (props.inverted) ? `rgb(${g}, ${r}, 0)` : `rgb(${r}, ${g}, 0)`;
        } else {
            color = "white"
        }

        const description = `${props.value} / ${props.max_value}`;

        this.color = color;
        this.description = description;
    }
}
