# Команда `vp dev` {#dev}

`vp dev` запускает сервер разработки Vite.

## Обзор {#overview}

`vp dev` запускает стандартный сервер разработки Vite через Vite+, поэтому вы сохраняете привычный процесс разработки с Vite, используя при этом ту же точку входа CLI, что и для остальной части инструментальной цепочки. Подробнее об использовании и настройке сервера разработки см. в [руководстве Vite](https://vite-docs.ru/guide/).

:::info
`vp dev` всегда запускает встроенный сервер разработки Vite. Если в вашем проекте также определён сценарий `dev` в `package.json`, используйте `vp run dev`, когда требуется запустить именно этот сценарий. См. раздел [Встроенные команды и сценарии](/guide/run#built-in-commands-vs-scripts).
:::

## Использование {#usage}

```bash
vp dev
```

## Конфигурация {#configuration}

Используйте стандартную конфигурацию Vite в `vite.config.ts`. Полное описание параметров конфигурации см. в [документации по конфигурации Vite](https://vite-docs.ru/config/).

Используйте её для:

- [плагинов](https://vite-docs.ru/guide/using-plugins)
- [алиасов](https://vite-docs.ru/config/shared-options#resolve-alias)
- [`server`](https://vite-docs.ru/config/server-options)
- [режимов окружения](https://vite-docs.ru/guide/env-and-mode)
