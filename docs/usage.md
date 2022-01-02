---
prev:
  text: Installation
  link: /installation/
next:
  text: Advanced
  link: /advanced/
sidebarDepth: 2
---

# Usage

```shell:no-line-numbers
abbr [<SCOPE>] [<TYPE>] <COMMAND> [<ARGS>]
```

Commands which make changes can be passed `--dry-run`.

Commands which have output can be passed `--quiet`.

`<COMMAND> [<ARGS>]` must be last.

## Scope

By default, abbreviations are **immediately available to all current and future sessions** (that is, in all open and future terminals). These are called "user" abbreviations.

```shell{1-2}:no-line-numbers
# terminal 1
% abbr hw="echo hello world"
Added the regular session abbreviation `wh`
% hw[Enter] # expands to `echo hello world` and runs the command
hello world
%
```
```shell{2}:no-line-numbers
# terminal 2
% hw[Enter] # expands to `echo hello world` and runs the command
hello world
%
```

You can also create **"session" abbreviations scoped the current session**:


```shell{2-3}:no-line-numbers
# terminal 1
% abbr -S hw="echo hello world"
Added the regular session abbreviation `hw`
% hw[Enter] # expands to `echo hello world` and runs the command
hello world
%
```
```shell{2}:no-line-numbers
# terminal 2
% hw[Enter] # abbreviation is scoped to terminal 1
zsh: command not found: hw
%
```

Some commands take **scope** as an argument.

## Type

By default abbreviations only **expand at the start of the command line**. These are called **"regular"** abbreviations. You can also create **"global" abbreviations which expand everywhere**:

```shell{3,5,9-13}:no-line-numbers
% abbr hw="echo hello world"
Added the regular user abbreviation `hw`
% echo foo && hw[Enter]
foo
zsh: command not found: hw
%
% abbr erase hw
Erased regular user abbreviation `hw`
% abbr -g hw="echo hello world"
Added the global user abbreviation `hw`
% echo foo && hw[Enter]
foo
hello world
%
```

Some commands take **type** as an argument.

## Commands

zsh-abbr has commands to add, rename, and erase abbreviations; to add abbreviations for every alias or Git alias; to list the available abbreviations with or without their expansions; and to create aliases from abbreviations.

`abbr` with no arguments is shorthand for `abbr list`. `abbr ...` with arguments is shorthand for `abbr add ...`.

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

  ```shell{1-2}:no-line-numbers
  % abbr hw="echo hello world"
  Added the regular user abbreviation `hw`
  %
  ```

  As seen above, the EXPANSION can be more than one word. The ABBREVIATION can also be more than one word. This means you can scope abbreviations to a context:

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

  To add a session abbreviation, use the **--session** or **-S** scope flag. Otherwise, or if the **--user** or **-U** scope flag is used, the new abbreviation will be available to all sessions. See [Scope](#scope).

  To add a global abbreviation, use the **--global** flag. Otherwise the new abbreviation will be a command abbreviation. See [Type](#type).

  As with aliases, to include whitespace, quotation marks, or other special characters like `;`, `|`, or `&` in the EXPANSION, quote the EXPANSION or `\`-escape the characters as necessary.

  ```shell:no-line-numbers
  abbr a=b\;c  # allowed
  abbr a="b|c" # allowed
  ```

  User-scope abbreviations can also be manually to the user abbreviations file. See [Advanced > Storage and manual editing](/advanced.html#storage-and-manual-editing).

  The session regular, session global, user regular, and user global abbreviation sets are independent. If you wanted, you could have more than one abbreviation with the same ABBREVIATION. Order of precedence is "session command > user command > session global > user global".

  Use `--dry-run` to see what would result, without making any actual changes.

  Will error rather than overwrite an existing abbreviation.

  Will warn if the abbreviation would replace an existing command. To add in spite of the warning, use `--force`. To silence the warning, use `--quieter`.

### `clear-session`

  ```shell:no-line-numbers
  abbr (clear-session | c)
  ```

  Erase all session abbreviations.

### `erase`

  ```shell:no-line-numbers
  abbr (erase | e) [<SCOPE>] [<TYPE>] [--dry-run] [--quiet] ABBREVIATION
  ```

  Erase an abbreviation.

  Use the **--session** or **-S** scope flag to erase a session abbreviation. Otherwise, or if the **--user** or **-U** scope flag is used, a cross-session abbreviation will be erased. See [Scope](#scope).

  Use the **--global** flag to erase a session abbreviation. Otherwise a cross-session abbreviation will be erased. See [Type](#type).

  ```shell{4-5}:no-line-numbers
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

  User abbreviations can also be manually erased from the `ABBR_USER_ABBREVIATIONS_FILE`. See [Advanced > Storage and manual editing](/advanced.html#storage-and-manual-editing).

### `expand`

  ```shell:no-line-numbers
  abbr (expand | x) ABBREVIATION
  ```

  Output the ABBREVIATION's EXPANSION.

  ```shell{2}:no-line-numbers
  % abbr hw="echo hello world"
  % abbr expand hw
  echo hello world
  ```

  :::tip
  To output the expansion of a global abbreviation, circumvent expansion with a `;` or `[Ctrl-Space][Enter]`

  ```shell{2}:no-line-numbers
  % abbr hw="echo hello world"
  % abbr expand hw;
  echo hello world
  ```

### `export-aliases`

  ```shell:no-line-numbers
  abbr export-aliases [<SCOPE>] [<TYPE>]
  ```

  Export abbreviations as alias commands. Regular abbreviations follow global abbreviations. Session abbreviations follow user abbreviations.

  Use the **--session** or **-S** scope flag to export only session abbreviations. Use the **--user** or **-U** scope flag to export only user abbreviations. See [Scope](#scope).

  Use the **--global** or **-g** type flag to export only global abbreviations. Use the **--regular** or **-r** type flag to export only regular abbreviations. See [Type](#type).

  ```shell{5}:no-line-numbers
  % abbr hw="echo hello world"
  % abbr -S e=echo
  % abbr -g g=git
  % abbr export-aliases
  alias hw='echo hello world'
  alias e=echo
  alias -g g=git
  ```

  Combine a scope flag and a type flag to limit the output.

  ```shell{4,6}:no-line-numbers
  % abbr hw="echo hello world"
  % abbr -S e=echo
  % abbr -g g=git
  % abbr export-aliases -S
  alias e=echo
  % abbr export-aliases -g
  alias -g g=git
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
  ```shell{1-4,6}:no-line-numbers
  % abbr import-aliases
  Added the regular user abbreviation `e`
  Added the global user abbreviation `hw`
  % e[Space]hw[Enter] # expands to `echo hello world` and runs the command
  hello world
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

  ```shell:no-line-numbers
  abbr import-fish file/to/save/fish/abbreviations/to
  # file is no longer needed, so feel free to
  # rm file/to/save/fish/abbreviations/to
  ```

  Note that zsh-abbr does not lint the imported abbreviations. An effort is made to correctly wrap the expansion in single or double quotes, but it is possible that importing will add an abbreviation with a quotation mark problem in the expansion. It is up to the user to double check the result before taking further actions.

  Use `--dry-run` to see what would result, without making any actual changes.

### `import-git-aliases`

  ```shell:no-line-numbers
  abbr import-git-aliases [<SCOPE>] [<TYPE>] [--dry-run] [--quiet] [--file <config-file>] [--prefix <ABBREVIATION prefix>]
  ```

  Add an abbreviation for every Git alias available in the current session. The EXPANSION is prefixed with `git[Space]`.

  ```shell:no-line-numbers
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

  Use the **--session**  or **-S** scope flag to create session abbreviations. Otherwise, or if the **--user** or **-U** scope flag is used, the Git abbreviations will be user. See [Scope](#scope).

  Use the **--global** or **-g** type flag to create global abbreviations. Use the **--regular** or **-r** type flag to create regular abbreviations. See [Type](#type).

  ```shell:no-line-numbers
  # Git config file, likely ~/.gitconfig
  [alias]
    co = checkout
  ```
  ```shell{1,5,8}:no-line-numbers
  % abbr import-git-aliases -g -S
  Added the global session abbreviation `co`
  ```

  Use `--file <config-file>` to use a config file instead of the default (see `man git-config`).

  ```shell:no-line-numbers
  # ~/my-other-git-config
  [alias]
    co = checkout
  ```
  ```shell:no-line-numbers
  % abbr import-git-aliases --file ~/my-other-git-config
  Added the regular user abbreviation `co`
  ```

  Use `--prefix <prefix>` to add a prefix to the ABBREVIATION.

  ```shell:no-line-numbers
  # Git config file, likely ~/.gitconfig
  [alias]
    co = checkout
  ```
  ```shell{1,5,8}:no-line-numbers
  % abbr import-git-aliases --prefix g
  Added the regular user abbreviation `gco`
  ```
  ```

  :::tip
  Add the abbreviation `g=git` and then prefix Git abbreviations with `git `

  ```shell:no-line-numbers
  # Git config file, likely ~/.gitconfig
  [alias]
    co = checkout
  ```
  ```shell{1,3,5}:no-line-numbers
  % abbr -g g=git
  Added the global user abbreviation `g` 
  % abbr import-git-aliases -g --prefix "git "
  Added the global user abbreviation `co` # for example
  % g[Space]co[Space] # expands to `git checkout`
  ```
  :::

  :::warn
  The `import-git-aliases` behavior changed in zsh-abbr v5. The previous behavior can be recreated with

  ```shell:no-line-numbers
  abbr import-git-aliases
  abbr import-git-aliases -g --prefix g
  ```
  :::


  Note for users migrating from Oh-My-Zsh: [OMZ's Git aliases are shell aliases](https://github.com/ohmyzsh/ohmyzsh/blob/master/plugins/git/git.plugin.zsh), not aliases in the Git config. To add abbreviations for them, use **import-aliases**.

  Note that zsh-abbr does not lint the imported abbreviations. It is up to the user to double check the result before taking further actions.

  Use `--dry-run` to see what would result, without making any actual changes.

### `list`

  ```shell:no-line-numbers
  abbr [list] [<SCOPE>] [<TYPE>]
  ```

  List the abbreviations with their expansions, like zsh's `alias`. Regular abbreviations follow global abbreviations. Session abbreviations follow user abbreviations.

  ```shell:no-line-numbers
  % abbr a=apple
  % abbr -g b=ball
  % abbr -S c=cat
  % abbr -S -g d=dog
  % abbr list
  a="apple"
  b="ball"
  c="cat"
  d="dog"
  % source ~/.zshrc
  % abbr list
  a="apple"
  b="ball"
  ```

  `list` is the default when no additional arguments are passed; it does not need to be made explicit:

  ```shell:no-line-numbers
  % abbr a=apple
  % abbr
  a="apple"
  ```

### `list-abbreviations`

  ```shell:no-line-numbers
  abbr (list-abbreviations | l) [<SCOPE>] [<TYPE>]
  ```

  List the abbreviations only, like fish's `abbr -l`. Regular abbreviations follow global abbreviations. Session abbreviations follow user abbreviations.

  ```shell:no-line-numbers
  % abbr a=apple
  % abbr -g b=ball
  % abbr -S c=cat
  % abbr -S -g d=dog
  % abbr list-abbreviations
  a
  b
  c
  d
  % source ~/.zshrc
  % abbr list-abbreviations
  a
  b
  ```

### `list-commands`

  ```shell:no-line-numbers
  abbr (list-commands | L) [<SCOPE>] [<TYPE>]
  ```

  List as commands suitable for export, like zsh's `alias -L`. Regular abbreviations follow global abbreviations. Session abbreviations follow user abbreviations.

  ```shell:no-line-numbers
  % abbr a=apple
  % abbr -g b=ball
  % abbr -S c=cat
  % abbr -S -g d=dog
  % abbr list-abbreviations
  abbr a="apple"
  abbr -g b="ball"
  abbr -S c="cat"
  abbr -S -g d="dog"
  % source ~/.zshrc
  % abbr list-abbreviations
  abbr a="apple"
  abbr -g b="ball"
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

  Use the **--session** or **-S** scope flag to rename a session abbreviation. Otherwise, or if the **--user** or **-U** scope flag is used, a cross-session abbreviation will be renamed. See [Scope](#scope).

  Use the **--global** flag to rename a global abbreviation. Otherwise a command abbreviation will be renamed. See [Type](#type).

  Rename is scope- and type-specific. If you get a "no matching abbreviation" error, make sure you added the right flags (list abbreviations if you are not sure).

  Use `--dry-run` to see what would result, without making any actual changes.

  Abbreviations can also be manually renamed in the `ABBR_USER_ABBREVIATIONS_FILE`. See [Advanced > Storage and manual editing](/advanced.html#storage-and-manual-editing).

  Conflicts will error or warn. See [add](#add) for details.
