# Svelte / TypeScript Style Guide

## Компоненты (.svelte)

### Структура файла

```svelte
<script lang="ts">
  // 1. Импорты
  // 2. Props (export let / $props)
  // 3. Локальное состояние
  // 4. Реактивные выражения ($:)
  // 5. Функции
  // 6. Lifecycle (onMount, onDestroy)
</script>

<!-- Разметка -->

<style>
  /* Стили (scoped по умолчанию) */
</style>
```

### Правила

- Один компонент = один файл
- Имя файла = PascalCase (`UserCard.svelte`)
- Props типизировать через TypeScript
- Избегать `any` — всегда указывать типы
- Не использовать `@html` без крайней необходимости (XSS)

## TypeScript

- `strict: true` в `tsconfig.json`
- Интерфейсы предпочтительнее type-алиасов для объектов
- Enum → использовать `as const` объекты
- Типы выносить в `src/lib/types/`

## Stores

```ts
// src/lib/stores/userStore.ts
import { writable, derived } from 'svelte/store';
import type { User } from '$lib/types/User';

export const currentUser = writable<User | null>(null);
export const isLoggedIn = derived(currentUser, ($user) => $user !== null);
```

- Имя store = camelCase
- Один store на домен/фичу
- Derived stores для вычисляемых значений
- Подписки ($store) предпочтительнее `.subscribe()`

## API-вызовы

```ts
// src/lib/api/client.ts — базовый клиент
// src/lib/api/users.ts — эндпоинты пользователей
```

- Все запросы через централизованный клиент
- Не вызывать fetch напрямую из компонентов
- Обрабатывать ошибки в API-слое
- Типизировать ответы

## Стили

- Scoped стили по умолчанию (внутри `<style>`)
- Глобальные стили — только в `src/app.css`
- CSS-переменные для темизации
- Responsive: mobile-first подход

## Файловая структура роутов

```
src/routes/
├── +layout.svelte      ← общий лейаут
├── +layout.ts           ← export const ssr = false
├── +page.svelte         ← главная
├── about/
│   └── +page.svelte
└── users/
    ├── +page.svelte     ← список
    └── [id]/
        └── +page.svelte ← детали
```

- Без `+page.server.ts` и `+server.ts`
- Данные загружаются в `onMount` или через stores
