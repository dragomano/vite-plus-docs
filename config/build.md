# Конфигурация Build {#build-config}

Команды `vp dev`, `vp build` и `vp preview` используют стандартную [конфигурацию Vite](https://vite-docs.ru/config/), включая [плагины](https://vite-docs.ru/guide/using-plugins), [алиасы](https://vite-docs.ru/config/shared-options#resolve-alias), а также разделы [`server`](https://vite-docs.ru/config/server-options), [`build`](https://vite-docs.ru/config/build-options) и [`preview`](https://vite-docs.ru/config/preview-options).

## Пример {#example}

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    sourcemap: true,
  },
  preview: {
    port: 4173,
  },
});
```
