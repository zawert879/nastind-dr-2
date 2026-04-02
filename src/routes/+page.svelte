<script lang="ts">
	import { featuredArticle, allTags } from '$lib/stores/articlesStore';
	import { filteredArticles } from '$lib/stores/filteredArticlesStore';
	import HeroBanner from '$lib/components/HeroBanner.svelte';
	import TagFilter from '$lib/components/TagFilter.svelte';
	import ArticleCard from '$lib/components/ArticleCard.svelte';
</script>

<svelte:head>
	<title>Модные Сучки — Глянцевый журнал</title>
	<meta name="description" content="Модные Сучки — глянцевый журнал о стиле, карьере и путешествиях" />
</svelte:head>

<!-- Hero Banner -->
{#if $featuredArticle}
	<HeroBanner article={$featuredArticle} />
{/if}

<!-- Main content -->
<div class="mx-auto max-w-6xl px-4 py-10 md:py-14">

	<!-- Section header -->
	<div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h2 class="font-serif text-2xl font-bold text-white md:text-3xl">
				Все статьи
			</h2>
			<div class="accent-line mt-2 w-12"></div>
		</div>
		<p class="text-sm" style="color: var(--color-text-muted);">
			{$filteredArticles.length}
			{$filteredArticles.length === 1 ? 'статья' : $filteredArticles.length >= 2 && $filteredArticles.length <= 4 ? 'статьи' : 'статей'}
		</p>
	</div>

	<!-- Tag filter -->
	{#if $allTags.length > 0}
		<div class="mb-8">
			<TagFilter tags={$allTags} />
		</div>
	{/if}

	<!-- Article grid -->
	{#if $filteredArticles.length > 0}
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each $filteredArticles as article (article.slug)}
				<ArticleCard {article} />
			{/each}
		</div>
	{:else}
		<div class="flex flex-col items-center gap-4 py-20 text-center">
			<p class="font-serif text-xl text-white/40">Статей по этому тегу пока нет</p>
			<a
				href="/"
				class="text-sm font-medium transition-colors hover:text-white"
				style="color: var(--color-hot-pink);"
			>
				Показать все статьи
			</a>
		</div>
	{/if}
</div>
