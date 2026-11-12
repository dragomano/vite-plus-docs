# vp pm audit {#vp-pm-audit}

Проверяет зависимости на наличие известных уязвимостей.

```bash
vp pm audit
vp pm audit --json
vp pm audit --production --level high
```

## Параметры {#options}

| Параметр          | Описание                                           | Примечания                      |
| ----------------- | -------------------------------------------------- | ------------------------------- |
| `--fix`           | Запрашивает автоматическое устранение уязвимостей. |                                 |
| `--json`          | Запрашивает нативный вывод в формате JSON.         | Вывод сохраняет нативную схему. |
| `--level <level>` | Минимальный уровень уязвимости для отчёта.         |                                 |
| `--production`    | Проверяет только production-зависимости.           |                                 |

## Совместимость {#compatibility}

- **npm:** `npm audit` или `npm audit fix`.
- **pnpm:** `pnpm audit`.
- **Yarn Classic:** `yarn audit`.
- **Yarn Modern:** 2.4 или новее: `yarn npm audit`. Более ранние версии выводят предупреждение и пропускают выполнение.
- **Bun:** `bun audit` или `bun audit fix`.

| Параметр          | npm | pnpm | Yarn Classic | Yarn Modern | Bun              | Примечания |
| ----------------- | --- | ---- | ------------ | ----------- | ---------------- | ---------- |
| `--fix`           | Да  | Да   | Нет          | Нет         | 1.4 или новее    |            |
| `--json`          | Да  | Да   | Да           | Да          | Да               |            |
| `--level <level>` | Да  | Да   | Да           | Да          | Да               |            |
| `--production`    | Да  | Да   | Да           | Да          | 1.2.21 или новее |            |

Вывод уязвимостей и пороги срабатывания сохраняют семантику нативного менеджера.

## Нативные параметры {#native-options}

Список нативных параметров: [npm audit](https://docs.npmjs.com/cli/v11/commands/npm-audit), [pnpm audit](https://pnpm.io/cli/audit), [Yarn npm audit](https://yarnpkg.com/cli/npm/audit), [Yarn Classic audit](https://classic.yarnpkg.com/en/docs/cli/audit) и [Bun audit](https://bun.com/docs/pm/cli/audit). Чтобы передать эти параметры через Vite+, см. [Нативные аргументы](./#native-arguments).
