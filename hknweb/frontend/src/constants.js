export const DEPARTMENTAPP_NAME = "DepartmentApp";
export const INSTRUCTORAPP_NAME = "InstructorApp";
export const COURSESURVEYSINDEX_NAME = "CourseSurveysIndex"

export const INSTRUCTOR_ID_ATTRIBUTE_NAME = "instructor_id";
export const SEMESTER_YEAR_SECTION_ATTRIBUTE_NAME = "year_section";
export const SEMESTER_YEAR_ATTRIBUTE_NAME = "year";
export const ID_ATTRIBUTE_NAME = "id";

export const ICSR_COURSE__ID_ATTRIBUTE_NAME = "icsr_course__id";
export const ICSR_DEPARTMENT__ID_ATTRIBUTE_NAME = "icsr_department__id";
export const ICSR_INSTRUCTOR__INSTRUCTOR_ID_ATTRIBUTE_NAME = "icsr_instructor__instructor_id";
export const ICSR_SEMESTER__YEAR_ATTRIBUTE_NAME = "icsr_semester__year";
export const ICSR_SEMESTER__YEAR_SECTION_ATTRIBUTE_NAME = "icsr_semester__year_section";

export const INSTRUCTOR_FACET_NAME = 'Instructor';
export const SEMESTER_FACET_NAME = 'Semester';
export const COURSE_FACET_NAME = 'Course';

export const COURSESURVEYS_FACETS = {  // Key: entity name, Value: [datapath, mapping display function]
    [INSTRUCTOR_FACET_NAME]: ['academics/api/instructors', v => v[INSTRUCTOR_ID_ATTRIBUTE_NAME]],
    [SEMESTER_FACET_NAME]: ['academics/api/semesters', v => v[SEMESTER_YEAR_SECTION_ATTRIBUTE_NAME] + ' ' + v[SEMESTER_YEAR_ATTRIBUTE_NAME]],
    [COURSE_FACET_NAME]: ['academics/api/courses', v => v[ID_ATTRIBUTE_NAME].toString()],
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
    return `academics/api/icsrs/?${i_query_param}&${c_query_param}&${y_query_param}&${ys_query_param}`;
}
export const COURSESURVEYS_QUICKDETAILS_MAPPING_FN = (() => null);

