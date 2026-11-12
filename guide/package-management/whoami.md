# vp pm whoami {#vp-pm-whoami}

Показывает учётную запись, с которой выполнена аутентификация в реестре.

```bash
vp pm whoami
vp pm whoami --registry https://registry.npmjs.org
```

## Параметры {#options}

| Параметр           | Описание       | Примечания |
| ------------------ | -------------- | ---------- |
| `--registry <url>` | Выбор реестра. |            |

## Совместимость {#compatibility}

- **npm:** `npm whoami`.
- **pnpm:** 11 или новее: `pnpm whoami`. Более ранние версии используют `npm whoami` как запасной вариант.
- **Yarn Classic:** Команды нет. Выводит предупреждение и завершается успешно, не выполняя операцию.
- **Yarn Modern:** `yarn npm whoami`.
- **Bun:** `bun pm whoami`.

| Параметр           | npm | pnpm | Yarn Classic | Yarn Modern | Bun | Примечания                                     |
| ------------------ | --- | ---- | ------------ | ----------- | --- | ---------------------------------------------- |
| `--registry <url>` | Да  | Да   | Нет          | Нет         | Да  | Реестр настраивается в настройках Yarn Modern. |

## Нативные параметры {#native-options}

Список нативных параметров: [npm whoami](https://docs.npmjs.com/cli/v11/commands/npm-whoami), [pnpm whoami](https://pnpm.io/cli/whoami), [Yarn npm whoami](https://yarnpkg.com/cli/npm/whoami) и [Bun pm whoami](https://bun.com/docs/pm/cli/pm). Чтобы передать эти параметры через Vite+, см. [Нативные аргументы](./#native-arguments).
