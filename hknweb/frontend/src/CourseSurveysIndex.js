import React from "react";
import ReactDOM from "react-dom";

import { BaseApp } from "./components/BaseApp";
import QueryBoard from "./components/FacetQuery";
import { QuickDetails, QuickDetailsPanel } from "./components/QuickDetails";
import { InfoBar, InfoBarItem } from "./components/InfoBar";
import { Chart, ChartRow } from "./components/Chart";
import { ValueBubble } from "./components/Bubble";
import {
    APP_NAMES,
    COURSESURVEYS_DEFAULT_QUERYPARAMS,
    COURSESURVEYS_FACETS,
    DATAPATHS,
    DJANGO_QL,
    FACET_NAMES,
    ELEMENT_NAMES,
    MODEL_ATTRIBUTES,
    PROP_NAMES,
} from "./constants";

import "./style/CourseSurveysIndex.css";


class CourseSurveysIndex extends BaseApp {
    constructor(props) {
        super(props);
        this.state = {
            [PROP_NAMES.QUERY_PARAMS]: COURSESURVEYS_DEFAULT_QUERYPARAMS,
            [PROP_NAMES.QUICK_DETAILS]: null,
        };
        this[PROP_NAMES.ONCHANGE_FN] = this[PROP_NAMES.ONCHANGE_FN].bind(this);
    }

    loaded() {
        return Boolean(this.state[PROP_NAMES.QUICK_DETAILS]);
    }

    _render() {
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
                    {
                        [PROP_NAMES.CLASSNAME]: "quick-details-container",
                        [PROP_NAMES.KEY]: "quick-details-container",
                    },
                    this.state[PROP_NAMES.QUICK_DETAILS]
                )
            ]
        )
    }

    updateData() {
        Promise.resolve(this.getQuickDetails())
            .then(quick_details => this.setState({[PROP_NAMES.QUICK_DETAILS]: quick_details}));
    }

    getQuickDetails() {
        const icsrs_datapath = CourseSurveysIndex.parseQueryParams(this.state[PROP_NAMES.QUERY_PARAMS]);

        return CourseSurveysIndex.fetchData(icsrs_datapath)
            .then(icsrs => Promise.all(icsrs.map(CourseSurveysIndex.getQuickDetailPanel)))
            .then(quick_details_panels => {
                    return React.createElement(
                        QuickDetails,
                        {[PROP_NAMES.QUICK_DETAILS_PANELS]: quick_details_panels}
                    )
            });
    }

    static parseQueryParams(query_params) {
        const i = query_params[FACET_NAMES.INSTRUCTOR] || "";
        const s = query_params[FACET_NAMES.SEMESTER] || "";
        const y = query_params[FACET_NAMES.YEAR] || "";
        const c = query_params[FACET_NAMES.COURSE] || "";

        const i_query_param = `${DJANGO_QL(MODEL_ATTRIBUTES.ICSR.ICSR_INSTRUCTOR, MODEL_ATTRIBUTES.INSTRUCTOR.INSTRUCTOR_ID)}=${i}`;
        const s_query_param = `${DJANGO_QL(MODEL_ATTRIBUTES.ICSR.ICSR_SEMESTER, MODEL_ATTRIBUTES.SEMESTER.YEAR_SECTION)}=${s}`;
        const y_query_param = `${DJANGO_QL(MODEL_ATTRIBUTES.ICSR.ICSR_SEMESTER, MODEL_ATTRIBUTES.SEMESTER.YEAR)}=${y}`;
        const c_query_param = `${DJANGO_QL(MODEL_ATTRIBUTES.ICSR.ICSR_COURSE, MODEL_ATTRIBUTES.ID)}=${c}`;

        return `${DATAPATHS.ACADEMICS.ICSRS}/?${i_query_param}&${c_query_param}&${y_query_param}&${s_query_param}`;
    }

    static getQuickDetailPanel(icsr) {
        const survey_path = `${DATAPATHS.COURSESURVEYS.SURVEYS}/?${DJANGO_QL(MODEL_ATTRIBUTES.SURVEY.SURVEY_ICSR, MODEL_ATTRIBUTES.ID)}=${icsr[MODEL_ATTRIBUTES.ID]}`;
        return CourseSurveysIndex.fetchData(survey_path)
            .then(surveys => surveys[0])
            .then(survey => Promise.all([
                CourseSurveysIndex.getInfoBar(icsr, survey),
                CourseSurveysIndex.getChart(survey)
            ]))
            .then(p => {
                const [infoBar, chart] = p;
                return React.createElement(
                    QuickDetailsPanel,
                    {
                        [PROP_NAMES.INFO_BAR]: infoBar,
                        [PROP_NAMES.CHART]: chart,
                    }
                )
            })
    }

    static getInfoBar(icsr, survey) {
        return Promise.all(
            [
                `${icsr[MODEL_ATTRIBUTES.ICSR.FIRST_NAME]} ${icsr[MODEL_ATTRIBUTES.ICSR.LAST_NAME]}`,
                CourseSurveysIndex.fetchData(icsr[MODEL_ATTRIBUTES.ICSR.ICSR_DEPARTMENT]).then(
                    dept => `${dept[MODEL_ATTRIBUTES.DEPARTMENT.ABBR]} ${icsr[MODEL_ATTRIBUTES.ICSR.COURSE_NUMBER]}`
                ),
                CourseSurveysIndex.fetchData(icsr[MODEL_ATTRIBUTES.ICSR.ICSR_SEMESTER]).then(
                    semester => `${semester[MODEL_ATTRIBUTES.SEMESTER.YEAR_SECTION]} ${semester[MODEL_ATTRIBUTES.SEMESTER.YEAR]}`
                ),
                `${survey[MODEL_ATTRIBUTES.SURVEY.RESPONSE_COUNT]} responses`,
            ]
        ).then(items => items.map(item => React.createElement(
            InfoBarItem,
            {[PROP_NAMES.ITEM_TO_DISPLAY]: item}
        )))
        .then(info_bar_items => React.createElement(InfoBar, {[PROP_NAMES.TO_DISPLAY]: info_bar_items}))
    }

    static getChart(survey) {
        return CourseSurveysIndex.fetchData(`${DATAPATHS.COURSESURVEYS.RATINGS}/?${DJANGO_QL(MODEL_ATTRIBUTES.RATING.RATING_SURVEY, MODEL_ATTRIBUTES.ID)}=${survey[MODEL_ATTRIBUTES.ID]}`)
            .then(ratings => Promise.all(ratings.map(CourseSurveysIndex.getChartRow)))
            .then(chart_rows => React.createElement(Chart, {[PROP_NAMES.CHART_ROWS]: chart_rows}))
    }

    static getChartRow(rating) {
        const value = React.createElement(
            ValueBubble,
            {
                [PROP_NAMES.VALUE]: rating[MODEL_ATTRIBUTES.RATING.RATING_VALUE],
                [PROP_NAMES.MAX_VALUE]: rating[MODEL_ATTRIBUTES.RATING.RANGE_MAX],
                [PROP_NAMES.INVERTED]: rating[MODEL_ATTRIBUTES.RATING.INVERTED],
            }
        )
        return React.createElement(
            ChartRow,
            {
                [PROP_NAMES.DESCRIPTION]: rating[MODEL_ATTRIBUTES.RATING.QUESTION_TEXT],
                [PROP_NAMES.VALUE]: value,
            }
        )
    }

    onChange_fn(input) {
        const [facetName, userInput] = input;
        const current_query_params = {...this.state[PROP_NAMES.QUERY_PARAMS]};
        current_query_params[facetName] = userInput;

        this.state[PROP_NAMES.QUERY_PARAMS] = current_query_params;
        this.updateData();
    }
    
}

const container = document.getElementById(APP_NAMES.COURSESURVEYSINDEX);
ReactDOM.render(React.createElement(CourseSurveysIndex), container);
