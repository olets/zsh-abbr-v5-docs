# Type

:::danger
These docs are for the not-yet-released v5.  
For v4 docs see <https://github.com/olets/zsh-abbr>
:::

By default, abbreviations only **expand at the start of the command line**. These are called **"regular"** abbreviations. You can also create **"global" abbreviations which expand everywhere**:

```shell{1-2,5}:no-line-numbers
% abbr hw="echo hello world"
Added the regular user abbreviation `hw`
% echo foo && hw[Enter]
foo
zsh: command not found: hw
%
```

```shell{1-2,5}:no-line-numbers
% abbr --global hw="echo hello world"
Added the global user abbreviation `hw`
% echo foo && hw[Enter]
foo
hello world
%
```

`--global` could be shorter. `-g` works too!


```shell{1-2}:no-line-numbers
% abbr -g hw="echo hello world"
Added the global user abbreviation `hw`
```
