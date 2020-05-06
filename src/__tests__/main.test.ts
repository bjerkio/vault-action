/* eslint @typescript-eslint/ban-ts-ignore: 0 */
/* eslint @typescript-eslint/no-explicit-any: 0 */
jest.mock('@actions/core');
jest.mock('../getVaultSecret');

import { run } from '../main';
import * as core from '@actions/core';

describe('main', () => {
  beforeEach(() => {
    // @ts-ignore
    core.group.mockReset();
  });
  it('should run without error', async () => {
    await run();
    expect(core.setFailed).not.toHaveBeenCalled();
    expect(core.group).toHaveBeenCalled();
  });
  it('should run with error', async () => {
    // @ts-ignore
    core.group.mockRejectedValue(new Error('Async error'));

    await run();
    expect(core.setFailed).toHaveBeenCalled();
    expect(core.group).toHaveBeenCalled();
  });
  it('should run with error without error', async () => {
    // @ts-ignore
    core.group.mockRejectedValue(new Error(undefined));

    await run();
    expect(core.setFailed).toHaveBeenCalled();
    expect(core.group).toHaveBeenCalled();
  });
});
