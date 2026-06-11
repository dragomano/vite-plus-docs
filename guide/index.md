# Первые шаги {#getting-started}

Vite+ — это унифицированный инструментарий и точка входа для веб-разработки. Он управляет вашей средой выполнения, менеджером пакетов и фронтенд-инструментарием в одном месте, объединяя [Vite](https://vite-docs.ru/), [Vitest](https://vitest.dev/), [Oxlint](https://oxc.rs/docs/guide/usage/linter.html), [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html), [Rolldown](https://rolldown.rs/), [tsdown](https://tsdown.ru/) и [Vite Task](https://github.com/voidzero-dev/vite-task).

Vite+ поставляется в двух частях: `vp` — глобальный инструмент командной строки и `vite-plus` — локальный пакет, устанавливаемый в каждом проекте. Если у вас уже есть проект на Vite, используйте [`vp migrate`](/guide/migrate) для миграции его в Vite+ или вставьте наш [промпт миграции](/guide/migrate#migration-prompt) в вашего AI-агента.

Создаёте проект с помощью ИИ-ассистента? Скопируйте готовый промпт настройки:

<CopyPrompt />

## Установка `vp` {#install-vp}

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

Создайте проект, установите зависимости и используйте команды по умолчанию:

```bash
vp create # Создать новый проект
vp install # Установить зависимости
vp dev # Запустить dev-сервер
vp check # Форматировать, линтить, проверять типы
vp test # Запустить JavaScript-тесты
vp build # Собрать для продакшена
```

Вы также можете просто запустить `vp` самостоятельно и использовать интерактивную командную строку.

## Основные команды {#core-commands}

Vite+ может полностью управлять циклом локальной фронтенд-разработки: от создания проекта, разработки, проверки и тестирования до сборки для продакшена.

### Создание {#start}

- [`vp create`](/guide/create) создаёт новые приложения, пакеты и монорепозитории.
- [`vp migrate`](/guide/migrate) переносит существующие проекты на Vite+.
- [`vp config`](/guide/commit-hooks) настраивает хуки коммитов и интеграцию с агентами.
- [`vp staged`](/guide/commit-hooks) запускает проверки для staged-файлов.
- [`vp install`](/guide/install) устанавливает зависимости с помощью подходящего менеджера пакетов.
- [`vp env`](/guide/env) управляет версиями Node.js.

### Разработка {#develop}

- [`vp dev`](/guide/dev) запускает dev-сервер на базе Vite.
- [`vp check`](/guide/check) запускает форматирование, линтинг и проверку типов вместе.
- [`vp lint`](/guide/lint), [`vp fmt`](/guide/fmt) и [`vp test`](/guide/test) позволяют запускать эти инструменты напрямую.

### Выполнение {#execute}

- [`vp run`](/guide/run) запускает задачи по рабочим пространствам с кэшированием.
- [`vp cache clean`](/guide/cache) очищает записи кэша задач.
- [`vpx`](/guide/vpx) скачивает и запускает бинарные файлы глобально.
- [`vp exec`](/guide/vpx) запускает бинарные файлы из локального проекта.
- [`vp dlx`](/guide/vpx) скачивает и запускает бинарные файлы пакетов без добавления их в зависимости.

### Сборка {#build}

- [`vp build`](/guide/build) собирает приложения.
- [`vp pack`](/guide/pack) собирает библиотеки или автономные артефакты.
- [`vp preview`](/guide/build) локально просматривает продакшен-сборку.

### Управление зависимостями {#manage-dependencies}

- [`vp add`](/guide/install), [`vp remove`](/guide/install), [`vp update`](/guide/install), [`vp dedupe`](/guide/install), [`vp outdated`](/guide/install), [`vp why`](/guide/install) и [`vp info`](/guide/install) оборачивают рабочие процессы менеджера пакетов.
- [`vp pm <command>`](/guide/install) напрямую вызывает команды другого менеджера пакетов.

### Обслуживание {#maintain}

- [`vp upgrade`](/guide/upgrade) обновляет саму установку `vp`.
- [`vp implode`](/guide/implode) удаляет `vp` и связанные данные Vite+ с вашего компьютера.

::: info
Vite+ поставляется с множеством предопределённых команд, таких как `vp build`, `vp test` и `vp dev`. Эти команды встроенные и не могут быть изменены. Если вы хотите запустить команду из скриптов `package.json`, используйте `vp run <command>` или `vpr <command>`.

[Подробнее о `vp run`.](/guide/run)
:::
