# Vault Actions

A Github Action that pulls secrets from HashiCrop Vault.

## Example Usage

```
jobs:
    build:
        steps:
            - uses: bjerkio/vault-action@v1.2.1
              with:
                endpoint: 'https://vault-host.io'
                path: 'kv/data/hello-world'
            - run: echo "${{ toJson(steps.vault.outputs.secret) }}" 
```

## Input

### `endpoint`

**Required** The URL of Vault Endpoint.

### `path`

**Required** Path to secret from Vault 

## Auth Method

Currently, we only support Github Auth Method. We do appreciate help!
Submit a pull request if you wanna see more methods!

### Github Token

```
...
with:
    githubToken: ${{ secrets.GH_TOKEN }}
```

**PS:** You cannot use the built in `GITHUB_TOKEN`. This is caused by the way
that Vault verifies the account (it needs to know _who_ is signing in.).

# Contribute

Feel free to open issues and pull requests. We appreciate all the help we can get!
At the moment, the most valuable are adding new auth methods, such as token and approle. We also really want to add E2E testing!

# Thanks too…

This Github Actions is inspired by [RichiCoder1/vault-action](https://github.com/RichiCoder1/vault-action). Some of the methods used in it are reused here.