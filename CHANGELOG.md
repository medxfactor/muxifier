# Changelog

## Unreleased

- Update `tsconfig.json` configuration

  - Remove `files` key and replace it with `include` of `./scr/` directory.

    It makes editors type hinting and suggestions more convenient and unused modules will not be included in final bundle also.

  - Remove `module` key from `compilerOptions`.

    It unnecessarily enforces module type to output bundle. After removing this key, both bundlers and other tools, e.g., `ts-node`, can compile or run source modules in the way they need and configured for. For example, `ts-node` needs `CommonJS` module types, because `node` itself requires the modules to be in this format, while at the same time, `rollup` is configured to generate both `CommonJS` and `ES` modules for two output bundles. Removing this option allows both to use source code in the way need, without any enforcement of TypeScript compile.

- Add `ts-node` package. It allows more easier and faster execution of code, for debugging, etc.

- Add utility helpers

  - It contains `Either` type and both `Right` and `Left` types with their implementations.

  - Add `Task` utility type. Helps executing asynchronous tasks that can either fail or succeed.

## 0.1.1

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
