# Конфигурация Vite+ {#configuring-vite}

Vite+ хранит конфигурацию проекта в одном месте — в файле `vite.config.ts`, позволяя объединить множество отдельных конфигурационных файлов верхнего уровня в один. Вы можете продолжать использовать настройки Vite, такие как `server` или `build`, и добавлять блоки Vite+ для остальных частей вашего рабочего процесса:

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  server: {},
  build: {},
  preview: {},
  create: {},
  run: {},
  fmt: {},
  lint: {},
  check: {},
  test: {},
  pack: {},
  staged: {},
});
```

## Конфигурация, специфичная для Vite+ {#vite-specific-configuration}

Vite+ расширяет базовую конфигурацию Vite следующими дополнениями:

- [`create`](/config/create) — настройки по умолчанию для создания проектов и шаблонов
- [`run`](/config/run) — для Vite Task
- [`fmt`](/config/fmt) — для Oxfmt
- [`lint`](/config/lint) — для Oxlint
- [`check`](/config/check) — настройки по умолчанию для `vp check`
- [`test`](/config/test) — для Vitest
- [`pack`](/config/pack) — для tsdown
- [`staged`](/config/staged) — для проверок индексированных файлов
