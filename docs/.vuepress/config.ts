import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import { navbar } from './configs/navbar'
import { sidebar } from './configs/sidebar'

export default defineUserConfig<DefaultThemeOptions>({
  // site config
  // https://v2.vuepress.vuejs.org/guide/configuration.html#site-config
  lang: 'en-US',
  title: 'zsh-abbr Documentation',
  description: 'Documentation for zsh-abbr',

  // theme and its config
  theme: '@vuepress/theme-default',
  // https://v2.vuepress.vuejs.org/reference/default-theme/config.html
  themeConfig: {
    logo: '/images/zsh-abbr.png',
    repo: 'olets/zsh-abbr',
    docsDir: 'docs',
    docsRepo: 'olets/zsh-abbr-docs',
    navbar: navbar,
    sidebar: sidebar,
    sidebarDepth: 1,
  },

  // plugins
  plugins: [
    // https://v2.vuepress.vuejs.org/reference/plugin/shiki.html
    [
      '@vuepress/plugin-shiki',
      {
        // only github-dark and slack-dark pass color accessibility
        theme: 'github-dark',
      },
    ],
  ]
})
