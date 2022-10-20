---
prev:
  text: Quick Start
  link: /usage/
next:
  text: Type
  link: /usage/type/
---

# Scope

:::danger
These docs are for the not-yet-released v5.  
For v4 docs see <https://github.com/olets/zsh-abbr>
:::

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

```shell{1-3}:no-line-numbers
# terminal 1
% abbr --session hw="echo hello world"
Added the regular session abbreviation `hw`
% hw[Enter] # expands to `echo hello world` and runs the command
hello world
%
```

```shell{1-3}:no-line-numbers
# terminal 2
% hw[Enter] # abbreviation is scoped to terminal 1
zsh: command not found: hw
%
```

`--session` could be shorter. `-S` works too!

```shell{1-2}:no-line-numbers
% abbr -S hw="echo hello world"
Added the regular session abbreviation `hw`
%
```
