/* eslint @typescript-eslint/ban-ts-ignore: 0 */
/* eslint @typescript-eslint/no-explicit-any: 0 */
jest.mock('@actions/core');
jest.mock('../authMethods', () => ({
  default: {
    test: jest.fn(),
  },
}));
jest.mock('node-vault', () => (): any => ({
  githubLogin: jest.fn(),
  read: (): any => {
    return {
      data: {
        data: {
          hello: 'there',
        },
      },
    };
  },
}));

import { getInput } from '@actions/core';
import getVaultSecret from '../getVaultSecret';

describe('', () => {
  beforeEach(() => {
    // @ts-ignore
    getInput.mockClear();
  });
  it('should construct', async () => {
    // @ts-ignore
    getInput.mockImplementation(name => {
      if (name === 'authMethod') {
        return 'test';
      }
      return 'http://test.com';
    });
    await getVaultSecret();
    expect(getInput).toHaveBeenCalledTimes(3);
  });
  it('should fail if authMethod does not exists', async () => {
    // @ts-ignore
    getInput.mockImplementation(name => {
      if (name === 'authMethod') {
        return 'not-exists';
      }
      return 'http://test.com';
    });
    await expect(getVaultSecret()).rejects.toThrow();
  })
});
