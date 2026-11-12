# vp pm ping {#vp-pm-ping}

Проверяет связь с реестром пакетов.

```bash
vp pm ping
vp pm ping --registry https://registry.npmjs.org
```

## Параметры {#options}

| Параметр           | Описание       | Примечания |
| ------------------ | -------------- | ---------- |
| `--registry <url>` | Выбор реестра. |            |

## Совместимость {#compatibility}

- **npm:** `npm ping`.
- **pnpm:** 11 или новее: `pnpm ping`. Более ранние версии используют `npm ping` как запасной вариант.
- **Yarn Classic:** Запасной вариант: `npm ping`.
- **Yarn Modern:** Запасной вариант: `npm ping`.
- **Bun:** Запасной вариант: `npm ping`.

| Параметр           | npm | pnpm | Yarn Classic | Yarn Modern | Bun | Примечания |
| ------------------ | --- | ---- | ------------ | ----------- | --- | ---------- |
| `--registry <url>` | Да  | Да   | Да           | Да          | Да  |            |

Конфигурация реестра, вывод и коды возврата соответствуют выполняемой команде. Используйте [whoami](./whoami), когда нужно проверить аутентифицированную учётную запись, а не связь.

## Нативные параметры {#native-options}

Список нативных параметров: [npm ping](https://docs.npmjs.com/cli/v11/commands/npm-ping) и [pnpm ping](https://pnpm.io/cli/ping). Чтобы передать эти параметры через Vite+, см. [Нативные аргументы](./#native-arguments).
