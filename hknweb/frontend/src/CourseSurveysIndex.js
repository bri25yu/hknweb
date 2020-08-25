// This is the explore view

import React from 'react';
import ReactDOM from 'react-dom';
import './components/style.css';

import Facet from './components/FacetQuery';
import { COURSESURVEYS_FACETS, COURSESURVEYSINDEX_NAME } from './constants';


class QueryBoard extends React.Component {
    render() {
        let facetElements = [];
        for (const [facetName, facetInfo] of Object.entries(COURSESURVEYS_FACETS)) {
            const [datapath, mapping_fn] = facetInfo;
            facetElements.push(
                <div key={'div' + facetName}>
                    <Facet
                        facetName={facetName}
                        key={'facet' + facetName}
                        datapath={datapath}
                        mapping_fn={mapping_fn}
                    />
                </div>
            )
        }
        return React.createElement("div", {className: "query-board"}, facetElements);
    }
}

export default QueryBoard;

const container = document.getElementById(COURSESURVEYSINDEX_NAME);
ReactDOM.render(<QueryBoard />, container);
