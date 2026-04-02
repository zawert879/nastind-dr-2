# Tasks Completed — Архив задач

> Завершённые задачи переносятся сюда из dev-plan.md.

---

## Формат записи

### [Дата] — Название задачи

- **Что сделано**: краткое описание
- **Файлы**: затронутые файлы
- **Заметки**: важные детали

---

### 2026-04-03 — Фаза 1: Контент-слой

- **Что сделано**: TypeScript-типы, MD-парсер, тестовые статьи, parseContent, articlesStore, unit-тесты
- **Файлы**:
  - `src/lib/types/Article.ts` — `Article`, `ArticleMeta`
  - `src/lib/types/Comment.ts` — `Comment`, `CommentFile`
  - `src/lib/utils/parseContent.ts` — `parseArticle()`, `parseComments()`
  - `src/lib/stores/articlesStore.ts` — `articles`, `featuredArticle`, `allTags`
  - `src/lib/utils/parseContent.test.ts` — 7 тестов, все прошли
  - `src/content/articles/marina-style.md` — featured статья
  - `src/content/articles/kate-career.md`
  - `src/content/articles/julia-travel.md`
  - `src/content/comments/comment-marina-style.md`
- **Заметки**: gray-matter@4.0.3 + marked@17.0.5. Тесты с `// @vitest-environment node` (jsdom не установлен). `import.meta.glob` с `?raw` — контент бандлится при сборке.

---

### 2026-04-02 — Фаза 0: Инфраструктура

- **Что сделано**: Создан полный каркас SvelteKit-проекта с нуля
- **Файлы**:
  - `package.json` — зависимости (Svelte 5, SvelteKit 2, Tailwind 3, TypeScript 5, Vitest, Playwright)
  - `svelte.config.js` — adapter-static (build → `/build`)
  - `vite.config.ts` — SvelteKit + Vitest (jsdom)
  - `tsconfig.json` — strict mode, `$lib` path alias
  - `eslint.config.js` — ESLint 9 flat config (TS + Svelte)
  - `.prettierrc` — tabs, singleQuote, prettier-plugin-svelte
  - `tailwind.config.js` — Dark Editorial цвета (hot-pink, electric-purple, gold)
  - `postcss.config.js`
  - `.gitignore`
  - `playwright.config.ts` — Desktop Chrome + Pixel 7
  - `src/app.html` — Google Fonts (Playfair Display + Inter)
  - `src/app.css` — CSS-переменные Dark Editorial, `.gradient-text`, `.glass-card`, `.accent-line`
  - `src/routes/+layout.ts` — `ssr=false`, `prerender=true`
  - `src/routes/+layout.svelte` — шапка с градиентным лого, sticky nav, подвал
  - `src/routes/+page.svelte` — placeholder главной
  - `src/routes/+error.svelte` — страница 404/ошибки
  - `src/lib/api/client.ts` — `apiClient.get/post()` + `ApiError`
  - Директории: `src/lib/{components,stores,utils,types}/`, `src/content/{articles,comments}/`, `static/images/{covers,avatars}/`, `tests/e2e/`
- **Заметки**: Проект создан вручную (без `npm create svelte`). Перед первым запуском нужно `npm install`, затем `npm run dev` сгенерирует `.svelte-kit/`
