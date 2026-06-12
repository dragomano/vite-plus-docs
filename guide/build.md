# Команда `vp build` {#build}

`vp build` собирает приложения Vite для продакшена.

## Обзор {#overview}

`vp build` запускает стандартную продакшен-сборку Vite через Vite+. Поскольку команда напрямую основана на Vite, конвейер сборки и модель конфигурации остаются такими же, как в Vite. Подробнее о том, как работают продакшен-сборки Vite, см. в [руководстве Vite](https://vite-docs.ru/guide/build). Обратите внимание, что Vite+ использует Vite 8 и [Rolldown](https://rolldown.rs/) для сборки.

::: info
`vp build` всегда запускает встроенную продакшен-сборку Vite. Если в вашем проекте также есть скрипт `build` в `package.json`, используйте `vp run build`, когда нужно запустить именно этот скрипт.
:::

## Использование {#usage}

```bash
vp build
vp build --watch
vp build --sourcemap
```

Используйте стандартную конфигурацию Vite в `vite.config.ts`. Полное описание параметров конфигурации см. в [документации по конфигурации Vite](https://vite-docs.ru/config/).

Используйте её для:

- [плагинов](https://vite-docs.ru/guide/using-plugins)
- [алиасов](https://vite-docs.ru/config/shared-options#resolve-alias)
- [`build`](https://vite-docs.ru/config/build-options)
- [`preview`](https://vite-docs.ru/config/preview-options)
- [режимов окружения](https://vite-docs.ru/guide/env-and-mode)

## Предпросмотр {#preview}

Используйте `vp preview`, чтобы локально запустить продакшен-сборку после выполнения `vp build`.

```bash
vp build
vp preview
```
