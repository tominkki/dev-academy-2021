import { isObject, isString, isNumber, isArray } from './type-guards';
import { Name, Names } from '../types';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

const parseString = (param: any): string => {
  if (!param || !isString(param)) {
    throw new Error('Invalid data.');
  }

  return param;
};

const parseNumber = (param: any): number => {
  if (!param || !isNumber(param)) {
    throw new Error('Invalid data.');
  }

  return param;
};

const parseName = (param: any): Name => {
  const name: Name = {
    name: parseString(param.name),
    amount: parseNumber(param.amount)
  };

  return name;
};

export const parseResponseData = (param: any): Names => {
  if (!param || !isObject(param)) {
    throw new Error('Invalid data.');
  }

  param = param as any;

  if (!param.names || !isArray(param.names)) {
    throw new Error('Invalid data.');
  }

  const data: Names = {
    names: param.names.map((name: any) => parseName(name))
  };

  return data;
};
