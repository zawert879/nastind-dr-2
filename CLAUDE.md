# CLAUDE.md — Svelte Frontend Project

> Этот файл читается агентом в начале каждой сессии.

---

## Проект

Фронтенд-приложение на SvelteKit (без SSR, без серверной логики).  
Бэкенд — отдельный сервис, взаимодействие через HTTP API.

## Архитектурные ограничения

- **Frontend-only**: SSR отключён, серверные файлы (`+page.server.ts`, `+server.ts`) не используются
- **Нет form actions**: формы обрабатываются клиентским кодом
- **API**: все запросы к бэкенду через обёртки в `src/lib/api/`
- **Деплой**: статика через `adapter-static`

## Структура проекта

```
src/
├── lib/
│   ├── components/    ← переиспользуемые компоненты
│   ├── stores/        ← Svelte stores (состояние)
│   ├── utils/         ← утилиты
│   ├── api/           ← HTTP-клиент к бэкенду
│   └── types/         ← TypeScript типы
└── routes/            ← страницы (+page.svelte только)
```

## Контекст и правила

- Перед началом работы: прочитай `.claude/memory/dev-plan.md`
- Стиль кода: см. `.claude/rules/svelte-style-guide.md`
- Стек и соглашения: см. `.claude/rules/project-reference.md`
- Продуктовые требования: см. `.claude/rules/prd-summary.md`

## После каждой задачи

1. Обнови `.claude/memory/dev-plan.md` — отметь прогресс
2. Если принято архитектурное решение → запиши в `architecture-decisions.md`
3. Если найден баг → запиши в `known-bugs.md`
4. Если задача завершена → запиши в `tasks-completed.md`

## Правила кода

- TypeScript строгий (`strict: true`)
- Компоненты: один компонент = один файл `.svelte`
- Stores: реактивные, через `writable` / `derived`
- API-вызовы: только через `src/lib/api/`, не напрямую из компонентов
- Не создавать `+page.server.ts`, `+server.ts`, `+layout.server.ts`
