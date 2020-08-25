import React, { Component } from 'react';

import BaseApp from './BaseApp';


class QuickDetails extends Component {

}

export default QuickDetails;


/**
 * @requires props.icsr_id
 */
class QuickDetailsPanel extends BaseApp {
    constructor(props) {
        super(props);
        
    }
}


/**
 * @requires props.instructor_name
 * @requires props.course_name
 * @requires props.semester
 * @requires props.num_responses
 */
class InfoBar extends Component {
    constructor(props) {
        super(props);
    }
}


/**
 * @requires props.item
 */
class InfoCapsule extends Component {
    constructor(props) {
        super(props);
    }
}


/**
 * @requires props.survey_id: List[]
 */
class Chart extends BaseApp {
    constructor(props) {
        super(props);
    }
}


/**
 * @requires props.datapath
 */
class ChartRow extends BaseApp {
    constructor(props) {
        super(props);
    }
}


/**
 * @requires props.value
 * @requires props.inverted
 */
class ValueBubble extends Component {
    constructor(props) {
        super(props);
    }
}
