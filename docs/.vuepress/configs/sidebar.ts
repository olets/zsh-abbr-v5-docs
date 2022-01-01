import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebar: SidebarConfig = [
  {
    text: 'Guide',
    link: '/',
    children: [
      {
        link: '/README.md',
        text: 'Introduction',
      },
      {
        link: '/installation',
        text: 'Installation',
      },
      {
        link: '/usage.md',
        text: 'Usage',
        children: [
          {
            link: '/usage.md#scopes',
            text: 'Scopes',
          },
          {
            link: '/usage.md#types',
            text: 'Types',
          },
          {
            link: '/usage.md#commands',
            text: 'Commands',
          },
        ]
      },
      {
        link: '/advanced.md',
        text: 'Advanced',
      },
      {
        link: '/performance.md',
        text: 'Performance',
      },
      {
        link: '/uninstalling.md',
        text: 'Uninstalling',
      },
      {
        link: '/changelog.md',
        text: 'Changelog',
      },
      {
        link: '/roadmap.md',
        text: 'Roadmap',
      },
      {
        link: '/contributing.md',
        text: 'Contributing',
      },
      {
        link: '/license.md',
        text: 'License',
      },
    ],
  },
]