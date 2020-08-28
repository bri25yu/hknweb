export const APP_NAMES = {
    COURSESURVEYSINDEX: "CourseSurveysIndex",
}

export const ELEMENT_NAMES = {
    DIV: "div",
    SPAN: "span",
    TABLE: "table",
    TBODY: "tbody",
    TD: "td",
    TR: "tr",
    NBSP: "\u00A0",
}

export const PROP_NAMES = {
    ACTIVEOPTION: "activeOption",
    BACKGROUNDCOLOR: "backgroundColor",
    BUTTON_CLICK_FN: "button_click_fn",
    CLASSNAME: "className",
    COLOR: "color",
    DATA: "data",
    DATAPATH: "datapath",
    DESCRIPTION: "description",
    FACETNAME: "facetName",
    FACETS: "facets",
    FILTEREDOPTIONS: "filteredOptions",
    INVERTED: "inverted",
    KEY: "key",
    MAPPING_FN: "mapping_fn",
    MAX_VALUE: "max_value",
    OPTIONS: "options",
    QUERY_PARAMS: "query_params",
    SHOWOPTIONS: "showOptions",
    STYLE: "style",
    TO_DISPLAY: "to_display",
    USERINPUT: "userInput",
    VALUE: "value",
    WIDTH: "width",
}

const BASE_DATAPATHS = {
    ACADEMICS: 'academics/api',
}
const DATAPATHS = {
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

const DJANGO_QL = (model, attr) => `${model}__${attr}`;
const MODEL_ATTRIBUTES = {
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

const FACET_NAMES = {
    INSTRUCTOR: 'Instructor',
    SEMESTER: 'Semester',
    COURSE: 'Course',
}

export const COURSESURVEYS_FACETS = {  // Key: entity name, Value: [datapath, mapping display function]
    [FACET_NAMES.INSTRUCTOR]: [DATAPATHS.ACADEMICS.INSTRUCTORS, v => v[MODEL_ATTRIBUTES.INSTRUCTOR.INSTRUCTOR_ID]],
    [FACET_NAMES.SEMESTER]: [DATAPATHS.ACADEMICS.SEMESTERS, v => v[MODEL_ATTRIBUTES.SEMESTER.YEAR_SECTION] + ' ' + v[MODEL_ATTRIBUTES.SEMESTER.YEAR]],
    [FACET_NAMES.COURSE]: [DATAPATHS.ACADEMICS.COURSES, v => v[MODEL_ATTRIBUTES.ID].toString()],
}

export const COURSESURVEYS_DEFAULT_QUERYPARAMS = {
    [FACET_NAMES.COURSE]: "",
    [FACET_NAMES.INSTRUCTOR]: "",
    [FACET_NAMES.SEMESTER]: "",
}

export function COURSESURVEYS_QUICKDETAILS_DATAPATH_FN(query_params) {
    const i = query_params[FACET_NAMES.INSTRUCTOR] || "";
    const s = query_params[FACET_NAMES.SEMESTER] || " ";
    const c = query_params[FACET_NAMES.COURSE] || "";

    // TODO: Make semester parsing more robust
    const [ys, y] = s.split(" ").slice(0, 2);

    const c_query_param = `${DJANGO_QL(MODEL_ATTRIBUTES.ICSR.ICSR_COURSE, MODEL_ATTRIBUTES.ID)}=${c}`;
    const i_query_param = `${DJANGO_QL(MODEL_ATTRIBUTES.ICSR.ICSR_INSTRUCTOR, MODEL_ATTRIBUTES.INSTRUCTOR.INSTRUCTOR_ID)}=${i}`;
    const y_query_param = `${DJANGO_QL(MODEL_ATTRIBUTES.ICSR.ICSR_SEMESTER, MODEL_ATTRIBUTES.SEMESTER.YEAR)}=${y}`;
    const ys_query_param = `${DJANGO_QL(MODEL_ATTRIBUTES.ICSR.ICSR_SEMESTER, MODEL_ATTRIBUTES.SEMESTER.YEAR_SECTION)}=${ys}`;

    return `${DATAPATHS.ACADEMICS.ICSRS}/?${i_query_param}&${c_query_param}&${y_query_param}&${ys_query_param}`;
}

function COURSESURVEYS_CHARTROW_MAPPING_FN(rating) {
    return {
        [PROP_NAMES.DESCRIPTION]: rating[MODEL_ATTRIBUTES.RATING.QUESTION_TEXT],
        [PROP_NAMES.VALUE]: rating[MODEL_ATTRIBUTES.RATING.RATING_VALUE],
        [PROP_NAMES.MAX_VALUE]: rating[MODEL_ATTRIBUTES.RATING.RANGE_MAX],
        [PROP_NAMES.INVERTED]: rating[MODEL_ATTRIBUTES.RATING.INVERTED],
    };
}

function COURSESURVEYS_CHART_MAPPING_FN(rating) {
    return [
        // TODO: Refactor to do without redundant API call
        `${DATAPATHS.COURSESURVEYS.RATINGS}/${rating[MODEL_ATTRIBUTES.ID]}`,
        COURSESURVEYS_CHARTROW_MAPPING_FN
    ]
}

function COURSESURVEYS_QUICKDETAILSPANEL_MAPPING_FN_WRAPPER(attributes) {
    function COURSESURVEYS_QUICKDETAILSPANEL_MAPPING_FN(survey) {
        // TODO: Refactor into attribute mapping function
        attributes[3] = [
            "",
            null,
            [survey[MODEL_ATTRIBUTES.SURVEY.RESPONSE_COUNT]]
        ];
        return [
            `${DATAPATHS.COURSESURVEYS.RATINGS}/?${DJANGO_QL(MODEL_ATTRIBUTES.RATING.RATING_SURVEY, MODEL_ATTRIBUTES.ID)}=${survey[MODEL_ATTRIBUTES.ID]}`,
            COURSESURVEYS_CHART_MAPPING_FN,
            attributes
        ];
    }
    return COURSESURVEYS_QUICKDETAILSPANEL_MAPPING_FN;
}

export function COURSESURVEYS_QUICKDETAILS_MAPPING_FN(icsr) {
    const attributes = [
        // TODO: Refactor into attribute mapping function
        [
            "",
            null,
            [`${icsr[MODEL_ATTRIBUTES.ICSR.FIRST_NAME]} ${icsr[MODEL_ATTRIBUTES.ICSR.LAST_NAME]}`]
        ],
        [
            icsr[MODEL_ATTRIBUTES.ICSR.ICSR_DEPARTMENT],
            (dept => `${dept[MODEL_ATTRIBUTES.DEPARTMENT.ABBR]} ${icsr[MODEL_ATTRIBUTES.ICSR.COURSE_NUMBER]}`),
            null
        ],
        [
            icsr[MODEL_ATTRIBUTES.ICSR.ICSR_SEMESTER],
            (semester => `${semester[MODEL_ATTRIBUTES.SEMESTER.YEAR_SECTION]} ${semester[MODEL_ATTRIBUTES.SEMESTER.YEAR]}`),
            null
        ],
        null
    ];

    return [
        `${DATAPATHS.COURSESURVEYS.SURVEYS}/?${DJANGO_QL(MODEL_ATTRIBUTES.SURVEY.SURVEY_ICSR, MODEL_ATTRIBUTES.ID)}=${icsr[MODEL_ATTRIBUTES.ID]}`,
        COURSESURVEYS_QUICKDETAILSPANEL_MAPPING_FN_WRAPPER(attributes)
    ];
}

