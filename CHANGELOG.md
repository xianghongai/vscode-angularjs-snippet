# Changelog

All notable changes to the **AngularJS Code Snippets** extension are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Entries start at 0.1.4; see the git history for what came before.

## [0.2.0] - 2026-09-03

- Unify packaging and publishing scripts to `vsce:package` and `vsce:publish`
- Update GitHub Actions CI workflow to use `pnpm run vsce:publish`

## [0.1.4] - 2026-09-02

- Fixed the Marketplace badges — the `vsmarketplacebadge.apphb.com` endpoints are gone, and their SVGs were blocking packaging outright
- Removed a stale duplicate of the `$q` snippets that the build had already been shadowing; the shipped snippets are unchanged
- Snippets now ship as a single `.code-snippets` file, each declaring its own languages; which snippet reaches which language is unchanged
- `engines.vscode` raised to `^1.100.0`
