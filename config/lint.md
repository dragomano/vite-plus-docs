# Конфигурация Lint {#lint-config}

`vp lint` использует [встроенный механизм поиска конфигурации](/guide/lint#configuration) Oxlint, начиная с рабочего каталога. Используйте `vp lint -c <path>` или `vp lint --config <path>`, чтобы выбрать другую конфигурацию. Подробнее см. [конфигурацию Oxlint](https://oxc.rs/docs/guide/usage/linter/config.html).

`vp check` использует блок `lint` из корневой конфигурации workspace, если он существует, в том числе при запуске из каталога пакета. Конфигурации пакетов не заменяют эти настройки `lint` в `vp check`.

## Пример {#example}

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  lint: {
    ignorePatterns: ['dist/**'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    rules: {
      'no-console': ['error', { allow: ['error'] }],
    },
  },
});
```

Мы рекомендуем включать как `options.typeAware`, так и `options.typeCheck`, чтобы команды `vp lint` и `vp check` могли использовать анализ с учётом информации о типах в полном объёме.

Для правил линтинга, специфичных для файлов или пакетов, используйте [`lint.overrides`](/guide/monorepo#root-config-with-overrides) в корневом `vite.config.ts`.

В режиме Vite+ Oxlint отключает вложенные конфигурации, поэтому вложенные конфигурации lint не переопределяют настройки для отдельных файлов. Подробнее см. в разделе [Решение проблем](/guide/troubleshooting#nested-lint-or-format-config-is-not-applied).
