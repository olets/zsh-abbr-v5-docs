# Essential commands

zsh-abbr has broad capabilities for managing abbreviations. Add, rename, erase, import, export. Customize the interactive behavior. Customize where data is stored. There's a lot you can learn. Here's what you need to know:

## Create abbreviations

**Add** an abbreviation with `abbr <ABBREVIATION>=<EXPANSION>`:

```shell{1-2}:no-line-numbers
% abbr hw="echo hello world"
Added the regular user abbreviation `hw`
%
```

> By default, abbreviations are **immediately available to all current and future sessions** (that is, in all open and future terminals). You can also create **session** abbreviations which are available only in the session they are created in. See [Usage&nbsp;>&nbsp;Scope](/scopes.html).

## Expand them

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

> By default, abbreviations only **expand at the start of the command line**. These are called **"regular"** abbreviations. You can also create **"global" abbreviations which expand everywhere**. See [Usage&nbsp;>&nbsp;Type](/types.html).

As seen above, the EXPANSION can be more than one word. The ABBREVIATION can be too. This lets you create context-dependent abbreviations:

```shell{3-4}:no-line-numbers
% abbr "git cp"="git cherry-pick"
Added the regular user abbreviation `git cp`
% cp[Space] # no special behavior. you can use cp as usual
% git cp[Space] # expands to `git cherry-pick `
```

This lets you compose multi-stage abbreviations:

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
If the above example excites you, check out zsh-abbr's [git command](/commands.html#git). It streamlines the process of creating Git-related abbreviations!
:::

## Ditch aliases

Find you **prefer abbreviations to aliases**? zsh-abbr makes it easy to create abbreviations from your aliases. The aliases are left **untouched**, so you can still use them when you want to… or delete them!

zsh-abbr has support for importing both [**zsh** aliases](https://zsh.sourceforge.io/Intro/intro_8.html) and [**Git** aliases](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases). See

- [Usage&nbsp;>&nbsp;Commands&nbsp;>&nbsp;`import-aliases`](/commands.html#import-aliases)
- [Usage&nbsp;>&nbsp;Commands&nbsp;>&nbsp;`import-git-aliases`](/commands.html#import-git-aliases).
