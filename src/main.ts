import { setFailed } from '@actions/core';
import getVaultSecret from './getVaultSecret';

(async (): Promise<void> => {
  try {
    await getVaultSecret();
  } catch (error) {
    setFailed(error);
  }
})();
