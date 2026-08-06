# Конфигурация Staged {#staged-config}

Команда `vp staged` считывает правила для индексируемых файлов из блока `staged` в `vite.config.ts`. См. руководство по [хукам коммитов](/guide/commit-hooks).

## Пример {#example}

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  staged: {
    '*.{js,ts,tsx,vue,svelte}': 'vp check --fix',
  },
});
```
