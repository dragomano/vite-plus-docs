import { resolve } from 'node:path';

import type { VoidZeroThemeConfig } from '@voidzero-dev/vitepress-theme';
import { extendConfig } from '@voidzero-dev/vitepress-theme/config';
import { defineConfig, type HeadConfig } from 'vitepress';
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons';
import { withMermaid } from 'vitepress-plugin-mermaid';

const taskRunnerGuideItems = [
  {
    text: 'vp run',
    link: '/guide/run',
  },
  {
    text: 'Кэширование задач',
    link: '/guide/cache',
    items: [
      { text: 'Автоматическое отслеживание данных', link: '/guide/automatic-data-tracking' },
      { text: 'Кэш GitHub Actions', link: '/guide/github-actions-cache' },
    ],
  },
  {
    text: 'Запуск бинарных файлов',
    link: '/guide/vpx',
  },
];

const guideSidebar = [
  {
    text: 'Введение',
    items: [
      { text: 'Первые шаги', link: '/guide/' },
      { text: 'Создание проекта', link: '/guide/create' },
      { text: 'Переход на Vite+', link: '/guide/migrate' },
      { text: 'Установка зависимостей', link: '/guide/install' },
      { text: 'Окружение', link: '/guide/env' },
      { text: 'Почему Vite+', link: '/guide/why' },
    ],
  },
  {
    text: 'Разработка',
    items: [
      { text: 'vp dev', link: '/guide/dev' },
      {
        text: 'vp check',
        link: '/guide/check',
        items: [
          { text: 'vp lint', link: '/guide/lint' },
          { text: 'vp fmt', link: '/guide/fmt' },
        ],
      },
      { text: 'vp test', link: '/guide/test' },
    ],
  },
  {
    text: 'Выполнение',
    items: taskRunnerGuideItems,
  },
  {
    text: 'Сборка',
    items: [
      { text: 'vp build', link: '/guide/build' },
      { text: 'vp pack', link: '/guide/pack' },
    ],
  },
  {
    text: 'Обслуживание',
    items: [
      { text: 'Обновление Vite+', link: '/guide/upgrade' },
      { text: 'Удаление Vite+', link: '/guide/implode' },
    ],
  },
  {
    text: 'Рабочий процесс',
    items: [
      { text: 'Интеграция с IDE', link: '/guide/ide-integration' },
      { text: 'Непрерывная интеграция', link: '/guide/ci' },
      { text: 'Docker', link: '/guide/docker' },
      { text: 'Хуки коммитов', link: '/guide/commit-hooks' },
      { text: 'Монорепозиторий', link: '/guide/monorepo' },
      { text: 'Решение проблем', link: '/guide/troubleshooting' },
    ],
  },
];

export default extendConfig(
  withMermaid(
    defineConfig({
      title: 'Vite+',
      titleTemplate: ':title | Единый набор инструментов для веба',
      description: 'Единый набор инструментов для веба',
      cleanUrls: true,
      head: [
        ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
        [
          'link',
          {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossorigin: 'true',
          },
        ],
        ['meta', { name: 'theme-color', content: '#7474FB' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:site_name', content: 'Vite+' }],
        ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
        ['meta', { name: 'twitter:site', content: '@voidzerodev' }],
      ],
      vite: {
        build: {
          chunkSizeWarningLimit: 1200,
          rollupOptions: {
            output: {
              manualChunks(id) {
                const p = id.replace(/\\/g, '/')

                if (
                  /\/node_modules\/(@vue\/|vue\/)/.test(p) ||
                  /\/node_modules\/vitepress\//.test(p) ||
                  p.includes('.vitepress/theme')
                ) {
                  return 'app'
                }
              }
            },
            onwarn(warning, warn) {
              if (warning.code === 'INVALID_ANNOTATION') {
                return
              }

              warn(warning)
            },
          },
        },
        optimizeDeps: {
          include: ['mermaid > @braintree/sanitize-url'],
        },
        resolve: {
          alias: [
            { find: '@local-assets', replacement: resolve(__dirname, 'theme/assets') },
            { find: '@layouts', replacement: resolve(__dirname, 'theme/layouts') },
            // dayjs ships CJS by default; redirect to its ESM build so
            // mermaid (imported via vitepress-plugin-mermaid) works in dev
            { find: /^dayjs$/, replacement: 'dayjs/esm' },
          ],
        },
        plugins: [
          groupIconVitePlugin({
            customIcon: {
              tsdown: 'https://tsdown.ru/tsdown.svg',
            },
          }),
        ],
      },
      themeConfig: {
        variant: 'viteplus' as VoidZeroThemeConfig['variant'],
        nav: [
          {
            text: 'Руководство',
            link: '/guide/',
            activeMatch: '^/guide/',
          },
          {
            text: 'Настройка',
            link: '/config/',
            activeMatch: '^/config/',
          },
          {
            text: 'Ресурсы',
            items: [
              { text: 'Команда', link: '/team' },
              { text: 'GitHub', link: 'https://github.com/voidzero-dev/vite-plus' },
              { text: 'Релизы', link: 'https://github.com/voidzero-dev/vite-plus/releases' },
              {
                text: 'Объявления',
                link: 'https://voidzero.dev/posts/announcing-vite-plus-beta',
              },
              {
                text: 'Участие в разработке',
                link: 'https://github.com/voidzero-dev/vite-plus/blob/main/CONTRIBUTING.md',
              },
            ],
          },
        ],
        sidebar: {
          '/guide/': guideSidebar,
          '/config/': [
            {
              text: 'Конфигурация',
              items: [
                { text: 'Конфигурация Vite+', link: '/config/' },
                { text: 'Create', link: '/config/create' },
                { text: 'Run', link: '/config/run' },
                { text: 'Format', link: '/config/fmt' },
                { text: 'Lint', link: '/config/lint' },
                { text: 'Check', link: '/config/check' },
                { text: 'Test', link: '/config/test' },
                { text: 'Build', link: '/config/build' },
                { text: 'Pack', link: '/config/pack' },
                { text: 'Staged', link: '/config/staged' },
              ],
            },
          ],
        },
        socialLinks: [
          { icon: 'github', link: 'https://github.com/voidzero-dev/vite-plus' },
          { icon: 'x', link: 'https://x.com/voidzerodev' },
          { icon: 'discord', link: 'https://discord.gg/cC6TEVFKSx' },
          { icon: 'bluesky', link: 'https://bsky.app/profile/voidzero.dev' },
        ],
        outline: {
          level: [2, 3],
        },
        search: {
          provider: 'local',
          options: {
            miniSearch: {
              searchOptions: {
                boostDocument(page) {
                  if (page.startsWith('/guide/')) return 2 // Prefer guide pages
                  if (page.startsWith('/config/')) return 1.5 // Then config pages
                  return 1
                },
              },
            },
            translations: {
              button: {
                buttonText: 'Поиск',
                buttonAriaLabel: 'Поиск'
              },
              modal: {
                displayDetails: 'Отобразить подробный список',
                resetButtonTitle: 'Сбросить поиск',
                backButtonTitle: 'Закрыть поиск',
                noResultsText: 'Нет результатов для',
                footer: {
                  selectText: 'выбрать',
                  navigateText: 'перейти',
                  closeText: 'закрыть'
                }
              }
            }
          },
        },

        editLink: {
          pattern: 'https://github.com/dragomano/vite-plus-docs/edit/main/:path',
          text: 'Предложить изменения',
        },

        outlineTitle: 'Содержание',
        docFooter: {
          prev: 'Предыдущая страница',
          next: 'Следующая страница'
        },
        lastUpdatedText: 'Обновлено',
        darkModeSwitchLabel: 'Оформление',
        lightModeSwitchTitle: 'Переключить на светлую тему',
        darkModeSwitchTitle: 'Переключить на тёмную тему',
        sidebarMenuLabel: 'Меню',
        returnToTopLabel: 'Вернуться к началу',
        langMenuLabel: 'Изменить язык',
        notFound: {
          title: 'СТРАНИЦА НЕ НАЙДЕНА',
          quote: 'Но если не менять направление и продолжать искать, то можно оказаться там, где надо.',
          linkLabel: 'перейти на главную',
          linkText: 'Вернуться на главную'
        },

        footer: {
          copyright: `© ${new Date().getFullYear()} VoidZero Inc. и контрибьюторы Vite+.`,
          nav: [
            {
              title: 'Экосистема',
              items: [
                { text: 'VoidZero', link: 'https://voidzero.dev' },
                { text: 'Vite', link: 'https://vite-docs.ru' },
                { text: 'Vitest', link: 'https://vitest.dev' },
                { text: 'Rolldown', link: 'https://rolldown.rs' },
                { text: 'Oxc', link: 'https://oxc.rs' },
              ],
            },
          ],
          social: [
            { icon: 'github', link: 'https://github.com/voidzero-dev/vite-plus' },
            { icon: 'x', link: 'https://x.com/voidzerodev' },
            { icon: 'discord', link: 'https://discord.gg/cC6TEVFKSx' },
            { icon: 'bluesky', link: 'https://bsky.app/profile/voidzero.dev' },
          ],
        },
      },
      transformHead({ page, pageData }) {
        const url = 'https://plus.vite-docs.ru/' + page.replace(/\.md$/, '').replace(/index$/, '');

        const canonicalUrlEntry: HeadConfig = [
          'link',
          {
            rel: 'canonical',
            href: url,
          },
        ];

        const ogInfo: HeadConfig[] = [
          ['meta', { property: 'og:title', content: pageData.frontmatter.title ?? 'Vite+' }],
          [
            'meta',
            {
              property: 'og:image',
              content: `https://plus.vite-docs.ru/${pageData.frontmatter.cover ?? 'og.jpg'}`,
            },
          ],
          ['meta', { property: 'og:url', content: url }],
          [
            'meta',
            {
              property: 'og:description',
              content: pageData.frontmatter.description ?? 'Единый набор инструментов для веба',
            },
          ],
        ];

        return [...ogInfo, canonicalUrlEntry];
      },
      markdown: {
        config(md) {
          md.use(groupIconMdPlugin);
        },
        container: {
          dangerLabel: 'ОПАСНОСТЬ',
          detailsLabel: 'ПОДРОБНОСТИ',
          importantLabel: 'ВАЖНО',
          infoLabel: 'ИНФОРМАЦИЯ',
          tipLabel: 'СОВЕТ',
          warningLabel: 'ПРЕДУПРЕЖДЕНИЕ',
        },
      },
    }),
  ),
);
