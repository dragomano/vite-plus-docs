# Непрерывная интеграция {#continuous-integration}

Вы можете использовать `voidzero-dev/setup-vp` для работы с Vite+ в средах CI.

## Обзор {#overview}

[`voidzero-dev/setup-vp`](https://github.com/voidzero-dev/setup-vp) предоставляет интеграции для GitHub Actions и GitLab CI/CD. В обоих случаях выполняется установка Vite+ с возможностью установки зависимостей проекта. GitHub Action также может автоматически установить Node.js и настроить кэш пакетного менеджера, тогда как шаблон GitLab CI/CD использует среду выполнения Node.js и конфигурацию кэша, предоставленные заданием.

## GitHub Actions {#github-actions}

GitHub Action автоматически устанавливает Vite+, необходимую версию Node.js и пакетный менеджер. Благодаря этому в большинстве случаев вам не понадобятся отдельные шаги `setup-node`, настройка пакетного менеджера или ручное кэширование зависимостей в рабочем процессе.

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

## GitLab CI/CD {#gitlab-ci-cd}

Используйте повторно используемый удалённый шаблон `setup-vp` в конфигурации GitLab CI/CD:

```yaml [.gitlab-ci.yml]
include:
  - remote: 'https://raw.githubusercontent.com/voidzero-dev/setup-vp/v1/gitlab/setup-vp.yml'

test:
  extends: .setup-vp
  image: node:24
  script:
    - vp check
    - vp test
    - vp build
```

Интеграция с GitLab CI/CD отличается от GitHub Action несколькими особенностями:

- Шаблон не устанавливает Node.js. Используйте образ с Node.js, как показано выше, либо другим способом обеспечьте наличие Node.js в задании.
- Настройте кэширование зависимостей с помощью ключевого слова GitLab [`cache`](https://docs.gitlab.com/ci/yaml/#cache) в конфигурации задания.
- Используйте среду выполнения на базе Unix с Bash и установленным `curl` или `wget`.

Дополнительные параметры настройки и полное описание всех входных параметров см. в [документации `setup-vp` для GitLab CI/CD](https://github.com/voidzero-dev/setup-vp#gitlab-cicd).

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
