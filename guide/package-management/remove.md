# vp remove {#vp-remove}

Удаляет зависимости из проекта. Псевдонимы: `vp rm`, `vp un` и `vp uninstall`.

```bash
vp remove react
vp remove --filter web react
vp remove -g --dry-run typescript
```

## Параметры {#options}

| Параметр               | Описание                                                    | Примечания                                                                                |
| ---------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `-D, --save-dev`       | В pnpm затрагивает `devDependencies`.                       |                                                                                           |
| `-O, --save-optional`  | В pnpm затрагивает `optionalDependencies`.                  |                                                                                           |
| `-P, --save-prod`      | В pnpm затрагивает `dependencies`.                          |                                                                                           |
| `--filter <pattern>`   | Выбирает рабочие пространства по шаблону.                   | Можно указывать несколько раз.                                                            |
| `-w, --workspace-root` | Удаляет из корня рабочего пространства.                     |                                                                                           |
| `-r, --recursive`      | Удаляет рекурсивно из всех пакетов рабочего пространства.   |                                                                                           |
| `-g, --global`         | Удаляет глобальные пакеты.                                  | Требуется глобальный CLI. Используется [глобальное хранилище пакетов](./global-packages). |
| `--dry-run`            | Показывает, что было бы удалено, без фактического удаления. | Требуется `--global`.                                                                     |

## Совместимость {#compatibility}

Приведённые ниже команды описывают операции над проектом. Глобальный режим описан в разделе [Параметры](#options).

- **npm:** `npm uninstall`.
- **pnpm:** `pnpm remove`.
- **Yarn Classic:** `yarn remove`.
- **Yarn Modern:** `yarn remove`.
- **Bun:** `bun remove`.

| Параметр               | npm              | pnpm | Yarn Classic | Yarn Modern | Bun           | Примечания                                 |
| ---------------------- | ---------------- | ---- | ------------ | ----------- | ------------- | ------------------------------------------ |
| `-D, --save-dev`       | Да               | Да   | Нет          | Нет         | Нет           | npm включает `dependencies`.               |
| `-O, --save-optional`  | Да               | Да   | Нет          | Нет         | Нет           | npm включает `dependencies`.               |
| `-P, --save-prod`      | Да               | Да   | Нет          | Нет         | Нет           | npm включает `devDependencies`.            |
| `--filter <pattern>`   | 7.14.0 или новее | Да   | Один фильтр  | Да          | 1.4 или новее |                                            |
| `-w, --workspace-root` | 8.1.0 или новее  | Да   | Нет          | Нет         | Нет           |                                            |
| `-r, --recursive`      | 8.1.0 или новее  | Да   | Нет          | Да          | Нет           | npm включает корень рабочего пространства. |
| `-g, --global`         | Да               | Да   | Да           | Да          | Да            |                                            |
| `--dry-run`            | Да               | Да   | Да           | Да          | Да            |                                            |

## Нативные параметры {#native-options}

Список нативных параметров: [npm uninstall](https://docs.npmjs.com/cli/v11/commands/npm-uninstall), [pnpm remove](https://pnpm.io/cli/remove), [Yarn remove](https://yarnpkg.com/cli/remove), [Yarn Classic remove](https://classic.yarnpkg.com/en/docs/cli/remove) и [Bun remove](https://bun.com/docs/pm/cli/remove). Чтобы передать эти параметры через Vite+, см. [Нативные аргументы](./#native-arguments).
