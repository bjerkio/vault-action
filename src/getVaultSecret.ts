import { getInput, setOutput } from '@actions/core';
import nodeVault from 'node-vault';
import * as authMethod from './authMethods';

export default async (): Promise<void> => {
    const vault = nodeVault({
      endpoint: getInput('endpoint'),
    });

    // TODO: Add support for other authentication methods
    await authMethod.GithubAuthMethod(vault);

    const path = getInput('path');
    const output = await vault.read(path);
    setOutput('secret', output);
}
