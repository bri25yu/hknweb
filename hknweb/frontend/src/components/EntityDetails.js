import React, { Component } from "react";

import { ELEMENT_NAMES, PROP_NAMES } from "../constants";
import { arrayOfFn } from "../lib/utils";
import "../style/EntityDetails.css";


export class EntityDetailsPanel extends Component {
    static propTypes = {
        [PROP_NAMES.TITLE]: PropTypes.string.isRequired,
        [PROP_NAMES.ENTITY_DETAILS]: arrayOfFn(ELEMENT_NAMES.ENTITYDETAIL),
    }

    render() {
        return React.createElement(
            ELEMENT_NAMES.DIV,
            {[PROP_NAMES.CLASSNAME]: "entity-details-panel"},
            [
                React.createElement(
                    ELEMENT_NAMES.DIV,
                    {
                        [PROP_NAMES.CLASSNAME]: "entity-details-title",
                        [PROP_NAMES.KEY]: "entity-details-title",
                    },
                    this.props[PROP_NAMES.TITLE]
                ),
                React.createElement(
                    ELEMENT_NAMES.DIV,
                    {
                        [PROP_NAMES.CLASSNAME]: "entity-details-container",
                        [PROP_NAMES.KEY]: "entity-details-container",
                    },
                    this.props[PROP_NAMES.ENTITY_DETAILS]
                )
            ]
        )
    }
}

export class EntityDetail extends Component {
    static propTypes = {
        [PROP_NAMES.TITLE]: PropTypes.string.isRequired,
        [PROP_NAMES.DESCRIPTION]: PropTypes.any.isRequired,
    }

    render() {
        return React.createElement(
            ELEMENT_NAMES.DIV,
            {
                [PROP_NAMES.CLASSNAME]: "entity-detail",
                [PROP_NAMES.KEY]: `entity-detail-${this.props[PROP_NAMES.TITLE]}-${this.props[PROP_NAMES.DESCRIPTION]}`,
            },
            [
                React.createElement(
                    ELEMENT_NAMES.DIV,
                    {
                        [PROP_NAMES.CLASSNAME]: "entity-detail-title",
                        [PROP_NAMES.KEY]: "entity-detail-title",
                    },
                    this.props[PROP_NAMES.TITLE]
                ),
                React.createElement(
                    ELEMENT_NAMES.DIV,
                    {
                        [PROP_NAMES.CLASSNAME]: "entity-detail-description",
                        [PROP_NAMES.KEY]: "entity-detail-description",
                    },
                    this.props[PROP_NAMES.DESCRIPTION]
                )
            ]
        )
    }
}
