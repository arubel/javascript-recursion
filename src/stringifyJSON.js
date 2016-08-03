// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;
// but you don't so you're going to write it from scratch:

let types = {
  NULL: null,
  NUMBER: 'number',
  BOOL: 'boolean',
  FUNCTION: 'function',
  STRING: 'string',
  NDEF: 'undefined',
  OBJECT: 'object',
  ARRAY: 'array',
};

let getType = (value) => {
  if (value === types.NULL) {
    return value;
  } else if (value !== types.NULL && typeof value === types.OBJECT) {
    if (Array.isArray(value)) {
      return types.ARRAY;
    } else {
      return types.OBJECT;
    }
  } else {
    return typeof value;
  }
};

let stringifyJSON = (obj) => {
  switch (getType(obj)) {
    case types.STRING:
      return `"${obj}"`;
    case types.FUNCTION:
      return `${types.NULL}`;
    case types.NDEF:
      return undefined;
    case types.ARRAY:
      return `[${obj.reduce((accumulator, element) => {
        return accumulator.concat(stringifyJSON(element));
      }, [])}]`;
    case types.OBJECT:
      return `{${Object.keys(obj).reduce((stringified, key) => {
        let value = obj[key];
        if (getType(value) === types.FUNCTION || getType(value) === types.NDEF) {
          return stringified;
        } else {
          return stringified.concat(`"${key}":${stringifyJSON(value)}`);
        }
      }, [])}}`;
    default:
      return `${obj}`;;
  }
};
