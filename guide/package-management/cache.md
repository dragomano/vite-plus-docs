# vp pm cache {#vp-pm-cache}

Показывает или очищает кэш загрузок менеджера пакетов или его хранилище. Это не то же самое, что [`vp cache`](/guide/cache), который управляет результатами задач.

```bash
vp pm cache dir
vp pm cache clean
```

## Параметры {#options}

- `dir` и `path` выводят расположение кэша или хранилища.
- `clean` запрашивает нативную очистку кэша.

Другие подкоманды выводят предупреждение и завершаются успешно, не выполняя команду. Дополнительных параметров Vite+ нет.

### `dir` {#dir}

Выводит расположение кэша или хранилища. Псевдоним: `path`. У подкоманды нет собственных параметров.

### `clean` {#clean}

Запрашивает нативную очистку кэша. У подкоманды нет собственных параметров.

## Совместимость {#compatibility}

### `dir` {#dir-1}

- **npm:** `npm config get cache`.
- **pnpm:** `pnpm store path`.
- **Yarn Classic:** `yarn cache dir`.
- **Yarn Modern:** `yarn config get cacheFolder`.
- **Bun:** `bun pm cache`.

### `clean` {#clean-1}

- **npm:** `npm cache clean`.
- **pnpm:** `pnpm store prune`. Очищает хранилище, а не удаляет всё его содержимое.
- **Yarn Classic:** `yarn cache clean`.
- **Yarn Modern:** `yarn cache clean`.
- **Bun:** `bun pm cache rm`.

Для удаления кэша npm обычно требует явный нативный параметр `--force`:

```bash
vp pm cache clean -- --force
```

Этот пример относится только к npm. Vite+ не предоставляет отдельной команды `vp pm store`.

## Нативные параметры {#native-options}

Список нативных параметров: [npm config](https://docs.npmjs.com/cli/v11/commands/npm-config), [npm cache](https://docs.npmjs.com/cli/v11/commands/npm-cache), [pnpm store](https://pnpm.io/cli/store), [Yarn config get](https://yarnpkg.com/cli/config/get), [Yarn cache clean](https://yarnpkg.com/cli/cache/clean), [Yarn Classic cache](https://classic.yarnpkg.com/en/docs/cli/cache) и [Bun pm cache](https://bun.com/docs/pm/cli/pm). Чтобы передать эти параметры через Vite+, см. [Нативные аргументы](./#native-arguments).
