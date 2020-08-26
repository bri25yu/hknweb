// This is the explore view

import React from 'react';
import ReactDOM from 'react-dom';

import QueryBoard from './components/FacetQuery';
import { COURSESURVEYS_FACETS, COURSESURVEYSINDEX_NAME } from './constants';


const container = document.getElementById(COURSESURVEYSINDEX_NAME);
ReactDOM.render(<QueryBoard facets={COURSESURVEYS_FACETS} />, container);
