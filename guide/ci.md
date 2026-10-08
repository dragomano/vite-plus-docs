# Непрерывная интеграция {#continuous-integration}

Вы можете использовать `voidzero-dev/setup-vp` для работы с Vite+ в средах CI.

## Обзор {#overview}

[`voidzero-dev/setup-vp`](https://github.com/voidzero-dev/setup-vp) предоставляет интеграции для GitHub Actions, GitLab CI/CD и Azure Pipelines. Все три варианта устанавливают Vite+ и могут устанавливать зависимости проекта. GitHub Action и шаблон для Azure Pipelines также могут автоматически настроить Node.js и кэшировать данные менеджера пакетов, в то время как шаблон для GitLab CI/CD использует среду выполнения Node.js и конфигурацию кэша, предоставленные заданием.

## Версионирование setup-vp {#setup-vp-versioning}

В каждом примере укажите в `<setup-vp-version>` точную версию со [страницы релизов `setup-vp`](https://github.com/voidzero-dev/setup-vp/releases). Вместо неё можно указать SHA коммита. Не используйте тег `v1`. Тег `v1` больше не обновляется.

Запустите `vp migrate`, чтобы заменить точные ссылки на `voidzero-dev/setup-vp@v1` в рабочих процессах GitHub Actions и составных действиях в `.github` на последнюю точную версию, известную вашей версии Vite+. Существующие точные версии и SHA коммитов остаются без изменений.

## GitHub Actions {#github-actions}

GitHub Action автоматически устанавливает Vite+, необходимую версию Node.js и пакетный менеджер. Благодаря этому в большинстве случаев вам не понадобятся отдельные шаги `setup-node`, настройка пакетного менеджера, установка зависимостей или ручное кэширование зависимостей в рабочем процессе.

```yaml [.github/workflows/ci.yml]
- uses: voidzero-dev/setup-vp@<setup-vp-version>
  with:
    node-version: '24'
    cache: true
- run: vp install
- run: vp check
- run: vp test
- run: vp build
```

По умолчанию `setup-vp` выполняет `vp install`. Если вы задали `run-install: false`, обязательно добавьте шаг `vp install` перед запуском других команд. При `cache: true` `setup-vp` автоматически берёт кэширование зависимостей на себя.

## GitLab CI/CD {#gitlab-ci-cd}

Используйте повторно используемый удалённый шаблон `setup-vp` в конфигурации GitLab CI/CD. Укажите в URL удалённого шаблона и `setup-ref` один и тот же тег релиза или SHA коммита:

```yaml [.gitlab-ci.yml]
include:
  - remote: 'https://raw.githubusercontent.com/voidzero-dev/setup-vp/<setup-vp-version>/gitlab/setup-vp.yml'
    inputs:
      setup-ref: '<setup-vp-version>'

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

## Azure Pipelines {#azure-pipelines}

Используйте переиспользуемый шаблон шага `setup-vp` в конфигурации Azure Pipelines. Создайте подключение к GitHub с именем `github`, а затем подключите шаблон из репозитория `setup-vp`:

```yaml [azure-pipelines.yml]
resources:
  repositories:
    - repository: setupVp
      type: github
      endpoint: github
      name: voidzero-dev/setup-vp
      ref: refs/tags/<setup-vp-version>

pool:
  vmImage: ubuntu-latest

steps:
  - checkout: self
  - template: azure/setup-vp.yml@setupVp
    parameters:
      setupRef: '<setup-vp-version>'
      nodeVersion: 24.x
      cache: true
      runInstall: true
  - script: vp check
  - script: vp test
  - script: vp build
```

Зафиксируйте `ref` и `setupRef` на одном и том же теге или SHA коммита для строгой воспроизводимости.

Шаблон для Azure Pipelines поддерживает агенты Microsoft-hosted на Linux, macOS и Windows. Для настройки Node.js и кэширования данных менеджера пакетов он использует встроенные задачи Azure `UseNode@1` и `Cache@2`.

Для расширенной конфигурации и полного описания параметров см. [документацию `setup-vp` по Azure Pipelines](https://github.com/voidzero-dev/setup-vp#azure-pipelines).

## Автоматическое обновление версий {#automatic-version-updates}

Dependabot и Renovate могут обновлять точные версии в рабочих процессах GitHub Actions.

Чтобы использовать [обновление версий Dependabot](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuring-dependabot-version-updates), добавьте запись `github-actions` в `.github/dependabot.yml`:

```yaml [.github/dependabot.yml]
version: 2
updates:
  - package-ecosystem: github-actions
    directory: /
    schedule:
      interval: weekly
```

Dependabot проверяет записи `uses:` в `.github/workflows` каждую неделю.

[Менеджер GitHub Actions в Renovate](https://docs.renovatebot.com/modules/manager/github-actions/) по умолчанию обнаруживает записи `uses:`. Для `setup-vp` не нужно создавать отдельное правило для пакета.

Если вы используете SHA коммита, добавьте точный тег релиза в комментарии. Renovate использует этот комментарий для поиска обновлений:

```yaml
- uses: voidzero-dev/setup-vp@<commit-sha> # <setup-vp-version>
```

Эти настройки применяются только к рабочим процессам GitHub Actions. Для GitLab CI/CD и Azure Pipelines обновляйте оба значения версии одновременно.

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
- uses: voidzero-dev/setup-vp@<setup-vp-version>
  with:
    node-version: '24'
    cache: true

- run: vp run dev:setup
- run: vp check
- run: vp test
```
