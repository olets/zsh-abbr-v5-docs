# zsh-abbr ![GitHub release (latest by date)](https://img.shields.io/github/v/release/olets/zsh-abbr)

:::danger Heads Up
v6 is coming, with breaking changes. If you do advanced configuration, read [the v5.x -> v6.x migration guide](https://v6.zsh-abbr.olets.dev/migrating-between-versions.html#upgrading-from-v5-to-v6) and/or read about [pinning v5.x](./installation.md).
:::

![splash card: the text '% abbr' as green neon lettering](/images/zsh-abbr.png)

**zsh-abbr** is the zsh manager for **auto-expanding abbreviations** - text that when written in a terminal is replaced with other (typically longer) text. Inspired by fish shell.

:::tip
Do you use zsh-abbr and zsh-autosuggestions? Check out [zsh-autosuggestions-abbreviations-strategy](https://github.com/olets/zsh-autosuggestions-abbreviations-strategy). It teaches zsh-autosuggestions to suggest your zsh-abbr abbreviations.
:::

For example, abbreviate `git checkout` as `co` (or even `c` or anything else). Type `co`<kbd>Space</kbd> and the `co` **turns into** `git checkout`. Abbreviate `git checkout main` as `cm`. Type `cm`<kbd>Enter</kbd> and the `cm` **turns into and runs** `git checkout main`. Don't want an abbreviation to expand? Use <kbd>Ctrl</kbd><kbd>Space</kbd> instead of <kbd>Space</kbd>, and `;`<kbd>Enter</kbd> instead of <kbd>Enter</kbd>.

Why? Like aliases, abbreviations **save keystrokes**. Unlike aliases, abbreviations can leave you with a **transparently understandable command history** ready for using on a different computer or sharing with a colleague. And where aliases can let you forget the full command, abbreviations may **help you learn** the full command even as you type the shortened version.

Like **zsh's `alias`**, zsh-abbr supports **"regular"** (i.e. command-position) and **"global"** (anywhere on the line) abbreviations. zsh-abbr also supports **interactive creation** of persistent abbreviations which are immediately available in all terminal sessions. Abbreviations automatically **sync to a file**, ready for your dotfile management.

Run `abbr help` for documentation; if the package is installed with Homebrew, `man abbr` is also available.
