# Переход на Vite+ {#migrate-to-vite}

`vp migrate` помогает перенести существующие проекты на Vite+.

## Обзор {#overview}

Эта команда — отправная точка для объединения отдельных настроек Vite, Vitest, Oxlint, Oxfmt, ESLint и Prettier в Vite+.

Используйте её, когда хотите взять существующий проект и перейти на настройки Vite+ по умолчанию, вместо того чтобы вручную настраивать каждый инструмент.

## Использование {#usage}

```bash
vp migrate
vp migrate <path>
vp migrate --no-interactive
```

## Целевой путь {#target-path}

Позиционный аргумент `PATH` является необязательным.

- Если он опущен, `vp migrate` мигрирует текущую директорию
- Если он указан, то мигрирует указанную целевую директорию вместо этого

```bash
vp migrate
vp migrate my-app
```

## Параметры {#options}

- `--agent <name>` записывает инструкции агента в проект
- `--no-agent` пропускает настройку инструкций агента
- `--editor <name>` записывает конфигурационные файлы редактора в проект
- `--no-editor` пропускает настройку конфигурации редактора
- `--hooks` настраивает pre-commit хуки
- `--no-hooks` пропускает настройку хуков
- `--no-interactive` запускает миграцию без запросов подтверждения

## Процесс миграции {#migration-flow}

Команда `migrate` предназначена для быстрого переноса существующих проектов на Vite+. Вот что делает команда:

- Обновляет зависимости проекта
- Переписывает импорты при необходимости
- Объединяет конфигурации отдельных инструментов в `vite.config.ts`
- Обновляет скрипты на командный интерфейс Vite+
- Может настроить хуки коммитов
- Может записать конфигурационные файлы агента и редактора

Большинству проектов после выполнения `vp migrate` потребуются дополнительные ручные правки.

## Рекомендуемый рабочий процесс {#recommended-workflow}

Перед запуском миграции:

- Сначала обновитесь до Vite 8+ и Vitest 4.1+
- Убедитесь, что вы понимаете все существующие настройки линтера, форматирования или тестов, которые нужно сохранить

После выполнения миграции:

- Выполните `vp install`
- Выполните `vp check`
- Выполните `vp test`
- Выполните `vp build`

## Промпт для миграции {#migration-prompt}

Если вы хотите передать эту работу агенту кодирования (или если вы сами агент кодирования!), используйте следующий промпт для миграции:

```md
Migrate this project to Vite+. Vite+ replaces the current split tooling around runtime management, package management, dev/build/test commands, linting, formatting, and packaging. Run `vp help` to understand Vite+ capabilities and `vp help migrate` before making changes. Use `vp migrate --no-interactive` in the workspace root. Make sure the project is using Vite 8+ and Vitest 4.1+ before migrating.

After the migration:

- Confirm `vite` imports were rewritten to `vite-plus` where needed
- Confirm `vitest` imports were rewritten to `vite-plus/test` (and `@vitest/browser*` to `vite-plus/test/browser*`) where needed
- Remove old `vite`, `vitest`, and `@vitest/browser*` dependencies only after those rewrites are confirmed — `vite-plus` ships them as direct deps
- Move remaining tool-specific config into the appropriate blocks in `vite.config.ts`

Command mapping to keep in mind:

- `vp run <script>` is the equivalent of `pnpm run <script>`
- `vp test` runs the built-in test command, while `vp run test` runs the `test` script from `package.json`
- `vp install`, `vp add`, and `vp remove` delegate through the package manager declared by `packageManager`
- `vp dev`, `vp build`, `vp preview`, `vp lint`, `vp fmt`, `vp check`, and `vp pack` replace the corresponding standalone tools
- Prefer `vp check` for validation loops

Finally, verify the migration by running: `vp install`, `vp check`, `vp test`, and `vp build`

Summarize the migration at the end and report any manual follow-up still required.
```

## Миграции для конкретных инструментов {#tool-specific-migrations}

### Vitest

Vitest автоматически мигрируется через `vp migrate`. Пакет `vite-plus` реэкспортирует исходный `vitest@4.x` через пространство имён `vite-plus/test*`, поэтому для тестов в режиме Node.js достаточно установить только `vite-plus` — отдельно устанавливать `vitest` больше не требуется.

С браузерным режимом ситуация несколько сложнее. `vite-plus` включает базовую среду выполнения браузерного режима (`@vitest/browser`) и провайдер предпросмотра (`@vitest/browser-preview`), однако провайдеры **Playwright** и **WebdriverIO** остаются опциональными: `@vitest/browser-playwright` (вместе с peer-зависимостью `playwright`) и `@vitest/browser-webdriverio` (вместе с peer-зависимостью `webdriverio`) **не** входят в состав `vite-plus`, чтобы проекты без браузерных тестов не подтягивали их автоматически. `vp migrate` определяет фактически используемый провайдер и добавляет его — зафиксированным на версии Vitest, поставляемой в комплекте, — вместе с соответствующим фреймворком. Если вы выполняете миграцию вручную и используете один из этих провайдеров, установите пакет провайдера и соответствующий ему фреймворк самостоятельно, чтобы импорты `vite-plus/test/browser-playwright` или `vite-plus/test/browser-webdriverio` могли быть корректно разрешены.

Если вы выполняете миграцию вручную, обновите все импорты на `vite-plus/test*`:

```ts
// до
import { defineConfig } from 'vitest/config';
import { describe, expect, it, vi } from 'vitest';
import { playwright } from '@vitest/browser-playwright';

const { page } = await import('@vitest/browser/context');

// после
import { defineConfig } from 'vite-plus';
import { describe, expect, it, vi } from 'vite-plus/test';
import { playwright } from 'vite-plus/test/browser-playwright';

const { page } = await import('vite-plus/test/browser/context');
```

Аугментации `declare module 'vitest'` и `declare module '@vitest/browser*'` намеренно **не** переписываются — `vite-plus/test*` представляет собой тонкий реэкспорт исходных модулей `vitest*`, поэтому для корректного объединения типов аугментации должны ссылаться на исходный идентификатор модуля. Оставьте такие объявления `declare module` направленными на `'vitest'` и `'@vitest/browser*'`.

### tsdown

Если ваш проект использует `tsdown.config.ts`, переместите его параметры в блок `pack` в `vite.config.ts`:

```ts [tsdown.config.ts] {4-6}
import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  dts: true,
  format: ['esm', 'cjs'],
});
```

```ts [vite.config.ts] {4-8}
import { defineConfig } from 'vite-plus';

export default defineConfig({
  pack: {
    entry: ['src/index.ts'],
    dts: true,
    format: ['esm', 'cjs'],
  },
});
```

После слияния удалите `tsdown.config.ts`. Подробную справочную информацию по конфигурации см. в [руководстве по `vp pack`](/guide/pack).

### lint-staged

Vite+ заменяет lint-staged своим собственным блоком `staged` в `vite.config.ts`. Поддерживается только формат конфигурации `staged`. Автоматическая миграция standalone-файла `.lintstagedrc` в не-JSON формате и `lint-staged.config.*` не выполняется.

Переместите ваши правила lint-staged в блок `staged`:

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  staged: {
    '*.{js,ts,tsx,vue,svelte}': 'vp check --fix',
  },
});
```

После миграции удалите lint-staged из зависимостей и удалите все файлы конфигурации lint-staged. Подробности см. в [руководстве по хукам коммитов](/guide/commit-hooks) и [справочнике по конфигурации staged](/config/staged).

### Инструменты для Git-хуков {#git-hook-tools}

Команда `vp migrate` может автоматически настроить хуки коммитов Vite+, однако она не переносит конфигурацию всех инструментов для работы с Git-хуками. Автоматическая миграция поддерживает только Husky v9+ и конфигурации в стиле lint-staged. Проекты, использующие Husky версии ниже 9.0.0, пропускаются — перед использованием автоматической миграции необходимо сначала обновиться до Husky v9.

Если ваш проект использует `lefthook`, `simple-git-hooks` или `yorkie`, `vp migrate` оставит существующую конфигурацию без изменений и выведет предупреждение. Это произойдёт даже в том случае, если вы согласитесь настроить хуки в интерактивном режиме или передадите флаг `--hooks`.

Если вы хотите вручную перейти с одного из этих инструментов на Vite+, выполните следующие шаги. Сначала перенесите команды, выполняемые для индексированных файлов, в блок `staged` файла `vite.config.ts`. Затем обновите скрипт жизненного цикла так, чтобы он запускал `vp config`. После этого создайте хук Vite+ `.vite-hooks/pre-commit`, который будет запускать `vp staged`. Наконец, убедившись, что хук Vite+ работает корректно, удалите конфигурацию и зависимость старого инструмента.

Подробнее о полной настройке хуков Vite+ см. в [руководстве по хукам коммитов](/guide/commit-hooks).

## Примеры {#examples}

```bash
# Мигрируем текущий проект
vp migrate

# Мигрируем конкретную директорию
vp migrate my-app

# Запускаем без запросов
vp migrate --no-interactive

# Создаём настройки агента и редактора во время миграции
vp migrate --agent claude --editor zed
```
