// This is the explore view

import React from 'react';
import ReactDOM from 'react-dom';

import QueryBoard from './components/FacetQuery';
import QuickDetails from './components/QuickDetails';
import {
    COURSE_FACET_NAME,
    COURSESURVEYS_FACETS,
    COURSESURVEYS_QUICKDETAILS_DATAPATH_FN,
    COURSESURVEYS_QUICKDETAILS_MAPPING_FN,
    COURSESURVEYSINDEX_NAME,
    INSTRUCTOR_FACET_NAME,
    SEMESTER_FACET_NAME,
} from './constants';


class CourseSurveysIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query_params: {
                [COURSE_FACET_NAME]: "",
                [INSTRUCTOR_FACET_NAME]: "",
                [SEMESTER_FACET_NAME]: "",
            },
        };
        this.button_click_fn = this.button_click_fn.bind(this);
    }

    button_click_fn(input) {
        const [facetName, userInput] = input;
        const current_query_params = {...this.state.query_params};
        current_query_params[facetName] = userInput;
        
        this.setState({
            query_params: current_query_params,
        })
    }

    render() {
        const datapath = COURSESURVEYS_QUICKDETAILS_DATAPATH_FN(
            this.state.query_params[INSTRUCTOR_FACET_NAME],
            this.state.query_params[SEMESTER_FACET_NAME],
            this.state.query_params[COURSE_FACET_NAME],
        )
        return React.createElement(
            "div",
            {className: "course-surveys-index"},
            [
                <QueryBoard
                    facets={COURSESURVEYS_FACETS}
                    button_click_fn={this.button_click_fn}
                />,
                <QuickDetails
                    datapath={datapath}
                    mapping_fn={COURSESURVEYS_QUICKDETAILS_MAPPING_FN}
                />,
            ]
        )
    }
}

const container = document.getElementById(COURSESURVEYSINDEX_NAME);
ReactDOM.render(<CourseSurveysIndex />, container);
