---
prev:
  text: Advanced
  link: /advanced/
next:
  text: Uninstalling
  link: /uninstalling/
---

# Performance

zsh-abbr will not affect time between prompts. The following is the impact of zsh-abbr on time to start a new session, profiled with `zprof` and `zinit light olets/zsh-abbr`.

Machine | Initialization overhead | Time per user abbreviation
---|---|---
macOS 10.15 on early-2015 MacBook Pro (2.9 GHz Intel Core i5, 16 GB), zsh 5.8, zinit 3.1, iTerm2 3.3.12 | Approx. 120ms | Approx. 1ms
macOS 11.2.1 on 2020 MacBook Pro (M1, 16 GB), zsh 5.8, zinit 3.7, iTerm 3.4.4 | Approx. 40ms | Under 1ms
