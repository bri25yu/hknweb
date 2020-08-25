// This is the explore view

import React from 'react';
import ReactDOM from 'react-dom';
import './components/style.css';

import Facet from './components/FacetQuery';
import { COURSESURVEYS_FACETS, COURSESURVEYSINDEX_NAME } from './constants';


class QueryBoard extends React.Component {
    render() {
        let facetElements = [];
        for (var i = 0; i < COURSESURVEYS_FACETS.length; i ++) {
            const facet = COURSESURVEYS_FACETS[i];
            facetElements.push(<div><Facet facetName={facet} key={'facet' + facet} /></div>)
        }
        return React.createElement("div", {className: "query-board"}, facetElements);
    }
}

export default QueryBoard;

const container = document.getElementById(COURSESURVEYSINDEX_NAME);
ReactDOM.render(<QueryBoard />, container);
