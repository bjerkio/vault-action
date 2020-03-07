# Vault Actions

**Please be adviced. This is still under construction. Please don't use yet!**

A Github Action that pulls secrets from HashiCrop Vault.

This is inspired by [RichiCoder1/vault-action](https://github.com/RichiCoder1/vault-action). The difference is that this is built with Typescript and supports Github Auth Method.

```
uses: actions/vault-action@v1
with:
    endpoint: 'https://vault-host.io'
    path: 'kv/data/hello-world'
```

## Input

### `endpoint`

**Required** The URL of Vault Endpoint.

### `path`

**Required** Path to secret from Vault 

## Auth Method

### Github Token

To use Github Token add `githubToken` to `with` variables.