# vp pm dist-tag {#vp-pm-dist-tag}

Управляет тегами, которые сопоставляют имена пакетов, например `my-package@next`, опубликованной версии.

```bash
vp pm dist-tag list my-package
vp pm dist-tag add my-package@2.0.0 next
vp pm dist-tag rm my-package next
```

## Параметры {#options}

- `list [package]` выводит теги. Псевдоним: `ls`.
- `add <package@version> <tag>` назначает тег.
- `rm <package> <tag>` удаляет тег.

У этих подкоманд нет дополнительных параметров Vite+ и нативных аргументов передачи. Изменение тега меняет то, во что разрешаются будущие установки этого тега; опубликованная версия при этом не удаляется.

### `list` {#list}

У подкоманды нет собственных параметров.

### `add` {#add}

У подкоманды нет собственных параметров.

### `rm` {#rm}

У подкоманды нет собственных параметров.

## Совместимость {#compatibility}

### `list` {#list-1}

- **npm:** `npm dist-tag list`.
- **pnpm:** 11 или новее: `pnpm dist-tag list`. Более ранние версии используют `npm dist-tag list` как запасной вариант.
- **Yarn Classic:** `yarn tag list`.
- **Yarn Modern:** `yarn npm tag list`.
- **Bun:** Запасной вариант: `npm dist-tag list`.

### `add` {#add-1}

- **npm:** `npm dist-tag add`.
- **pnpm:** 11 или новее: `pnpm dist-tag add`. Более ранние версии используют `npm dist-tag add` как запасной вариант.
- **Yarn Classic:** `yarn tag add`.
- **Yarn Modern:** `yarn npm tag add`.
- **Bun:** Запасной вариант: `npm dist-tag add`.

### `rm` {#rm-1}

- **npm:** `npm dist-tag rm`.
- **pnpm:** 11 или новее: `pnpm dist-tag rm`. Более ранние версии используют `npm dist-tag rm` как запасной вариант.
- **Yarn Classic:** `yarn tag rm`.
- **Yarn Modern:** `yarn npm tag rm`.
- **Bun:** Запасной вариант: `npm dist-tag rm`.

На нативном пути pnpm Vite+ не подставляет отсутствующий пакет для `list`, не разрешает диапазоны версий для `add` и не обходит ограничения на удаление `latest`. Такие запросы проверяет pnpm и возвращает собственные ошибки.

## Нативные параметры {#native-options}

Список нативных параметров: [npm dist-tag](https://docs.npmjs.com/cli/v11/commands/npm-dist-tag), [pnpm dist-tag](https://pnpm.io/cli/dist-tag), [Yarn npm tag list](https://yarnpkg.com/cli/npm/tag/list), [Yarn npm tag add](https://yarnpkg.com/cli/npm/tag/add), [Yarn npm tag remove](https://yarnpkg.com/cli/npm/tag/remove) и [Yarn Classic tag](https://classic.yarnpkg.com/en/docs/cli/tag). Исходные команды могут предоставлять дополнительные параметры, которые не принимает этот интерфейс Vite+.
