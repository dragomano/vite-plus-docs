# Команда `vp lint` {#lint}

`vp lint` выполняет линтинг кода с помощью Oxlint.

## Обзор {#overview}

`vp lint` основан на [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) — линтере из экосистемы Oxc. Oxlint разработан как быстрая замена ESLint для большинства фронтенд-проектов и включает встроенную поддержку основных правил ESLint, а также множества популярных правил сообщества.

Используйте `vp lint` для линтинга проекта, а `vp check` — для одновременного форматирования, линтинга и проверки типов.

## Использование {#usage}

```bash
vp lint
vp lint --fix
vp lint --type-aware
```

## Конфигурация {#configuration}

Размещайте конфигурацию линтинга непосредственно в блоке `lint` корневого `vite.config.ts`, чтобы вся конфигурация оставалась в одном месте. Мы не рекомендуем использовать `oxlint.config.ts` или `.oxlintrc.json` с Vite+.

`vp lint` находит конфигурацию, начиная с рабочего каталога, поэтому каталоги пакетов без собственного блока `lint` используют корневую конфигурацию. Относительные аргументы с путями к файлам сохраняют своё значение. Используйте [`lint.overrides`](/guide/monorepo#root-config-with-overrides) для правил, специфичных для файла или пакета, вместо добавления блоков `lint` в конфигурации пакетов.

`vp check` использует блок `lint` из корневой конфигурации workspace, если он существует, в том числе при запуске из каталога пакета. Конфигурации пакетов не могут заменять эти настройки `lint` в `vp check`.

Явный вызов `vp lint -c <path>` или `vp lint --config <path>` выбирает другую конфигурацию. В противном случае Oxlint находит ближайший файл `vite.config.*` с блоком `lint`. Поддерживаются расширения `.js`, `.mjs`, `.ts`, `.cjs`, `.mts` и `.cts`. Вложенные конфигурации не переопределяют настройки для отдельных файлов.

Подробную информацию о наборе правил, параметрах настройки и совместимости см. в [документации Oxlint](https://oxc.rs/docs/guide/usage/linter.html).

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  lint: {
    ignorePatterns: ['dist/**'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
});
```

## Линтинг с учётом типов {#type-aware-linting}

Мы рекомендуем включать одновременно `typeAware` и `typeCheck` в блоке `lint`:

- `typeAware: true` включает правила, которым требуется информация о типах TypeScript
- `typeCheck: true` включает полноценную проверку типов во время линтинга

Этот механизм работает на базе [tsgolint](https://github.com/oxc-project/tsgolint), использующего инструментарий TypeScript 7 (также известный как TypeScript Go). Он предоставляет Oxlint доступ к информации о типах и позволяет выполнять проверку типов непосредственно с помощью `vp lint` и `vp check`.

## JS-плагины {#js-plugins}

Если вы переходите с ESLint и всё ещё зависите от нескольких важных ESLint-плагинов на JavaScript, Oxlint предоставляет [поддержку JS-плагинов](https://oxc.rs/docs/guide/usage/linter/js-plugins), которая поможет сохранить их работоспособность на время завершения миграции.

JS-плагины также позволяют [писать собственные правила](https://oxc.rs/docs/guide/usage/linter/writing-js-plugins.html) для Oxlint.

### Написание собственных правил {#writing-your-own-rules}

Импортируйте API для создания плагинов из `vite-plus/lint/plugins`:

```js [lint/my-plugin.js]
import { definePlugin, defineRule } from 'vite-plus/lint/plugins';

const noFoo = defineRule({
  meta: { messages: { noFoo: 'Do not name things "foo".' } },
  create(context) {
    return {
      Identifier(node) {
        if (node.name === 'foo') {
          context.report({ node, messageId: 'noFoo' });
        }
      },
    };
  },
});

export default definePlugin({
  meta: { name: 'my' },
  rules: { 'no-foo': noFoo },
});
```

Зарегистрируйте его в `lint.jsPlugins` и включите его правила:

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  lint: {
    jsPlugins: ['./lint/my-plugin.js'],
    rules: {
      'my/no-foo': 'error',
    },
  },
});
```

Для тестирования правил `RuleTester` доступен из `vite-plus/lint/plugins-dev`.

Обе точки входа повторно экспортируют копию, поставляемую вместе с Vite+. Поэтому API всегда соответствует встроенному в Vite+ Oxlint.

Используйте их вместо добавления `@oxlint/plugins` или `oxlint` в качестве прямой зависимости. Отдельно закреплённая версия может рассинхронизироваться с линтером, который загружает ваш плагин. Кроме того, она не будет разрешаться из файла плагина при строгой структуре pnpm, если каждый пакет, содержащий плагин, не объявляет её в зависимостях.

`vp migrate` автоматически переписывает существующие импорты `oxlint` и `@oxlint/plugins`. См. [Импорты JS-плагинов Oxlint](/guide/migrate-rules#oxlint-js-plugin-imports).

Правило `vite-plus/prefer-vite-plus-imports` сообщает о любых импортах, которые появились снова.
