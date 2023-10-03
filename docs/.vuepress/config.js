import * as dotenv from 'dotenv';
import { defaultTheme } from 'vuepress';
import { docsearchPlugin } from '@vuepress/plugin-docsearch';
import { shikiPlugin } from '@vuepress/plugin-shiki';
import { tocPlugin } from '@vuepress/plugin-toc';

export default {
  // https://v2.vuepress.vuejs.org/reference/config.html#head
  head: [
    // favicon generated by https://realfavicongenerator.net/
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
    ],
    [
      "link",
      {
        rel: "manifest",
        href: "/site.webmanifest",
      },
    ],
    [
      "link",
      {
        rel: "mask-icon",
        href: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
    [
      "meta",
      {
        name: "msapplication-TileColor",
        content: "#fefefe",
      },
    ],
    [
      "meta",
      {
        name: "theme-color",
        content: "#ffffff",
      },
    ],

    // social metas
    [
      "meta",
      { property: "og:title", content: "zsh-abbr" },
    ],
    [
      "meta",
      {
        property: "og:description",
        content: "The zsh manager for auto-expanding abbreviations, inspired by fish shell.",
      },
    ],
    [
      "meta",
      {
        property: "og:url",
        content: "https://zsh-abbr.netlify.com/",
      },
    ],
    ["meta", { property: "og:site_name", content: "zsh-abbr" }],
    ["meta", { property: "og:type", content: "website" }],
    [
      "meta",
      {
        property: "og:image",
        content: "https://zsh-abbr.netlify.com/images/zsh-abbr.png",
      },
    ],
    ["meta", { property: "og:image:width", content: "1200" }],
    ["meta", { property: "og:image:height", content: "630" }],
    ["meta", { name: "twitter:title", content: "zsh-abbr" }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    [
      "meta",
      {
        name: "twitter:description",
        content: "The zsh manager for auto-expanding abbreviations, inspired by fish shell.",
      },
    ],
    [
      "meta",
      {
        name: "twitter:image",
        content: "https://v4.zsh-abbr.olets.dev/images/zsh-abbr.png",
      },
    ],

    // Fathom analytics
    [
      "script",
      {
        src: "https://cdn.usefathom.com/script.js",
        'data-site': "VZXVXKRZ",
        'defer': true,
      }
    ],

    // Font
    [
      "link", {
        "rel": "preconnect",
        "href": "https://fonts.googleapis.com"
      },
    ],
    [
      "link", {
        "rel": "preconnect",
        "href": "https://fonts.gstatic.com",
        "crossorigin": "true",
      },
    ],
    [
      "link", {
        "href": "https://fonts.googleapis.com/css2?family=Fira+Code&display=swap",
        "rel": "stylesheet",
      },
    ],
  ],

  // site config
  // https://v2.vuepress.vuejs.org/guide/configuration.html#site-config
  lang: "en-US",
  title: "zsh-abbr v4",
  description: "The zsh manager for auto-expanding abbreviations, inspired by fish shell.",

  markdown: {
    links: {
      externalAttrs: {
        class: "external-link",
        rel: "",
        target: "",
      }
    }
  },

  // theme and its config
  theme: defaultTheme({
    contributors: false,
    lastUpdated: false,
    docsDir: "docs",
    docsRepo: "olets/zsh-abbr-v4-docs",
    navbar: [
      {
        text: "v4.x",
        children: [
          {
            text: "v5.x",
            "link": "https://zsh-abbr.olets.dev",
            target: "_self",
          },
        ]
      },
      {
        text: "Changelog",
        link: "https://github.com/olets/zsh-abbr/blob/main/CHANGELOG.md",
        target: "_self",
      },
      {
        text: "License",
        link: "https://github.com/olets/zsh-abbr/blob/v4/LICENSE",
        target: "_self",
      },
      // Manual instead of with defaultTheme's `repo` so that we can specify the `target`
      {
        text: "GitHub",
        link: "https://github.com/olets/zsh-abbr/tree/v4",
        target: "_self",
      },
    ],
    sidebar: [
      {
        text: "Introduction",
        link: "/",
      },
      "/installation.md",
      {
        text: "Reference",
        link: "/reference.md",
        children: [
          "/scopes.md",
          "/types.md",
          "/commands.md",
          "/advanced.md",
          "/performance.md",
        ],
      },
      "/contributing.md",
      "/license.md",
      "/uninstalling.md",
    ],
    sidebarDepth: 3,
    themePlugins: {
      externalLinkIcon: false,
    },
  }),

  // plugins
  plugins: [
    // https://v2.vuepress.vuejs.org/reference/plugin/docsearch.html
    docsearchPlugin({
      apiKey: process.env.SEARCH_KEY,
      appId: process.env.APPLICATION_ID,
      indexName: process.env.INDEX_NAME,
    }),
    // https://v2.vuepress.vuejs.org/reference/plugin/shiki.html
    shikiPlugin({
      // only github-dark and slack-dark pass color accessibility
      theme: "github-dark",
    }),
    // https://v2.vuepress.vuejs.org/reference/plugin/toc.html
    tocPlugin(),
  ],
};
