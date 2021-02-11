# Changelog

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
