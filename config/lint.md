# Конфигурация Lint {#lint-config}

Команды `vp lint` и `vp check` читают настройки Oxlint из блока `lint` в файле `vite.config.ts`. Подробности см. в разделе [Конфигурация Oxlint](https://oxc.rs/docs/guide/usage/linter/config.html).

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

Для настройки правил линтинга отдельных пакетов в рабочем пространстве используйте [`lint.overrides`](/guide/monorepo#root-config-with-overrides) из корневого файла `vite.config.ts`.
