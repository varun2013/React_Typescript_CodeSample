/*
validation logic 
*/

export const validateInputs = (type, inputText) => {
  switch (type) {
    case 'string': {
      if (inputText) {
        const strings = /^[A-Za-z0-9'\-,#./\s]+$/i;
        if (inputText && inputText.match(strings)) {
          return true;
        } else {
          return false;
        }
      }
      return 'empty';
    }

    case 'websiteurl':
      if (inputText) {
        const alphabetics1 = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
        return alphabetics1.test(inputText);

      }
      return 'empty';

    case 'alphabetics':
      if (inputText) {
        const alphabetics = /^[a-zA-Z\s]+$/i;
        return alphabetics.test(inputText);
      }
      return 'empty';

    case 'Alphanumeric':
      if (inputText) {
        const Alphanumeric = /^[0-9a-zA-Z ]+$/i;
        return Alphanumeric.test(inputText);
      }
      return 'empty';

    case 'number': {
      if (inputText) {
        const numbers = /^[0-9]+$/i;
        return numbers.test(inputText);
      }
      return 'empty';
    }

    case 'positiveNumber': {
      if (inputText === '') {
        return 'empty';
      } else if ((/^[a-zA-Z\s]+$/i).test(inputText)) {
        return false;
      } else if (parseInt(inputText) < 0 || parseInt(inputText) === 0) {
        return false;
      } else {
        return true
      }

    }

    case 'positiveNumberWithDecimals': {
      if (inputText === '') {
        return 'empty';
      } else if (!((/^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/).test(inputText))) {
        return false;
      } else {
        return true
      }
    }

    case 'email':
      if (inputText) {
        const emails = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emails.test(inputText);
      }
      return 'empty';


    case 'password': {
      if (inputText) {
        // const passwordExpression = new RegExp('^(?=.{3,})((?=.*[a-zA-Z0-9])|(?=.*[!@#%&]))');
        // return passwordExpression.test(inputText);
        return (/(?=.{8,})/).test(inputText) && (/[\@\#\$\%\^\&\*\(\)\_\+\!]/).test(inputText) && (/[a-z]/).test(inputText) && /[0-9]/.test(inputText) && /[A-Z]/.test(inputText);
      }
      return 'empty';
    }

    case 'required': {
      if (inputText && inputText.length > 0) {
        return true;
      } else if (typeof inputText === "boolean") {
        return true;
      } else if (typeof inputText === "number") {
        return true;
      } else if (typeof inputText === "object") {
        return true;
      }
      return 'empty'
    }


    default:
  }
  return type;
};
