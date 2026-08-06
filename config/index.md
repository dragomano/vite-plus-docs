# Конфигурация Vite+ {#configuring-vite}

Vite+ хранит конфигурацию проекта в одном месте — в файле `vite.config.ts`, позволяя объединить множество отдельных конфигурационных файлов верхнего уровня в один. Вы можете продолжать использовать настройки Vite, такие как `server` или `build`, и добавлять блоки Vite+ для остальных частей вашего рабочего процесса:

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  server: {},
  build: {},
  preview: {},
  create: {},
  run: {},
  fmt: {},
  lint: {},
  check: {},
  test: {},
  pack: {},
  staged: {},
});
```

## Конфигурация, специфичная для Vite+ {#vite-specific-configuration}

Vite+ расширяет базовую конфигурацию Vite следующими дополнениями:

- [`create`](/config/create) — настройки по умолчанию для создания проектов и шаблонов
- [`run`](/config/run) — для Vite Task
- [`fmt`](/config/fmt) — для Oxfmt
- [`lint`](/config/lint) — для Oxlint
- [`check`](/config/check) — настройки по умолчанию для `vp check`
- [`test`](/config/test) — для Vitest
- [`pack`](/config/pack) — для tsdown
- [`staged`](/config/staged) — для проверок индексированных файлов
- [`defaultPackage`](#defaultpackage) — для задания каталога приложения по умолчанию при запуске команд приложения из корня рабочего пространства

## defaultPackage

Каталог приложения, используемый по умолчанию для команд `vp dev`, `vp build`, `vp preview` и `vp pack`, если они запускаются без указания цели из каталога, содержащего конфигурацию (аналог неявного использования [`vp -C <dir>`](/guide/monorepo#app-commands)):

```ts [vite.config.ts]
export default {
  defaultPackage: './frontend',
};
```

`vp` считывает эти значения без выполнения конфигурационного файла, поэтому `defaultPackage` работает даже в корне репозитория, где зависимость `vite-plus` отсутствует (например, в репозитории Laravel или Rails, где приложение Vite находится в каталоге `frontend/`, а `vite-plus` установлен только там). Именно из-за такого статического чтения значения должны быть обычными строковыми литералами, а не выражениями. Явно указанный параметр `-C` или позиционная цель всегда имеют приоритет над настройками из конфигурации.
