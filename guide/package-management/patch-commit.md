# vp pm patch-commit {#vp-pm-patch-commit}

Сохраняет изменения, подготовленные командой [patch](./patch), в виде патча зависимости.

```bash
vp pm patch-commit /path/to/edited-package
```

## Параметры {#options}

Укажите каталог изменений из сценария патча менеджера. Дополнительных параметров Vite+ нет.

Параметров, специфичных для команды, нет.

## Совместимость {#compatibility}

- **npm:** 12 или новее: `npm patch commit`. Более ранние версии выводят предупреждение и пропускают выполнение.
- **pnpm:** 7.4 или новее: `pnpm patch-commit`. Более ранние версии выводят предупреждение и пропускают выполнение.
- **Yarn Classic:** Команды нет. Выводит предупреждение и завершается успешно, не выполняя операцию.
- **Yarn Modern:** 3 или новее: `yarn patch-commit --save`. Более ранние версии выводят предупреждение и пропускают выполнение.
- **Bun:** `bun patch --commit`.

Просмотрите и закоммитьте патч, а также любые изменения манифеста или lock-файла, внесённые менеджером.

## Нативные параметры {#native-options}

Список нативных параметров: [npm patch commit](https://docs.npmjs.com/cli/v12/commands/npm-patch), [pnpm patch-commit](https://pnpm.io/cli/patch-commit), [Yarn patch-commit](https://yarnpkg.com/cli/patch-commit) и [Bun patch --commit](https://bun.com/docs/pm/cli/patch). Чтобы передать эти параметры через Vite+, см. [Нативные аргументы](./#native-arguments).
