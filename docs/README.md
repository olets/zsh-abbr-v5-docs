# Introduction ![GitHub release (latest by date)](https://img.shields.io/github/v/release/olets/zsh-abbr?include_prereleases&label=pre-release)

:::danger
These docs are for the not-yet-released v5.  
For v4 docs see <https://github.com/olets/zsh-abbr>
:::

![](/images/zsh-abbr.png)

**abbr** is the zsh manager for **auto-expanding abbreviations** - text that when written in a terminal is replaced with other (typically longer) text. Inspired by fish shell.

For example, abbreviate `git checkout` as `co` (or even `c` or anything else). Type `co`<kbd>Space</kbd> and the `co` **turns into** `git checkout`. Abbreviate `git checkout main` as `cm`. Type `cm`<kbd>Enter</kbd> and the `cm` **turns into and runs** `git checkout main`. Don't want an abbreviation to expand? Use <kbd>Ctrl</kbd><kbd>Space</kbd> instead of <kbd>Space</kbd>, and `;`<kbd>Enter</kbd> instead of <kbd>Enter</kbd>.

Why? Like aliases, abbreviations **save keystrokes**. Unlike aliases, abbreviations can leave you with a **transparently understandable command history** ready for using on a different computer or sharing with a colleague. And where aliases can let you forget the full command, abbreviations may **help you learn** the full command even as you type the shortened version.

Like **zsh's `alias`**, zsh-abbr supports **"regular"** (i.e. command-position) and **"global"** (anywhere on the line) abbreviations. Like **fish's `abbr`**, zsh-abbr supports **interactive creation** of persistent abbreviations which are immediately available in all terminal sessions. Abbreviations automatically **sync to a file**, ready for your dotfile management.

Run `abbr help` for documentation; if the package is installed with Homebrew, `man abbr` is also available.

## As a replacement for aliases

Find you **prefer abbreviations to aliases**? zsh-abbr makes it easy to create abbreviations from your aliases. The aliases are left **untouched** so you can still use them when you want to… or delete them!

zsh-abbr has support for importing both [**zsh** aliases](https://zsh.sourceforge.io/Intro/intro_8.html) and [**Git** aliases](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases). See

- [Usage&nbsp;>&nbsp;Commands&nbsp;>&nbsp;`import-aliases`](/usage.html#import-aliases)
- [Usage&nbsp;>&nbsp;Commands&nbsp;>&nbsp;`import-git-aliases`](/usage.html#import-git-aliases).
