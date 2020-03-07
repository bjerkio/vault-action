/* eslint @typescript-eslint/ban-ts-ignore: 0 */
/* eslint @typescript-eslint/no-explicit-any: 0 */
jest.mock('@actions/core');
jest.mock('node-vault', () => (): any => ({
  githubLogin: jest.fn(),
  read: (): any => ({
    data: {
      data: {
        hello: 'there'
      }
    }
  }),
}));

import { getInput } from '@actions/core';
import getVaultSecret from '../getVaultSecret';

describe('', () => {
  beforeEach(() => {
    // @ts-ignore
    getInput.mockClear();
  })
  it('should construct', async () => {
    // @ts-ignore
    getInput.mockReturnValue('http://test.com');
    await getVaultSecret();
    expect(getInput).toHaveBeenCalledTimes(3);
  })
})
