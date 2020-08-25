import React, { Component } from 'react';

import BaseApp from './BaseApp';


class QuickDetail extends Component {

}

export default QuickDetail;


/**
 * @requires props.icsr_id
 */
class QuickDetailsPanel extends BaseApp {
    
}


/**
 * @requires props.instructor_name
 * @requires props.course_name
 * @requires props.semester
 * @requires props.num_responses
 */
class InfoBar extends Component {

}


/**
 * @requires props.item
 */
class InfoCapsule extends Component {

}


/**
 * @requires props.survey_id: List[]
 */
class SurveyChart extends BaseApp {

}


/**
 * @requires props.rating_id
 */
class RatingRow extends BaseApp {

}


/**
 * @requires props.rating
 * @requires props.inverted
 */
class RatingBubble extends Component {

}
