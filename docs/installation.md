# Installation

:::danger
These docs are for the v5 beta. See the [pre-release discussion](https://github.com/olets/zsh-abbr/discussions/64).  
For v4 docs see <https://v4.zsh-abbr.olets.dev>
:::

[[toc]]

## Package

zsh-abbr is available on Homebrew. Run

```shell:no-line-numbers
brew install olets/tap/zsh-abbr
```

and follow the post-install instructions logged to the terminal.

## Plugin

You can install zsh-abbr with a zsh plugin manager. Each has their own way of doing things. See your package manager's documentation or the [zsh plugin manager plugin installation procedures gist](https://gist.github.com/olets/06009589d7887617e061481e22cf5a4a); Fig users can install zsh-abbr from [its page in the Fig plugin directory](https://fig.io/plugins/other/zsh-abbr_olets)

After adding the plugin to the manager, it will be available in all new terminals. To use it in an already-open terminal, restart zsh in that terminal:

```shell:no-line-numbers
exec zsh
```

## Manual

- Either download the latest release's archive from <https://github.com/olets/zsh-abbr/releases> and expand it (ensures you have the latest official release)
- or clone a single branch:
    ```shell:no-line-numbers
    git clone https://github.com/olets/zsh-abbr --single-branch --branch <branch> --depth 1
    ```
    Replace `<branch>` with a branch name. Good options are `main` (for the latest stable release), `next` (for the latest release, even if it isn't stable).

Then add `source path/to/zsh-abbr.zsh` to your `.zshrc` (replace `path/to/` with the real path), and restart zsh:

```shell:no-line-numbers
exec zsh
```
