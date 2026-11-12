# vp dedupe {#vp-dedupe}

Сокращает количество дублирующихся записей зависимостей с помощью выбранного менеджера пакетов.

```bash
vp dedupe
vp dedupe --check
```

## Параметры {#options}

| Параметр  | Описание                                          | Примечания |
| --------- | ------------------------------------------------- | ---------- |
| `--check` | Проверяет, приведёт ли дедупликация к изменениям. |            |

## Совместимость {#compatibility}

- **npm:** `npm dedupe`.
- **pnpm:** `pnpm dedupe`.
- **Yarn Classic:** Запасной вариант: `yarn install`.
- **Yarn Modern:** `yarn dedupe`.
- **Bun:** 1.4 или новее: `bun dedupe`. Более ранние версии используют `bun install` как запасной вариант.

| Параметр  | npm | pnpm | Yarn Classic | Yarn Modern | Bun           | Примечания |
| --------- | --- | ---- | ------------ | ----------- | ------------- | ---------- |
| `--check` | Да  | Да   | Нет          | Да          | 1.4 или новее |            |

Запасная установка не является проверкой только на чтение. Неподдерживаемые запросы `--check` завершаются ошибкой до запуска запасного варианта.

## Нативные параметры {#native-options}

Список нативных параметров: [npm dedupe](https://docs.npmjs.com/cli/v11/commands/npm-dedupe), [pnpm dedupe](https://pnpm.io/cli/dedupe), [Yarn dedupe](https://yarnpkg.com/cli/dedupe), [Yarn Classic install](https://classic.yarnpkg.com/en/docs/cli/install) и [Bun dedupe](https://bun.com/docs/pm/cli/dedupe). Для запасного варианта Bun см. [Bun install](https://bun.com/docs/pm/cli/install). Чтобы передать эти параметры через Vite+, см. [Нативные аргументы](./#native-arguments).
