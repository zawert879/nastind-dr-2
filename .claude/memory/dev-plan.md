# Dev Plan — План разработки

> ГЛАВНЫЙ ДОКУМЕНТ. Обновляется агентом после каждой задачи.

---

## Текущий фокус

Фаза 3 завершена. Все задачи полировки выполнены.

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

#### 2а — Главная страница ✅
- [x] `src/lib/stores/filteredArticlesStore.ts` — `selectedTag` + `filteredArticles` (derived)
- [x] `src/lib/components/ArticleCard.svelte` — glassmorphism-карточка (обложка, заголовок, теги, дата)
- [x] `src/lib/components/HeroBanner.svelte` — hero featured-статьи (фон, оверлей, CTA)
- [x] `src/lib/components/TagFilter.svelte` — фильтр-чипы по тегам, синхронизация с URL `?tag=`
- [x] `src/routes/+page.svelte` — сборка: HeroBanner + TagFilter + сетка ArticleCard

#### 2б — Страница статьи ✅
- [x] `src/routes/articles/[slug]/+page.svelte`
- [x] `src/lib/components/ArticleContent.svelte` — рендер MD-контента
- [x] `src/lib/components/CommentSection.svelte` — статичные комментарии
- [x] `src/lib/components/RelatedArticles.svelte` — похожие статьи (рандом)

### Фаза 3 — Полировка ✅
- [x] Обработка ошибок и пустых состояний
- [x] Адаптив (mobile-first)
- [x] Оптимизация производительности
- [x] Accessibility (a11y)

---

## Текущий спринт

### Спринт 4 — завершён ✅

| Задача | Статус | Заметки |
|---|---|---|
| `src/routes/articles/[slug]/+page.svelte` | [x] | страница статьи |
| `ArticleContent.svelte` — рендер MD-контента | [x] | `src/lib/components/` |
| `CommentSection.svelte` — статичные комментарии | [x] | `src/lib/components/` |
| `RelatedArticles.svelte` — похожие статьи (рандом) | [x] | `src/lib/components/` |

### Спринт 3 — завершён ✅

| Задача | Статус | Заметки |
|---|---|---|
| `filteredArticlesStore.ts` — selectedTag + filteredArticles | [x] | `src/lib/stores/` |
| `ArticleCard.svelte` — glassmorphism-карточка | [x] | `src/lib/components/` |
| `HeroBanner.svelte` — hero featured-статьи | [x] | `src/lib/components/` |
| `TagFilter.svelte` — фильтр-чипы, синхронизация с URL | [x] | `src/lib/components/` |
| `+page.svelte` — сборка главной страницы | [x] | `src/routes/` |

---

### Спринт 5 — завершён ✅ (исправления по код-ревью)

| Задача | Статус | Заметки |
|---|---|---|
| Вынести `formatDate` в утилиту | [x] | `src/lib/utils/formatDate.ts`, заменено в 4 файлах |
| Добавить `<h1>` на главную страницу | [x] | `.sr-only` в `src/routes/+page.svelte` |
| Исправить `aria-controls` на бургере | [x] | `id="mobile-nav"` + `aria-controls` в `+layout.svelte` |
| Убрать эмодзи из `CommentSection.svelte` | [x] | Заменено на SVG-иконку |
| Заменить `get(articles)` на `$articles` | [x] | `src/routes/articles/[slug]/+page.svelte` |
| Безопасные настройки marked | [x] | `marked.use({ breaks: false })` + `{ async: false }` |

---

## Блокеры

- Нет
