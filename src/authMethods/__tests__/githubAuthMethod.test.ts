jest.mock('@actions/core');
import { GithubAuthMethod } from '../githubAuthMethod';
import { client } from 'node-vault';

const vault = ({
  githubLogin: jest.fn(),
} as unknown) as client;

describe('githubAuthMethod', () => {
  it('should return', async () => {
    GithubAuthMethod(vault);
    expect(vault.githubLogin).toHaveBeenCalled();
  });
});
