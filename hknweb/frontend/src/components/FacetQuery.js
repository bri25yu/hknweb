import React from 'react';
import PropTypes from 'prop-types';
import '../style/FacetQuery.css';
import { AUTOCOMPLETE_MAX_ITEMS } from './constants';
import BaseApp from "./BaseApp";


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
          const [datapath, mapping_fn] = facetInfo;
          facetElements.push(
              <div key={'div' + facetName}>
                  <Facet
                      facetName={facetName}
                      key={'facet' + facetName}
                      datapath={datapath}
                      mapping_fn={mapping_fn}
                      button_click_fn={this.props.button_click_fn}
                  />
              </div>
          )
      }
      return React.createElement("div", {className: "query-board"}, facetElements);
  }
}

export default QueryBoard;


class Facet extends BaseApp {
    constructor(props) {
      super(props);
      this.facetName = props.facetName;
    }

    render() {
      const options = this.state.data;
        return React.createElement(
            "div",
            {
                className: "facet",
                key: "facet-" + this.facetName,
            },
            [
                <div key={"facetName" + this.facetName} className="facet-text">{this.facetName}</div>,
                <QueryBar
                  options={options}
                  key='query-bar'
                  button_click_fn={(userInput) => this.props.button_click_fn([this.facetName, userInput])}
                />,
            ]
        )
    }
}


class QueryBar extends React.Component {
    // From https://blog.bitsrc.io/building-a-react-autocomplete-component-from-scratch-b78105324f4c

    constructor(props) {
      super(props);
      this.button_click_fn = props.button_click_fn || ((userInput) => userInput);
    }

    static propTypes = {
        options: PropTypes.instanceOf(Array).isRequired
    };

    state = {
        activeOption: 0,
        filteredOptions: [],
        showOptions: false,
        userInput: ''
    };
    
    onChange = (e) => {
        const { options } = this.props;
        const userInput = e.currentTarget.value;
    
        const filteredOptions = options.filter(
          (optionName) => optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
    
        this.setState({
            activeOption: 0,
            filteredOptions,
            showOptions: true,
            userInput: e.currentTarget.value
        });
    };
    
    onClick = (e) => {
        this.setState({
          activeOption: 0,
          filteredOptions: [],
          showOptions: false,
          userInput: e.currentTarget.innerText
        });
    };

    onKeyDown = (e) => {
        const { activeOption, filteredOptions } = this.state;
    
        if (e.keyCode === 13) {
          this.setState({
            activeOption: 0,
            showOptions: false,
            userInput: filteredOptions[activeOption]
          });
        } else if (e.keyCode === 38) {
          if (activeOption === 0) {
            return;
          }
          this.setState({ activeOption: activeOption - 1 });
        } else if (e.keyCode === 40) {
          if (activeOption === filteredOptions.length - 1) {
            console.log(activeOption);
            return;
          }
          this.setState({ activeOption: activeOption + 1 });
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
                value={userInput}
              />
              <input type="button" value="" className="search-btn" onClick={() => this.button_click_fn(userInput)} />
              {optionList}
            </div>
          </React.Fragment>
        );
    }
}
