import { validateInputs } from './validation';

// util function to convert the input to string type
export const convertToString = (input) => {
    if (input) {
        if (typeof input === "string") {
            return input;
        }
        return String(input);
    }
    return '';
}

// camelcase to
export const toWords = (input) => {
    input = convertToString(input);
    var regex = /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g;
    return input.match(regex).join(' ').toLowerCase();
}

// validation function
export const fieldValidator = (field, value, type, password = null, maxLength = null, minLength = null) => {
    // console.log(field, value, type, password, maxLength, minLength)
    let getError = false, fieldNameErr = field + 'Err', errorMsg = '', fieldCls = field + 'Cls';
    field = (field==='streetAddress' ? 'address' : (field==='postalCode' ? 'Zipcode' : field))
    let newField = toWords(field)
    if (validateInputs(type, value) === 'empty') {
        errorMsg = `Please enter ${newField}.`;
        getError = true;
    } else if (validateInputs(type, value) === false) {
        if (field === 'newPassword' || field === 'password' || field === 'currentPassword') {
            errorMsg = 'A special character, an upper case, a lower case, a number & minimum 8 character are required.'
        } else {
            errorMsg = `Please enter valid ${newField}.`;
        }
        getError = true;
    } else if (field === 'confirmPassword' && (value !== password)) {
        errorMsg = 'Password and confirm password does not match.';
        getError = true;
    } else if ((field === 'noOfPersons' || field === 'planPrice' || field === 'trialPeriodDays') && parseInt(value, 10) === 0) {
        errorMsg = 'Please enter valid number and not 0.';
        getError = true;
    } else if (maxLength !== null && (value.length > maxLength)) {
        errorMsg = `Please enter maximum ${maxLength} ${type === 'string' || type === 'required' || type === 'Alphanumeric' ? 'characters' : 'digits'}.`;
        getError = true;
    } else if (minLength !== null && (value.length < minLength)) {
        errorMsg = `Please enter minimum ${minLength} ${type === 'string' || type === 'required' || type === 'Alphanumeric' ? 'characters' : 'digits'}.`;
        getError = true;
    }
    return ({ getError, fieldNameErr, errorMsg, fieldCls, setClassName: getError ? ' inputErrorCls' : ' inputCorrectCls' })
}
