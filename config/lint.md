# Конфигурация Lint {#lint-config}

Команды `vp lint` и `vp check` считывают настройки Oxfmt из блока `lint` в корневом `vite.config.ts`. Подробнее см. в разделе [Конфигурация Oxfmt](https://oxc.rs/docs/guide/usage/linter/config.html).

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

В настоящее время Vite+ не поддерживает вложенную конфигурацию линтинга. Подробнее см. в разделе [Решение проблем](/guide/troubleshooting#nested-lint-or-format-config-is-not-applied), где также описано, как оставить отзыв о будущей поддержке этой возможности.
