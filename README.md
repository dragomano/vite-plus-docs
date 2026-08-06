<p align="center">
  <a href="https://plus.vite-docs.ru" target="_blank" rel="noopener noreferrer">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/voidzero-dev/vite-plus/refs/heads/main/logo-dark.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/voidzero-dev/vite-plus/refs/heads/main/logo.svg">
      <img alt="Vite+" src="https://raw.githubusercontent.com/voidzero-dev/vite-plus/refs/heads/main/logo.svg" height="60">
    </picture>
  </a>
</p>

**Единый набор инструментов для веб-разработки**
_рантайм и управление пакетами, создание проектов, разработка, проверки, тестирование, сборка, упаковка и кэширование задач монорепозиториев — в одной зависимости_

---

Vite+ — это единая точка входа для локальной веб-разработки. Он объединяет [Vite](https://vite-docs.ru/), [Vitest](https://vitest.dev/), [Oxlint](https://oxc.rs/docs/guide/usage/linter.html), [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html), [Rolldown](https://rolldown.rs/), [tsdown](https://tsdown.ru/) и [Vite Task](https://github.com/voidzero-dev/vite-task) в единый инструмент с нулевой конфигурацией, который также управляет рантаймом и рабочими процессами пакетных менеджеров:

- **`vp env`:** управление Node.js на глобальном уровне и для отдельных проектов
- **`vp install`:** установка зависимостей с автоматическим определением пакетного менеджера
- **`vp dev`:** запуск быстрого dev-сервера Vite на основе нативных ESM с мгновенной HMR
- **`vp check`:** запуск форматирования, линтинга и проверки типов одной командой
- **`vp test`:** запуск тестов с помощью встроенного Vitest
- **`vp build`:** сборка приложений для продакшена с использованием Vite + Rolldown
- **`vp run`:** запуск скриптов из `package.json` и задач монорепозиториев с кэшированием и планированием зависимостей
- **`vp pack`:** сборка библиотек для публикации в npm или автономных бинарных приложений
- **`vp create` / `vp migrate`:** создание новых проектов и миграция существующих

Всё это настраивается из корня проекта и работает со всей экосистемой фреймворков Vite.

Vite+ полностью открыт и распространяется по лицензии MIT.

## Начало работы

Установите Vite+ глобально под именем `vp`:

Для Linux или macOS:

```bash
curl -fsSL https://vite.plus | bash
```

Для Windows:

```bash
irm https://viteplus.dev/install.ps1 | iex
```

`vp` управляет всем циклом разработки: установкой зависимостей, запуском серверов разработки, линтингом, форматированием, тестированием и сборкой для продакшена.

## Настройка Vite+

Vite+ можно настроить с помощью единственного файла `vite.config.ts` в корне проекта:

```ts
import { defineConfig } from 'vite-plus';

export default defineConfig({
  // Стандартная конфигурация Vite для dev/build/preview.
  plugins: [],

  // Конфигурация Vitest.
  test: {
    include: ['src/**/*.test.ts'],
  },

  // Конфигурация Oxlint.
  lint: {
    ignorePatterns: ['dist/**'],
  },

  // Конфигурация Oxfmt.
  fmt: {
    semi: true,
    singleQuote: true,
  },

  // Конфигурация Vite Task.
  run: {
    tasks: {
      'generate:icons': {
        command: 'node scripts/generate-icons.js',
        envs: ['ICON_THEME'],
      },
    },
  },

  // Конфигурация `vp staged`.
  staged: {
    '*': 'vp check --fix',
  },
});
```

Это позволяет хранить в одном месте конфигурацию сервера разработки, сборки, тестирования, линтинга, форматирования, запуска задач и обработки индексируемых файлов, используя типобезопасную конфигурацию и общие настройки по умолчанию.

Используйте `vp migrate` для перехода на Vite+. Эта команда объединяет конфигурации отдельных инструментов, такие как `.oxlintrc*`, `.oxfmtrc*` и конфигурацию lint-staged, в файл `vite.config.ts`.

### Рабочие процессы CLI (`vp help`)

#### Начало работы

- **create** — создать новый проект из шаблона
- **migrate** — перенести существующий проект на Vite+
- **config** — настроить хуки и интеграцию с AI-агентами
- **staged** — запустить линтеры для индексируемых файлов
- **install** (`i`) — установить зависимости
- **env** — управлять версиями Node.js

#### Разработка

- **dev** — запустить сервер разработки
- **check** — выполнить форматирование, линтинг и проверку типов
- **lint** — выполнить линтинг кода
- **fmt** — отформатировать код
- **test** — запустить тесты

#### Выполнение

- **run** — запустить задачи монорепозитория
- **exec** — выполнить команду из локального `node_modules/.bin`
- **node** — запустить Node.js-скрипт с использованием окружения, настроенного Vite+
- **dlx** — выполнить бинарный файл пакета без установки его в зависимости проекта
- **cache** — управлять кэшем задач

#### Сборка

- **build** — собрать проект для продакшена
- **pack** — собрать библиотеки
- **preview** — просмотреть продакшен-сборку

#### Управление зависимостями

Vite+ автоматически использует ваш пакетный менеджер (pnpm, npm, Yarn или Bun) на основе параметра `packageManager` и lock-файлов:

- **add** — добавить пакеты в зависимости
- **remove** (`rm`, `un`, `uninstall`) — удалить пакеты из зависимостей
- **update** (`up`) — обновить пакеты до последних версий
- **dedupe** — устранить дублирование зависимостей
- **outdated** — проверить наличие устаревших пакетов
- **list** (`ls`) — вывести список установленных пакетов
- **why** (`explain`) — показать, почему пакет установлен
- **info** (`view`, `show`) — просмотреть информацию о пакете из реестра
- **link** (`ln`) / **unlink** — управлять локальными ссылками на пакеты
- **rebuild** — пересобрать нативные модули
- **pm** — передать команду пакетному менеджеру

#### Обслуживание

- **upgrade** — обновить сам `vp` до последней версии
- **implode** — удалить `vp` и все связанные с ним данные

### Создание первого проекта Vite+

Используйте `vp create`, чтобы создать новый проект:

```bash
vp create
```

Вы можете запускать `vp create` внутри существующего проекта, чтобы добавлять в него новые приложения или библиотеки.

Организации могут предоставлять собственный набор шаблонов в рамках своего npm-пространства имён, публикуя пакет `@org/create` с манифестом `createConfig.templates` в файле `package.json`.

После публикации команда `vp create @org` откроет интерактивный выбор доступных шаблонов, а установка `create: { defaultTemplate: '@org' }` в `vite.config.ts` сделает этот набор шаблонов используемым по умолчанию для команды `vp create` без аргументов.

Подробности о создании таких шаблонов см. в руководстве [Шаблоны организации](https://plus.vite-docs.ru/guide/create#organization-templates), а описание параметра конфигурации — в документации [`create.defaultTemplate`](https://plus.vite-docs.ru/config/create).

### Миграция существующего проекта

Вы можете перенести существующий проект на Vite+:

```bash
vp migrate
```

### GitHub Actions

Используйте официальный экшен [`setup-vp`](https://github.com/voidzero-dev/setup-vp) для установки Vite+ в GitHub Actions:

```yaml
- uses: voidzero-dev/setup-vp@v1
  with:
    node-version: '22'
    cache: true
```

#### Ручная установка и миграция

Если вы вручную переносите проект на Vite+, сначала установите следующие зависимости для разработки:

```bash
npm install -D vite-plus @voidzero-dev/vite-plus-core@latest
```

Необходимо добавить переопределения в ваш пакетный менеджер, чтобы другие пакеты использовали версии, поставляемые с Vite+: создайте алиас `vite` на `@voidzero-dev/vite-plus-core` и зафиксируйте версию `vitest` на ту, которую включает Vite+ (выполните `vp --version`), чтобы весь проект использовал единственную копию Vitest вместе с `vp test`.

Без фиксации версии `vitest` зависимость или пакет из рабочего пространства может подтянуть другую версию Vitest, что приведёт к разделению внутренних компонентов Vitest (моков, `expect`, состояния раннера):

```json
"overrides": {
  "vite": "npm:@voidzero-dev/vite-plus-core@latest",
  "vitest": "4.1.10"
}
```

Если вы используете `pnpm`, добавьте это в свой `pnpm-workspace.yaml`:

```yaml
overrides:
  vite: npm:@voidzero-dev/vite-plus-core@latest
  vitest: 4.1.10
```

Или, если вы используете Yarn:

```json
"resolutions": {
  "vite": "npm:@voidzero-dev/vite-plus-core@latest",
  "vitest": "4.1.10"
}
```
