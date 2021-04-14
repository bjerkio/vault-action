import { setFailed, group, warning } from '@actions/core';
import getVaultSecret from './getVaultSecret';

export const run = async (): Promise<void> => {
  try {
    warning(
      'This Github Action is deprecated. Read more about it here: https://github.com/bjerkio/vault-action/issues/393',
    );
    await group('Get Vault Secrets', getVaultSecret);
  } catch (error) {
    const message = error.message || 'Failed';
    setFailed(message);
  }
};

run();
