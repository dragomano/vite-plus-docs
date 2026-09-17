# Конфигурация Format {#format-config}

Команды `vp fmt` и `vp check` считывают настройки Oxfmt из блока `fmt` в корневом `vite.config.ts`. Подробнее см. в разделе [Конфигурация Oxfmt](https://oxc.rs/docs/guide/usage/formatter/config.html).

## Пример {#example}

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  fmt: {
    ignorePatterns: ['dist/**'],
    singleQuote: true,
    semi: true,
    sortPackageJson: true,
  },
});
```

Для настроек форматирования, специфичных для файлов или пакетов, используйте [`fmt.overrides`](/guide/monorepo#format-overrides) в корневом `vite.config.ts`.

В настоящее время Vite+ не поддерживает вложенную конфигурацию форматирования. Подробнее см. в разделе [Решение проблем](/guide/troubleshooting#nested-lint-or-format-config-is-not-applied), где также описано, как оставить отзыв о будущей поддержке этой возможности.
