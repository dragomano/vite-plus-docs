# Выбор менеджера пакетов {#package-manager-selection}

`vp` определяет менеджер пакетов в корне рабочего пространства в следующем порядке:

1. `packageManager` в `package.json`
2. `devEngines.packageManager` в `package.json`
3. `pnpm-workspace.yaml`
4. `pnpm-lock.yaml`
5. `yarn.lock` или `.yarnrc.yml`
6. `package-lock.json`
7. `bun.lock` или `bun.lockb`
8. `.pnpmfile.cjs` или `pnpmfile.cjs`
9. `bunfig.toml`
10. `yarn.config.cjs`

Если ни одно из этих объявлений или файлов не присутствует, Vite+ по умолчанию использует pnpm. Vite+ загружает соответствующий менеджер пакетов по мере необходимости. Определение не изменяет `package.json`.

Yarn Classic — это Yarn 1. Yarn Modern — это Yarn 2 или новее.

## Закрепление версии {#pinning-a-version}

Чтобы задать точную версию менеджера пакетов, используйте [`vp env pin`](/guide/env):

```bash
vp env pin pnpm@11.3.0
```

Закрепление в `packageManager` может содержать хеш целостности, например `yarn@4.17.1+sha512.…`. Vite+ поддерживает хеши целостности, совместимые с Corepack, и останавливается, если проверка не удалась.

## Диапазоны версий {#version-ranges}

Поле [`devEngines.packageManager`](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#devengines) принимает объект или массив объектов. Его `version` может быть диапазоном semver:

```json
{
  "devEngines": {
    "packageManager": {
      "name": "pnpm",
      "version": "^11.0.0",
      "onFail": "download"
    }
  }
}
```

По возможности Vite+ использует уже загруженную версию, удовлетворяющую требованию. Иначе Vite+ определяет последнюю удовлетворяющую версию в реестре npm. Диапазон остаётся источником истины и не заменяется точным закреплением в `packageManager`.

Если присутствуют оба поля, выбор определяет `packageManager`. Vite+ выводит предупреждение, если выбранная версия не удовлетворяет ограничению `devEngines.packageManager`. Подробности см. в выводе `vp env doctor`.

## Шимы менеджеров пакетов {#package-manager-shims}

Явное объявление `packageManager` или `devEngines.packageManager` управляет и соответствующими шимами менеджеров пакетов. Например, `packageManager: "npm@10.9.4"` заставляет `npm` и `npx` использовать npm 10.9.4.

То же относится к генерируемым алиасам каждого менеджера:

- pnpm: `pnpm`, `pnpx`, `pn` и `pnx`.
- Yarn: `yarn` и `yarnpkg`.
- Bun: `bun` и `bunx`.

Несовпадающие инструменты не переводятся. Запуск `npm` в проекте с pnpm по-прежнему определяет npm. Используйте команды управления пакетами `vp`, если требуется, чтобы Vite+ адаптировал операцию к менеджеру проекта.
