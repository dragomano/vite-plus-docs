# Конфигурация Pack {#pack-config}

Команда `vp pack` читает настройки tsdown из блока `pack` в файле `vite.config.ts`. Подробности см. в разделе [Конфигурация tsdown](https://tsdown.ru/options/config-file).

## Пример {#example}

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  pack: {
    dts: true,
    format: ['esm', 'cjs'],
    sourcemap: true,
  },
});
```
