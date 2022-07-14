---
prev:
  text: Installation
  link: /installation/
next:
  text: Advanced
  link: /advanced/
---

# Usage

:::danger
These docs are for the not-yet-released v5.  
For v4 docs see <https://github.com/olets/zsh-abbr>
:::

```shell:no-line-numbers
abbr [<SCOPE>] [<TYPE>] <COMMAND> [<ARGS>]
```

zsh-abbr has **commands** to [add](#add), [rename](#rename), and [erase](#erase) abbreviations; to add abbreviations for every [alias](#import-aliases) or [Git alias](#import-git-aliases); to list the available abbreviations [with](#list) or [without](#list-abbreviations) their expansions; to [import fish shell abbreviations](#import-fish); and to [export abbreviations as aliases](#export-aliases).

**[Scope](#scope)** determines whether a new abbreviation is available in all sessions or just the current one.

**[Type](#type)** determines whether an abbreviation expands everywhere on a command line or just at the start.

Commands which make changes can be passed `--dry-run`.

Commands which have output can be passed `--quiet`.

Pass `--dry-run` and/or `--quiet` before other arguments.

`abbr` with no arguments is shorthand for `abbr list`. `abbr ...` with arguments is shorthand for `abbr add ...`.

## Scope

By default, abbreviations are **immediately available to all current and future sessions** (that is, in all open and future terminals). These are called "**user**" abbreviations.

```shell:no-line-numbers
# terminal 1
% abbr hw="echo hello world"
Added the regular session abbreviation `wh`
% hw[Enter] # expands to `echo hello world` and runs the command
hello world
%
```

```shell{2-3}:no-line-numbers
# terminal 2
% hw[Enter] # expands to `echo hello world` and runs the command
hello world
%
```

You can also create **session** abbreviations which are available only in the session they are created in:


```shell:no-line-numbers
# terminal 1
% abbr -S hw="echo hello world"
Added the regular session abbreviation `hw`
% hw[Enter] # expands to `echo hello world` and runs the command
hello world
%
```

```shell{2-3}:no-line-numbers
# terminal 2
% hw[Enter] # abbreviation is scoped to terminal 1
zsh: command not found: hw
%
```

Some commands take **scope** as an argument.

## Type

By default, abbreviations only **expand at the start of the command line**. These are called **"regular"** abbreviations. You can also create **"global" abbreviations which expand everywhere**:

```shell{1,5}:no-line-numbers
% abbr hw="echo hello world"
Added the regular user abbreviation `hw`
% echo foo && hw[Enter]
foo
zsh: command not found: hw
%
```

```shell{1,5}:no-line-numbers
% abbr -g hw="echo hello world"
Added the global user abbreviation `hw`
% echo foo && hw[Enter]
foo
hello world
%
```

Some commands take **type** as an argument.

## Commands

### `add`

```shell:no-line-numbers
abbr [(add | -a)] [<SCOPE>] [<TYPE>] [--dry-run] [(--quiet | --quieter)] [--force] ABBREVIATION=EXPANSION
```

Add a new abbreviation.

```shell{1-2}:no-line-numbers
% abbr add hw="echo hello world"
Added the regular user abbreviation `hw`
%
```

`add` is the default command, and does not need to be explicit.

```shell{1}:no-line-numbers
% abbr hw="echo hello world"
Added the regular user abbreviation `hw`
%
```

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

:::tip
If the above Git case is useful for you, check out the [git](#git) command
:::

To add a session abbreviation, use the **--session** scope flag (**-S** for short). Otherwise, or if the **--user** scope flag (**-U** for short) is passed, the new abbreviation will be available to all sessions. See [Scope](#scope).

To add a global abbreviation, use the **--global** flag (**-g** for short). Otherwise the new abbreviation will be a command abbreviation. See [Type](#type).

As with aliases, to include whitespace, quotation marks, or other special characters like `;`, `|`, or `&` in the EXPANSION, quote the EXPANSION or `\`-escape the characters as necessary.

```shell{3}:no-line-numbers
% abbr x=y z
abbr add: Expected one argument, got 2: x=y z
% abbr x=y\ z
Added the regular user abbreviation `x`
% x[Space] # expands to `y z `
```

```shell{3}:no-line-numbers
% abbr x=y z
abbr add: Expected one argument, got 2: x=y z
% abbr x="y z"
Added the regular user abbreviation `x`
% x[Space] # expands to `y z  `
```

User abbreviations can also be manually added to the user abbreviations file. See [Advanced > Storage and manual editing](/advanced.html#storage-and-manual-editing).

The regular session abbreviations, global session abbreviations, regular user abbreviations, and user global abbreviations are all independent. You can have more than one abbreviation with the same ABBREVIATION. Order of precedence is 

1. regular session
2. regular user
3. global session
3. global user

```shell{3-4,7-8,11-12,15-16}:no-line-numbers
# terminal 1
% abbr -g x="globaluser"
Added the global user abbreviation `x`
% x[Space] # expands to `globaluser `
% a x[Space] # expands to `a globaluser `
% abbr -g -S x="globalsession"
Added the global session abbreviation `x`
% x[Space] # expands to `globalsession `
% a x[Space] # expands to `a globalsession `
% abbr -g x="regularuser"
Added the regular user abbreviation `x`
% x[Space] # expands to `regularuser `
% a x[Space] # expands to `a globalsession `
% abbr -g x="regularsession"
Added the regular session abbreviation `x`
% x[Space] # expands to `regularsession `
% a x[Space] # expands to `a globalsession `
```

```shell:no-line-numbers
# terminal 2
% x[Space] # expands to `regularuser `
% a x[Space] # expands to `a globaluser `
```

Use `--dry-run` to see what would result, without making any actual changes.

Will error rather than overwrite an existing abbreviation.

Will warn if the abbreviation would replace an existing command. To add in spite of the warning, use `--force`. To silence the warning, use `--quieter`.

### `clear-session`

```shell:no-line-numbers
abbr (clear-session | c)
```

Erase all session abbreviations.

```shell{4}:no-line-numbers
% abbr -S x=y
Added the regular session abbreviation `x`
% x[Space] # expands to `y `
% abbr c
% x[Space] # no expansion
```
### `erase`

```shell:no-line-numbers
abbr (erase | e) [<SCOPE>] [<TYPE>] [--dry-run] [--quiet] ABBREVIATION
```

Erase an abbreviation.

```shell{5-6}:no-line-numbers
% abbr hw="echo hello world"
Added the regular user abbreviation `hw`
% hw[Enter] # expands to `echo hello world` and runs the command
hello world
% abbr erase hw
Erased regular user abbreviation `hw`
% hw[Enter] # no special behavior
zsh: command not found: hw
%
```

If there are multiple abbreviations with the same ABBREVIATION (see [add](#add)) you will be prompted to disambiguate. Use the **--session** (**-S** for short) or **--user** (**-U** for short) flag to specify the scope (see [Scope](#scope)) and/or the **--global** (**-g** for short) or **--regular** (**-r** for short) flag to specify the type (see [Type](#type)).


```shell{9-10}:no-line-numbers
% abbr -g x="globaluser"
Added the global user abbreviation `x`
% abbr -g -S x="globalsession"
Added the global session abbreviation `x`
% abbr e x;
Did not erase abbreviation `x`. Please specify one of
  global session abbreviation
  global user abbreviation
% abbr e -U x;
Erased global user abbreviation `x`
```

User abbreviations can also be manually erased from the user abbreviations file. See [Advanced > Storage and manual editing](/advanced.html#storage-and-manual-editing).

### `expand`

```shell:no-line-numbers
abbr (expand | x) ABBREVIATION
```

Output the ABBREVIATION's EXPANSION.

```shell{2-3}:no-line-numbers
% abbr hw="echo hello world"
% abbr expand hw
echo hello world
```

:::tip
To output the expansion of a global abbreviation, circumvent expansion with a `;` or `[Ctrl-Space][Enter]`

```shell{4-5}:no-line-numbers
% abbr hw="echo hello world"
% abbr expand hw[Enter] # expands to `abbr expand echo hello world`
abbr expand: requires exactly one argument
% abbr expand hw;
echo hello world
```
:::

### `export-aliases`

```shell:no-line-numbers
abbr export-aliases [<SCOPE>] [<TYPE>]
```

Export abbreviations as alias commands.

The alias commands use the same types as the abbreviations.

Regular abbreviations come after global abbreviations. Session abbreviations come after user abbreviations.

```shell{4}:no-line-numbers
% abbr hw="echo hello world"
% abbr -S e=echo
% abbr -g g=git
% abbr export-aliases
alias hw='echo hello world'
alias e=echo
alias -g g=git
```

Use the **--session** scope flag (**-S** for short) to export only session abbreviations. Use the **--user** scope flag (**-U** for short) to export only user abbreviations. See [Scope](#scope).

Use the **--global** or **-g** type flag to export only global abbreviations. Use the **--regular** or **-r** type flag to export only regular abbreviations. See [Type](#type).

```shell{4,6}:no-line-numbers
% abbr hw="echo hello world"
% abbr -S e=echo
% abbr -g g=git
% abbr export-aliases -S
alias e=echo
% abbr export-aliases -g
alias -g g=git
```

### `git`

```shell:no-line-numbers
abbr [(git | g)] [<SCOPE>] [--dry-run] [(--quiet | --quieter)] [--force] ABBREVIATION=EXPANSION
```

Add two new abbreviations:

- a regular abbreviation, the expansion of which is prefixed with `git `
- a global abbreviation, the abbreviation and expansion of which are prefixed with `git `

```shell{1,7,10}:no-line-numbers
% abbr git m="checkout main"
Added the regular user abbreviation `m`
Added the global user abbreviation `git m`
% abbr list-commands
abbr -g "git m"="git checkout main"
abbr "m"="git checkout main"
% m[Enter] # expands and runs `git checkout main`
% echo m[Enter] # no expansion
m
% echo hello world && git m[Enter] # expands and runs `git commit && git checkout main`
```

### `import-aliases`

```shell:no-line-numbers
abbr import-aliases [<type>] [--dry-run] [--quiet]
```

Add regular abbreviations for every regular alias in the session, and global abbreviations for every global alias in the session.

```shell:no-line-numbers
# shell config file, likely ~/.zshrc
alias e=echo
alias -g hw="hello world"
```

```shell{1}:no-line-numbers
% abbr import-aliases
Added the regular user abbreviation `e`
Added the global user abbreviation `hw`
```

Aliases still work:

```shell{4}:no-line-numbers
% abbr import-aliases
Added the regular user abbreviation `e`
Added the global user abbreviation `hw`
% e[Ctrl-Space]hw; # no expansion; uses the zsh aliases
hello world
```

Note that zsh-abbr does not lint the imported abbreviations. An effort is made to correctly wrap the expansion in single or double quotes, but it is possible that importing will add an abbreviation with a quotation mark problem in the expansion. It is up to the user to double check the result before taking further actions.

Use `--dry-run` to see what would result, without making any actual changes.

### `import-fish`

```shell:no-line-numbers
abbr import-fish [<SCOPE>] FILE [--dry-run] [--quiet]
```

Import fish abbr-syntax abbreviations (`abbreviation expansion` as compared to zsh abbr's `abbreviation=expansion`).

In fish:

```shell:no-line-numbers
abbr -s > file/to/save/fish/abbreviations/to
```

Then in zsh:

```shell{1}:no-line-numbers
abbr import-fish file/to/save/fish/abbreviations/to
# file is no longer needed, so feel free to
# rm file/to/save/fish/abbreviations/to
```

Note that zsh-abbr does not lint the imported abbreviations. An effort is made to correctly wrap the expansion in single or double quotes, but it is possible that importing will add an abbreviation with a quotation mark problem in the expansion. It is up to the user to double check the result before taking further actions.

Use `--dry-run` to see what would result, without making any actual changes.

### `import-git-aliases`

:::warning
The `import-git-aliases` behavior changed in zsh-abbr v5. The previous behavior can be recreated with

```shell:no-line-numbers
% abbr import-git-aliases
% abbr import-git-aliases -g --prefix g
```
:::

:::tip
For users migrating from Oh-My-Zsh: [OMZ's Git aliases are shell aliases](https://github.com/ohmyzsh/ohmyzsh/blob/master/plugins/git/git.plugin.zsh), not aliases in the Git config. To add abbreviations for them, use [import-aliases](#import-aliases).
:::

```shell:no-line-numbers
abbr import-git-aliases [<SCOPE>] [<TYPE>] [--dry-run] [--quiet] [--file <config-file>] [--prefix <ABBREVIATION prefix>]
```

Add an abbreviation for every Git alias available in the current session. The EXPANSION is prefixed with `git[Space]`.

```text:no-line-numbers
# Git config file, likely ~/.gitconfig
[alias]
  co = checkout
```

```shell{1}:no-line-numbers
% abbr import-git-aliases
Added the regular user abbreviation `co`
```

Git aliases still work:

```shell{3}:no-line-numbers
% abbr import-git-aliases
Added the regular user abbreviation `co`
% git co[Ctrl-Space]feature # no expansion; uses the Git alias
Switched to branch 'feature'
```

Use `--dry-run` to see what would result, without making any actual changes. zsh-abbr does not lint the imported abbreviations.

Use the **--session**  or **-S** scope flag to create session abbreviations. Otherwise, or if the **--user** scope flag (**-U** for short) is passed, the Git abbreviations will be user. See [Scope](#scope).

Use the **--global** or **-g** type flag to create global abbreviations. Use the **--regular** or **-r** type flag to create regular abbreviations. See [Type](#type).

```text:no-line-numbers
# Git config file, likely ~/.gitconfig
[alias]
  co = checkout
```

```shell{1,5,8}:no-line-numbers
% abbr import-git-aliases -g -S
Added the global session abbreviation `co`
```

Use `--file <config-file>` to use a config file instead of the default (see `man git-config`).

```text:no-line-numbers
# ~/my-other-git-config
[alias]
  co = checkout
```

```shell:no-line-numbers
% abbr import-git-aliases --file ~/my-other-git-config
Added the regular user abbreviation `co`
```

Use `--prefix <prefix>` to add a prefix to the ABBREVIATION.

```text:no-line-numbers
# Git config file, likely ~/.gitconfig
[alias]
  co = checkout
```

```shell{1,5,8}:no-line-numbers
% abbr import-git-aliases --prefix g
Added the regular user abbreviation `gco`
```

:::tip
Try this pattern: add abbreviation `g=git` and then prefix Git abbreviations with `git ` (that prefix is "git[Space]")

```shell{1,3,6}:no-line-numbers
% git config --global alias.cp cherry-pick
% abbr -g g=git
Added the global user abbreviation `g` 
% abbr import-git-aliases -g --prefix "git "
Added the global user abbreviation `cp`
% g[Space]cp[Space] # expands to `git cherry-pick `
```
:::

### `list`

```shell:no-line-numbers
abbr [list] [<SCOPE>] [<TYPE>]
```

List the abbreviations with their expansions, like zsh's `alias`. Regular abbreviations come after global abbreviations. Session abbreviations come after user abbreviations.

```shell{9}:no-line-numbers
% abbr -S a=regularsession
Add the regular session abbreviation `a`
% abbr -g b=globaluser
Add the global user abbreviation `b`
% abbr c=regularuser
Add the regular user abbreviation `c`
% abbr -S -g d=globalsession
Add the global session abbreviation `d`
% abbr list
b="globaluser"
c="regularuser"
d="globalsession"
a="regularsession"
```

`list` is the default when no additional arguments are passed; it does not need to be made explicit:

```shell{9}:no-line-numbers
% abbr -S a=regularsession
Add the regular session abbreviation `a`
% abbr -g b=globaluser
Add the global user abbreviation `b`
% abbr c=regularuser
Add the regular user abbreviation `c`
% abbr -S -g d=globalsession
Add the global session abbreviation `d`
% abbr
b="globaluser"
c="regularuser"
d="globalsession"
a="regularsession"
```

### `list-abbreviations`

```shell:no-line-numbers
abbr (list-abbreviations | l) [<SCOPE>] [<TYPE>]
```

List the abbreviations only, like fish's `abbr -l`. Regular abbreviations follow global abbreviations. Session abbreviations follow user abbreviations.

```shell{9}:no-line-numbers
% abbr -S a=regularsession
Add the regular session abbreviation `a`
% abbr -g b=globaluser
Add the global user abbreviation `b`
% abbr c=regularuser
Add the regular user abbreviation `c`
% abbr -S -g d=globalsession
Add the global session abbreviation `d`
% abbr list-abbreviations
b
c
d
a
```

### `list-commands`

```shell:no-line-numbers
abbr (list-commands | L) [<SCOPE>] [<TYPE>]
```

List as commands suitable for export, like zsh's `alias -L`. Regular abbreviations follow global abbreviations. Session abbreviations follow user abbreviations.

```shell{9}:no-line-numbers
% abbr -S a=regularsession
Add the regular session abbreviation `a`
% abbr -g b=globaluser
Add the global user abbreviation `b`
% abbr c=regularuser
Add the regular user abbreviation `c`
% abbr -S -g d=globalsession
Add the global session abbreviation `d`
% abbr list-commands
abbr -g b=globaluser
abbr c=regularuser
abbr -S -g d=globalsession
abbr -S a=regularsession
```

### `rename`

```shell:no-line-numbers
abbr (rename | R) [<SCOPE>] [<TYPE>] [--dry-run] [(--quiet | --quieter)] OLD NEW
```

Rename an abbreviation.

```shell{5-7,10-11}:no-line-numbers
% abbr hw="echo hello world"
Added the regular user abbreviation `hw`
% hw[Enter] # expands to `echo hello world` and runs the command
hello world
% abbr rename hw wh
Added the regular user abbreviation `wh`
Erased regular user abbreviation `hw`
% hw[Enter] # no special behavior
zsh: command not found: hw
% wh[Enter] # expands to `echo hello world` and runs the command
hello world
```

Use the **--session** scope flag (**-S** for short) to rename a session abbreviation. Otherwise, or if the **--user** scope flag (**-U** for short) is passed, a user abbreviation will be renamed. See [Scope](#scope).

Use the **--global** flag (**-g** for short) to rename a global abbreviation. Otherwise a command abbreviation will be renamed. See [Type](#type).

Rename is scope- and type-specific. If you get a "no matching abbreviation" error, make sure you added the right flags (list abbreviations if you are not sure).

Use `--dry-run` to see what would result, without making any actual changes.

User abbreviations can also be manually renamed in the user abbreviations file. See [Advanced > Storage and manual editing](/advanced.html#storage-and-manual-editing).

Conflicts will error or warn. See [add](#add) for details.
