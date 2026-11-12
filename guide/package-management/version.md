# vp pm version {#vp-pm-version}

Выполняет команду версии менеджера пакетов. Она управляет версиями пакетов, а не версией Vite+, которую показывает `vp --version`.

```bash
vp pm version patch
vp pm version 2.0.0
```

## Параметры {#options}

Укажите версию или стратегию увеличения, например `major`, `minor` или `patch`. Если её не указать, сохраняется нативное поведение менеджера: он может вывести сведения, запросить подтверждение или потребовать стратегию.

| Параметр | Описание                                   | Примечания                      |
| -------- | ------------------------------------------ | ------------------------------- |
| `--json` | Запрашивает нативный вывод в формате JSON. | Вывод сохраняет нативную схему. |

## Совместимость {#compatibility}

- **npm:** `npm version`.
- **pnpm:** `pnpm version`.
- **Yarn Classic:** `yarn version`.
- **Yarn Modern:** `yarn version`.
- **Bun:** 1.2.18 или новее: `bun pm version`. Более ранние версии выводят предупреждение до вызова команды.

| Параметр | npm | pnpm | Yarn Classic | Yarn Modern | Bun | Примечания |
| -------- | --- | ---- | ------------ | ----------- | --- | ---------- |
| `--json` | Да  | Да   | Да           | Нет         | Нет |            |

Yarn Classic преобразует стратегии увеличения в флаги, например `--patch`. Явная версия преобразуется в `--new-version <version>`. Другие менеджеры сохраняют нативный синтаксис операндов.

Команды версии могут изменять манифесты и lock-файлы, а также создавать коммиты Git или теги. Vite+ сохраняет поведение выбранного менеджера.

## Нативные параметры {#native-options}

Список нативных параметров: [npm version](https://docs.npmjs.com/cli/v11/commands/npm-version), [pnpm version](https://pnpm.io/cli/version), [Yarn version](https://yarnpkg.com/cli/version), [Yarn Classic version](https://classic.yarnpkg.com/en/docs/cli/version) и [Bun pm version](https://bun.com/docs/pm/cli/pm). Чтобы передать эти параметры через Vite+, см. [Нативные аргументы](./#native-arguments).
