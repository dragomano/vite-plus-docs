# vp pm logout {#vp-pm-logout}

Выход из реестра пакетов.

```bash
vp pm logout
vp pm logout --scope @my-org
```

## Параметры {#options}

| Параметр           | Описание                    | Примечания |
| ------------------ | --------------------------- | ---------- |
| `--registry <url>` | Выбор реестра.              |            |
| `--scope <scope>`  | Область (scope) для выхода. |            |

## Совместимость {#compatibility}

- **npm:** `npm logout`.
- **pnpm:** 11 или новее: `pnpm logout`. Более ранние версии используют `npm logout` как запасной вариант.
- **Yarn Classic:** `yarn logout`.
- **Yarn Modern:** `yarn npm logout`.
- **Bun:** Запасной вариант: `npm logout`.

| Параметр           | npm | pnpm  | Yarn Classic | Yarn Modern | Bun | Примечания                              |
| ------------------ | --- | ----- | ------------ | ----------- | --- | --------------------------------------- |
| `--registry <url>` | Да  | Да    | Нет          | Нет         | Да  | Реестр настраивается в настройках Yarn. |
| `--scope <scope>`  | Да  | До 11 | Нет          | Да          | Да  |                                         |

Удаление учётных данных и аннулирование токенов выполняются нативным менеджером и реестром. Нативная команда `pnpm logout` не запускает `npm logout` и не выполняет дополнительную очистку учётных данных. Используйте [login](./login), чтобы пройти аутентификацию снова.

## Нативные параметры {#native-options}

Список нативных параметров: [npm logout](https://docs.npmjs.com/cli/v11/commands/npm-logout), [pnpm logout](https://pnpm.io/cli/logout), [Yarn npm logout](https://yarnpkg.com/cli/npm/logout) и [Yarn Classic logout](https://classic.yarnpkg.com/en/docs/cli/logout). Чтобы передать эти параметры через Vite+, см. [Нативные аргументы](./#native-arguments).
