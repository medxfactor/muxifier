# Changelog

## Unreleased

- Remove GPR publish workflows

  As I realized, YOU CANNOT PUBLISH A PACKAGE BOTH TO GPR AND NPM. Because, GPR is interested in `package.json` `name` field. and tries to match that with the repository, whether owned by you, or a organization (based on your access token). So, the only way you can publish a package both to GPR and NPM is to use a name your package which is the same for NPM and GPR. For example, you should set `"name": "@scope/package-name"` in your `package.json`, where you both have access to _`scope`_ organization on NPM and GitHub (or own the user names, of course).

## 0.1.1-3

- Add pre-release workflow configuration

  It is configured to be triggered on push tags in standard `npm version prerelease` command format which is `'v[0-9]+.[0-9]+.[0-9]+-[0-9]+'`.

- Add prerelease publish to GPR

  It is configured to be run on completion of prerelease workflow.

- Add prerelease publish to NPM

  It is configured to be run on completion of prerelease workflow.

- Add release publish to GPR

  It is configured to be run on completion of release workflow.

- Add release publish to NPM

  It is configured to be run on completion of release workflow.

- Add release workflow configuration

  It is configured to be triggered on push tags in standard semantic versioning format which is `'v[0-9]+.[0-9]+.[0-9]+'`.

- Add post-version script

  It will be executed after every `npm version <version>` execution and updates CHANGELOG version to new version.
