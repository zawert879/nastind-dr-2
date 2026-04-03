<script lang="ts">
	import type { Article } from '$lib/types/Article';
	import ArticleCard from '$lib/components/ArticleCard.svelte';

	interface Props {
		articles: Article[];
	}

	const { articles }: Props = $props();
</script>

{#if articles.length > 0}
	<section class="related-section">
		<div class="mb-6 flex items-center gap-4">
			<h2 class="font-serif text-2xl font-bold text-white">
				Похожие статьи
			</h2>
			<div class="accent-line flex-1"></div>
		</div>

		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each articles as article (article.slug)}
				<ArticleCard {article} />
			{/each}
		</div>
	</section>
{/if}
