# Project Reference

> Заполни этот файл при инициализации проекта.

## Стек

- **Фреймворк**: SvelteKit (frontend-only, SSR отключён)
- **Язык**: TypeScript (strict)
- **Стили**: Tailwind
- **API-клиент**: fetch-обёртки в `src/lib/api/`
- **Тестирование**: Vitest (unit) + Playwright (e2e)
- **Линтинг**: ESLint + Prettier
- **Деплой**: статика
- **Адаптер**: `@sveltejs/adapter-static`

## Бэкенд
- пока что бекенд не доступен
<!-- - **URL**: базовый URL бэкенда -->
<!-- - **Документация API**: ссылка на Swagger / OpenAPI -->
<!-- - **Авторизация**: JWT / cookies / API key — выбери -->

## Структура модулей

<!-- Перечисли основные модули/фичи приложения -->

- `src/lib/components/` — UI-компоненты
- `src/lib/stores/` — глобальное состояние
- `src/lib/api/` — API-клиент
- `src/lib/utils/` — утилиты
- `src/lib/types/` — TypeScript типы
- `src/routes/` — страницы

## Соглашения

- Именование компонентов: PascalCase (`UserCard.svelte`)
- Именование stores: camelCase (`userStore.ts`)
- Именование утилит: camelCase (`formatDate.ts`)
- Именование типов: PascalCase (`User.ts`)
- CSS-классы: Tailwind

## Паттерны

- Состояние: Svelte stores (`writable`, `derived`)
- Роутинг: SvelteKit file-based routing (только клиентский)
- API-слой: централизованный через `src/lib/api/client.ts`
- Обработка ошибок:
  - **API-слой** (`src/lib/api/client.ts`): централизованный `ApiError` с `status` и `message`, все эндпоинты бросают его
  - **Компоненты**: локальный `error: string | null` + `try/catch` в async-функциях
  - **Глобальные уведомления**: store-based toast (`src/lib/stores/notificationStore.ts`) для показа ошибок пользователю
  - **Роутинг**: `src/routes/+error.svelte` для 404 и ошибок навигации
