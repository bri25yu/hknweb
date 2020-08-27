export const DEPARTMENTAPP_NAME = "DepartmentApp";
export const INSTRUCTORAPP_NAME = "InstructorApp";
export const COURSESURVEYSINDEX_NAME = "CourseSurveysIndex";


const ACADEMICS_DATAPATH = 'academics/api';
const ACADEMICS_INSTRUCTORS_DATAPATH = `${ACADEMICS_DATAPATH}/instructors`;
const ACADEMICS_SEMESTERS_DATAPATH = `${ACADEMICS_DATAPATH}/semesters`;
const ACADEMICS_COURSES_DATAPATH = `${ACADEMICS_DATAPATH}/courses`;
const ACADEMICS_ICSRS_DATAPATH = `${ACADEMICS_DATAPATH}/icsrs`;
const COURSESURVEYS_SURVEYS_DATAPATH = `${ACADEMICS_DATAPATH}/surveys`;
const COURSESURVEYS_RATINGS_DATAPATH = `${ACADEMICS_DATAPATH}/ratings`;

const INSTRUCTOR_ID_ATTRIBUTE_NAME = "instructor_id";
const SEMESTER_YEAR_SECTION_ATTRIBUTE_NAME = "year_section";
const SEMESTER_YEAR_ATTRIBUTE_NAME = "year";
const ID_ATTRIBUTE_NAME = "id";

const ICSR_COURSE__ID_ATTRIBUTE_NAME = "icsr_course__id";
const ICSR_INSTRUCTOR__INSTRUCTOR_ID_ATTRIBUTE_NAME = "icsr_instructor__instructor_id";
const ICSR_SEMESTER__YEAR_ATTRIBUTE_NAME = "icsr_semester__year";
const ICSR_SEMESTER__YEAR_SECTION_ATTRIBUTE_NAME = "icsr_semester__year_section";
const SURVEY_ICSR__ID_ATTRIBUTE_NAME = "survey_icsr__id";
const RATING_SURVEY__ID_ATTRIBUTE_NAME = "rating_survey__id";

export const INSTRUCTOR_FACET_NAME = 'Instructor';
export const SEMESTER_FACET_NAME = 'Semester';
export const COURSE_FACET_NAME = 'Course';

export const COURSESURVEYS_FACETS = {  // Key: entity name, Value: [datapath, mapping display function]
    [INSTRUCTOR_FACET_NAME]: [ACADEMICS_INSTRUCTORS_DATAPATH, v => v[INSTRUCTOR_ID_ATTRIBUTE_NAME]],
    [SEMESTER_FACET_NAME]: [ACADEMICS_SEMESTERS_DATAPATH, v => v[SEMESTER_YEAR_SECTION_ATTRIBUTE_NAME] + ' ' + v[SEMESTER_YEAR_ATTRIBUTE_NAME]],
    [COURSE_FACET_NAME]: [ACADEMICS_COURSES_DATAPATH, v => v[ID_ATTRIBUTE_NAME].toString()],
}

export function COURSESURVEYS_QUICKDETAILS_DATAPATH_FN(i, s, c) {
    i = i || "";
    s = s || " ";
    c = c || "";

    const [ys, y] = s.split(" ").slice(0, 2);
    const c_query_param = `${ICSR_COURSE__ID_ATTRIBUTE_NAME}=${c}`;
    const i_query_param = `${ICSR_INSTRUCTOR__INSTRUCTOR_ID_ATTRIBUTE_NAME}=${i}`;
    const y_query_param = `${ICSR_SEMESTER__YEAR_ATTRIBUTE_NAME}=${y}`;
    const ys_query_param = `${ICSR_SEMESTER__YEAR_SECTION_ATTRIBUTE_NAME}=${ys}`;
    return `${ACADEMICS_ICSRS_DATAPATH}/?${i_query_param}&${c_query_param}&${y_query_param}&${ys_query_param}`;
}

function COURSESURVEYS_CHARTROW_MAPPING_FN(data) {
    return {
        description: data.question_text,
        value: data.rating_value,
        max_value: data.range_max,
        inverted: data.inverted,
    };
}

function COURSESURVEYS_CHART_MAPPING_FN(data) {
    return [
        `${COURSESURVEYS_RATINGS_DATAPATH}/${data.id}`,
        COURSESURVEYS_CHARTROW_MAPPING_FN
    ]
}

function COURSESURVEYS_QUICKDETAILSPANEL_MAPPING_FN_WRAPPER(attributes) {
    function COURSESURVEYS_QUICKDETAILSPANEL_MAPPING_FN(data) {
        attributes[3] = [
            "",
            null,
            [data.response_count]
        ];
        return [
            `${COURSESURVEYS_RATINGS_DATAPATH}/?${RATING_SURVEY__ID_ATTRIBUTE_NAME}=${data.id}`,
            COURSESURVEYS_CHART_MAPPING_FN,
            attributes
        ];
    }
    return COURSESURVEYS_QUICKDETAILSPANEL_MAPPING_FN;
}

export function COURSESURVEYS_QUICKDETAILS_MAPPING_FN(data) {
    const attributes = [
        [
            "",
            null,
            [`${data.first_name} ${data.last_name}`]
        ],
        [
            data.icsr_department,
            (dept => `${dept.abbr} ${data.course_number}`),
            null
        ],
        [
            data.icsr_semester,
            (semester => `${semester.year_section} ${semester.year}`),
            null
        ],
        null
    ];

    return [
        `${COURSESURVEYS_SURVEYS_DATAPATH}/?${SURVEY_ICSR__ID_ATTRIBUTE_NAME}=${data.id}`,
        COURSESURVEYS_QUICKDETAILSPANEL_MAPPING_FN_WRAPPER(attributes)
    ];
}

