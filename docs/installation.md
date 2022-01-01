---
prev:
  text: Introduction
  link: /
next:
  text: Usage
  link: /usage/
---

# Installation

## Package

zsh-abbr is available on Homebrew. Run

```
brew install olets/tap/zsh-abbr
```

and follow the post-install instructions logged to the terminal.

## Plugin

You can install zsh-abbr with a zsh plugin manager. Each has their own way of doing things. See your package manager's documentation or the [zsh plugin manager plugin installation procedures gist](https://gist.github.com/olets/06009589d7887617e061481e22cf5a4a).

After adding the plugin to the manager, restart zsh:

```shell
exec zsh
```

## Manual

Clone this repo and add `source path/to/zsh-abbr.zsh` to your `.zshrc`. Then restart zsh:

```shell
exec zsh
```
