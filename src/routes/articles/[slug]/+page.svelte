<script lang="ts">
	import { page } from '$app/stores';
	import { articles } from '$lib/stores/articlesStore';
	import { parseComments } from '$lib/utils/parseContent';
	import { formatDate } from '$lib/utils/formatDate';
	import ArticleContent from '$lib/components/ArticleContent.svelte';
	import CommentSection from '$lib/components/CommentSection.svelte';
	import RelatedArticles from '$lib/components/RelatedArticles.svelte';
	import type { Article } from '$lib/types/Article';
	import type { Comment } from '$lib/types/Comment';

	const rawCommentModules = import.meta.glob('/src/content/comments/*.md', {
		eager: true,
		query: '?raw',
		import: 'default',
	}) as Record<string, string>;

	let article = $state<Article | null>(null);
	let comments = $state<Comment[]>([]);
	let relatedArticles = $state<Article[]>([]);
	let notFound = $state(false);

	function getRelated(current: Article, all: Article[]): Article[] {
		const others = all.filter((a) => a.slug !== current.slug);

		// Статьи с пересечением тегов
		const withSharedTags = others.filter((a) =>
			a.tags.some((tag) => current.tags.includes(tag)),
		);

		if (withSharedTags.length >= 3) {
			// Рандомный порядок, берём первые 3
			return [...withSharedTags].sort(() => Math.random() - 0.5).slice(0, 3);
		}

		// Если по тегам не хватает — добираем рандомом из остальных
		const tagSlugs = new Set(withSharedTags.map((a) => a.slug));
		const rest = others.filter((a) => !tagSlugs.has(a.slug));
		const combined = [
			...withSharedTags,
			...[...rest].sort(() => Math.random() - 0.5),
		];
		return combined.slice(0, 3);
	}

	function loadComments(slug: string): Comment[] {
		const key = `/src/content/comments/comment-${slug}.md`;
		const raw = rawCommentModules[key];
		if (!raw) return [];
		return parseComments(raw).comments;
	}

	$effect(() => {
		const slug = $page.params.slug ?? '';
		const all = $articles;
		const found = all.find((a) => a.slug === slug) ?? null;

		if (!found) {
			notFound = true;
			article = null;
			return;
		}

		notFound = false;
		article = found;
		comments = loadComments(slug);
		relatedArticles = getRelated(found, all);
	});
</script>

<svelte:head>
	{#if article}
		<title>{article.title} — Модные Сучки</title>
		<meta name="description" content="{article.subject} — {article.title}" />
	{:else if notFound}
		<title>Статья не найдена — Модные Сучки</title>
		<meta name="description" content="Запрошенная статья не найдена" />
	{:else}
		<title>Загрузка... — Модные Сучки</title>
	{/if}
</svelte:head>

{#if notFound}
	<!-- 404 state -->
	<div
		class="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center"
		role="main"
		aria-label="Страница не найдена"
	>
		<p class="gradient-text font-serif text-6xl font-black md:text-8xl" aria-hidden="true">404</p>
		<h1 class="font-serif text-2xl font-bold text-white md:text-3xl">
			Статья не найдена
		</h1>
		<p class="max-w-md text-sm" style="color: var(--color-text-muted);">
			Возможно, статья была удалена или адрес указан неверно.
		</p>
		<a
			href="/"
			class="back-btn inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
				<path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
			</svg>
			На главную
		</a>
	</div>

{:else if article}
	<!-- Hero cover -->
	<section class="article-hero relative w-full overflow-hidden" aria-label="Обложка статьи">
		<div class="absolute inset-0" aria-hidden="true">
			<img
				src={article.cover}
				alt=""
				class="h-full w-full object-cover"
				fetchpriority="high"
				decoding="async"
			/>
			<div class="absolute inset-0 bg-[#0a0a0a]/55"></div>
			<div class="absolute inset-0" style="background: var(--gradient-overlay);"></div>
			<div class="absolute inset-0" style="background: radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.6) 100%);"></div>
		</div>

		<!-- Back link -->
		<div class="relative z-10 px-6 pt-8 md:px-12 md:pt-10">
			<a
				href="/"
				class="back-link inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest transition-opacity hover:opacity-80"
				style="color: var(--color-text-muted);"
				aria-label="Вернуться ко всем статьям"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
					<path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
				</svg>
				Все статьи
			</a>
		</div>

		<!-- Hero content -->
		<div class="relative z-10 flex flex-col justify-end px-6 pb-10 md:px-12 md:pb-14" style="padding-top: 4rem;">
			<div class="max-w-2xl">
				<!-- Subject -->
				<p class="mb-3 text-sm font-semibold uppercase tracking-[0.2em]" style="color: var(--color-hot-pink);">
					{article.subject}
				</p>

				<!-- Title -->
				<h1 class="font-serif text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
					{article.title}
				</h1>

				<!-- Meta row -->
				<div class="mt-5 flex flex-wrap items-center gap-3">
					<time
						datetime={article.date}
						class="text-xs"
						style="color: var(--color-text-muted);"
					>
						{formatDate(article.date)}
					</time>

					{#if article.tags.length > 0}
						<span class="text-xs" style="color: var(--color-text-muted);" aria-hidden="true">·</span>
						<div class="flex flex-wrap gap-2" aria-label="Теги статьи">
							{#each article.tags as tag}
								<a
									href="/?tag={encodeURIComponent(tag)}"
									class="hero-tag rounded-full px-3 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white transition-opacity hover:opacity-80"
									aria-label="Показать статьи по тегу {tag}"
								>
									{tag}
								</a>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<!-- Article body -->
	<div class="mx-auto max-w-3xl px-4 py-10 md:py-14">
		<!-- Content -->
		<div class="mb-14 md:mb-16">
			<ArticleContent html={article.content} />
		</div>

		<!-- Divider -->
		<div class="accent-line mb-14 md:mb-16" aria-hidden="true"></div>

		<!-- Comments -->
		<div class="mb-14 md:mb-16">
			<CommentSection {comments} />
		</div>

		<!-- Related articles -->
		{#if relatedArticles.length > 0}
			<div class="accent-line mb-14 md:mb-16" aria-hidden="true"></div>
			<RelatedArticles articles={relatedArticles} />
		{/if}
	</div>

{:else}
	<!-- Loading skeleton -->
	<div class="article-skeleton" aria-label="Загрузка статьи" aria-busy="true" role="status">
		<div class="skeleton-hero animate-pulse bg-white/5"></div>
		<div class="mx-auto max-w-3xl px-4 py-10">
			<div class="mb-4 h-5 w-3/4 animate-pulse rounded bg-white/5"></div>
			<div class="mb-3 h-4 w-full animate-pulse rounded bg-white/5"></div>
			<div class="mb-3 h-4 w-5/6 animate-pulse rounded bg-white/5"></div>
			<div class="h-4 w-2/3 animate-pulse rounded bg-white/5"></div>
		</div>
	</div>
{/if}

<style>
	.article-hero {
		min-height: clamp(380px, 60vh, 680px);
	}

	.hero-tag {
		background: rgba(131, 56, 236, 0.3);
		border: 1px solid rgba(131, 56, 236, 0.5);
		backdrop-filter: blur(4px);
	}

	.back-btn {
		background: var(--gradient-accent-h);
	}

	.skeleton-hero {
		height: clamp(380px, 60vh, 680px);
		width: 100%;
	}
</style>
