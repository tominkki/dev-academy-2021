/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export const isObject = (param: any): param is object => {
  return typeof param === 'object' && param !== null;
};

export const isString = (param: any): param is string => {
  return typeof param === 'string' || param instanceof String;
};

export const isNumber = (param: any): param is number => {
  return typeof param === 'number' || param instanceof Number;
};

export const isArray = (param: any): param is Array<any> => {
  return Array.isArray(param);
};
