# Первые шаги {#getting-started}

Vite+ — это унифицированный инструментарий и точка входа для веб-разработки.

Он объединяет [Vite](https://vite.dev/), [Vitest](https://vitest.dev/), [Oxlint](https://oxc.rs/docs/guide/usage/linter.html), [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html), [Rolldown](https://rolldown.rs/), [tsdown](https://tsdown.dev/) и [Vite Task](https://github.com/voidzero-dev/vite-task) в одном пакете [`vite-plus`](/guide/local-cli), обеспечивая чрезвычайно быстрый инструментарий для фронтенд-разработки.

Vite+ также поставляется с [глобальным CLI `vp`](/guide/global-cli), который управляет Node.js и менеджерами пакетов и упрощает использование Vite+ в разных проектах. Вы можете использовать любой из CLI независимо, но мы рекомендуем [использовать их вместе](/guide/global-cli#use-both-clis-together).

Если у вас уже есть проект на Vite, выполните [`vp migrate`](/guide/migrate), чтобы перенести его на Vite+, или передайте своему агенту для написания кода наш [промпт для миграции](/guide/migrate#migration-prompt).

Создаёте проект с помощью ИИ-ассистента? Посмотрите и скопируйте готовый промпт настройки:

<CopyPrompt />

## Установка `vp` глобально {#install-vp-globally}

Приведённые ниже команды устанавливают глобальный CLI `vp`, который управляет Node.js и менеджерами пакетов и делает `vp` доступным во всех проектах. Если вам нужен только фронтенд-инструментарий в одном проекте, вместо этого можно установить [локальный CLI проекта](/guide/local-cli#install).

### macOS / Linux

```bash
curl -fsSL https://vite.plus | bash
```

### Windows

```powershell
irm https://vite.plus/ps1 | iex
```

Альтернативно, скачайте и запустите [`vp-setup.exe`](https://setup.viteplus.dev).

::: tip Предупреждение SmartScreen
`vp-setup.exe` ещё не подписан цифровой подписью. Ваш браузер может показать предупреждение при скачивании. Нажмите **«...»** → **«Сохранить»** → **«Сохранить в любом случае»**, чтобы продолжить. Если Windows Defender SmartScreen заблокирует файл при запуске, нажмите **«Дополнительные сведения»** → **«Выполнить в любом случае»**.
:::

Сценарии установки и `vp-setup.exe` читают [переменные окружения](/guide/global-cli#installation-variables), такие как `VP_VERSION` и `VP_HOME`.

Если вы используете Nushell с пользовательскими каталогами XDG, перед установкой ознакомьтесь с [требованиями Nushell при запуске](/guide/global-cli#nushell-and-xdg-directories).

После установки откройте новый терминал и выполните:

```bash
vp help
```

::: info
Vite+ будет управлять вашей глобальной средой выполнения Node.js и менеджером пакетов. Если вы хотите отключить это поведение, выполните `vp env off`. Если вы решите, что Vite+ вам не подходит, введите `vp implode`, но, пожалуйста, [поделитесь с нами своим отзывом](https://discord.gg/cAnsqHh5PX).
:::

::: details Используете менее распространённую платформу (архитектуру процессора, ОС)?

Предварительно собранные бинарные файлы распространяются для следующих платформ (сгруппированы по [уровням поддержки платформ Node.js v24](https://github.com/nodejs/node/blob/v24.x/BUILDING.md#platform-list)):

- Уровень 1
  - Linux x64 glibc (`x86_64-unknown-linux-gnu`)
  - Linux arm64 glibc (`aarch64-unknown-linux-gnu`)
  - Windows x64 (`x86_64-pc-windows-msvc`)
  - macOS x64 (`x86_64-apple-darwin`)
  - macOS arm64 (`aarch64-apple-darwin`)
- Уровень 2
  - Windows arm64 (`aarch64-pc-windows-msvc`)
- Экспериментальные
  - Linux x64 musl (`x86_64-unknown-linux-musl`)
- Другие
  - Linux arm64 musl (`aarch64-unknown-linux-musl`)

Если предварительно собранный бинарный файл недоступен для вашей платформы, установка завершится ошибкой.

На Alpine Linux (musl) вам нужно установить `libstdc++` перед использованием Vite+:

```sh
apk add libstdc++
```

Это требуется, потому что управляемая среда выполнения Node.js из [неофициальных сборок](https://unofficial-builds.nodejs.org/) зависит от стандартной библиотеки GNU C++.

:::

## Быстрый старт {#quick-start}

После установки глобального CLI создайте проект, установите зависимости и используйте команды по умолчанию:

```bash
vp create # Создать новый проект
vp install # Установить зависимости
vp dev # Запустить dev-сервер
vp check # Форматировать, линтить, проверять типы
vp test # Запустить JavaScript-тесты
vp build # Собрать для продакшена
```

Также можно запустить `vp` без аргументов, чтобы открыть интерактивную командную строку. В конфигурации, использующей только локальный CLI, запускайте те же команды через менеджер пакетов, например `pnpm exec vp check`.

## Основные команды {#core-commands}

Vite+ охватывает полный цикл фронтенд-разработки — от создания проекта до разработки, проверок, тестирования и сборки для продакшена. Большинство команд доступны в обоих вариантах; команды для управления окружением на уровне машины и самостоятельного управления требуют глобального CLI.

### Установка проекта {#set-up-a-project}

- [`vp create`](/guide/create) создаёт новые приложения, пакеты и монорепозитории.
- [`vp migrate`](/guide/migrate) переносит существующие проекты на Vite+.
- [`vp install`](/guide/install) устанавливает зависимости с помощью подходящего менеджера пакетов.
- [`vp add`](/guide/install), [`vp remove`](/guide/install), [`vp update`](/guide/install), [`vp dedupe`](/guide/install), [`vp outdated`](/guide/install), [`vp list`](/guide/install), [`vp why`](/guide/install) и [`vp info`](/guide/install) охватывают остальные операции рабочего процесса управления пакетами.
- [`vp link`](/guide/install), [`vp unlink`](/guide/install), [`vp rebuild`](/guide/install) и [`vp pm <command>`](/guide/install) предоставляют низкоуровневые операции менеджера пакетов.

### Инструментарий проекта {#project-toolchain}

- [`vp check`](/guide/check) запускает форматирование, линтинг и проверку типов вместе.
- [`vp lint`](/guide/lint) и [`vp fmt`](/guide/fmt) напрямую запускают соответствующие проверки.
- [`vp test`](/guide/test) запускает тесты с помощью Vitest.
- [`vp dev`](/guide/dev) запускает сервер разработки на базе Vite.
- [`vp build`](/guide/build) собирает приложения, а [`vp preview`](/guide/build) позволяет локально просмотреть production-сборку.
- [`vp pack`](/guide/pack) собирает библиотеки или автономные артефакты.
- [`vp toolchain`](/guide/upgrade#show-the-toolchain) показывает активный инструментарий проекта; используйте `--global`, чтобы вместо этого проверить глобальную установку.
- [`vp run`](/guide/run) запускает задачи по рабочим пространствам с кэшированием.
- [`vp cache clean`](/guide/cache) очищает записи кэша задач.
- [`vp exec`](/guide/vpx) запускает локальные бинарные файлы проекта, а [`vp dlx`](/guide/vpx) и [`vpx`](/guide/vpx) скачивают и запускают бинарные файлы пакетов.
- [`vp config`](/guide/commit-hooks) устанавливает диспетчер Git-хуков и настраивает интеграцию с агентами.
- [`vp hooks`](/guide/commit-hooks) управляет диспетчером Git-хуков, а [`vp staged`](/guide/commit-hooks) запускает проверки для проиндексированных файлов.
- [Руководство по монорепозиториям](/guide/monorepo) посвящено структуре многопакетных проектов и соответствующим командам.

### Глобальный CLI {#global-cli}

- [`vp env`](/guide/env) управляет окружением Node.js и менеджеров пакетов, а [`vp node`](/guide/env) запускает скрипты в определённом окружении.
- [`vp upgrade`](/guide/upgrade) обновляет саму глобальную установку `vp`.
- [`vp implode`](/guide/implode) удаляет глобальную установку `vp` и связанные с Vite+ данные с вашего компьютера.

### Рабочий процесс {#workflow}

- [Интеграция с IDE](/guide/ide-integration), [CI](/guide/ci) и [Docker](/guide/docker) охватывают распространённые среды разработки и развёртывания.

### Справочник {#reference}

- [Решение проблем](/guide/troubleshooting) посвящен распространённым проблемам с командами, конфигурацией и интеграцией.

::: info
Vite+ поставляется с множеством предопределённых команд, таких как `vp build`, `vp test` и `vp dev`. Эти команды встроенные и не могут быть изменены. Если вы хотите запустить команду из сценариев `package.json`, используйте `vp run <command>` или `vpr <command>`.

[Подробнее о `vp run`.](/guide/run)
:::
