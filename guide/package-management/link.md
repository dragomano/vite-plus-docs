# vp link {#vp-link}

Создаёт локальные ссылки для разработки через выбранный менеджер пакетов. Псевдоним: `vp ln`.

```bash
vp link ../my-library
```

## Параметры {#options}

Необязательное имя пакета или каталог передаётся менеджеру.

Параметров, специфичных для команды, нет.

## Совместимость {#compatibility}

- **npm:** `npm link`.
- **pnpm:** `pnpm link`.
- **Yarn Classic:** `yarn link`.
- **Yarn Modern:** `yarn link`.
- **Bun:** `bun link`.

Смысл каталога, имени пакета или отсутствующего аргумента определяется нативным порядком связывания соответствующего менеджера. В частности, Yarn 2 и новее связывают проекты иначе, чем Yarn Classic при регистрации пакета.

Эти ссылки не используют [глобальное хранилище пакетов](./global-packages) Vite+ и не отображаются в `vp list -g`. Используйте [unlink](./unlink), чтобы удалить нативные ссылки.

## Нативные параметры {#native-options}

Список нативных параметров: [npm link](https://docs.npmjs.com/cli/v11/commands/npm-link), [pnpm link](https://pnpm.io/cli/link), [Yarn link](https://yarnpkg.com/cli/link), [Yarn Classic link](https://classic.yarnpkg.com/en/docs/cli/link) и [Bun link](https://bun.com/docs/pm/cli/link). Чтобы передать эти параметры через Vite+, см. [Нативные аргументы](./#native-arguments).
