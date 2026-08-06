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

Корневой файл `vite.config.ts` наиболее полезен для общих настроек линтинга, форматирования, проверок индексированных файлов и определения задач. Разработка, сборка, предпросмотр и упаковка по-прежнему выполняются для одного приложения, поэтому Vite+ делает встроенные команды понимающими структуру монорепозитория, избавляя от необходимости постоянно переключаться между пакетами с помощью `cd`.

### Запуск из корня рабочего пространства {#running-at-the-workspace-root}

`vp dev`, `vp build`, `vp preview` и `vp pack` никогда не выполняются молча в корне рабочего пространства, поскольку обычно в нём нет собственного приложения. Если запустить их из корня монорепозитория, Vite+ самостоятельно определит, какое приложение вы имеете в виду.

Если только один пакет выглядит как приложение, vp запустит его и покажет прямую команду, которую можно использовать в следующий раз:

```
$ vp dev
Selected package: web (apps/web)
Tip: run this directly with `vp -C apps/web dev`

  VITE+ v0.2.2

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Если несколько пакетов могут быть целевыми, vp открывает нечёткий поиск по пакетам (тот же селектор, что используется в `vp run`); ввод текста фильтрует список, а нажатие Enter запускает выбранный пакет:

```
$ vp build
Select a package to build (↑/↓, Enter to run, type to search):

  › admin apps/admin
    web   apps/web
    ui    packages/ui
```

```
Selected package: web (apps/web)
Tip: run this directly with `vp -C apps/web build`

  ✓ built in 187ms
```

В неинтерактивных оболочках (CI, конвейеры, перенаправление вывода) vp выводит тот же список пакетов в обычном формате с готовыми для копирования командами и завершает работу с кодом выхода `1`:

```
$ vp build | cat
error: `vp build` at the workspace root needs a target package.

  Packages in this workspace:
    admin     apps/admin
    web       apps/web
    @shop/ui  packages/ui

  Pass a directory:  vp -C apps/admin build
  Or run every package's build script:  vp run -r build
```

vp в первую очередь ранжирует пакеты, которые выглядят подходящими для запуска указанной команды, как в окне выбора, так и в списке: наличие `vite.config.*` или корневого `index.html` используется для команд `dev` / `build` / `preview`, а блок конфигурации `pack` или стандартная точка входа tsdown `src/index.ts` — для команды `pack`.

### Выбор пакета с помощью `-C` {#targeting-a-package-with-c}

Глобальный флаг `-C` запускает любую команду vp так, будто вы сначала выполнили переход в каталог пакета через `cd`, то есть аналогично:

```bash
vp -C apps/web dev
vp -C apps/web build
vp -C packages/ui pack
```

Передача папки как позиционного аргумента (`vp dev apps/web`) по-прежнему поддерживается, но сохраняет семантику исходного Vite: она устанавливает параметр `root` в Vite без изменения текущей рабочей директории, поэтому `process.cwd()` при чтении конфигураций и разрешении плагинов будет указывать на каталог, из которого был запущен vp. Используйте `-C`, если пакет должен работать так, будто вы сначала выполнили переход в его каталог через `cd`. При использовании каталога в качестве позиционного аргумента vp выводит однострочное сообщение с указанием на вариант с `-C`.

### Фиксированный каталог по умолчанию с `defaultPackage` {#a-fixed-default-with-defaultpackage}

Чтобы всегда использовать один определённый каталог и пропустить описанный выше процесс выбора, укажите [`defaultPackage`](/config/#defaultpackage) в корневой конфигурации:

```ts [vite.config.ts]
export default {
  defaultPackage: './apps/web',
};
```

```
$ vp dev
note: vp dev: using ./apps/web (defaultPackage in vite.config.ts)

  VITE+ v0.2.2

  ➜  Local:   http://localhost:5173/
```

Это правильный выбор для монорепозиториев на базе фреймворков, которые не являются JavaScript workspace-проектами, например для приложения Laravel или Rails с каталогом `frontend/`: в таком случае нет списка пакетов для определения цели, поэтому `defaultPackage` напрямую указывает vp на нужное приложение. Поскольку vp считывает эту настройку без выполнения конфигурации, она работает даже тогда, когда `vite-plus` установлен только внутри этого подкаталога.

Форма с объектом позволяет задавать цели для отдельных команд: например, `vp pack` может работать с библиотекой, а `vp dev` — с приложением. Команда, отсутствующая в объекте, использует описанный выше механизм определения цели:

```ts [vite.config.ts]
export default {
  defaultPackage: { dev: './apps/web', pack: './packages/ui' },
};
```

### Скрипты пакетов и задачи всего рабочего пространства {#package-scripts-and-workspace-wide-tasks}

Храните специфичные для каждого пакета скрипты внутри соответствующего пакета, если команда отличается для разных приложений:

```json [apps/api/package.json]
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc -p tsconfig.json"
  }
}
```

Запускайте скрипты во всём рабочем пространстве с помощью `vp run`:

```bash
vp run -r build
vp run -r --parallel dev
vp run --filter ./apps/web build
```

Сведения о рекурсивном выполнении, параллельном запуске, фильтрации и кэшировании задач в рабочем пространстве см. в [руководстве по `vp run`](/guide/run).
