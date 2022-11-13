---
next:
  text: Scope
  link: /reference/scope
---

# Reference

:::danger
These docs are for the not-yet-released v5.  
For v4 docs see <https://github.com/olets/zsh-abbr>
:::

Most zsh-abbr commands are structured like this:

```shell
abbr [<SCOPE>] [<TYPE>] <COMMAND> [<ARGS>]
```

**Scope** is whether an abbreviation is available in only the session it's created in (i.e. the current terminal) —these are called _session abbreviations_— or to all terminals —these are called _user abbreviations_.

**Type** is where on the command line the abbreviation can expand. _Regular abbreviations_ expand only at the start of the command line, and _global abbreviations_ expand anywhere in the command line.

zsh-abbr has **commands** to add, rename, and erase abbreviations; to add abbreviations for every alias or Git alias; to list the available abbreviations with or without their expansions; and to create aliases from abbreviations.
