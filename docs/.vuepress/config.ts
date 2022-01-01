import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  // site config
  lang: 'en-US',
  title: 'zsh-abbr',
  description: 'zsh-abbr docs',

  // theme and its config
  theme: '@vuepress/theme-default',
  themeConfig: {
    repo: 'olets/zsh-abbr',
    docsDir: 'docs',
    docsRepo: 'olets/zsh-abbr-docs',
  },
})
