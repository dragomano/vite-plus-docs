# vp pm login {#vp-pm-login}

Аутентификация в реестре пакетов. Псевдоним: `vp pm adduser`.

```bash
vp pm login
vp pm login --scope @my-org
```

## Параметры {#options}

| Параметр           | Описание                   | Примечания |
| ------------------ | -------------------------- | ---------- |
| `--registry <url>` | Выбор реестра.             |            |
| `--scope <scope>`  | Область (scope) для входа. |            |

## Совместимость {#compatibility}

- **npm:** `npm login`.
- **pnpm:** 11 или новее: `pnpm login`. Более ранние версии используют `npm login` как запасной вариант.
- **Yarn Classic:** `yarn login`.
- **Yarn Modern:** `yarn npm login`.
- **Bun:** Запасной вариант: `npm login`.

| Параметр           | npm | pnpm                     | Yarn Classic | Yarn Modern | Bun | Примечания                              |
| ------------------ | --- | ------------------------ | ------------ | ----------- | --- | --------------------------------------- |
| `--registry <url>` | Да  | Да                       | Нет          | Нет         | Да  | Реестр настраивается в настройках Yarn. |
| `--scope <scope>`  | Да  | До 11 или 11.2 или новее | Нет          | Да          | Да  |                                         |

Запросы аутентификации и хранение учётных данных выполняет нативная команда. `pnpm login` не копирует учётные данные в npm, поэтому для команд, которые по-прежнему используют npm, может потребоваться отдельный вход. См. [whoami](./whoami), чтобы проверить выбранную учётную запись, и [logout](./logout), чтобы завершить аутентификацию.

## Нативные параметры {#native-options}

Список нативных параметров: [npm login](https://docs.npmjs.com/cli/v11/commands/npm-login), [pnpm login](https://pnpm.io/cli/login), [Yarn npm login](https://yarnpkg.com/cli/npm/login) и [Yarn Classic login](https://classic.yarnpkg.com/en/docs/cli/login). Чтобы передать эти параметры через Vite+, см. [Нативные аргументы](./#native-arguments).
