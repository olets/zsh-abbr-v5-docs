# Advanced

[[toc]]

## Configuration variables

Variable | Type | <div style="width: 300px">Use</div> | Default | Limitations
---|---|---|---|---
`ABBR_AUTOLOAD` | integer | If non-zero, automatically account for updates to the user abbreviations file (read [Storage and manual editing](#storage-and-manual-editing)) | 1
`ABBR_DEBUG` | integer | If non-zero, print debugging messages | 0
`ABBR_DEFAULT_BINDINGS` | integer | If non-zero, add the default bindings (read [Widgets&nbsp;and&nbsp;key&nbsp;bindings](#widgets-and-key-bindings)) | 1
`ABBR_DRY_RUN` | integer | If non-zero, use dry run mode without passing `--dry-run` | 0
`ABBR_EXPANSION_CURSOR_MARKER` | string | Read `ABBR_SET_EXPANSION_CURSOR` in this table | `$ABBR_LINE_CURSOR_MARKER` | Cannot contain `^`. Read [issue #140](https://github.com/olets/zsh-abbr/issues/140).
`ABBR_FORCE` | integer | If non-zero, use force mode without passing `--force` (read [Usage&nbsp;>&nbsp;Commands&nbsp;>&nbsp;`add`](/commands.html#add)) | 0
`ABBR_LINE_CURSOR_MARKER` | string | Read `ABBR_SET_LINE_CURSOR` in this table | %
`ABBR_PRECMD_LOGS` | integer | ⚠️ DEPRECATED ⚠️ If non-zero, support precmd logs, for example to warn that a deprecated widget was used | 1
`ABBR_QUIET` | integer | If non-zero, use quiet mode without passing `--quiet` | 0
`ABBR_QUIETER` | integer | If non-zero, use quieter mode without passing `--quieter` | 0
`ABBR_SET_EXPANSION_CURSOR` | integer | If non-zero and the expansion includes `ABBR_EXPANSION_CURSOR_MARKER`, `abbr-expand` will replace the expansion's first instance of `ABBR_EXPANSION_CURSOR_MARKER` with the cursor, and `abbr-expand-and-insert`'s bound key will not be inserted at the end of the expansion (read also [Widgets and key bindings](#widgets-and-key-bindings)) | 0
`ABBR_SET_LINE_CURSOR` | integer | If non-zero and `abbr-expand` didn't place the cursor (because the `ABBR_SET_EXPANSION_CURSOR` is zero or the expansion did not include `ABBR_EXPANSION_CURSOR_MARKER`), `abbr-expand-and-insert` will replace the line's first instance of `ABBR_LINE_CURSOR_MARKER` with the cursor instead of inserting its bound key at the end of the expansion (read also [Widgets and key bindings](#widgets-and-key-bindings)) | 0
`ABBR_TMPDIR` | String | Path to the directory temporary files are stored in. | `${${TMPDIR:-/tmp}%/}/zsh-abbr/` for users without privileges,<br>`${${TMPDIR:-/tmp}%/}/zsh-abbr/` for users with privileges (e.g. `su`)<br><br> If changing this, you may want to delete the default directory.<br>As of v5.7.0, custom values for this variable do not have to end in `/`.
`ABBR_USER_ABBREVIATIONS_FILE` | String | Path to the file user abbreviation are stored in (read [Storage and manual editing](#storage-and-manual-editing)) | `${XDG_CONFIG_HOME:-$HOME/.config}/zsh-abbr/user-abbreviations` <br><br> with legacy support for using `${XDG_CONFIG_HOME:-$HOME/.config}/zsh/abbreviations` instead if a file exists at that path <br><br> If changing this, you may want to delete the default file.
`NO_COLOR` | mixed | If set (to any value or no value at all) abbr will not use color in its output. Learn more at <https://no-color.org/>.

## Exported variables

In addition to exporting the configuration variables above, zsh-abbr creates the following variables:

Variable | Type | Value
---|---|---
`ABBR_GLOBAL_SESSION_ABBREVIATIONS` | associative array | The global session abbreviations
`ABBR_GLOBAL_USER_ABBREVIATIONS` | associative array | The global user abbreviations
`ABBR_PRECMD_MESSAGE` | prompt string | ⚠️ DEPRECATED ⚠️ Message printed by `precmd` hook if `ABBR_PRECMD_LOGS` is non-zero
`ABBR_REGULAR_SESSION_ABBREVIATIONS` | associative array | The regular session abbreviations
`ABBR_SOURCE_PATH` | string | Path to the `zsh-abbr.zsh`
`ABBR_REGULAR_USER_ABBREVIATIONS` | associative array | The regular user abbreviations

Each element in `ABBR_GLOBAL_SESSION_ABBREVIATIONS`, `ABBR_GLOBAL_USER_ABBREVIATIONS`, `ABBR_REGULAR_SESSION_ABBREVIATIONS`, and `ABBR_REGULAR_USER_ABBREVIATIONS` has the form `ABBREVIATION=EXPANSION`. The expansion value is quoted. Scripters will probably want to remove one level of quotes, using the [Q modifier](http://zsh.sourceforge.net/Doc/Release/Expansion.html#Modifiers) (e.g. `for v in ${(Qv)ABBR_REGULAR_USER_ABBREVIATIONS}...`).

### Transient exported variables

zsh-abbr exports the following variables in limited contexts:

Variable | Type | Value
---|---|---
`ABBR_INITIALIZING` | integer | Set to `1` when zsh-abbr is initializing, otherwise not set
`ABBR_LOADING_USER_ABBREVIATIONS` | integer | Set to `1` when the interactive shell is refreshing its list of user abbreviations, otherwise not set

## Storage and manual editing

User abbreviations live in a plain text file which you can edit directly, share, keep in version control, etc.

The path to the file is stored in the `ABBR_USER_ABBREVIATIONS_FILE` configuration variable. Read [Configuration variables](#configuration-variables) for details.

Abbreviations in this file are loaded when each new session is opened; non-`abbr` commands will be ignored and then excised from the file.

zsh-abbr automatically keeps the user abbreviations storage file alphabetized, with all global user abbreviations before the first regular user abbreviation.

Every time an `abbr` command is run, the session's updates its user abbreviations with the latest from the user abbreviations file. This should add no appreciable time, but you prefer it can be turned off by setting `ABBR_AUTOLOAD=0`.

To refresh the user abbreviations from the user abbreviation, run `abbr load` (or any other `abbr` command).

## Widgets and key bindings

By default

- <kbd>Space</kbd> expands abbreviations
- <kbd>Ctrl</kbd><kbd>Space</kbd> is a normal space
- <kbd>Enter</kbd> expands and accepts abbreviations

(In incremental search mode, <kbd>Space</kbd> is a normal space and <kbd>Ctrl</kbd><kbd>Space</kbd> expands abbreviations.)

There are three available widgets:

Widget | Behavior | Default binding
---|---|---
`abbr-expand` | If following an abbreviation, expands it | Not bound
`abbr-expand-and-accept` | If following an abbreviation, expands it; then accepts the line | <kbd>Enter</kbd> (`" "`)
`abbr-expand-and-insert` | If following an abbreviation, expands it; then adds a space | <kbd>Space</kbd> (`"^ "`); in search mode, <kbd>Ctrl Space</kbd> (`-M isearch "^ "`)
`abbr-expand-and-space` | ⚠️ DEPRECATED ⚠️ Alias for `abbr-expand-and-insert` | Not bound

zsh-abbr also binds <kbd>Ctrl Space</kbd> (`"^ "`) to `magic-space` and, in search mode, <kbd>Space</kbd> (`-M isearch " "`) to `magic-space`.

In the following example, additional bindings are added such that <kbd>Ctrl</kbd><kbd>e</kbd> expands abbreviations without adding a trailing space and <kbd>Ctrl</kbd><kbd>a</kbd> has the same behavior as <kbd>Space</kbd>.

```shell{3-4}:no-line-numbers
% cat ~/.zshrc
# -- snip --
bindkey "^E" abbr-expand
bindkey "^A" abbr-expand-and-insert
# -- snip --
```

To prevent the creation of the default bindings, set `ABBR_DEFAULT_BINDINGS` to `0` before initializing zsh-abbr. In the following example, <kbd>Ctrl</kbd><kbd>Space</kbd> expands abbreviations and <kbd>Space</kbd> is not bound to any zsh-abbr widget.

```shell{3-4}:no-line-numbers
% cat ~/.zshrc
# -- snip --
ABBR_DEFAULT_BINDINGS=0
bindkey "^ " abbr-expand-and-insert
# -- snip --
# load zsh-abbr
# -- snip --
```

### Alternative keymaps

By default, zsh-abbr is only enabled for the default keymap. To enable a widget for another keymap, run `bindkey -M`. For example, the following extends zsh-abbr's default behavior to the `viins` keymap:

```shell:no-line-numbers
bindkey -M viins " " abbr-expand-and-insert
bindkey -M viins "^ " magic-space
bindkey -M viins "^M" abbr-expand-and-accept
```

## Integrations

:::warning
These integrations are not regularly tested. It is possible that they are out of date. Pull requests are welcome to fix broken integrations. The zsh-abbr maintainer does not commit to keeping them working — if something breaks and the maintainer and the community does not have a fix, it may be removed from this documentation.
:::

### Syntax highlighting

#### fast-syntax-highlighting

To highlight user abbreviations that will expand, [fast-syntax-highlighting](https://github.com/zdharma-continuum/fast-syntax-highlighting) users can add these lines to `.zshrc` *below* where zsh-abbr and all abbreviations are loaded.

> Known limitations:
> 1. the following fast-syntax-highlighting solution only supports single-word abbreviations. 🌟 Want highlighting for multi-word abbreviations? Read [zsh-abbr#24](https://github.com/olets/zsh-abbr/issues/24).
> 1. Only and all of the abbreviations defined when the shell was started will be highlighted. fast-syntax-highlighting won't know about any abbreviation additions, erasures, or renames. To update fast-syntax-highlighting, open a new terminal, or restart the shell by running `exec zsh`.

```shell
# load zsh-abbr, then

chroma_single_word() {
  (( next_word = 2 | 8192 ))

  local __first_call="$1" __wrd="$2" __start_pos="$3" __end_pos="$4"
  local __style

  (( __first_call )) && { __style=${FAST_THEME_NAME}alias }
  [[ -n "$__style" ]] && (( __start=__start_pos-${#PREBUFFER}, __end=__end_pos-${#PREBUFFER}, __start >= 0 )) && reply+=("$__start $__end ${FAST_HIGHLIGHT_STYLES[$__style]}")

  (( this_word = next_word ))
  _start_pos=$_end_pos

  return 0
}

register_single_word_chroma() {
  local word=$1
  if [[ -x $(command -v $word) ]] || [[ -n $FAST_HIGHLIGHT["chroma-$word"] ]]; then
    return 1
  fi

  FAST_HIGHLIGHT+=( "chroma-$word" chroma_single_word )
  return 0
}

if [[ -n $FAST_HIGHLIGHT ]]; then
  for abbr in ${(f)"$(abbr list-abbreviations)"}; do
    if [[ $abbr != *' '* ]]; then
      register_single_word_chroma ${(Q)abbr}
    fi
  done
fi
```

#### zsh-syntax-highlighting

To highlight user abbreviations that will expand, [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting) users can add these lines to `.zshrc` *below* where zsh-abbr is loaded. For more info read the [zsh-syntax-highlighting regexp highlighter documentation](https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/docs/highlighters/regexp.md).

Replace `<styles for …>` with a [zsh character highlighting](http://zsh.sourceforge.net/Doc/Release/Zsh-Line-Editor.html#Character-Highlighting) string (start at "The available types of highlighting are the following."). For example `fg=blue`, `fg=blue,bg=red,bold`, etc.

> Known limitations:
> 1. The following zsh-syntax-highlighting solutions do not support unmatched parentheses within abbreviations. For example the valid `abbr '('='(x'` will make zsh-syntax-highlighting error. 🌟 Have a better solution? Please [contribute it](/contributing.html)!
> 1. Only and all of the abbreviations defined when the shell was started will be highlighted. zsh-syntax-highlighting won't know about any abbreviation additions, erasures, or renames. To update zsh-syntax-highlighting, open a new terminal, or restart the shell by running `exec zsh`.

Linux:

<!-- has line numbers because these are lines in a file -->
```shell
# load zsh-abbr, then

# make sure to replace `<styles for …>` (read above)

(( ${#ABBR_REGULAR_USER_ABBREVIATIONS} )) && {
  ZSH_HIGHLIGHT_HIGHLIGHTERS+=(regexp)
  ZSH_HIGHLIGHT_REGEXP+=('^[[:blank:][:space:]]*('${(j:|:)${(Qk)ABBR_REGULAR_USER_ABBREVIATIONS}}')$' <styles for regular abbreviations>)
  ZSH_HIGHLIGHT_REGEXP+=('\<('${(j:|:)${(Qk)ABBR_GLOBAL_USER_ABBREVIATIONS}}')$' <styles for global abbreviations>)
}
```

macOS:

<!-- has line numbers because these are lines in a file -->
```shell
# load zsh-abbr, then

# make sure to replace `<styles for …>` (read above)

(( ${#ABBR_REGULAR_USER_ABBREVIATIONS} )) && {
  ZSH_HIGHLIGHT_HIGHLIGHTERS+=(regexp)
  ZSH_HIGHLIGHT_REGEXP=('^[[:blank:][:space:]]*('${(j:|:)${(Qk)ABBR_REGULAR_USER_ABBREVIATIONS}}')$' <styles for regular abbreviations>)
  ZSH_HIGHLIGHT_REGEXP+=('[[:<:]]('${(j:|:)${(Qk)ABBR_GLOBAL_USER_ABBREVIATIONS}}')$' <styles for global abbreviations>)
}
```

After adding the snippets, all new terminals will use them. To use them in an already-open terminal, restart zsh in that terminal:

```shell:no-line-numbers
exec zsh
```

### vi mode

Switching to vi mode —with `bindkey -v` or software which calls `bindkey -v` — will wipe out the keybindings zsh-abbr's interactive behavior relies on. If you use vi mode, enable it before initializing zsh-abbr. 

```shell{4}:no-line-numbers
# .zshrc

bindkey -v
# load zsh-abbr here
```

### macOS System Text Substitutions

Add the following snippet to your `.zshrc` file to create abbreviation for all macOS text substitutions.

```shell:no-line-numbers
for substitution in ${(f)"$(defaults read ~/Library/Preferences/.GlobalPreferences.plist NSUserDictionaryReplacementItems | plutil -convert json -o - - | jq -r 'to_entries[] | "\(.value.replace)=\(.value.with)"')"}; do
  abbr add [options] "$substitution"
done
```
