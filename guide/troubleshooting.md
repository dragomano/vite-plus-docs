# Решение проблем {#troubleshooting}

Используйте эту страницу, если Vite+ ведёт себя не так, как вы ожидаете.

::: warning
Vite+ всё ещё находится на стадии alpha. Мы часто вносим изменения, быстро добавляем новые возможности и хотим получать обратную связь, чтобы сделать его лучше.
:::

## Поддерживаемые версии инструментов {#supported-tool-versions}

Vite+ рассчитан на использование современных версий базовых инструментов.

- Vite 8 или новее
- Vitest 4.1 или новее

Если вы переносите существующий проект и он всё ещё зависит от более старых версий Vite или Vitest, сначала обновите их, а затем переходите на Vite+.

## `vp check` не запускает линтинг с учётом типов или проверку типов {#vp-check-does-not-run-type-aware-lint-rules-or-type-checks}

- Убедитесь, что в `vite.config.ts` включены `lint.options.typeAware` и `lint.options.typeCheck`
- Проверьте, использует ли ваш `tsconfig.json` параметр `compilerOptions.baseUrl`

Путь проверки типов Oxlint на базе `tsgolint` не поддерживает `baseUrl`.
Команды `vp migrate` и `vp lint --init` пытаются выполнить исправление `vp dlx @andrewbranch/ts5to6 --fixBaseUrl .` перед включением линтинга с учётом типов. Если это исправление завершается ошибкой или пользователь отказывается от его применения, Vite+ пропускает включение `typeAware` и `typeCheck`.

## Расширение VS Code не читает `vite.config.ts` {#vs-code-extension-does-not-read-vite-config-ts}

Если в VS Code открыто несколько папок, общий языковой сервер Oxc может выбрать другое рабочее пространство. Из-за этого может показаться, что поддержка `vite.config.ts` отсутствует.

- Убедитесь, что расширение использует нужное рабочее пространство.

## `vp build` не запускает мой скрипт сборки {#vp-build-does-not-run-my-build-script}

В отличие от менеджеров пакетов, встроенные команды нельзя переопределить. Если вы пытаетесь запустить скрипт из `package.json`, используйте вместо этого `vp run build`.

Например:

- `vp build` всегда запускает встроенную сборку Vite
- `vp test` всегда запускает встроенную команду Vitest
- `vp run build` и `vp run test` запускают скрипты из `package.json`

::: info
Вы также можете запускать пользовательские задачи, определённые в `vite.config.ts`, и полностью отказаться от скриптов в `package.json`.
:::

## Проверки индексированных файлов и хуки коммитов {#staged-checks-and-commit-hooks}

Если `vp staged` завершается ошибкой или ваш pre-commit-хук не запускается:

- убедитесь, что `vite.config.ts` содержит блок `staged`
- выполните `vp config` для установки хуков
- проверьте, не была ли установка хуков намеренно отключена через `VITE_GIT_HOOKS=0`

Минимальная конфигурация `staged` выглядит так:

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
});
```

## Медленная загрузка конфигурации из-за тяжёлых плагинов {#slow-config-loading-caused-by-heavy-plugins}

Если `vite.config.ts` импортирует тяжёлые плагины на верхнем уровне, каждый `import` вычисляется заранее даже для таких команд, как `vp lint` или `vp fmt`, которым эти плагины не нужны. Это может заметно замедлять загрузку конфигурации.

Используйте `lazyPlugins` для отложенной загрузки плагинов. Плагины будут загружаться только для команд, которым они действительно нужны (`dev`, `build`, `test`, `preview`), и будут пропускаться для всех остальных:

```ts [vite.config.ts]
import { defineConfig, lazyPlugins } from 'vite-plus';
import myPlugin from 'vite-plugin-foo';

export default defineConfig({
  plugins: lazyPlugins(() => [myPlugin()]),
});
```

Для тяжёлых плагинов, которые следует загружать лениво, используйте динамический `import()`:

```ts [vite.config.ts]
import { defineConfig, lazyPlugins } from 'vite-plus';

export default defineConfig({
  plugins: lazyPlugins(async () => {
    const { default: heavyPlugin } = await import('vite-plugin-heavy');
    return [heavyPlugin()];
  }),
});
```

## Как получить помощь {#asking-for-help}

Если вы столкнулись с проблемой, обратитесь за помощью:

- [Discord](https://discord.gg/cAnsqHh5PX) — для обсуждений в реальном времени и помощи в устранении неполадок
- [GitHub](https://github.com/voidzero-dev/vite-plus) — для сообщений об ошибках, обсуждений и создания ишью

При сообщении о проблеме обязательно укажите:

- Полный вывод команд `vp env current` и `vp --version`
- Менеджер пакетов, используемый в проекте
- Точные шаги для воспроизведения проблемы и ваш файл `vite.config.ts`
- Минимальный репозиторий для воспроизведения или запускаемую песочницу
