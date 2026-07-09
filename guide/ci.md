# Непрерывная интеграция {#continuous-integration}

Вы можете использовать `voidzero-dev/setup-vp` для работы с Vite+ в средах CI.

## Обзор {#overview}

Для GitHub Actions рекомендуется использовать [`voidzero-dev/setup-vp`](https://github.com/voidzero-dev/setup-vp). Он устанавливает Vite+, настраивает необходимую версию Node.js и менеджер пакетов, а также может автоматически кэшировать установку зависимостей.

Это означает, что в большинстве случаев вам не понадобятся отдельные шаги `setup-node`, настройка менеджера пакетов и ручная настройка кэширования зависимостей в вашем workflow-файле.

## GitHub Actions {#github-actions}

```yaml [.github/workflows/ci.yml]
- uses: voidzero-dev/setup-vp@v1
  with:
    node-version: '24'
    cache: true
- run: vp install
- run: vp check
- run: vp test
- run: vp build
```

При использовании `cache: true` зависимостями автоматически управляет `setup-vp`, включая их кэширование.

## Упрощение существующих сценариев {#simplifying-existing-workflows}

Если вы переносите существующий сценарий GitHub Actions, то зачастую можете заменить большие блоки настройки Node.js, менеджера пакетов и кэширования одним шагом `setup-vp`.

::: tip
`setup-vp` кэширует данные менеджера пакетов. Чтобы повторно использовать результаты Vite Task между запусками CI, дополнительно настройте отдельный [кэш GitHub Actions для Vite Task](/guide/github-actions-cache).
:::

#### До: {#before}

```yaml [.github/workflows/ci.yml]
- uses: pnpm/action-setup@v6
  with:
    version: 11

- uses: actions/setup-node@v6
  with:
    node-version: '24'
    cache: pnpm

- run: pnpm ci && pnpm dev:setup
- run: pnpm check
- run: pnpm test
```

#### После: {#after}

```yaml [.github/workflows/ci.yml]
- uses: voidzero-dev/setup-vp@v1
  with:
    node-version: '24'
    cache: true

- run: vp install && vp run dev:setup
- run: vp check
- run: vp test
```
