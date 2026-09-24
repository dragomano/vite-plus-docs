<script setup lang="ts">
const upgradePrompt = `Upgrade this project from Vite+ 0.3.x to Vite+ 1.0 while preserving its test behavior.

Read these guides before making changes:

- https://viteplus.dev/guide/migrate
- https://viteplus.dev/guide/vitest-v5
- https://vitest.dev/guide/migration/

Inspect the worktree and preserve unrelated changes. Keep the original manifests, lockfile, and installed packages available so migration can identify the original Vitest version. Do not update the project's vite-plus or Vitest dependencies before running migration.

Use the CLI from the target Vite+ 1.0 release or its preview build. A global installation is optional. Use a supported Node.js runtime from the Vite+ compatibility guide.

- With a global vp installation, follow https://viteplus.dev/guide/upgrade to upgrade it and check \`vp toolchain --global\`. Run \`vp help migrate\`, then \`vp migrate --no-interactive\` from the workspace root.
- Without a global installation, run the target CLI through the package manager from the workspace root. For the 1.0.0 release, use \`pnpm dlx --package=vite-plus@1.0.0 vp migrate --no-interactive\` or \`npx --package=vite-plus@1.0.0 vp migrate --no-interactive\`. First run the same command with \`help migrate\` instead of \`migrate --no-interactive\` to read its help. These commands fetch the target CLI without replacing the old project dependencies first.

Replace 1.0.0 with the intended release version. For a preview, use the version from its PR and pass \`--registry=https://registry-bridge.viteplus.dev\` to pnpm or npx before the vp command. Do not run migration with the old project's node_modules/.bin/vp. Keep the existing project setup; do not use --full unless I request it.

Resolve BLOCK findings and rerun migration. Review each REVIEW finding using its documentation link, even if migration exits with success. Preserve test intent and keep the generated v4 compatibility settings and comments for the first validation run.

Check workspace manifests, catalogs, overrides, and import changes against the Vite+ guide. Keep test APIs on supported vite-plus/test entries; use @vitest/browser-webdriverio for the community WebDriverIO provider.

Run \`vp install\`, \`vp check\`, and \`vp test\`, plus the project's browser, coverage, and benchmark suites where configured. Run \`vp build\` or \`vp pack\` as appropriate. Without a global CLI, finish installation with the project's package manager, then invoke the updated local CLI through it, such as \`pnpm exec vp check\` or \`npm exec -- vp check\`. Fix migration failures without weakening assertions or dropping test coverage.

After establishing a passing baseline, try to remove the generated "Vitest v4 compatibility" settings with no code changes or small, localized fixes:

1. Use the migration diff and generated comments to identify additions in root, workspace, and inline project configs. Read each linked explanation and check the effective setting after removal, including inherited values. Preserve pre-existing user settings and settings whose origin is unclear.
2. Remove one added setting at a time and first run the affected projects and suites without code changes. If needed, make small, localized application, test, or setup fixes that preserve test intent, such as correcting a locator or adjusting mock setup in a few tests. Do not weaken assertions, accept snapshot changes without review, or reduce the test set. For fakeTimers.toNotFake, remove only the added Temporal entry and preserve other exclusions. Do not weaken coverage enforcement: retain glob-threshold perFile: true unless I approve aggregate checking, even if coverage passes.
3. Keep a removal only when the affected tests pass and still execute the same tests without new skips. Remove that setting's generated comment too. If removal requires widespread test edits or shared setup refactoring, keep compatibility for now and report the follow-up work. Restore the setting and its comment if validation still fails, cannot run, or leaves uncertainty about behavior. Undo only cleanup-specific trial edits; preserve completed migration fixes and unrelated work.
4. Run the full validation commands again with the accepted removals together. Report each candidate's config path, removed or retained status, code changes, commands and results, and the reason for retaining it. Distinguish a deferred rewrite from a setting you could not validate.

Report the migration changes and unresolved findings as well. Do not commit or push unless I ask.`;
</script>

# Переход на Vite+ {#migrate-to-vite}

`vp migrate` помогает перенести существующие проекты на Vite+.

## Обзор {#overview}

Эта команда — отправная точка для объединения отдельных настроек Vite, Vitest, Oxlint, Oxfmt, ESLint, Prettier и tsup в Vite+.

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
- Для монорепозитория целевой директорией должен быть корень workspace. Vite+ не может выполнить миграцию отдельного участника workspace, поскольку миграция изменяет конфигурацию пакетного менеджера, каталоги и lock-файлы, общие для всех участников.

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
- Обновляет сценарии на командный интерфейс Vite+
- Может настроить хуки коммитов
- Может записать конфигурационные файлы агента и редактора
- Форматирует мигрированный проект

Точное описание изменений зависимостей, переписывания исходного кода и поведения менеджеров пакетов см. в разделе [Правила миграции](./migrate-rules.md).

Большинству проектов после выполнения `vp migrate` потребуются дополнительные ручные правки.

Для обновления до Vitest v5 ознакомьтесь с [настройками совместимости и контрольным списком проверки](./vitest-v5.md) и [руководством по миграции исходного Vitest](https://vitest.dev/guide/migration/). Предварительная проверка определяет исходную версию раннера и среду выполнения Node.js до обновления зависимостей. Сохраните исходный lock-файл и устраните блокирующие замечания перед повторной попыткой.

## Рекомендуемый рабочий процесс {#recommended-workflow}

Перед запуском миграции:

- Для проектов, которые ещё не используют Vite+, сначала обновите Vite до версии 8+ и Vitest до версии 4.1+.
- Убедитесь, что вы понимаете все существующие настройки линтера, форматирования или тестов, которые нужно сохранить

После выполнения миграции:

- Выполните `vp install`
- Выполните `vp check`
- Выполните `vp test`
- Выполните `vp build` (или `vp pack`, если вы собираете библиотеку)

## Промпт для миграции {#migration-prompt}

Если вы хотите передать эту работу агенту кодирования (или если вы сами агент кодирования!), используйте следующий промпт для миграции:

```md
Migrate this project to Vite+. Vite+ replaces the current split tooling around runtime management, package management, dev/build/test commands, linting, formatting, and packaging. Run `vp help` to understand Vite+ capabilities and `vp help migrate` before making changes. Use `vp migrate --no-interactive` in the workspace root. Make sure the project is using Vite 8+ and Vitest 4.1+ before migrating.

After the migration:

- Confirm `vite` imports were rewritten to `vite-plus` where needed
- Confirm Vitest and browser imports use supported `vite-plus/test*` entries; keep community WebDriverIO provider imports on `@vitest/browser-webdriverio`
- On pnpm, keep the `vite`, `vitest` dependency entries configured by `vp migrate` so the workspace aliases and overrides stay effective; with other package managers, you can remove them once those rewrites are confirmed
- Move remaining tool-specific config into the appropriate blocks in `vite.config.ts`

Command mapping to keep in mind:

- `vp run <script>` is the equivalent of `pnpm run <script>`
- `vp dev` and `vp test` always run the built-ins; `vp run dev` and `vp run test` run the `dev` and `test` scripts from `package.json`
- `vp install`, `vp add`, and `vp remove` delegate through the package manager declared by `packageManager`
- `vp dev`, `vp build`, `vp preview`, `vp lint`, `vp fmt`, `vp check`, and `vp pack` replace the corresponding standalone tools
- Prefer `vp check` for validation loops

Finally, verify the migration by running: `vp install`, `vp check`, `vp test`, and `vp build`

Summarize the migration at the end and report any manual follow-up still required.
```

## Обновление с Vite+ 0.3 до 1.0 {#upgrade-from-vite-0-3-to-1-0}

Vite+ 1.0 включает критические изменения из Vitest 5. Ознакомьтесь с [руководством Vite+ по совместимости](./vitest-v5.md) вместе с [руководством по миграции исходного Vitest](https://vitest.dev/guide/migration/).

Сохраняйте исходные зависимости и lock-файл проекта до тех пор, пока миграция не определит старую версию раннера. Предварительное обновление зависимостей проекта может помешать миграции сохранить поведение v4. Используйте один из следующих способов из корня workspace.

### С глобальным CLI {#with-the-global-cli}

Обновите [глобальный CLI](./upgrade.md#global-vp) до целевого выпуска 1.0, затем выполните `vp migrate --no-interactive`. Для предварительной версии следуйте [инструкциям по установке preview-версии](./upgrade.md#global-vp-preview).

### Без глобального CLI {#without-the-global-cli}

Используйте существующую среду выполнения Node.js, которая соответствует `^22.18.0 || ^24.11.0 || >=26.0.0`. Запустите целевой мигратор через менеджер пакетов, не добавляя его предварительно в проект. Для выпуска `1.0.0`:

::: code-group

```bash [pnpm]
pnpm dlx --package=vite-plus@1.0.0 vp migrate --no-interactive
```

```bash [npm]
npx --package=vite-plus@1.0.0 vp migrate --no-interactive
```

:::

Замените `1.0.0` на целевой выпуск. Для предварительной версии используйте версию из PR и перед командой `vp` передайте `--registry=https://registry-bridge.viteplus.dev` в `pnpm` или `npx`. Явно укажите версию в `--package`, чтобы запустить целевой мигратор, а не старый локальный CLI.

После миграции завершите установку зависимостей и выполните проверку с обновлённым локальным CLI:

::: code-group

```bash [pnpm]
pnpm install
pnpm exec vp check
pnpm exec vp test
pnpm exec vp build
```

```bash [npm]
npm install
npm exec -- vp check
npm exec -- vp test
npm exec -- vp build
```

:::

Используйте `vp pack` вместо `vp build` для библиотеки, которая использует команду pack. Также запустите настроенные наборы тестов для браузера, проверки покрытия и бенчмарков.

### Проверьте обновление {#review-the-upgrade}

Для существующего проекта Vite+ используйте стандартный процесс обновления. Добавьте `--full`, если хотите также повторить настройку проекта. Устраните блокирующие проблемы и проверьте отчёт с указанием конкретных файлов перед фиксацией изменений. Подробнее об области действия каждого режима см. в разделе [Обновление и полная настройка](./migrate-rules.md#upgrade-vs-full-setup).

После того как мигрированный проект успешно пройдёт проверку, [проверьте, можно ли удалить сгенерированные настройки совместимости с v4](./vitest-v5.md#remove-unneeded-compatibility-settings) без изменений в коде или с небольшими локализованными исправлениями. Пока оставьте настройки совместимости, если их удаление требует значительных изменений тестов или вы не можете проверить результат.

### Промпт для копирования {#copy-promt}

Откройте и предоставьте этот промпт своему агенту для написания кода, чтобы обновить существующий проект Vite+ 0.3:

<CopyPrompt :prompt="upgradePrompt" label="Посмотреть промпт обновления" />

## Миграции для конкретных инструментов {#tool-specific-migrations}

### Vitest

Vitest автоматически мигрируется через `vp migrate`. `vite-plus` повторно экспортирует upstream `vitest@5.0.1` через `vite-plus/test*`, поэтому для тестов в Node.js достаточно одной установки `vite-plus` — теперь больше не нужно устанавливать `vitest` напрямую.

Для режима браузера можно использовать базовую среду выполнения браузера (`@vitest/browser`) и провайдер Preview (`@vitest/browser-preview`), входящие в `vite-plus`. Для использования Playwright или WebDriverIO также потребуется соответствующий подключаемый провайдер (`@vitest/browser-playwright` или `@vitest/browser-webdriverio`) и его peer-зависимость фреймворка (`playwright` или `webdriverio`).

`vp migrate` добавляет провайдер Playwright с версией, соответствующей входящей в комплект версии Vitest, и обеспечивает наличие его peer-зависимости фреймворка. Импортировать его можно из `vite-plus/test/browser-playwright`.

Для WebDriverIO используйте импорт из поддерживаемого сообществом `@vitest/browser-webdriverio`. Миграция восстанавливает устаревшие импорты провайдера Vite+, обеспечивает версию провайдера не ниже `5.0.0` и добавляет переопределение `@vitest/browser`, соответствующее входящей в комплект версии раннера. Последующие обновления провайдера и peer-зависимостей фреймворка выполняйте самостоятельно. См. [Провайдер WebDriverIO от сообщества](./vitest-v5.md#community-webdriverio-provider).

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

Если существующая политика хуков не управляет этим процессом, `vp migrate` может перенести поддерживаемые правила `lint-staged`, а также удалить старую конфигурацию и зависимость.

Если существующий инструмент для хуков сохраняется, оставьте `lint-staged` на месте до тех пор, пока вручную не перенесёте эту политику хуков.

Подробнее см. в [руководстве по хукам коммитов](/guide/commit-hooks) и [справочнике конфигурации Staged](/config/staged).

### Инструменты для Git-хуков {#git-hook-tools}

Команда `vp migrate` не выполняет автоматическую конвертацию настроек Husky. Если обнаружен Husky, Vite+ оставляет его хуки, скрипты жизненного цикла, конфигурацию и зависимости без изменений и выводит предупреждение. Вы можете выполнить миграцию проекта вручную, используя [руководство по хукам коммитов](/guide/commit-hooks).

Существующие принадлежащие проекту хуки Vite+ также сохраняются. Рабочий процесс `staged` по умолчанию добавляется только в том случае, если не обнаружено существующей политики хуков.

Если ваш проект использует `lefthook`, `simple-git-hooks` или `yorkie`, `vp migrate` оставит существующую конфигурацию без изменений и выведет предупреждение. Это произойдёт даже в том случае, если вы согласитесь настроить хуки в интерактивном режиме или передадите флаг `--hooks`.

Если вы хотите вручную перейти с одного из этих инструментов на Vite+, выполните следующие шаги. Сначала перенесите команды, выполняемые для индексированных файлов, в блок `staged` файла `vite.config.ts`. Затем обновите сценарий жизненного цикла так, чтобы он запускал `vp config`. После этого создайте хук Vite+ `.vite-hooks/pre-commit`, который будет запускать `vp staged`. Выполните `vp hooks enable` (или `vp config`), чтобы установить диспетчер и задать `core.hooksPath`. Наконец, убедившись, что хук Vite+ работает корректно, удалите конфигурацию и зависимость старого инструмента.

Используйте `vp hooks status`, чтобы проверить, активен ли диспетчер, а `vp hooks disable`, если нужно снова отключить его в этом клоне. Подробнее о полной настройке хуков Vite+ см. в [руководстве по хукам коммитов](/guide/commit-hooks).

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
