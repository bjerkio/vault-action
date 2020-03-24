import { getInput } from '@actions/core';
import * as nodeVault from 'node-vault';
import authMethods from './authMethods';
import { transformOutput } from './transformOutput';

export default async (): Promise<void> => {
  const vault = nodeVault({
    endpoint: getInput('endpoint', { required: true }),
  });

  const authMethod = getInput('authMethod', {required: true});

  if (authMethods[authMethod]) {
    await authMethods[authMethod](vault);
  } else {
    throw new Error('Auth Method not found.');
  }

  const path = getInput('path');
  const { data } = await vault.read(path, { required: true });
  transformOutput(data.data);
};