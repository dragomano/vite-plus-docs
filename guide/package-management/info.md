# vp info {#vp-info}

Читает метаданные пакета из реестра. Псевдонимы: `vp view`, `vp show`, `vp pm view`, `vp pm info` и `vp pm show`.

```bash
vp info react
vp info react versions --json
vp info react@19 dist.tarball
```

## Параметры {#options}

Укажите имя пакета с необязательной версией, а затем необязательное имя поля.

| Параметр | Описание                                   | Примечания                      |
| -------- | ------------------------------------------ | ------------------------------- |
| `--json` | Запрашивает нативный вывод в формате JSON. | Вывод сохраняет нативную схему. |

## Совместимость {#compatibility}

- **npm:** `npm view`.
- **pnpm:** `pnpm view`.
- **Yarn Classic:** `yarn info`.
- **Yarn Modern:** `yarn npm info`. Запрошенное поле передаётся как `--fields`.
- **Bun:** `bun info`.

| Параметр | npm | pnpm | Yarn Classic | Yarn Modern | Bun | Примечания |
| -------- | --- | ---- | ------------ | ----------- | --- | ---------- |
| `--json` | Да  | Да   | Да           | Да          | Да  |            |

Эта команда запрашивает метаданные реестра, а не локальное дерево зависимостей. Для просмотра установленных пакетов используйте [list](./list) или [why](./why).

## Нативные параметры {#native-options}

Список нативных параметров: [npm view](https://docs.npmjs.com/cli/v11/commands/npm-view), [pnpm view](https://pnpm.io/cli/view), [Yarn npm info](https://yarnpkg.com/cli/npm/info), [Yarn Classic info](https://classic.yarnpkg.com/en/docs/cli/info) и [Bun info](https://bun.com/docs/pm/cli/info). Чтобы передать эти параметры через Vite+, см. [Нативные аргументы](./#native-arguments).
