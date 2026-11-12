# vp pm pack {#vp-pm-pack}

Создаёт tarball-архив пакета из проекта. Это отличается от [`vp pack`](/guide/pack), который собирает библиотеки с помощью tsdown.

```bash
vp pm pack
vp pm pack --pack-destination ./artifacts
```

## Параметры {#options}

| Параметр                                | Описание                                      | Примечания                      |
| --------------------------------------- | --------------------------------------------- | ------------------------------- |
| `-r, --recursive`                       | Упаковывает все пакеты рабочего пространства. |                                 |
| `--filter <pattern>`                    | Выбирает рабочие пространства по шаблону.     | Можно указывать несколько раз.  |
| `--out <out>`                           | Задаёт путь вывода tarball-архива.            |                                 |
| `--pack-destination <pack-destination>` | Задаёт каталог вывода tarball-архива.         |                                 |
| `--pack-gzip-level <pack-gzip-level>`   | Запрашивает уровень сжатия gzip от 0 до 9.    |                                 |
| `--json`                                | Запрашивает нативный вывод в формате JSON.    | Вывод сохраняет нативную схему. |

## Совместимость {#compatibility}

- **npm:** `npm pack`.
- **pnpm:** `pnpm pack`.
- **Yarn Classic:** `yarn pack`.
- **Yarn Modern:** `yarn pack`.
- **Bun:** `bun pm pack`.

| Параметр                                | npm              | pnpm              | Yarn Classic | Yarn Modern | Bun | Примечания                     |
| --------------------------------------- | ---------------- | ----------------- | ------------ | ----------- | --- | ------------------------------ |
| `-r, --recursive`                       | 7.9.0 или новее  | 10.11.0 или новее | Нет          | Да          | Нет |                                |
| `--filter <pattern>`                    | 7.9.0 или новее  | 10.11.0 или новее | Нет          | Да          | Нет |                                |
| `--out <out>`                           | Нет              | 10.0.0 или новее  | Да           | Да          | Да  |                                |
| `--pack-destination <pack-destination>` | 7.18.0 или новее | Да                | Нет          | Нет         | Да  | Vite+ создаёт каталог для npm. |
| `--pack-gzip-level <pack-gzip-level>`   | Нет              | 8.3.0 или новее   | Нет          | Нет         | Да  |                                |
| `--json`                                | Да               | 9.14.0 или новее  | Да           | Да          | Нет |                                |

## Нативные параметры {#native-options}

Список нативных параметров: [npm pack](https://docs.npmjs.com/cli/v11/commands/npm-pack), [pnpm pack](https://pnpm.io/cli/pack), [Yarn pack](https://yarnpkg.com/cli/pack), [Yarn Classic pack](https://classic.yarnpkg.com/en/docs/cli/pack) и [Bun pm pack](https://bun.com/docs/pm/cli/pm). Чтобы передать эти параметры через Vite+, см. [Нативные аргументы](./#native-arguments).
