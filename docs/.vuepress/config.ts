import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import { navbar } from './configs/navbar'
import { sidebar } from './configs/sidebar'

export default defineUserConfig<DefaultThemeOptions>({
  // site config
  lang: 'en-US',
  title: 'zsh-abbr Documentation',
  description: 'Documentation for zsh-abbr',

  // theme and its config
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: '/images/zsh-abbr.png',
    repo: 'olets/zsh-abbr',
    docsDir: 'docs',
    docsRepo: 'olets/zsh-abbr-docs',
    navbar: navbar,
    sidebar: sidebar,
  },
  plugins: [
    [
      '@vuepress/plugin-shiki',
      {
        theme: 'nord',
      },
    ],
  ]
})
