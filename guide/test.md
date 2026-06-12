# Команда `vp test` {#test}

`vp test` запускает тесты с помощью [Vitest](https://vitest.dev).

## Обзор {#overview}

`vp test` основан на [Vitest](https://vitest.dev/), поэтому вы получаете тестовый раннер, созданный специально для экосистемы Vite, который повторно использует вашу конфигурацию и плагины Vite, поддерживает ожидания в стиле Jest, снапшоты и отчёты о покрытии, а также корректно работает с современными проектами на ESM, TypeScript и JSX.

## Использование {#usage}

```bash
vp test
vp test watch
vp test run --coverage
```

::: info
В отличие от Vitest в его стандартном виде, `vp test` по умолчанию не остаётся в режиме наблюдения. Используйте `vp test`, когда нужен обычный запуск тестов, и `vp test watch`, когда хотите перейти в режим наблюдения.
:::

## Конфигурация {#configuration}

Размещайте настройки тестирования непосредственно в блоке `test` файла `vite.config.ts`, чтобы вся конфигурация находилась в одном месте. Мы не рекомендуем использовать `vitest.config.ts` вместе с Vite+.

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
  },
});
```

Полное описание параметров конфигурации Vitest доступно в [документации по конфигурации Vitest](https://vitest.dev/config/).
