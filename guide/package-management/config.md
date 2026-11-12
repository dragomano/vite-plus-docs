# vp pm config {#vp-pm-config}

Читает и изменяет конфигурацию менеджера пакетов. Псевдоним: `vp pm c`. Это не то же самое, что `vp config`, который настраивает инструменты проекта.

```bash
vp pm config list
vp pm config get registry
vp pm config set registry https://registry.npmjs.org --location project
vp pm config delete registry --location project
```

Ключи конфигурации зависят от менеджера. В примерах с реестром используются ключи npm или pnpm, а не ключи конфигурации Yarn 2.

## Параметры {#options}

- `list` отображает конфигурацию.
- `get <key>` читает значение.
- `set <key> <value>` записывает значение.
- `delete <key>` удаляет значение.

Здесь `--global` выбирает область конфигурации, а не глобальное хранилище пакетов Vite+.

Эти подкоманды не принимают дополнительные нативные аргументы после `--`.

### `list` {#list}

| Параметр                             | Описание                                   | Примечания                      |
| ------------------------------------ | ------------------------------------------ | ------------------------------- |
| `--json`                             | Запрашивает нативный вывод в формате JSON. | Вывод сохраняет нативную схему. |
| `-g, --global`                       | Использует глобальную конфигурацию.        | Переопределяет `--location`.    |
| `--location <project\|user\|global>` | Выбирает область конфигурации.             |                                 |

### `get` {#get}

| Параметр                             | Описание                                   | Примечания                      |
| ------------------------------------ | ------------------------------------------ | ------------------------------- |
| `--json`                             | Запрашивает нативный вывод в формате JSON. | Вывод сохраняет нативную схему. |
| `-g, --global`                       | Использует глобальную конфигурацию.        | Переопределяет `--location`.    |
| `--location <project\|user\|global>` | Выбирает область конфигурации.             |                                 |

### `set` {#set}

| Параметр                             | Описание                                   | Примечания                      |
| ------------------------------------ | ------------------------------------------ | ------------------------------- |
| `--json`                             | Запрашивает нативный вывод в формате JSON. | Вывод сохраняет нативную схему. |
| `-g, --global`                       | Использует глобальную конфигурацию.        | Переопределяет `--location`.    |
| `--location <project\|user\|global>` | Выбирает область конфигурации.             |                                 |

### `delete` {#delete}

| Параметр                             | Описание                            | Примечания                   |
| ------------------------------------ | ----------------------------------- | ---------------------------- |
| `-g, --global`                       | Использует глобальную конфигурацию. | Переопределяет `--location`. |
| `--location <project\|user\|global>` | Выбирает область конфигурации.      |                              |

## Совместимость {#compatibility}

### `list` {#list-1}

- **npm:** `npm config list`.
- **pnpm:** `pnpm config list`.
- **Yarn Classic:** `yarn config list`.
- **Yarn Modern:** `yarn config`.
- **Bun:** Запасной вариант: `npm config list`. Использует конфигурацию npm, а не `bunfig.toml`.

| Параметр                             | npm                   | pnpm                  | Yarn Classic | Yarn Modern           | Bun                   | Примечания                                  |
| ------------------------------------ | --------------------- | --------------------- | ------------ | --------------------- | --------------------- | ------------------------------------------- |
| `--json`                             | Да                    | Да                    | Да           | Да                    | Да                    |                                             |
| `-g, --global`                       | Да                    | Да                    | Да           | Да                    | Да                    |                                             |
| `--location <project\|user\|global>` | project, user, global | project, user, global | user, global | project, user, global | project, user, global | Чтение сохраняет объединённую конфигурацию. |

### `get` {#get-1}

- **npm:** `npm config get`.
- **pnpm:** `pnpm config get`.
- **Yarn Classic:** `yarn config get`.
- **Yarn Modern:** `yarn config get`.
- **Bun:** Запасной вариант: `npm config get`. Использует конфигурацию npm, а не `bunfig.toml`.

| Параметр                             | npm                   | pnpm                  | Yarn Classic | Yarn Modern           | Bun                   | Примечания                                  |
| ------------------------------------ | --------------------- | --------------------- | ------------ | --------------------- | --------------------- | ------------------------------------------- |
| `--json`                             | Да                    | Да                    | Да           | Да                    | Да                    |                                             |
| `-g, --global`                       | Да                    | Да                    | Да           | Да                    | Да                    |                                             |
| `--location <project\|user\|global>` | project, user, global | project, user, global | user, global | project, user, global | project, user, global | Чтение сохраняет объединённую конфигурацию. |

### `set` {#set-1}

- **npm:** `npm config set`.
- **pnpm:** `pnpm config set`.
- **Yarn Classic:** `yarn config set`.
- **Yarn Modern:** `yarn config set`.
- **Bun:** Запасной вариант: `npm config set`. Использует конфигурацию npm, а не `bunfig.toml`.

| Параметр                             | npm                   | pnpm                  | Yarn Classic | Yarn Modern           | Bun                   | Примечания |
| ------------------------------------ | --------------------- | --------------------- | ------------ | --------------------- | --------------------- | ---------- |
| `--json`                             | Да                    | Да                    | Да           | Да                    | Да                    |            |
| `-g, --global`                       | Да                    | Да                    | Да           | Да                    | Да                    |            |
| `--location <project\|user\|global>` | project, user, global | project, user, global | user, global | project, user, global | project, user, global |            |

### `delete` {#delete-1}

- **npm:** `npm config delete`.
- **pnpm:** `pnpm config delete`.
- **Yarn Classic:** `yarn config delete`.
- **Yarn Modern:** `yarn config unset`.
- **Bun:** Запасной вариант: `npm config delete`. Использует конфигурацию npm, а не `bunfig.toml`.

| Параметр                             | npm                   | pnpm                  | Yarn Classic | Yarn Modern           | Bun                   | Примечания |
| ------------------------------------ | --------------------- | --------------------- | ------------ | --------------------- | --------------------- | ---------- |
| `-g, --global`                       | Да                    | Да                    | Да           | Да                    | Да                    |            |
| `--location <project\|user\|global>` | project, user, global | project, user, global | user, global | project, user, global | project, user, global |            |

Записи Yarn Classic на уровне пользователя используют нативные значения по умолчанию.

## Нативные параметры {#native-options}

Список нативных параметров: [npm config](https://docs.npmjs.com/cli/v11/commands/npm-config), [pnpm config](https://pnpm.io/cli/config), [Yarn config](https://yarnpkg.com/cli/config), [Yarn config get](https://yarnpkg.com/cli/config/get), [Yarn config set](https://yarnpkg.com/cli/config/set), [Yarn config unset](https://yarnpkg.com/cli/config/unset) и [Yarn Classic config](https://classic.yarnpkg.com/en/docs/cli/config). Нативные параметры за пределами этого интерфейса требуют нативной команды.

О настройках `bunfig.toml` см. [Bun configuration](https://bun.com/docs/runtime/bunfig).
