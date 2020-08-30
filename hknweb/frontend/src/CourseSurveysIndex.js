import React from "react";
import ReactDOM from "react-dom";

import { BaseApp } from "./components/BaseApp";
import QueryBoard from "./components/FacetQuery";
import { QuickDetails, QuickDetailsPanel } from "./components/QuickDetails";
import { InfoBar, InfoBarItem } from "./components/InfoBar";
import { Chart, ChartRow } from "./components/Chart";
import { ValueBubble } from "./components/Bubble";
import { SelectorPanel } from "./components/SelectorPanel";
import { Spreadsheet } from "./components/Spreadsheet";
import { EntityDetail, EntityDetailsPanel } from "./components/EntityDetails";
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
    SELECTION_NAMES,
    SELECTIONS,
} from "./constants";

import "./style/CourseSurveysIndex.css";


class CourseSurveysIndex extends BaseApp {
    constructor(props) {
        super(props);
        this.state = {
            [PROP_NAMES.QUERY_PARAMS]: COURSESURVEYS_DEFAULT_QUERYPARAMS,
            [PROP_NAMES.QUICK_DETAILS]: null,
            [PROP_NAMES.CURRENT_SELECTION]: SELECTION_NAMES.RATINGS,
            [PROP_NAMES.QUERYBOARD]: null,
        };

        this[PROP_NAMES.ONCHANGE_FN] = this[PROP_NAMES.ONCHANGE_FN].bind(this);
        this.onClick_fn = this.onClick_fn.bind(this);

        this.getRatingsQueryBoard = this.getRatingsQueryBoard.bind(this);
        this.getRatingsQuickDetails = this.getRatingsQuickDetails.bind(this);

        this.getInstructorQueryBoard = this.getInstructorQueryBoard.bind(this);
        this.getInstructorQuickDetails = this.getInstructorQuickDetails.bind(this);

        this.getCourseQueryBoard = this.getCourseQueryBoard.bind(this);
        this.getCourseQuickDetails = this.getCourseQuickDetails.bind(this);

        this.COURSESURVEYS_SELECTIONS = {
            [SELECTION_NAMES.INSTRUCTOR]: {
                [PROP_NAMES.SELECTION_PANEL_FN]: this.getInstructorQueryBoard,
                [PROP_NAMES.QUICK_DETAILS_FN]: this.getInstructorQuickDetails,
            },
            [SELECTION_NAMES.SEMESTER]: {
                [PROP_NAMES.SELECTION_PANEL_FN]: this.getCourseQueryBoard,
                [PROP_NAMES.QUICK_DETAILS_FN]: this.getCourseQuickDetails,
            },
            [SELECTION_NAMES.RATINGS]: {
                [PROP_NAMES.SELECTION_PANEL_FN]: this.getRatingsQueryBoard,
                [PROP_NAMES.QUICK_DETAILS_FN]: this.getRatingsQuickDetails,
            },
        }
    }

    loaded() {
        return this.state[PROP_NAMES.QUICK_DETAILS] && this.state[PROP_NAMES.QUERYBOARD];
    }

    _render() {
        return React.createElement(
            ELEMENT_NAMES.DIV,
            {[PROP_NAMES.CLASSNAME]: "course-surveys-index"},
            [
                React.createElement(
                    ELEMENT_NAMES.DIV,
                    {
                        [PROP_NAMES.CLASSNAME]: "selection-panel-container",
                        [PROP_NAMES.KEY]: "selection-panel-container",
                    },
                    React.createElement(
                        SelectorPanel,
                        {
                            [PROP_NAMES.SELECTIONS]: SELECTIONS,
                            [PROP_NAMES.VALUE]: this.state[PROP_NAMES.QUERYBOARD],
                            [PROP_NAMES.ONCLICK_FN]: this.onClick_fn,
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
        const current = this.COURSESURVEYS_SELECTIONS[this.state[PROP_NAMES.CURRENT_SELECTION]];
        const quick_details_fn = current[PROP_NAMES.QUICK_DETAILS_FN];
        const query_board_fn = current[PROP_NAMES.SELECTION_PANEL_FN];

        Promise.resolve(quick_details_fn())
        .then(quick_details => Promise.all([
            quick_details,
            query_board_fn(),
        ]))
        .then(p => this.setState({
            [PROP_NAMES.QUICK_DETAILS]: p[0],
            [PROP_NAMES.QUERYBOARD]: p[1],
        }));
    }

    getRatingsQueryBoard() {
        return React.createElement(
            QueryBoard,
            {
                [PROP_NAMES.FACETS]: COURSESURVEYS_FACETS,
                [PROP_NAMES.ONCHANGE_FN]: this.onChange_fn,
            }
        )
    }

    getRatingsQuickDetails() {
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

    getInstructorQueryBoard() {
        const facets = {};
        facets[FACET_NAMES.INSTRUCTOR] = COURSESURVEYS_FACETS[FACET_NAMES.INSTRUCTOR];
        return React.createElement(
            QueryBoard,
            {
                [PROP_NAMES.FACETS]: facets,
                [PROP_NAMES.ONCHANGE_FN]: this.onChange_fn,
            }
        )
    }

    getInstructorQuickDetails() {
        return React.createElement(ELEMENT_NAMES.DIV);
    }

    getCourseQueryBoard() {
        const facets = {};
        facets[FACET_NAMES.COURSE] = COURSESURVEYS_FACETS[FACET_NAMES.COURSE];
        return React.createElement(
            QueryBoard,
            {
                [PROP_NAMES.FACETS]: facets,
                [PROP_NAMES.ONCHANGE_FN]: this.onChange_fn,
            }
        )
    }

    getCourseQuickDetails() {
        return React.createElement(ELEMENT_NAMES.DIV);
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
                        [PROP_NAMES.KEY]: `quick-details-panel-${survey_path}`,
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
            {
                [PROP_NAMES.ITEM_TO_DISPLAY]: item,
                [PROP_NAMES.KEY]: item,
            }
        )))
        .then(info_bar_items => React.createElement(
            InfoBar,
            {
                [PROP_NAMES.TO_DISPLAY]: info_bar_items,
                [PROP_NAMES.KEY]: ELEMENT_NAMES.INFOBAR,
            }
        ))
    }

    static getChart(survey) {
        return CourseSurveysIndex.fetchData(`${DATAPATHS.COURSESURVEYS.RATINGS}/?${DJANGO_QL(MODEL_ATTRIBUTES.RATING.RATING_SURVEY, MODEL_ATTRIBUTES.ID)}=${survey[MODEL_ATTRIBUTES.ID]}`)
            .then(ratings => Promise.all(ratings.map(CourseSurveysIndex.getChartRow)))
            .then(chart_rows => React.createElement(
                Chart,
                {
                    [PROP_NAMES.CHART_ROWS]: chart_rows,
                    [PROP_NAMES.KEY]: ELEMENT_NAMES.CHART,
                }
            ))
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
                [PROP_NAMES.KEY]: `chart-row-${JSON.stringify(rating)}`,
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

    onClick_fn(selection) {
        this.state[PROP_NAMES.CURRENT_SELECTION] = selection.currentTarget.value;
        this.state[PROP_NAMES.QUERY_PARAMS] = COURSESURVEYS_DEFAULT_QUERYPARAMS;

        this.updateData();
    }
    
}

const container = document.getElementById(APP_NAMES.COURSESURVEYSINDEX);
ReactDOM.render(React.createElement(CourseSurveysIndex), container);
