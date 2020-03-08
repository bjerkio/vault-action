/* eslint @typescript-eslint/ban-ts-ignore: 0 */
jest.mock('@actions/core');
import { TokenAuthMethod } from '../tokenAuthMethod';
import { client } from 'node-vault';
import { getInput } from '@actions/core';

const vault = ({
  token: '',
} as unknown) as client;

describe('githubAuthMethod', () => {
  it('should return', async () => {
    // @ts-ignore
    getInput.mockReturnValue('test');
    TokenAuthMethod(vault);
    expect(vault.token).toBe('test');
  });
});
