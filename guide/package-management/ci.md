# vp pm ci {#vp-pm-ci}

Устанавливает зависимости с неизменяемым lock-файлом для CI.

```bash
vp pm ci
vp pm ci -- --ignore-scripts
```

## Параметры {#options}

У этой команды нет дополнительных параметров Vite+. Для переведённых параметров Vite+ используйте [`vp install --frozen-lockfile`](./install).

Параметров, специфичных для команды, нет.

## Совместимость {#compatibility}

- **npm:** `npm ci`.
- **pnpm:** `pnpm install --frozen-lockfile`.
- **Yarn Classic:** `yarn install --frozen-lockfile`.
- **Yarn Modern:** `yarn install --immutable`.
- **Bun:** `bun install --frozen-lockfile`.

Нативный менеджер определяет очистку после установки и проверку lock-файла. Помимо требования неизменяемого lock-файла, эта команда не заставляет всех менеджеров вести себя как `npm ci`.

## Нативные параметры {#native-options}

Список нативных параметров: [npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci), [pnpm install](https://pnpm.io/cli/install), [Yarn install](https://yarnpkg.com/cli/install), [Yarn Classic install](https://classic.yarnpkg.com/en/docs/cli/install) и [Bun install](https://bun.com/docs/pm/cli/install). Чтобы передать эти параметры через Vite+, см. [Нативные аргументы](./#native-arguments). Для настройки CI см. [руководство по CI](/guide/ci).
