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

Размещайте настройки форматирования непосредственно в блоке `fmt` файла `vite.config.ts`, чтобы вся конфигурация находилась в одном месте. Мы не рекомендуем использовать `.oxfmtrc.json` вместе с Vite+.

Для редакторов укажите путь к конфигурации форматтера как `./vite.config.ts`, чтобы форматирование при сохранении использовало тот же блок `fmt`:

```json [.vscode/settings.json]
{
  "oxc.fmt.configPath": "./vite.config.ts"
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
