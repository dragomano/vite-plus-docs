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

Размещайте настройки линтинга непосредственно в блоке `lint` файла `vite.config.ts`, чтобы вся конфигурация находилась в одном месте. Мы не рекомендуем использовать `oxlint.config.ts` или `.oxlintrc.json` вместе с Vite+.

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

Этот режим основан на [tsgolint](https://github.com/oxc-project/tsgolint), работающем поверх TypeScript Go toolchain. Он предоставляет Oxlint доступ к информации о типах и позволяет выполнять проверку типов напрямую через `vp lint` и `vp check`.

## JS-плагины {#js-plugins}

Если вы переходите с ESLint и всё ещё зависите от нескольких важных ESLint-плагинов на JavaScript, Oxlint предоставляет [поддержку JS-плагинов](https://oxc.rs/docs/guide/usage/linter/js-plugins), которая поможет сохранить их работоспособность на время завершения миграции.
