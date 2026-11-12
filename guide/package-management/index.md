# Управление пакетами {#package-management}

Vite+ предоставляет единый интерфейс команд для npm, pnpm, Yarn и Bun. `vp` определяет менеджер пакетов рабочего пространства, при необходимости загружает выбранную версию и переводит команды и поддерживаемые параметры для него.

```bash
vp install
vp add react
vp add -D typescript
vp remove react
vp update
```

## Начало работы {#getting-started}

- [Выбор менеджера пакетов](./package-manager-selection) описывает определение менеджера, диапазоны версий и шимы менеджеров пакетов.
- [Глобальные пакеты](./global-packages) описывает отдельное глобальное хранилище пакетов Vite+.

## Команды {#commands}

Основные команды, например `vp add`, выполняются непосредственно через `vp`. Перенаправленные команды используют `vp pm`, чтобы передать операции обнаруженному менеджеру пакетов, переводя команды и поддерживаемые параметры так же, как и основные команды. Префикс `vp pm` оставляет такие имена, как `pack`, свободными для команд Vite+. Например, `vp pm pack` создаёт tarball-архив пакета, а [`vp pack`](/guide/pack) собирает библиотеку.

## Нативные аргументы {#native-arguments}

Передавайте нативные аргументы после `--`, чтобы они передавались без перевода:

```bash
vp install -- --registry=https://registry.npmjs.org
```

## Основные команды {#core-commands}

- [install](./install)
- [add](./add)
- [remove](./remove)
- [update](./update)
- [dedupe](./dedupe)
- [outdated](./outdated)
- [list](./list)
- [why](./why)
- [info](./info)
- [link](./link)
- [unlink](./unlink)
- [rebuild](./rebuild)
- [dlx](./dlx)

## Перенаправленные команды {#forwarded-commands}

- **Установка и очистка**
  - [pm ci](./ci)
  - [pm prune](./prune)
- **Просмотр и диагностика**
  - [pm licenses](./licenses)
  - [pm search](./search)
  - [pm audit](./audit)
  - [pm fund](./fund)
  - [pm ping](./ping)
- **Локальная разработка**
  - [pm approve-builds](./approve-builds)
  - [pm patch](./patch)
  - [pm patch-commit](./patch-commit)
- **Публикация**
  - [pm pack](./pack)
  - [pm version](./version)
  - [pm publish](./publish)
  - [pm stage](./stage)
  - [pm dist-tag](./dist-tag)
  - [pm deprecate](./deprecate)
- **Реестр и учётные записи**
  - [pm login](./login)
  - [pm logout](./logout)
  - [pm whoami](./whoami)
  - [pm token](./token)
  - [pm owner](./owner)
  - [pm team](./team)
- **Конфигурация и обслуживание**
  - [pm config](./config)
  - [pm pkg](./pkg)
  - [pm cache](./cache)
