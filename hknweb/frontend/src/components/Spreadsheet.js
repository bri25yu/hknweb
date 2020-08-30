import React, { Component } from "react";

import { ELEMENT_NAMES, PROP_NAMES } from "../constants";
import PropTypes from "prop-types";
import "../style/Spreadsheet.css";


export class Spreadsheet extends Component {
    static propTypes = {
        [PROP_NAMES.DATA]: PropTypes.arrayOf(Array).isRequired,
        [PROP_NAMES.WIDTHS]: PropTypes.arrayOf(PropTypes.number).isRequired,
    }

    render() {
        const items = [
            React.createElement(
                ELEMENT_NAMES.TR,
                {
                    [PROP_NAMES.KEY]: "spreadsheet-header-row",
                },
                this.props[PROP_NAMES.WIDTHS].map((width, i) => {
                    return React.createElement(
                        ELEMENT_NAMES.TH,
                        {
                            [PROP_NAMES.STYLE]: {
                                [PROP_NAMES.WIDTH]: width,
                            },
                            [PROP_NAMES.KEY]: `spreadsheet-header-${i}`,
                        },
                    )
                })
            )
        ]
        items.push(...this.props[PROP_NAMES.DATA].map((row, row_i) => {
            return React.createElement(
                ELEMENT_NAMES.TR,
                {
                    [PROP_NAMES.CLASSNAME]: "spreadsheet-row",
                    [PROP_NAMES.KEY]: `spreadsheet-row-${row_i}`,
                },
                row.map((item, col_i) => {
                    return React.createElement(
                        ELEMENT_NAMES.TD,
                        {
                            [PROP_NAMES.CLASSNAME]: "spreadsheet-cell",
                            [PROP_NAMES.KEY]: `spreadhsheet-cell-${col_i}`,
                        },
                        item
                    )
                })
            )
        }));
        
        return React.createElement(
            ELEMENT_NAMES.TABLE,
            {
                [PROP_NAMES.CLASSNAME]: "spreadsheet",
            },
            React.createElement(
                ELEMENT_NAMES.TBODY,
                null,
                items
            )
        )
    }
}
