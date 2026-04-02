# Dev Plan — План разработки

> ГЛАВНЫЙ ДОКУМЕНТ. Обновляется агентом после каждой задачи.

---

## Текущий фокус

Фаза 1 завершена. Следующий шаг — Фаза 2: главная страница (HeroBanner + ArticleCard + TagFilter).

---

## Фазы

### Фаза 0 — Инфраструктура ✅
- [x] Инициализация SvelteKit проекта (файлы созданы вручную)
- [x] Настройка TypeScript (`strict: true` в `tsconfig.json`)
- [x] Настройка линтинга (ESLint 9 flat config + Prettier)
- [x] Настройка Tailwind CSS + тёмная тема (Dark Editorial: CSS-переменные)
- [x] Отключение SSR (`src/routes/+layout.ts`: `ssr = false`, `prerender = true`)
- [x] Настройка `adapter-static` в `svelte.config.js`
- [x] Базовый лейаут (`src/routes/+layout.svelte` — шапка, подвал, CSS-переменные)
- [x] Страница ошибки (`src/routes/+error.svelte`)
- [x] Базовый API-клиент (`src/lib/api/client.ts` — `apiClient` + `ApiError`)
- [x] Настройка Vitest (inline в `vite.config.ts`)
- [x] Настройка Playwright (`playwright.config.ts`)

### Фаза 1 — Контент-слой ✅
- [x] Структура `src/content/articles/` и `src/content/comments/` (директории созданы)
- [x] TypeScript-типы: `Article`, `ArticleMeta`, `Comment`, `CommentFile` (`src/lib/types/`)
- [x] Установить `gray-matter` + `marked` (парсинг frontmatter + MD→HTML)
- [x] Тестовые MD-статьи: `marina-style.md`, `kate-career.md`, `julia-travel.md` + `comment-marina-style.md`
- [x] Утилита `src/lib/utils/parseContent.ts` — парсит frontmatter + body
- [x] Store статей `src/lib/stores/articlesStore.ts` — `import.meta.glob` + `articles`, `featuredArticle`, `allTags`
- [x] Unit-тест `src/lib/utils/parseContent.test.ts` (7 тестов, все прошли)

### Фаза 2 — Основные фичи
- [ ] Главная страница: hero-обложка выпуска (`src/routes/+page.svelte`)
- [ ] Компонент `ArticleCard.svelte` — карточка статьи
- [ ] Компонент `HeroBanner.svelte` — featured-статья на обложке
- [ ] Фильтр по тегам (`TagFilter.svelte` + `filteredArticlesStore`)
- [ ] Страница статьи (`src/routes/articles/[slug]/+page.svelte`)
- [ ] Компонент `ArticleContent.svelte` — рендер MD
- [ ] Компонент `CommentSection.svelte` — статичные комментарии
- [ ] Секция `RelatedArticles.svelte` — похожие статьи (рандом)

### Фаза 3 — Полировка
- [ ] Обработка ошибок и пустых состояний
- [ ] Адаптив (mobile-first)
- [ ] Оптимизация производительности
- [ ] Accessibility (a11y)

---

## Текущий спринт

**Спринт**: 2  
**Цель**: Контент-слой — типы, парсинг MD, store статей  
**Дедлайн**: —

| Задача | Статус | Заметки |
|---|---|---|
| TypeScript типы (Article, ArticleMeta, Comment) | [x] | `src/lib/types/` |
| Установить gray-matter + marked | [x] | npm install |
| Тестовые MD-статьи (3 шт. + 1 comment) | [x] | `src/content/` |
| `parseContent.ts` | [x] | frontmatter + HTML |
| `articlesStore.ts` | [x] | `import.meta.glob` |
| Unit-тест `parseContent.test.ts` | [x] | 7 тестов ✓ |

---

## Блокеры

- Нет
