# Команда `vp pack` {#pack}

`vp pack` собирает библиотеки для продакшена с помощью [tsdown](https://tsdown.ru/guide/).

## Обзор {#overview}

`vp pack` собирает библиотеки и автономные исполняемые файлы с помощью tsdown. Используйте его для пакетов, предназначенных для публикации, и бинарных файлов. Если вам нужно собрать веб-приложение, используйте `vp build`. `vp pack` включает всё необходимое для сборки библиотек из коробки, включая генерацию файлов деклараций, несколько форматов вывода, карты исходного кода и минификацию.

Подробнее о работе tsdown см. в официальном [руководстве по tsdown](https://tsdown.ru/guide/).

## Использование {#usage}

```bash
vp pack
vp pack src/index.ts --dts
vp pack --watch
```

## Конфигурация {#configuration}

Размещайте настройки упаковки непосредственно в блоке `pack` файла `vite.config.ts`, чтобы вся конфигурация находилась в одном месте. Мы не рекомендуем использовать `tsdown.config.ts` вместе с Vite+.

Подробнее об использовании и настройке `vp pack` см. в [руководстве по tsdown](https://tsdown.ru/guide/) и [документации по файлу конфигурации tsdown](https://tsdown.ru/options/config-file).

Используйте его для настройки:

- [файлов деклараций (`dts`)](https://tsdown.ru/options/dts)
- [форматов вывода](https://tsdown.ru/options/output-format)
- [режима наблюдения](https://tsdown.ru/options/watch-mode)
- [автономных исполняемых файлов](https://tsdown.ru/options/exe#executable)

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  pack: {
    dts: true,
    format: ['esm', 'cjs'],
    sourcemap: true,
  },
});
```

## Автономные исполняемые файлы {#standalone-executables}

`vp pack` также может собирать автономные исполняемые файлы с помощью экспериментальной опции [`exe`](https://tsdown.ru/options/exe#executable) из tsdown.

Используйте эту возможность, если хотите распространять CLI или другой инструмент на базе Node.js в виде нативного исполняемого файла, который может запускаться без отдельной установки Node.js.

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  pack: {
    entry: ['src/cli.ts'],
    exe: true,
  },
});
```

Подробную информацию о настройке пользовательских имён файлов, встроенных ресурсов и кроссплатформенных целевых платформ см. в официальной [документации по исполняемым файлам tsdown](https://tsdown.ru/options/exe#executable).
