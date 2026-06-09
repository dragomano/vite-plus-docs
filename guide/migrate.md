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
- Confirm `vitest` imports were rewritten to `vite-plus/test` where needed
- On pnpm, keep the `vite` / `vitest` entries that `vp migrate` aliased to the Vite+ packages so the workspace override stays effective; with other package managers you can remove them once those rewrites are confirmed
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

Vitest автоматически мигрируется через `vp migrate`. Если вы выполняете миграцию вручную, вам нужно обновить все импорты на `vite-plus/test` вместо этого:

```ts
// до
import { describe, expect, it, vi } from 'vitest';

const { page } = await import('@vitest/browser/context');

// после
import { describe, expect, it, vi } from 'vite-plus/test';

const { page } = await import('vite-plus/test/browser/context');
```

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
