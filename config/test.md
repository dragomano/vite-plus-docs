# Конфигурация Test {#test-config}

Команда `vp test` читает настройки Vitest из блока `test` в файле `vite.config.ts`. Подробности см. в разделе [Конфигурация Vitest](https://vitest.dev/config/).

## Пример {#example}

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    coverage: {
      reporter: ['text', 'html'],
    },
  },
});
```
