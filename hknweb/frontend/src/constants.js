export const DEPARTMENTAPP_NAME = "DepartmentApp";
export const INSTRUCTORAPP_NAME = "InstructorApp";
export const COURSESURVEYSINDEX_NAME = "CourseSurveysIndex"

export const INSTRUCTOR_ID_ATTRIBUTE_NAME = "instructor_id";
export const SEMESTER_YEAR_SECTION_ATTRIBUTE_NAME = "year_section";
export const SEMESTER_YEAR_ATTRIBUTE_NAME = "year";
export const ID_ATTRIBUTE_NAME = "id";

export const COURSESURVEYS_FACETS = {  // Key: entity name, Value: [datapath, mapping display function]
    'Instructor': ['academics/api/instructors', v => v[INSTRUCTOR_ID_ATTRIBUTE_NAME]],
    'Semester': ['academics/api/semesters', v => v[SEMESTER_YEAR_SECTION_ATTRIBUTE_NAME] + ' ' + v[SEMESTER_YEAR_ATTRIBUTE_NAME]],
    'Course': ['academics/api/courses', v => v[ID_ATTRIBUTE_NAME].toString()],
}
