import { PROP_NAMES } from "../constants";


const propTypesFailed = (propName, componentName) => new Error(
    'Invalid prop `' + propName + '` supplied to' +
    ' `' + componentName + '`. Validation failed.'
);

export function instanceOfFn(className) {
    return function(props, propName, componentName) {
        if (!(props[propName]
            && props[propName][PROP_NAMES.TYPE]
            && props[propName][PROP_NAMES.TYPE][PROP_NAMES.NAME]
            && props[propName][PROP_NAMES.TYPE][PROP_NAMES.NAME] === className)) {
            return propTypesFailed(propName, componentName);
        }
    }
}

export function arrayOfFn(className) {
    return function(propValue, key, componentName, location, propFullName) {
        let arr = propValue[key];
        if (!(Array.isArray(arr)
            && arr.every(item => instanceOfFn(item, className, componentName)))) {
            return propTypesFailed(propName, componentName);
        }
    }
}
