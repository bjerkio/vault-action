/* eslint @typescript-eslint/no-explicit-any: "off" */
import { setOutput, debug } from '@actions/core';
import * as flat from 'flat';

export const outputData = (name: string, value: string): void => {
  /**
   * @todo Add so that environment variables are exported
   * @body Currently it only setOutputs and debugs all outputs
   */
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
