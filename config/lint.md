# Конфигурация Lint {#lint-config}

`vp lint` и `vp check` используют блок `lint` из корневой конфигурации workspace, в том числе при запуске из каталога пакета. Конфигурации пакетов не заменяют эти настройки `lint`. Используйте `vp lint -c <path>` или `vp lint --config <path>`, чтобы выбрать другую конфигурацию. Если в корневой конфигурации нет блока `lint`, Oxlint использует [встроенный механизм поиска конфигурации](/guide/lint#configuration). Подробнее см. [конфигурацию Oxlint](https://oxc.rs/docs/guide/usage/linter/config.html).

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
