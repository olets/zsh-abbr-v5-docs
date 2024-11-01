# Installation

:::danger Heads Up
v6 is coming, with breaking changes. If you do advanced configuration, read [the v5.x -> v6.x migration guide](https://v6.zsh-abbr.olets.dev/migrating-between-versions.html#upgrading-from-v5-to-v6) and/or read about [pinning v5.x](./installation.md).
:::

[[toc]]

## Package

### Homebrew

zsh-abbr is available on Homebrew. Run

```shell:no-line-numbers
brew install olets/tap/zsh-abbr
```

and follow the post-install instructions logged to the terminal.

:::tip
`brew upgrade` will upgrade you to the latest version, even if it's a major version change.

Want to stay on this major version until you _choose_ to upgrade to the next? When installing zsh-abbr with Homebrew for the first time, run

```shell:no-line-numbers
brew install olets/tap/zsh-abbr@5
```

If you've already installed `olets/tap/zsh-abbr` with Homebrew, you can switch to the v5 formula by running

```shell:no-line-numbers
brew uninstall --force zsh-abbr && brew install olets/tap/zsh-abbr@5
```
:::

### Linux package repositories

::: warning
These may lag behind the official release channels.
:::

Community members have created packages in some Linux distros' package repositories. These include

- [Arch](https://aur.archlinux.org/packages/zsh-abbr)
- [NixOS](https://search.nixos.org/packages?show=zsh-abbr)

There may be others out there. If you know of another, please make a pull request to this page!

## Plugin

You can install zsh-abbr with a zsh plugin manager, including those built into frameworks such as Oh-My-Zsh (OMZ) and prezto. Each has their own way of doing things. Read your package manager's documentation or the [zsh plugin manager plugin installation procedures gist](https://gist.github.com/olets/06009589d7887617e061481e22cf5a4a); Fig users can install zsh-abbr from [its page in the Fig plugin directory](https://fig.io/plugins/other/zsh-abbr_olets)

:::tip
Want to stay on this major version until you _choose_ to upgrade to the next? Use your package manager's convention for specifying the branch `v5`.
:::

After adding the plugin to the manager, it will be available in all new terminals. To use it in an already-open terminal, restart zsh in that terminal:

```shell:no-line-numbers
exec zsh
```

## Manual

- Either download the archive of the release of your choice from <https://github.com/olets/zsh-abbr/releases> and expand it (ensures you have the latest official release)
- or clone a single branch:
    ```shell:no-line-numbers
    git clone https://github.com/olets/zsh-abbr --single-branch --branch <branch> --depth 1
    ```
    Replace `<branch>` with a branch name. Good options are `main` (for the latest stable release), `next` (for the latest release, even if it isn't stable), or `v5` (for releases in this major version).

Then add `source path/to/zsh-abbr.zsh` to your `.zshrc` (replace `path/to/` with the real path), and restart zsh:

```shell:no-line-numbers
exec zsh
```
