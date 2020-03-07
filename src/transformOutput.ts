/* eslint @typescript-eslint/no-explicit-any: "off" */
import { setOutput, debug } from '@actions/core';

export const transformOutput = (data: any, name?: string): void => {
  if (typeof data === 'object') {
    for (const key of Object.keys(data)) {
      transformOutput(data[key], name ? `${name}_${key}` : key);
    }
  } else {
    // TODO: Add environment variable
    setOutput(name || 'secret', data);
    debug(`✔ ${name} => outputs.${name}`);
  }
};
