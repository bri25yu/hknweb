import React from 'react';
import ReactDOM from 'react-dom';

import QueryBoard from './components/FacetQuery';
import QuickDetails from './components/QuickDetails';
import {
    APP_NAMES,
    COURSESURVEYS_DEFAULT_QUERYPARAMS,
    COURSESURVEYS_FACETS,
    COURSESURVEYS_QUICKDETAILS_DATAPATH_FN,
    COURSESURVEYS_QUICKDETAILS_MAPPING_FN,
    ELEMENT_NAMES,
    PROP_NAMES,
} from './constants';

import "./style/CourseSurveysIndex.css";


class CourseSurveysIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            [PROP_NAMES.QUERY_PARAMS]: COURSESURVEYS_DEFAULT_QUERYPARAMS,
        };
        this[PROP_NAMES.ONCHANGE_FN] = this[PROP_NAMES.ONCHANGE_FN].bind(this);
    }

    onChange_fn(input) {
        const [facetName, userInput] = input;
        const current_query_params = {...this.state[PROP_NAMES.QUERY_PARAMS]};
        current_query_params[facetName] = userInput;
        
        this.setState({
            [PROP_NAMES.QUERY_PARAMS]: current_query_params,
        })
    }

    render() {
        const datapath = COURSESURVEYS_QUICKDETAILS_DATAPATH_FN(this.state[PROP_NAMES.QUERY_PARAMS]);
        return React.createElement(
            ELEMENT_NAMES.DIV,
            {[PROP_NAMES.CLASSNAME]: "course-surveys-index"},
            [
                React.createElement(
                    ELEMENT_NAMES.DIV,
                    {[PROP_NAMES.CLASSNAME]: "query-board-container"},
                    React.createElement(
                        QueryBoard,
                        {
                            [PROP_NAMES.FACETS]: COURSESURVEYS_FACETS,
                            [PROP_NAMES.ONCHANGE_FN]: this.onChange_fn,
                            [PROP_NAMES.KEY]: "query-board",
                        }
                    )
                ),
                React.createElement(
                    ELEMENT_NAMES.DIV,
                    {[PROP_NAMES.CLASSNAME]: "quick-details-container"},
                    React.createElement(
                        QuickDetails,
                        {
                            [PROP_NAMES.DATAPATH]: datapath,
                            [PROP_NAMES.MAPPING_FN]: COURSESURVEYS_QUICKDETAILS_MAPPING_FN,
                            [PROP_NAMES.KEY]: "quick-details",
                        }
                    )
                )
            ]
        )
    }
}

const container = document.getElementById(APP_NAMES.COURSESURVEYSINDEX);
ReactDOM.render(<CourseSurveysIndex />, container);
