import { getInput } from '@actions/core';
import { client } from 'node-vault';

export const TokenAuthMethod = async (vault: client): Promise<void> => {
  vault.token = getInput('token', { required: true });
};
