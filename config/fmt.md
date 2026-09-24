# Конфигурация Format {#format-config}

`vp fmt` и `vp check` используют блок `fmt` из корневой конфигурации workspace, в том числе при запуске из каталога пакета. Конфигурации пакетов не заменяют эти настройки форматирования. Используйте `vp fmt -c <path>` или `vp fmt --config <path>`, чтобы выбрать другую конфигурацию. Если в корневой конфигурации нет блока `fmt`, Oxfmt использует [встроенный механизм поиска конфигурации](/guide/fmt#configuration). Подробнее см. [конфигурацию Oxfmt](https://oxc.rs/docs/guide/usage/formatter/config.html).

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

В режиме Vite+ Oxfmt отключает вложенные конфигурации, поэтому вложенные конфигурации форматирования не переопределяют настройки для отдельных файлов. Подробнее см. в разделе [Решение проблем](/guide/troubleshooting#nested-lint-or-format-config-is-not-applied).
