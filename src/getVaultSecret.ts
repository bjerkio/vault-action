import { getInput, debug } from '@actions/core';
import * as nodeVault from 'node-vault';
import authMethods from './authMethods';
import { transformOutput, outputData } from './transformOutput';

export default async (): Promise<void> => {
  const vault = nodeVault({
    endpoint: getInput('endpoint', { required: true }),
  });

  const authMethod = getInput('authMethod', { required: true });

  if (authMethods[authMethod]) {
    await authMethods[authMethod](vault);
  } else {
    throw new Error('Auth Method not found.');
  }

  const path = getInput('path');

  if (path) {
    const { data } = await vault.read(path, { required: true });

    /**
     * Output configured data
     */
    transformOutput(data.data);
  }

  const exportVaultSecret = getInput('exportVaultSecret');

  /**
   * Output vault token
   */
  if (exportVaultSecret && exportVaultSecret !== 'false') {
    debug(`Exporting vault secret: ${vault.token}`);
    outputData('vault_token', vault.token);
  }
};
