# Команда `vp fmt` {#format}

`vp fmt` форматирует код с помощью Oxfmt.

## Обзор {#overview}

`vp fmt` основан на [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) — форматтере из экосистемы Oxc. Oxfmt полностью совместим с Prettier и разработан как быстрая замена Prettier без необходимости менять рабочие процессы.

Используйте `vp fmt` для форматирования проекта, а `vp check` — для одновременного форматирования, линтинга и проверки типов.

## Использование {#usage}

```bash
vp fmt
vp fmt --check
vp fmt . --write
```

## Конфигурация {#configuration}

Размещайте конфигурацию форматирования непосредственно в блоке `fmt` корневого `vite.config.ts`, чтобы вся конфигурация оставалась в одном месте. Мы не рекомендуем использовать `.oxfmtrc.json` с Vite+.

В настоящее время Vite+ не поддерживает вложенную конфигурацию форматирования. Пока используйте [`fmt.overrides`](/guide/monorepo#format-overrides) в корневом `vite.config.ts` для параметров, специфичных для файлов или пакетов. Дальнейшее развитие этой функциональности ещё обсуждается; [поделитесь своим сценарием использования и ожиданиями](/guide/troubleshooting#nested-lint-or-format-config-is-not-applied), чтобы помочь определить направление её развития.

Для редакторов отключите вложенные конфигурации форматтера, чтобы форматирование при сохранении использовало корневой блок `fmt` из Vite+:

```json [.vscode/settings.json]
{
  "oxc.fmt.disableNestedConfig": true
}
```

Подробное описание поведения форматтера и справочник по его настройке см. в [документации Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html).

```ts [vite.config.ts]
import { defineConfig } from 'vite-plus';

export default defineConfig({
  fmt: {
    singleQuote: true,
  },
});
```
