# Конфигурация Format {#format-config}

Команды `vp fmt` и `vp check` читают настройки Oxfmt из блока `fmt` в файле `vite.config.ts`. Подробности см. в разделе [Конфигурация Oxfmt](https://oxc.rs/docs/guide/usage/formatter/config.html).

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

Для настройки форматирования отдельных пакетов в рабочем пространстве используйте [`fmt.overrides`](/guide/monorepo#format-overrides) из корневого файла `vite.config.ts`.
