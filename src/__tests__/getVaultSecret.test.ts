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
  read: (name?: string): any => {
    return {
      data: {
        data:
          name === 'STRING_VALUE'
            ? 'there'
            : {
                hello: 'there',
              },
      },
    };
  },
}));

import { getInput, setOutput } from '@actions/core';
import getVaultSecret from '../getVaultSecret';

describe('', () => {
  beforeEach(() => {
    // @ts-ignore
    getInput.mockClear();
    // @ts-ignore
    setOutput.mockClear();
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
    expect(getInput).toHaveBeenCalledTimes(4);
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
  });
  it('should export vault secret when asked', async () => {
    // @ts-ignore
    getInput.mockImplementation(name => {
      if (name === 'authMethod') {
        return 'test';
      }
      if (name === 'exportVaultSecret') {
        return 'true';
      }
      return 'http://test.com';
    });
    await getVaultSecret();
    expect(setOutput).toHaveBeenNthCalledWith(2, 'vault_token', undefined);
    expect(getInput).toHaveBeenCalledTimes(4);
  });
  it('should export using secret if string value', async () => {
    // @ts-ignore
    getInput.mockImplementation(name => {
      if (name === 'authMethod') {
        return 'test';
      }
      if (name === 'path') {
        return 'STRING_VALUE';
      }
      return 'http://test.com';
    });
    await getVaultSecret();
    expect(setOutput).toHaveBeenNthCalledWith(1, 'secret', 'there');
  });
  it('should not export anything if path is missing', async () => {
    // @ts-ignore
    getInput.mockImplementation(name => {
      if (name === 'authMethod') {
        return 'test';
      }
      if (name === 'exportVaultSecret') {
        return 'false';
      }
      return undefined;
    });
    await getVaultSecret();
    expect(setOutput).not.toHaveBeenCalled();
  });
  it('should not export vault secret when asked', async () => {
    // @ts-ignore
    getInput.mockImplementation(name => {
      if (name === 'authMethod') {
        return 'test';
      }
      return 'http://test.com';
    });
    await getVaultSecret();
    expect(setOutput).toHaveBeenNthCalledWith(2, 'vault_token', undefined);
    expect(getInput).toHaveBeenCalledTimes(4);
  });
});
