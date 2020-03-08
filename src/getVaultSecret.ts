import { getInput } from '@actions/core';
import * as nodeVault from 'node-vault';
import * as authMethod from './authMethods';
import { transformOutput } from './transformOutput';

export default async (): Promise<void> => {
  const vault = nodeVault({
    endpoint: getInput('endpoint', { required: true }),
  });

  /**
   * @todo Add support for other authentication methods
   * @body Github is the only supported auth method.
   */
  await authMethod.GithubAuthMethod(vault);

  const path = getInput('path');
  const { data } = await vault.read(path, { required: true });
  transformOutput(data.data);
};
