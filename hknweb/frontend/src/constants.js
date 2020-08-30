export const APP_NAMES = {
    COURSESURVEYSINDEX: "CourseSurveysIndex",
}

export const ELEMENT_NAMES = {
    BUTTON: "button",
    CHART: "Chart",
    CHARTROW: "ChartRow",
    DIV: "div",
    ENTITYDETAIL: "EntityDetail",
    INFOBAR: "InfoBar",
    INFOBARITEM: "InfoBarItem",
    QUICKDETAILSPANEL: "QuickDetailsPanel",
    SPAN: "span",
    TABLE: "table",
    TBODY: "tbody",
    TD: "td",
    TH: "th",
    TR: "tr",
    NBSP: "\u00A0",
}

export const PROP_NAMES = {
    ACTIVEOPTION: "activeOption",
    BACKGROUNDCOLOR: "backgroundColor",
    CHART: "chart",
    CHART_ROWS: "chart_rows",
    CLASSNAME: "className",
    COLOR: "color",
    CURRENT_SELECTION: "current_selection",
    DATA: "data",
    DATAPATH: "datapath",
    DESCRIPTION: "description",
    ENTITY_DETAILS: "entity_details",
    FACETNAME: "facetName",
    FACETS: "facets",
    FILTEREDOPTIONS: "filteredOptions",
    INFO_BAR: "info_bar",
    ITEM_TO_DISPLAY: "item_to_display",
    INVERTED: "inverted",
    KEY: "key",
    MAPPING_FN: "mapping_fn",
    MAX_VALUE: "max_value",
    NAME: "name",
    ONCHANGE_FN: "onChange_fn",
    ONCLICK: "onClick",
    ONCLICK_FN: "onClick_fn",
    OPTIONS: "options",
    PLACEHOLDER: "placeholder",
    QUERYBOARD: "query_board",
    QUERY_PARAMS: "query_params",
    QUICK_DETAILS: "quick_details",
    QUICK_DETAILS_FN: "quick_details_fn",
    QUICK_DETAILS_PANELS: "quick_details_panels",
    SELECTIONS: "selections",
    SELECTION_PANEL_FN: "selection_panel_fn",
    SELECTION_VALUES: "selection_values",
    SHOWOPTIONS: "showOptions",
    STYLE: "style",
    TITLE: "title",
    TO_DISPLAY: "to_display",
    TYPE: "type",
    USERINPUT: "userInput",
    VALUE: "value",
    WIDTH: "width",
    WIDTHS: "widths",
}

const BASE_DATAPATHS = {
    ACADEMICS: 'academics/api',
}
export const DATAPATHS = {
    ACADEMICS: {
        COURSES: `${BASE_DATAPATHS.ACADEMICS}/courses`,
        ICSRS: `${BASE_DATAPATHS.ACADEMICS}/icsrs`,
        INSTRUCTORS: `${BASE_DATAPATHS.ACADEMICS}/instructors`,
        SEMESTERS: `${BASE_DATAPATHS.ACADEMICS}/semesters`,
    },
    COURSESURVEYS: {
        RATINGS: `${BASE_DATAPATHS.ACADEMICS}/ratings`,
        SURVEYS: `${BASE_DATAPATHS.ACADEMICS}/surveys`,
    },
}

export const DJANGO_QL = (model, attr) => `${model}__${attr}`;
export const MODEL_ATTRIBUTES = {
    ID: "id",
    ICSR: {
        COURSE_NUMBER: "course_number",
        FIRST_NAME: "first_name",
        ICSR_COURSE: "icsr_course",
        ICSR_DEPARTMENT: "icsr_department",
        ICSR_INSTRUCTOR: "icsr_instructor",
        ICSR_SEMESTER: "icsr_semester",
        LAST_NAME: "last_name",
    },
    SURVEY: {
        RESPONSE_COUNT: "response_count",
        SURVEY_ICSR: "survey_icsr",
    },
    RATING: {
        INVERTED: "inverted",
        QUESTION_TEXT: "question_text",
        RANGE_MAX: "range_max",
        RATING_SURVEY: "rating_survey",
        RATING_VALUE: "rating_value",
    },
    INSTRUCTOR: {
        INSTRUCTOR_ID: "instructor_id",
    },
    SEMESTER: {
        YEAR: "year",
        YEAR_SECTION: "year_section",
    },
    DEPARTMENT: {
        ABBR: "abbr",
    }
}

export const FACET_NAMES = {
    INSTRUCTOR: 'Instructor',
    SEMESTER: 'Semester',
    YEAR: 'Year',
    COURSE: 'Course',
}

export const COURSESURVEYS_FACETS = {
    [FACET_NAMES.INSTRUCTOR]: {
        [PROP_NAMES.DATAPATH]: DATAPATHS.ACADEMICS.INSTRUCTORS,
        [PROP_NAMES.MAPPING_FN]: v => v[MODEL_ATTRIBUTES.INSTRUCTOR.INSTRUCTOR_ID],
        [PROP_NAMES.PLACEHOLDER]: "Search for an instructor...",
    },
    [FACET_NAMES.COURSE]: {
        [PROP_NAMES.DATAPATH]: DATAPATHS.ACADEMICS.COURSES,
        [PROP_NAMES.MAPPING_FN]: v => v[MODEL_ATTRIBUTES.ID].toString(),
        [PROP_NAMES.PLACEHOLDER]: "Search for a course...",
    },
    [FACET_NAMES.SEMESTER]: {
        [PROP_NAMES.DATAPATH]: DATAPATHS.ACADEMICS.SEMESTERS,
        [PROP_NAMES.MAPPING_FN]: v => v[MODEL_ATTRIBUTES.SEMESTER.YEAR_SECTION],
        [PROP_NAMES.PLACEHOLDER]: "Search for a semester...",
    },
    [FACET_NAMES.YEAR]: {
        [PROP_NAMES.DATAPATH]: DATAPATHS.ACADEMICS.SEMESTERS,
        [PROP_NAMES.MAPPING_FN]: v => v[MODEL_ATTRIBUTES.SEMESTER.YEAR],
        [PROP_NAMES.PLACEHOLDER]: "Search for a year...",
    },
}

export const COURSESURVEYS_DEFAULT_QUERYPARAMS = {
    [FACET_NAMES.COURSE]: "",
    [FACET_NAMES.INSTRUCTOR]: "",
    [FACET_NAMES.SEMESTER]: "",
    [FACET_NAMES.YEAR]: "",
}

export const SELECTION_NAMES = {
    RATINGS: "Ratings",
    INSTRUCTOR: "Instructor",
    SEMESTER: "Semester",
}

export const SELECTIONS = Object.entries(SELECTION_NAMES).map(p => p[1]);
