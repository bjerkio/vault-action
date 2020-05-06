/* eslint @typescript-eslint/ban-ts-ignore: 0 */
jest.mock('@actions/core');

import { setOutput, debug } from '@actions/core';
import randomSimpleObject from '../__fixtures__/randomSimpleObject';
import randomDeepObject from '../__fixtures__/randomDeepObject';
import { transformOutput, outputData } from '../transformOutput';

describe('transformOutput', () => {
  beforeEach(() => {
    // @ts-ignore
    setOutput.mockClear();
    // @ts-ignore
    debug.mockClear();
  });

  it('should export secret if name is missing', async () => {
    outputData(undefined, 'this-is-a-secret');
    expect(setOutput).toBeCalledWith('secret', 'this-is-a-secret');
  });

  it('should tranform an object to multiple outputs', async () => {
    transformOutput(randomSimpleObject);
    expect(setOutput).toBeCalledTimes(4);
    expect(debug).toBeCalledTimes(4);
    expect(setOutput).toHaveBeenCalledWith('number', randomSimpleObject.number);
    expect(setOutput).toHaveBeenCalledWith('boolean', randomSimpleObject.boolean);
    expect(setOutput).toHaveBeenCalledWith('firstName', randomSimpleObject.firstName);
    expect(setOutput).toHaveBeenCalledWith('lastName', randomSimpleObject.lastName);
  });

  it('should tranform deep object to multiple outputs', async () => {
    transformOutput(randomDeepObject);
    expect(setOutput).toBeCalledTimes(1);
    expect(debug).toBeCalledTimes(1);
    expect(setOutput).toHaveBeenCalledWith('deepOne_deepTwo_string', randomDeepObject.deepOne.deepTwo.string);
  });

  it('should transform a string to one output named secret', async () => {
    transformOutput('this-is-a-test');
    expect(setOutput).toBeCalledTimes(1);
    expect(debug).toBeCalledTimes(1);
    expect(setOutput).toHaveBeenCalledWith('secret', 'this-is-a-test');
  })
});
