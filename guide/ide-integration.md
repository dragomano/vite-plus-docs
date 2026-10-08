# Интеграция с IDE {#ide-integration}

Vite+ поддерживает VS Code и Zed через настройки, специфичные для редактора, которые `vp create` и `vp migrate` могут автоматически записать в ваш проект.

## VS Code

Для комфортной работы с Vite+ в VS Code установите [Vite Plus Extension Pack](https://marketplace.visualstudio.com/items?itemName=VoidZero.vite-plus-extension-pack). В настоящее время он включает:

- `Oxc` для форматирования и линтинга через `vp check`
- `Vitest` для запуска тестов через `vp test`

При создании или миграции проекта Vite+ предлагает записать конфигурацию редактора для VS Code. Кроме того, `vp create` устанавливает значение `npm.scriptRunner` в `vp`, чтобы панель NPM Scripts в VS Code запускала сценарии через менеджер задач Vite+. Для мигрированных или существующих проектов эту настройку можно добавить вручную (см. ниже).

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
  "oxc.disableNestedConfig": true,
  "oxc.fmt.disableNestedConfig": true,
  "editor.formatOnSave": true,
  "editor.formatOnSaveMode": "file",
  "editor.codeActionsOnSave": {
    "source.fixAll.oxc": "explicit"
  }
}
```

Это задаёт единый форматтер по умолчанию для всего проекта и включает автоматическое исправление кода с помощью Oxc при сохранении. Блоки переопределения для отдельных языков (`[javascript]`, `[typescript]` и т. д.) необходимы, поскольку VS Code отдаёт приоритет пользовательским настройкам `[language]` перед настройкой `editor.defaultFormatter` на уровне рабочей области — без них глобальная конфигурация Prettier будет использоваться вместо заданного форматтера. Параметры `oxc.disableNestedConfig` и `oxc.fmt.disableNestedConfig` не позволяют вложенным конфигурациям Oxlint и Oxfmt отличаться от корневой конфигурации Vite+. Vite+ использует `formatOnSaveMode: "file"`, поскольку Oxfmt не поддерживает частичное форматирование.

Чтобы панель NPM Scripts в VS Code запускала сценарии через `vp`, добавьте следующее в файл `.vscode/settings.json`:

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
      "formatter": [
        { "language_server": { "name": "oxfmt" } },
        { "code_action": "source.fixAll.oxc" }
      ]
    },
    "JSX": {
      "format_on_save": "on",
      "prettier": { "allowed": false },
      "formatter": [{ "language_server": { "name": "oxfmt" } }]
    },
    "TypeScript": {
      "format_on_save": "on",
      "prettier": { "allowed": false },
      "formatter": [{ "language_server": { "name": "oxfmt" } }]
    },
    "TSX": {
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

## JetBrains (IntelliJ, WebStorm и др.) {#jetbrains-intellij-webstorm-etc}

Для наилучшей работы Vite+ с IDE JetBrains, такими как IntelliJ и WebStorm, установите плагин [Oxc](https://plugins.jetbrains.com/plugin/27061-oxc) из магазина JetBrains.

При создании или миграции проекта Vite+ предложит выбрать, хотите ли вы добавить конфигурацию редактора для IDE JetBrains.

::: tip Vite+ не объединяет существующие файлы конфигурации
Из-за некоторых сложностей с объединением XML-файлов Vite+ в настоящее время не объединяет существующие файлы конфигурации, если они уже присутствуют.
Вместо объединения вам будет предложено заменить существующие файлы.
:::

Вы также можете вручную настроить конфигурацию IDE в соответствии с настройками Vite+:

```xml [.idea/externalDependencies.xml]
<?xml version="1.0" encoding="UTF-8"?>
<project version="4">
  <component name="ExternalDependencies">
    <plugin id="com.github.oxc.project.oxcintellijplugin" />
  </component>
</project>
```

```xml [.idea/workspace.xml]
<?xml version="1.0" encoding="UTF-8"?>
<project version="4">
  <!-- другие настройки... -->
  <component name="PropertiesComponent">
    <![CDATA[{
      "keyToString": {
        // другие настройки
        "javascript.nodejs.core.library.configured.version": "24.18.0", // Замените на выбранную вами версию Node.js
        "javascript.nodejs.core.library.typings.version": "24.13.3", // Замените на версию @types/node, соответствующую вашей версии Node.js (или удалите, если не хотите её указывать)
        "javascript.preferred.runtime.type.id": "node",
        "nodejs_interpreter_path": "$USER_HOME$/.local/share/vite-plus/bin/node",
        "nodejs_package_manager_path": "pnpm" // Замените на выбранный вами пакетный менеджер
      }
    }]]>
  </component>
</project>
```

Этот путь предполагает новую установку в Unix с каталогами XDG по умолчанию. В Windows используйте `%LOCALAPPDATA%\vite-plus\bin\node.exe`. Выполните `vp env current node`, чтобы проверить выбранную версию Node.js и путь к бинарному файлу. Если вы используете собственный `VP_HOME` или каталоги XDG либо более старую установку Vite+, укажите в `nodejs_interpreter_path` путь к своей shim-команде Node.js.

```xml [.idea/OxfmtSettings.xml]
<?xml version="1.0" encoding="UTF-8"?>
<project version="4">
  <component name="OxfmtSettings">
    <option name="preferOxfmtCodeStyleSettings" value="true" />
  </component>
</project>
```

Часто каталоги `.idea` добавляют в `.gitignore` проекта, включая файл `externalDependencies.xml`, который используется для указания IDE, какие плагины следует использовать для рабочего пространства.

Пожалуйста, добавьте эту строку в основной файл `.gitignore`, чтобы этот файл всегда включался в репозиторий:

```gitignore [.gitignore]
!.idea/externalDependencies.xml
```
