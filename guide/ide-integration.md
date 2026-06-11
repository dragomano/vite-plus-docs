# Интеграция с IDE {#ide-integration}

Vite+ поддерживает VS Code и Zed через настройки, специфичные для редактора, которые `vp create` и `vp migrate` могут автоматически записать в ваш проект.

## VS Code

Для комфортной работы с Vite+ в VS Code установите [Vite Plus Extension Pack](https://marketplace.visualstudio.com/items?itemName=VoidZero.vite-plus-extension-pack). В настоящее время он включает:

- `Oxc` для форматирования и линтинга через `vp check`
- `Vitest` для запуска тестов через `vp test`

При создании или миграции проекта Vite+ предлагает записать конфигурацию редактора для VS Code. Кроме того, `vp create` устанавливает значение `npm.scriptRunner` в `vp`, чтобы панель NPM Scripts в VS Code запускала скрипты через менеджер задач Vite+. Для мигрированных или существующих проектов эту настройку можно добавить вручную (см. ниже).

Вы также можете настроить конфигурацию VS Code вручную:

```json [.vscode/extensions.json]
{
  "recommendations": ["VoidZero.vite-plus-extension-pack"]
}
```

```json [.vscode/settings.json]
{
  "editor.defaultFormatter": "oxc.oxc-vscode",
  "[javascript]": { "editor.defaultFormatter": "oxc.oxc-vscode" },
  "[javascriptreact]": { "editor.defaultFormatter": "oxc.oxc-vscode" },
  "[typescript]": { "editor.defaultFormatter": "oxc.oxc-vscode" },
  "[typescriptreact]": { "editor.defaultFormatter": "oxc.oxc-vscode" },
  "oxc.fmt.configPath": "./vite.config.ts",
  "editor.formatOnSave": true,
  "editor.formatOnSaveMode": "file",
  "editor.codeActionsOnSave": {
    "source.fixAll.oxc": "explicit"
  }
}
```

Это задаёт для проекта общий форматтер по умолчанию и включает автоматические исправления средствами Oxc при сохранении. Блоки переопределения для конкретных языков (`[javascript]`, `[typescript]` и т. д.) необходимы, поскольку VS Code отдаёт приоритет пользовательским настройкам `[language]` над параметром рабочего пространства `editor.defaultFormatter`. Без них глобальная конфигурация Prettier будет незаметно перехватывать форматирование. Установка `oxc.fmt.configPath` в `./vite.config.ts` обеспечивает соответствие форматирования при сохранении блоку `fmt` в конфигурации Vite+. Vite+ использует `formatOnSaveMode: "file"`, поскольку Oxfmt не поддерживает частичное форматирование.

Чтобы панель NPM Scripts в VS Code запускала скрипты через `vp`, добавьте следующее в файл `.vscode/settings.json`:

```json [.vscode/settings.json]
{
  "npm.scriptRunner": "vp"
}
```

Эта настройка автоматически добавляется командой `vp create`, но не `vp migrate`, поскольку в существующих проектах могут быть участники команды, у которых `vp` не установлен локально.

## Zed

Для комфортной работы с Vite+ в Zed установите расширение [oxc-zed](https://github.com/oxc-project/oxc-zed) из каталога расширений Zed. Оно предоставляет возможности форматирования и линтинга через `vp check`.

При создании или миграции проекта Vite+ предложит выбрать, нужно ли записать конфигурацию редактора для Zed.

Вы также можете настроить конфигурацию Zed вручную:

```json [.zed/settings.json]
{
  "lsp": {
    "oxlint": {
      "initialization_options": {
        "settings": {
          "run": "onType",
          "fixKind": "safe_fix",
          "typeAware": true,
          "unusedDisableDirectives": "deny"
        }
      }
    },
    "oxfmt": {
      "initialization_options": {
        "settings": {
          "fmt.configPath": "./vite.config.ts",
          "run": "onSave"
        }
      }
    }
  },
  "languages": {
    "JavaScript": {
      "format_on_save": "on",
      "prettier": { "allowed": false },
      "formatter": [{ "language_server": { "name": "oxfmt" } }],
      "code_action": "source.fixAll.oxc"
    },
    "TypeScript": {
      "format_on_save": "on",
      "prettier": { "allowed": false },
      "formatter": [{ "language_server": { "name": "oxfmt" } }]
    },
    "Vue.js": {
      "format_on_save": "on",
      "prettier": { "allowed": false },
      "formatter": [{ "language_server": { "name": "oxfmt" } }]
    }
  }
}
```

Установка `oxfmt.fmt.configPath` в `./vite.config.ts` обеспечивает соответствие форматирования при сохранении блоку `fmt` в конфигурации Vite+. Полная автоматически генерируемая конфигурация также охватывает дополнительные языки (CSS, HTML, JSON, Markdown и т. д.). Выполните `vp create` или `vp migrate`, чтобы автоматически создать полный файл конфигурации.
