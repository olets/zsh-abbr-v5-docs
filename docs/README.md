---
next:
  text: Installation
  link: /installation/
---

# Introduction

:::danger
These docs are for the not-yet-released v5
:::

## zsh-abbr ![GitHub release (latest by date)](https://img.shields.io/github/v/release/olets/zsh-abbr)

![](/images/zsh-abbr.png)

**abbr** is the zsh manager for **auto-expanding abbreviations** - text that when written in a terminal is replaced with other (typically longer) text. Inspired by fish shell.

For example, abbreviate `git checkout` as `co` (or even `c` or anything else). Type `co`<kbd>Space</kbd> and the `co` **turns into** `git checkout`. Abbreviate `git checkout main` as `cm`. Type `cm`<kbd>Enter</kbd> and the `cm` **turns into and runs** `git checkout main`. Don't want an abbreviation to expand? Use <kbd>Ctrl</kbd><kbd>Space</kbd> instead of <kbd>Space</kbd>, and `;`<kbd>Enter</kbd> instead of <kbd>Enter</kbd>.

Why? Like aliases, abbreviations **save keystrokes**. Unlike aliases, abbreviations can leave you with a **transparently understandable command history** ready for using on a different computer or sharing with a colleague. And where aliases can let you forget the full command, abbreviations may **help you learn** the full command even as you type the shortened version.

Like **zsh's `alias`**, zsh-abbr supports **"regular"** (i.e. command-position) and **"global"** (anywhere on the line) abbreviations. Like **fish's `abbr`**, zsh-abbr supports **interactive creation** of persistent abbreviations which are immediately available in all terminal sessions. Abbreviations automatically **sync to a file**, ready for your dotfile management.

Run `abbr help` for documentation; if the package is installed with Homebrew, `man abbr` is also available.

## Quick start

**Add** an abbreviation with `abbr <ABBREVIATION>=<EXPANSION>`:

```shell{1-2}:no-line-numbers
% abbr hw="echo hello world"
Added the regular user abbreviation `hw`
%
```

::: tip
By default, abbreviations are **immediately available to all current and future sessions** (that is, in all open and future terminals). You can also create **session** abbreviations which are available only in the session they are created in. See [Usage > Scope](/usage.html#scope).
:::

<kbd>Space</kbd> **expands** abbreviations:

```shell{3}:no-line-numbers
% abbr hw="echo hello world"
Added the regular user abbreviation `hw`
% hw[Space] # expands to `echo hello world `
```

<kbd>Enter</kbd> **expands and accepts** abbreviations:

```shell{3}:no-line-numbers
% abbr hw="echo hello world"
Added the regular user abbreviation `hw`
% hw[Enter] # expands to `echo hello world` and runs the command
hello world
%
```

::: tip
By default, abbreviations only **expand at the start of the command line**. These are called **"regular"** abbreviations. You can also create **"global" abbreviations which expand everywhere**. See [Usage > Type](/usage.html#type).
:::

As seen above, the EXPANSION can be more than one word. The ABBREVIATION can be too. This lets you create context-dependent abbreviations:

```shell{3-4}:no-line-numbers
% abbr "git cp"="git cherry-pick"
Added the regular user abbreviation `git cp`
% cp[Space] # no special behavior. you can use cp as usual
% git cp[Space] # expands to `git cherry-pick `
```

In effect you can compose multi-step abbreviations:

```shell{1,4,6-7}:no-line-numbers
% abbr g=git
Added the regular user abbreviation `g`
% g[Space] # expands to `git `
% abbr "git cp"="git cherry-pick"
Added the regular user abbreviation `git cp`
% cp[Space] # no special behavior. you can use cp as usual
% g[Space]cp[Space] # expands to `git cherry-pick `
```

::: tip
You can also **erase or rename** an abbreviation, **export** abbreviations, **list** abbreviations, and more. See [Usage > Commands](/usage.html#commands).
:::

Find you **prefer abbreviations to aliases**? zsh-abbr makes it easy to create abbreviations from your aliases. The aliases are left **untouched** so you can still use them when you want to… or delete them!

zsh-abbr has support for importing both **zsh** aliases (the abbreviation uses the **alias's scope**):

```shell:no-line-numbers
# shell config file, likely ~/.zshrc
alias e=echo
alias -g hw="hello world"
```
```shell{1-4,6}:no-line-numbers
% abbr import-aliases
Added the regular user abbreviation `e`
Added the global user abbreviation `hw`
% e[Space]hw[Enter] # expands to `echo hello world` and runs the command
hello world
% e[Ctrl-Space]hw; # no expansion; uses the zsh aliases
hello world
```

and **Git** aliases:

```text:no-line-numbers
# Git config file, likely ~/.gitconfig
[alias]
  co = checkout
```
```shell{1,5,8}:no-line-numbers
% abbr import-git-aliases
Added the regular user abbreviation `co`
% git checkout -b feature
Switched to a new branch 'feature'
% git co[Space]main # expands to `git checkout main`
Switched to branch 'main'
Your branch is up to date with 'origin/main'.
% git co[Ctrl-Space]feature # no expansion; uses the Git alias
Switched to branch 'feature'
```

:::tip
`abbr import-git-aliases` can take either or both of "scope" and "type" flags, and a **"prefix" argument**. This makes it simple to follow the context-dependent composition pattern (see above) when creating abbreviations from your Git aliases. See [Usage > Commands](/usage.html#commands).
:::