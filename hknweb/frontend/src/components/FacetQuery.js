import React from "react";
import PropTypes from "prop-types";
import "../style/FacetQuery.css";
import { AUTOCOMPLETE_MAX_ITEMS } from "./constants";
import { DataFetchApp } from "./BaseApp";
import {
  ELEMENT_NAMES,
  PROP_NAMES,
} from "../constants";


class QueryBoard extends React.Component {
    /**
     * 
     * @param {*} props 
     * 
     * @requires props.facets
     */
    constructor(props) {
        super(props);
        this.facets = props.facets;
    }

    render() {
        let facetElements = [];
        for (const [facetName, facetInfo] of Object.entries(this.facets)) {
            facetElements.push(
                React.createElement(
                    ELEMENT_NAMES.DIV,
                    {[PROP_NAMES.KEY]: 'div' + facetName},
                    React.createElement(
                        Facet,
                        {
                            [PROP_NAMES.FACETNAME]: facetName,
                            [PROP_NAMES.KEY]: 'facet' + facetName,
                            [PROP_NAMES.DATAPATH]: facetInfo[PROP_NAMES.DATAPATH],
                            [PROP_NAMES.MAPPING_FN]: facetInfo[PROP_NAMES.MAPPING_FN],
                            [PROP_NAMES.ONCHANGE_FN]: this.props[PROP_NAMES.ONCHANGE_FN],
                            [PROP_NAMES.PLACEHOLDER]: facetInfo[PROP_NAMES.PLACEHOLDER],
                        }
                    )
                )
            )
        }
        return React.createElement(
            ELEMENT_NAMES.DIV,
            {[PROP_NAMES.CLASSNAME]: "query-board"},
            facetElements
        );
    }
}

export default QueryBoard;


class Facet extends DataFetchApp {
    constructor(props) {
        super(props);
        this.facetName = props.facetName;
    }

    render() {
      const options = this.state.data;
        return React.createElement(
            ELEMENT_NAMES.DIV,
            {
                [PROP_NAMES.CLASSNAME]: "facet",
                [PROP_NAMES.KEY]: "facet-" + this.facetName,
            },
            [
                React.createElement(
                    ELEMENT_NAMES.DIV,
                    {
                        [PROP_NAMES.KEY]: "facetName" + this.facetName,
                        [PROP_NAMES.CLASSNAME]: "facet-text",
                    },
                    this.facetName
                ),
                React.createElement(
                    QueryBar,
                    {
                        [PROP_NAMES.OPTIONS]: options,
                        [PROP_NAMES.KEY]: 'query-bar',
                        [PROP_NAMES.ONCHANGE_FN]: (userInput) => this.props[PROP_NAMES.ONCHANGE_FN]([this.facetName, userInput]),
                        [PROP_NAMES.PLACEHOLDER]: this.props[PROP_NAMES.PLACEHOLDER],
                    }
                )
            ]
        )
    }
}


class QueryBar extends React.Component {
    // From https://blog.bitsrc.io/building-a-react-autocomplete-component-from-scratch-b78105324f4c

    /**
     * 
     * @param {*} props 
     * 
     * @requires props.button_click_fn
     */
    constructor(props) {
      super(props);
      this[PROP_NAMES.ONCHANGE_FN] = props[PROP_NAMES.ONCHANGE_FN] || ((userInput) => userInput);
    }

    static propTypes = {
        [PROP_NAMES.OPTIONS]: PropTypes.instanceOf(Array).isRequired
    };

    state = {
        [PROP_NAMES.ACTIVEOPTION]: 0,
        [PROP_NAMES.FILTEREDOPTIONS]: [],
        [PROP_NAMES.SHOWOPTIONS]: false,
        [PROP_NAMES.USERINPUT]: ''
    };
    
    onChange = (e) => {
        const { options } = this.props;
        const userInput = e.currentTarget.value;
    
        const filteredOptions = options.filter(
          (optionName) => optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
    
        this.setState({
            [PROP_NAMES.ACTIVEOPTION]: 0,
            filteredOptions,
            [PROP_NAMES.SHOWOPTIONS]: true,
            [PROP_NAMES.USERINPUT]: e.currentTarget.value
        });

        this[PROP_NAMES.ONCHANGE_FN](userInput);
    };
    
    onClick = (e) => {
        const userInput = e.currentTarget.innerText;
        this.setState({
            [PROP_NAMES.ACTIVEOPTION]: 0,
            [PROP_NAMES.FILTEREDOPTIONS]: [],
            [PROP_NAMES.SHOWOPTIONS]: false,
            [PROP_NAMES.USERINPUT]: userInput
        });

        this[PROP_NAMES.ONCHANGE_FN](userInput);
    };

    onKeyDown = (e) => {
        const { activeOption, filteredOptions } = this.state;
    
        if (e.keyCode === 13) {
            this.setState({
                [PROP_NAMES.ACTIVEOPTION]: 0,
                [PROP_NAMES.SHOWOPTIONS]: false,
                [PROP_NAMES.USERINPUT]: filteredOptions[activeOption]
            });

            this[PROP_NAMES.ONCHANGE_FN](filteredOptions[activeOption]);
        } else if (e.keyCode === 38) {
            if (activeOption === 0) {
                return;
            }
            this.setState({ [PROP_NAMES.ACTIVEOPTION]: activeOption - 1 });
        } else if (e.keyCode === 40) {
            if (activeOption === filteredOptions.length - 1) {
                return;
            }
            this.setState({ [PROP_NAMES.ACTIVEOPTION]: activeOption + 1 });
        }
    };
    
    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
        
            state: { activeOption, filteredOptions, showOptions, userInput }
        } = this;

        let optionList;
        if (showOptions && userInput) {
            if (filteredOptions.length) {
                optionList = (
                    <ul className="options">
                        {filteredOptions.map((optionName, index) => {
                        let className;
                        if (index === activeOption) {
                            className = 'option-active';
                        }
                        return (
                            <li className={className} key={optionName} onClick={onClick}>
                            {optionName}
                            </li>
                        );
                        }).slice(0, AUTOCOMPLETE_MAX_ITEMS)}
                    </ul>
                );
            } else {
                optionList = (
                    <div className="no-options">
                        <em>No Option!</em>
                    </div>
                );
            }
        }
        return (
            <React.Fragment>
                <div className="search">
                    <input
                        type="text"
                        className="search-box"
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        onClick={onClick}
                        value={userInput}
                        placeholder={this.props[PROP_NAMES.PLACEHOLDER]}
                    />
                    {optionList}
                </div>
            </React.Fragment>
        );
    }
}
