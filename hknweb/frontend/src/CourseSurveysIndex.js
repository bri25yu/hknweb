// This is the explore view

import React from 'react';
import ReactDOM from 'react-dom';
import './components/style.css';

import Facet from './components/FacetQuery';
import { COURSESURVEYS_FACETS, COURSESURVEYSINDEX_NAME } from './constants';


class QueryBoard extends React.Component {
    render() {
        let facetElements = [];
        for (var facet in COURSESURVEYS_FACETS) {
            facetElements.push(<Facet facetName={facet} key={'facet' + facet} />)
        }
        return React.createElement("div", null, facetElements);
    }
}

export default QueryBoard;

const container = document.getElementById(COURSESURVEYSINDEX_NAME);
ReactDOM.render(<QueryBoard />, container);
