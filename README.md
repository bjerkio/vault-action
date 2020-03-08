[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/bjerkio/vault-action.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/bjerkio/vault-action/context:javascript)
[![codecov](https://codecov.io/gh/bjerkio/vault-action/branch/master/graph/badge.svg)](https://codecov.io/gh/bjerkio/vault-action)
![Build & Deploy](https://github.com/bjerkio/vault-action/workflows/Build%20&%20Deploy/badge.svg?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/c5fefa8af6f5a5466d2a/maintainability)](https://codeclimate.com/github/bjerkio/vault-action/maintainability)

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

### `authMethod`

**Required** Type of authentication method. See below. 

## Auth Methods

Currently, we only support Github Auth Method. We do appreciate help!
Submit a pull request if you wanna see more methods!

### Token

```
...
with:
    authMethod: 'token'
    token: ${{ secrets.VAULT_TOKEN }}
```

### Github Token

```
...
with:
    authMethod: 'github'
    githubToken: ${{ secrets.GH_TOKEN }}
```

**PS:** You cannot use the built in `GITHUB_TOKEN`. This is caused by the way
that Vault verifies the account (it needs to know _who_ is signing in.).

# Contribute

Feel free to open issues and pull requests. We appreciate all the help we can get!
At the moment, the most valuable are adding new auth methods, such as approle. We also really want to add E2E testing!

# Thanks too…

This Github Actions is inspired by [RichiCoder1/vault-action](https://github.com/RichiCoder1/vault-action). Some of the methods used in it are reused here.