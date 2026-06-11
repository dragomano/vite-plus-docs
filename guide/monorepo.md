# Монорепозиторий {#monorepo}

Vite+ поддерживает монорепозитории с файлом `vite.config.ts` в корне. Вы можете определить настройки по умолчанию для `lint`, `fmt` и других инструментов в корневой конфигурации, а затем использовать `overrides` для применения специфичных для пакетов настроек линтинга и форматирования.

Поскольку `vite.config.ts` — это обычный JavaScript-файл, вы можете либо разместить всю конфигурацию в нём, либо собирать её с помощью стандартных JavaScript-импортов. При этом вы по-прежнему можете иметь отдельные файлы `vite.config.ts` в каждом пакете для конфигурации Vite, Vitest, фреймворка или среды выполнения.

## Корневая конфигурация с overrides {#root-config-with-overrides}

Используйте `lint.overrides` для правил Oxlint, которые должны применяться только к отдельным пакетам:

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  lint: {
    plugins: ['typescript'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
    overrides: [
      {
        files: ['apps/web/**', 'packages/ui/**'],
        plugins: ['typescript', 'react'],
        rules: {
          'react/self-closing-comp': 'error',
        },
      },
      {
        files: ['apps/api/**'],
        env: {
          node: true,
        },
        rules: {
          'no-console': 'off',
        },
      },
      {
        files: ['**/*.test.ts', '**/*.spec.ts'],
        plugins: ['typescript', 'vitest'],
        rules: {
          '@typescript-eslint/no-explicit-any': 'off',
          'vitest/no-disabled-tests': 'error',
        },
      },
    ],
  },
});
```

Глобальные шаблоны разрешаются относительно корневого файла `vite.config.ts`, поэтому используйте пути рабочего пространства, такие как `apps/web/**`, `apps/api/**` и `packages/ui/**`.

::: tip
Если запись в `lint.overrides` задаёт `plugins`, этот список полностью заменяет базовый список `lint.plugins` для соответствующих файлов. Указывайте все плагины, необходимые для данной группы файлов, например `['typescript', 'react']`. Не указывайте `plugins` только в том случае, если переопределение должно без изменений наследовать базовый список.
:::

## Переопределения форматирования {#format-overrides}

Используйте `fmt.overrides` для параметров Oxfmt, специфичных для отдельных файлов или пакетов. Настройки переопределений форматтера указываются в разделе `options`:

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  fmt: {
    singleQuote: true,
    semi: true,
    overrides: [
      {
        files: ['apps/api/**'],
        options: {
          printWidth: 120,
        },
      },
      {
        files: ['**/*.md'],
        options: {
          proseWrap: 'always',
        },
      },
    ],
  },
});
```

## Компоновка конфигурационных файлов {#composing-configuration-files}

Вы можете распределить конфигурацию по репозиторию и объединять её с помощью JavaScript-импортов. Экспортируйте JavaScript-объекты из расположенных рядом файлов или пакетов, импортируйте их в корневую конфигурацию и объединяйте с соответствующим переопределением.

```ts [tooling/lint/react.ts]
import type { OxlintOverride } from 'vite-plus/lint';

export const reactLint = {
  plugins: ['typescript', 'react'],
  rules: {
    'react/self-closing-comp': 'error',
  },
} satisfies Omit<OxlintOverride, 'files'>;
```

```ts [tooling/lint/node.ts]
import type { OxlintOverride } from 'vite-plus/lint';

export const nodeLint = {
  env: {
    node: true,
  },
  rules: {
    'no-console': 'off',
  },
} satisfies Omit<OxlintOverride, 'files'>;
```

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

import { nodeLint } from './tooling/lint/node';
import { reactLint } from './tooling/lint/react';

export default defineConfig({
  lint: {
    plugins: ['typescript'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    overrides: [
      {
        files: ['apps/web/**', 'packages/ui/**'],
        ...reactLint,
      },
      {
        files: ['apps/api/**'],
        ...nodeLint,
      },
    ],
  },
});
```

Это позволяет централизовать поведение, сохраняя при этом возможность для каждой команды или пакета самостоятельно управлять необходимой ему частью конфигурации.

## Команды приложений {#app-commands}

Корневой файл `vite.config.ts` наиболее полезен для общих настроек линтинга, форматирования, проверок индексированных файлов и определения задач. Для специфичных для проекта сценариев разработки, сборки и тестирования используйте подход, который лучше всего подходит для каждого приложения:

- Передавайте каталог встроенным командам Vite, если хотите работать с конкретным приложением:

```bash
vp dev apps/web
vp build apps/web
```

- Храните специфичные для пакета скрипты в самом пакете, если команды различаются между приложениями:

```json [apps/api/package.json]
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc -p tsconfig.json"
  }
}
```

- Запускайте скрипты по всему рабочему пространству с помощью `vp run`:

```bash
vp run -r build
vp run -r --parallel dev
vp run --filter ./apps/web build
```

Сведения о рекурсивном выполнении, параллельном запуске, фильтрации и кэшировании задач в рабочем пространстве см. в [руководстве по `vp run`](/guide/run).
