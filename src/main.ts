import { setFailed, group } from '@actions/core';
import getVaultSecret from './getVaultSecret';

export const run = async (): Promise<void> => {
  try {
    await group('Get Vault Secrets', getVaultSecret);
  } catch (error) {
    const message = error.message || 'Failed';
    setFailed(message);
  }
};

run();
