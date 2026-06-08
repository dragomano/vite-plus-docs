# Создание проекта {#creating-a-project}

`vp create` интерактивно создаёт каркас новых проектов Vite+, монорепозиториев и приложений внутри существующих рабочих пространств.

## Обзор {#overview}

Команда `create` — это самый быстрый способ начать работу с Vite+. Её можно использовать несколькими способами:

- Создать новый монорепозиторий Vite+
- Создать новое отдельное приложение или библиотеку
- Добавить новое приложение или библиотеку внутри существующего проекта

Эту команду можно использовать со встроенными шаблонами, шаблонами сообщества или удалёнными шаблонами с GitHub.

## Использование {#usage}

```bash
vp create
vp create <template>
vp create <template> -- <template-options>
```

## Встроенные шаблоны {#built-in-templates}

Vite+ поставляется со следующими встроенными шаблонами:

- `vite:monorepo` создаёт новый монорепозиторий
- `vite:application` создаёт новое приложение
- `vite:library` создаёт новую библиотеку
- `vite:generator` создаёт новый генератор

## Источники шаблонов {#template-sources}

`vp create` не ограничен только встроенными шаблонами.

- Используйте сокращённые шаблоны, такие как `vite`, `@tanstack/start`, `svelte`, `next-app`, `nuxt`, `react-router` и `vue`
- Используйте полные имена пакетов, такие как `create-vite` или `create-next-app`
- Используйте локальные шаблоны, например `./tools/create-ui-component` или `@your-org/generator-*`
- Используйте удалённые шаблоны, такие как `github:user/repo` или `https://github.com/user/template-repo`

Выполните `vp create --list`, чтобы увидеть встроенные шаблоны и распространённые сокращённые шаблоны, которые распознаёт Vite+.

## Параметры {#options}

- `--directory <dir>` записывает сгенерированный проект в указанную целевую директорию
- `--agent <name>` создаёт файлы с инструкциями для агента во время генерации проекта
- `--editor <name>` записывает конфигурационные файлы редактора
- `--git` инициализирует git-репозиторий
- `--no-git` пропускает инициализацию git-репозитория
- `--hooks` включает настройку pre-commit хука
- `--no-hooks` пропускает настройку хуков
- `--no-interactive` запускает без запросов
- `--verbose` показывает подробный вывод процесса генерации проекта
- `--list` выводит доступные встроенные и популярные шаблоны

## Параметры шаблонов {#template-options}

Аргументы после `--` передаются напрямую выбранному шаблону.

Это важно, когда сам шаблон принимает флаги. Например, вы можете передать выбор шаблона Vite следующим образом:

```bash
vp create vite -- --template react-ts
```

## Примеры {#examples}

```bash
# Интерактивный режим
vp create

# Создаём монорепозиторий, приложение, библиотеку или генератор Vite+
vp create vite:monorepo
vp create vite:application
vp create vite:library
vp create vite:generator

# Используем сокращённые шаблоны сообщества
vp create vite
vp create @tanstack/start
vp create svelte

# Используем полные имена пакетов
vp create create-vite
vp create create-next-app

# Используем удалённые шаблоны
vp create github:user/repo
vp create https://github.com/user/template-repo
```

## Шаблоны организации {#organization-templates}

Организация может публиковать курируемый набор шаблонов под общим организационным префиксом (`@org`), выпустив пакет `@org/create`, в `package.json` которого находится манифест `createConfig.templates`. После публикации команда `vp create @org` открывает интерактивный селектор из этих шаблонов.

### Выбор из организации {#pick-from-an-org}

```bash
# Открываем интерактивный селектор по манифесту @your-org/create
vp create @your-org

# Запускаем конкретную запись из манифеста напрямую
vp create @your-org:web

# Указываем точную версию или dist-tag
vp create @your-org@1.2.3
vp create @your-org:web@next

# Создаём организацию шаблоном по умолчанию для репозитория (см. настройку create.defaultTemplate)
vp create
```

Под капотом команда `vp create @org` преобразуется в пакет `@org/create` (согласно существующему соглашению npm `create-*`). Если в этом пакете отсутствует поле `createConfig.templates`, Vite+ просто запускает пакет обычным способом. Поэтому добавление манифеста совершенно безопасно для организаций, которые уже публикуют `@org/create`.

Приватные реестры работают автоматически: Vite+ читает файлы `.npmrc` из корня проекта и домашней директории (`~/`), учитывая маппинги скоупов `@your-org:registry=...` и учётные данные `//host/:_authToken=...`.

### Создание пакета `@org/create` {#authoring-org-create}

Существует два распространённых подхода к структуре. Выберите тот, который лучше соответствует количеству шаблонов и частоте их обновления в вашей организации.

**Всё в одном пакете (рекомендуется для большинства организаций).** Все шаблоны находятся в подпапках самого пакета `@org/create`. В манифесте используются относительные пути `./path`. Один репозиторий, одна публикация, одна история версионирования — тот же подход, который используют `create-vite` и `create-next-app`.

```
@your-org/create/
├── package.json              # "createConfig": { "templates": [{ "template": "./templates/web" }, ...] }
├── templates/
│   ├── web/
│   │   ├── package.json
│   │   └── src/...
│   └── library/...
└── README.md
```

**Только манифест.** Когда организация уже публикует независимые пакеты вида `@org/template-*` (или размещает их на GitHub), пакет `@org/create` остаётся тонким индексом (минимальным обёрточным пакетом).

```
@your-org/create/
├── package.json              # "createConfig": { "templates": [{ "template": "@your-org/template-web" }, ...] }
└── README.md
```

Два этих подхода можно комбинировать — манифест может указывать большинство записей на внешние пакеты, а несколько оставлять как встроенные подпапки.

По желанию можно добавить `bin`-скрипт, чтобы команда `npm create @org` (устаревший путь) продолжала работать для пользователей, не использующих Vite+. Команда `vp create @org` читает манифест напрямую и никогда не запускает `bin`-скрипт.

### Схема манифеста {#manifest-schema}

Манифест находится в поле `createConfig.templates` в файле `package.json` пакета `@org/create`:

```json
{
  "name": "@your-org/create",
  "version": "1.0.0",
  "createConfig": {
    "templates": [
      {
        "name": "monorepo",
        "description": "Monorepo",
        "template": "@your-org/template-monorepo",
        "monorepo": true
      },
      {
        "name": "web",
        "description": "Web app template (Vite + React)",
        "template": "@your-org/template-web"
      },
      {
        "name": "demo",
        "description": "Bundled demo template",
        "template": "./templates/demo"
      }
    ]
  }
}
```

Каждая запись поддерживает следующие поля:

| Поле          | Обязательно | Примечания                                                                                                                                                                                                                                 |
| ------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`        | да          | Идентификатор в kebab-case. Используется в `vp create @org:<name>` для прямого выбора. Должен быть уникальным в пределах массива.                                                                                                         |
| `description` | да          | Однострочное описание, отображаемое в селекторе.                                                                                                                                                                                          |
| `template`    | да          | npm-спецификатор (`@org/template-foo`, опционально с `@version`), URL GitHub (`github:user/repo`), встроенный шаблон `vite:*`, имя пакета из локального workspace или относительный путь (`./templates/foo`), который разрешается относительно корня пакета `@org/create`. |
| `monorepo`    | нет         | Если `true`, помечает запись как шаблон для создания монорепозитория. Скрывается из селектора, когда `vp create` запускается внутри существующего монорепозитория (аналогично фильтру встроенного `vite:monorepo`).                       |

Некорректный манифест — это жёсткая ошибка, а не тихий fallback. Сопровождающий, выпустивший манифест, должен узнать о проблемном поле (например: `@your-org/create: createConfig.templates[2].template must be a non-empty string`).

### Шаблоны во вложенных подпапках {#bundled-subdirectory-templates}

Относительные пути `./...` разрешаются относительно корня пакета `@org/create` — **не** относительно текущей рабочей директории пользователя. Указанная директория копируется в целевой проект как есть (без обработки шаблонизатором). Единственное исключение — небольшое количество специальных файлов с префиксом подчёркивания (`_gitignore`, `_npmrc`, `_yarnrc.yml`), которые автоматически переименовываются в соответствующие dot-файлы. Пути, выходящие за пределы корня пакета, отклоняются.

### Сделать организацию шаблоном по умолчанию в репозитории {#make-the-org-the-default-in-a-repo}

Добавьте в `vite.config.ts` в корне проекта:

```ts
import { defineConfig } from 'vite-plus';

export default defineConfig({
  create: { defaultTemplate: '@your-org' },
});
```

Теперь `vp create` (без аргументов) сразу открывает селектор `@your-org`. Подробнее см. [`create.defaultTemplate`](/config/create).

Селектор всегда добавляет в конец пункт **Встроенные шаблоны Vite+**, чтобы шаблоны `vite:monorepo` / `vite:application` / `vite:library` / `vite:generator` оставались доступными из него. При выборе этого пункта происходит переход к стандартному встроенному потоку создания. Для скриптов и CI явные спецификаторы (`vp create vite:library`) обходят настроенный по умолчанию шаблон.

### Проверка без интерактивного режима {#non-interactive-inspection}

Команда `vp create @org --no-interactive` выводит манифест в виде таблицы и завершается с кодом выхода 1:

```
A template name is required when running `vp create @your-org` in non-interactive mode.

Available templates in @your-org/create:

  NAME     DESCRIPTION                          TEMPLATE
  web      Web app template (Vite + React)      @your-org/template-web
  library  TypeScript library template          @your-org/template-library
  demo     Bundled demo template                ./templates/demo

Examples:
  # Scaffold a specific template from the org
  vp create @your-org:web --no-interactive

  # Or use a Vite+ built-in template
  vp create vite:application --no-interactive
```

### Чек-лист публикации {#publishing-checklist}

1. Создайте пакет `@org/create` (npm-пакет с префиксом), если у вас его ещё нет.
2. Добавьте массив `createConfig.templates` в `package.json`. (Поместите шаблоны в `./templates/...` или укажите ссылки на внешние пакеты.)
3. (Опционально) Добавьте `bin`-скрипт для совместимости с `npm create @org`.
4. Опубликуйте пакет.
5. Проверьте: `vp create @org --no-interactive` должен вывести таблицу манифеста; `vp create @org` должен открыть селектор.
6. (Опционально) Добавьте в ваши внутренние репозитории шаблонов настройку `create: { defaultTemplate: '@org' }`.
