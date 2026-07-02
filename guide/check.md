# Команда `vp check` {#check}

`vp check` выполняет форматирование, линтинг и проверку типов одной командой.

## Обзор {#overview}

`vp check` — команда по умолчанию для быстрого выполнения статических проверок в Vite+. Она объединяет форматирование через [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html), линтинг через [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) и проверку типов TypeScript через [tsgolint](https://github.com/oxc-project/tsgolint). Объединяя все эти задачи в одной команде, `vp check` работает быстрее, чем запуск форматирования, линтинга и проверки типов отдельными инструментами в отдельных командах.

Когда параметр `typeCheck` включён в блоке `lint.options` файла `vite.config.ts`, `vp check` также выполняет проверку типов TypeScript средствами Oxlint, используя инструментарий TypeScript Go и [tsgolint](https://github.com/oxc-project/tsgolint). Команды `vp create` и `vp migrate` включают параметры `typeAware` и `typeCheck` по умолчанию.

Мы рекомендуем включить `typeCheck`, чтобы `vp check` стал единой командой для выполнения статических проверок в процессе разработки.

## Использование {#usage}

```bash
vp check
vp check --fix              # Выполнить форматирование и автоматические исправления.
vp check --no-fmt           # Пропустить форматирование; выполнить линтинг (и проверку типов, если она включена).
vp check --no-lint          # Пропустить правила линтинга; сохранить проверку типов, если она включена.
vp check --no-fmt --no-lint # Только проверка типов (требуется включённый `typeCheck`).
```

## Конфигурация {#configuration}

`vp check` использует ту же конфигурацию, которую вы уже определили для линтинга и форматирования:

- блок [`lint`](/guide/lint#configuration) в `vite.config.ts`
- блок [`fmt`](/guide/fmt#configuration) в `vite.config.ts`
- структура проекта TypeScript и файлы tsconfig для линтинга с учётом типов

Рекомендуемая базовая конфигурация `lint`:

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
});
```

### Отключение шага по умолчанию {#disabling-a-step-by-default}

Чтобы `vp check` пропускал форматирование или линтинг без необходимости каждый раз передавать флаг, настройте блок [`check`](/config/check) в `vite.config.ts`. Это полезно, когда в проекте используется остальная цепочка инструментов, но, например, без форматирования:

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  check: {
    fmt: false, // `vp check` выполняет линтинг (и проверку типов), но не форматирует код
  },
});
```

Эти настройки влияют только на `vp check`; отдельные команды `vp fmt` и `vp lint` продолжают работать как обычно. Шаг пропускается, если он отключён в конфигурации или передан соответствующий флаг `--no-fmt` / `--no-lint`. Так как настройки по умолчанию применяются ко всем запускам `vp check`, хук pre-commit, вызывающий `vp check`, также будет учитывать отключённые шаги. См. [`vp check`](/config/check) для полной справки.
