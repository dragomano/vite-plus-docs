# Конфигурация Staged {#staged-config}

Команды `vp staged` и `vp config` читают правила для индексированных файлов из блока `staged` в файле `vite.config.ts`. Подробнее см. в руководстве [Хуки коммитов](/guide/commit-hooks).

## Пример {#example}

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  staged: {
    '*.{js,ts,tsx,vue,svelte}': 'vp check --fix',
  },
});
```
