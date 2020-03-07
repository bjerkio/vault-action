import { getInput } from '@actions/core';
import { client } from 'node-vault';

export const GithubAuthMethod = async (vault: client): Promise<void> => {
  await vault.githubLogin({ token: getInput('githubToken') });
}
