# Docker

Vite+ публикует официальный Docker-образ с предустановленным CLI `vp`:

```bash
ghcr.io/voidzero-dev/vite-plus
```

Используйте его для сборки, CI и devcontainer-окружений. Он не предназначен для использования в качестве runtime-образа на продакшене.

`vp` определяет версию Node.js из вашего проекта (`.node-version`, `devEngines.runtime` или `engines.node`) и загружает именно эту версию во время установки/сборки. Поэтому образ не требует тегов под конкретные версии Node.js.

Для продакшена используйте многоэтапную сборку: собирайте приложение с помощью образа Vite+, затем копируйте только загруженный бинарник Node.js, результат сборки и продакшен-зависимости в более лёгкий runtime-образ.

## Теги образа {#image-tags}

Теги соответствуют версиям `vp`:

| Тег                                                     | Значение            |
| ------------------------------------------------------- | ------------------- |
| `ghcr.io/voidzero-dev/vite-plus:latest`                 | Последний релиз     |
| `ghcr.io/voidzero-dev/vite-plus:<major>`                | Последняя мажорная  |
| `ghcr.io/voidzero-dev/vite-plus:<major>.<minor>`        | Последняя минорная  |
| `ghcr.io/voidzero-dev/vite-plus:<major>.<minor>.<patch>`| Точная версия       |

В примерах используется `:latest` для отслеживания самого свежего релиза; при необходимости воспроизводимых сборок фиксируйте конкретный тег или digest. Образ публикуется для платформ `linux/amd64` и `linux/arm64` и по умолчанию запускается от непривилегированного пользователя.

Все опубликованные версии и digest-значения доступны на [странице GitHub Packages](https://github.com/voidzero-dev/vite-plus/pkgs/container/vite-plus).

## Продакшен: серверное приложение SSR / Node.js {#production-ssr-node-js-server-app}

Для приложений, которые запускаются в Node.js в продакшене (SvelteKit, Nuxt, собственный Vite SSR-сервер и т. д.), выполняйте сборку с помощью образа цепочки инструментов, а затем копируйте полученный Node.js и собранное приложение в облегчённый runtime-этап:

```dockerfile [Dockerfile]
# syntax=docker/dockerfile:1

# --- build stage: the official Vite+ toolchain image ---
FROM ghcr.io/voidzero-dev/vite-plus:latest AS build
WORKDIR /app

# Install dependencies first so this layer is cached across source changes.
COPY --chown=vp:vp package.json pnpm-lock.yaml pnpm-workspace.yaml .node-version* ./
RUN vp install --frozen-lockfile

# Build. vp reads .node-version and provisions that exact Node.js automatically.
COPY --chown=vp:vp . .
RUN vp build

# Export the exact resolved Node.js binary for the runtime stage.
RUN cp "$(vp env which node | head -1)" /tmp/node

# --- deps stage: production-only dependencies ---
# A separate, fresh `--prod` install so devDependencies (including the vite-plus
# toolchain) are excluded. Running `--prod` over the full install above would not
# prune the already-installed devDependencies.
FROM ghcr.io/voidzero-dev/vite-plus:latest AS deps
WORKDIR /app
COPY --chown=vp:vp package.json pnpm-lock.yaml pnpm-workspace.yaml .node-version* ./
RUN vp install --frozen-lockfile --prod

# --- runtime stage: small, glibc, no vp ---
FROM debian:bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production

# The exact Node.js from .node-version (official, signature-verified build).
COPY --from=build /tmp/node /usr/local/bin/node

COPY --from=build /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

USER nobody
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

Собранный образ содержит только Node.js, ваше приложение и продакшен-зависимости и полностью соответствует `.node-version`. Он значительно меньше стандартного образа `node:*`; см. совет по distroless ниже для получения минимального размера.

::: warning Удаление продакшен-зависимостей в отдельном этапе
Устанавливайте продакшен-зависимости в отдельном этапе `deps`, как показано ниже. Запуск `vp install --prod` после полного `vp install` в том же этапе не удаляет уже установленные devDependencies, поэтому цепочка инструментов vite-plus будет скопирована в runtime-образ. Если серверный бандл полностью самодостаточный (без неупакованных зависимостей во время выполнения), можно не копировать `node_modules` вообще.
:::

::: tip Ещё меньше размер
Для минимального runtime без shell и с минимальной поверхностью CVE замените базовый образ runtime на distroless (`gcr.io/distroless/cc`) и используйте `ENTRYPOINT` в векторной форме. Он основан на glibc, поэтому скопированный бинарник Node.js остаётся совместимым.
:::

## Продакшен: статический SPA / SSG {#production-static-spa-ssg}

Статическому сайту Node.js во время выполнения не требуется; просто раздавайте собранный результат любым статическим сервером:

```dockerfile [Dockerfile]
FROM ghcr.io/voidzero-dev/vite-plus:latest AS build
WORKDIR /app
COPY --chown=vp:vp package.json pnpm-lock.yaml pnpm-workspace.yaml .node-version* ./
RUN vp install --frozen-lockfile
COPY --chown=vp:vp . .
RUN vp build

FROM nginx:alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
```

## Непрерывная интеграция {#continuous-integration}

Используйте образ напрямую в контейнерных CI-системах (GitLab CI, Buildkite, CircleCI, Jenkins и других):

```yaml [.gitlab-ci.yml]
build:
  image: ghcr.io/voidzero-dev/vite-plus:latest
  script:
    - vp install --frozen-lockfile
    - vp check
    - vp test
    - vp build
```

На GitHub Actions предпочтительно использовать [`setup-vp`](./ci) вместо образа.

## Devcontainers

Используйте образ как готовый контейнер для разработки с предустановленной цепочкой инструментов:

```jsonc [.devcontainer/devcontainer.json]
{
  "image": "ghcr.io/voidzero-dev/vite-plus:latest",
}
```

## Разовое использование {#ad-hoc-usage}

Запускайте любую команду `vp` для проекта без установки vp на локальную машину:

```bash
docker run --rm -it -v "$PWD:/app" -w /app ghcr.io/voidzero-dev/vite-plus vp build
```

## Примечания {#notes}

- **Версия Node.js**: определяется во время сборки из `.node-version`, `engines.node` или `devEngines.runtime`, поэтому отдельные теги образа под Node.js не нужны. Копирование зависимостей использует glob `.node-version*`, поэтому файл необязателен: проекты, которые фиксируют версию через `engines.node` или `devEngines.runtime`, могут не иметь `.node-version`, а при его наличии он доступен на всех этапах.
- **Непривилегированный пользователь**: образ запускается от пользователя `vp` без root-прав, поэтому исходники нужно копировать с `COPY --chown=vp:vp ...`, как показано выше. Без этого файлы будут принадлежать root, и `vp install` не сможет их изменять (ошибка доступа).
- **Нативные модули**: образ содержит инструменты C/C++ (`build-essential`, `python3`), поэтому нативные зависимости, такие как `better-sqlite3`, собираются во время `vp install`.
- **glibc**: образ основан на glibc, поэтому используется официальный, подписанный Node.js.
- **Пользовательский базовый образ**: чтобы добавить `vp` в собственный базовый образ, используйте установщик: `curl -fsSL https://vite.plus | bash` (зафиксируйте версию через `VP_VERSION` для воспроизводимости).
