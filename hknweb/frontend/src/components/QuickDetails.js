import React, { Component } from 'react';

import BaseApp from './BaseApp';

import '../style/QuickDetails.css';


class QuickDetails extends BaseApp {
    render() {
        const items = this.state.data.map(dataset => {
            const [datapath, mapping_fn] = dataset;
            return <QuickDetailsPanel
                datapath={datapath}
                mapping_fn={mapping_fn}
                key={`quick-details-panel-${datapath}`}
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
        let items = [];
        if (this.state.data && this.state.data.some(v => v)) {
            const data = this.state.data[0];
            const to_display = data[2];
            const p = data.slice(0, 2);
            items = [
                <InfoBar
                    to_display={to_display}
                    key={'info-bar'}
                />,
                <Chart
                    datapath={p[0]}
                    mapping_fn={p[1]}
                    key={'chart'}
                />,
            ]
        }
        return React.createElement(
            "div",
            {className: "quick-details-panel"},
            items
        )
    }
}


/**
 * @requires props.to_display: Array
 */
class InfoBar extends Component {
    render() {
        const items = !(this.props.to_display && this.props.to_display.some(v => v)) ?
            [] : this.props.to_display.map((item_info) => {
            const [datapath, mapping_fn, data] = item_info;
            return <InfoBarItem
                datapath={datapath}
                mapping_fn={mapping_fn}
                data={data}
            />
        });
        return React.createElement(
            "div",
            {className: "info-bar"},
            items
        )
    }
}

class InfoBarItem extends BaseApp {
    render() {
        const item_to_display = this.state.data[0] || "";
        return <div className="info-bar-item" key={item_to_display}>
            {item_to_display}
        </div>
    }
}


class Chart extends BaseApp {
    render() {
        const items = !this.state.data.some(v => v) ? [] : this.state.data.map(p => {
            const [datapath, mapping_fn] = p;
            return <ChartRow
                datapath={datapath}
                mapping_fn={mapping_fn}
                key={`chart-row-${datapath}`}
            />;
        });

        return React.createElement(
            "table",
            {className: "chart"},
            React.createElement("tbody", null, items)
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
                <td className="chart-row-description-container">
                    <div className="chart-row-description">
                        {data.description}
                    </div>
                </td>,
                <td className="chart-row-bubble-container">
                    <ValueBubble
                        value={data.value}
                        max_value={data.max_value}
                        inverted={data.inverted}
                        key={"value-bubble"}
                    />
                </td>
            ]
        }
        return React.createElement(
            "tr",
            {className:"chart-row"},
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
        style["backgroundColor"] = this.color;
        return <div className="bubble">
            <div className="bubble-background" style={style}>
                &nbsp;
            </div>
            <span className="bubble-text">
                {this.description}
            </span>
        </div>
    }
}


/**
 * @requires props.value
 * @requires props.max_value
 * @requires props.inverted
 */
class ValueBubble extends Component {
    innerBubble() {
        const value = this.props.value;
        const max_value = this.props.max_value;
        const inverted = this.props.inverted;

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

        return <div className="value-bubble" style={{"backgroundColor": "white"}}>
            <Bubble
                color={inner_color}
                description={inner_description}
                style={{width: inner_width}}
            ></Bubble>
        </div>
    }
}
