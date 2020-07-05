/* eslint @typescript-eslint/no-explicit-any: "off" */
import { setSecret, setOutput, debug } from '@actions/core';
import * as flat from 'flat';

export const outputData = (name: string, value: string): void => {
  setSecret(value);
  setOutput(name || 'secret', value);
  debug(`✔ ${name} => outputs.${name}`);
};

export const transformOutput = (data: any): void => {
  if (typeof data !== 'object') {
    outputData('secret', data);
    return;
  }

  const flatObject = flat(data, {
    delimiter: '_',
  });

  for (const name of Object.keys(flatObject)) {
    const value = flatObject[name];
    outputData(name, value);
  }
};
