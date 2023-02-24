---
next:
  text: Contributing
  link: /contributing.html
---

# Performance

zsh-abbr adds roughly 13ms + 1.65ms/abbreviation to first prompt lag, 20ms + 1.65ms/abbreviation to first command lag, and 13ms + 1.65ms/abbreviation to exit time.

Explanations of the measures are at <https://github.com/romkatv/zsh-bench#what-it-measures>.

Raw single-run data is available at <https://oletsdev.notion.site/oletsdev/zsh-abbr-f2f3a1de08f14c8f8686ece171175400>.

The performance suite uses [zsh-bench](https://github.com/romkatv/zsh-bench). Run the performance suite with

```shell
zsh-bench --isolation docker --config-dir ./perf -- not-installed fresh-install zero-abbreviations ten-abbreviations one-hundred-abbreviations
```
