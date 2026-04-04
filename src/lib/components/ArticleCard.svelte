<script lang="ts">
	import { base } from '$app/paths';
	import type { ArticleMeta } from '$lib/types/Article';
	import { formatDate } from '$lib/utils/formatDate';

	interface Props {
		article: ArticleMeta;
	}

	const { article }: Props = $props();
</script>

<a
	href="{base}/articles/{article.slug}"
	class="group block"
	aria-label="{article.title} — {article.subject}"
>
	<article class="glass-card gradient-border overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
		<!-- Cover image -->
		<div class="relative aspect-[3/2] overflow-hidden">
			<img
				src="{base}{article.cover}"
				alt=""
				class="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
				loading="lazy"
				decoding="async"
				aria-hidden="true"
			/>
			<div class="absolute inset-0" style="background: var(--gradient-overlay);" aria-hidden="true"></div>

			<!-- Tags overlay -->
			{#if article.tags.length > 0}
				<div class="absolute bottom-3 left-3 flex flex-wrap gap-1.5" aria-hidden="true">
					{#each article.tags as tag}
						<span class="tag-chip rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white">
							{tag}
						</span>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Content -->
		<div class="p-4 md:p-5">
			<p class="mb-1.5 text-xs font-medium uppercase tracking-widest" style="color: var(--color-hot-pink);">
				{article.subject}
			</p>
			<h2 class="font-serif text-base font-bold leading-snug text-[#f5f5f5] md:text-lg">
				{article.title}
			</h2>
			{#if article.tags.length > 0}
				<p class="sr-only">Теги: {article.tags.join(', ')}</p>
			{/if}
			<time
				datetime={article.date}
				class="mt-3 block text-xs"
				style="color: var(--color-text-muted);"
			>
				{formatDate(article.date)}
			</time>
		</div>
	</article>
</a>

<style>
	.tag-chip {
		background: rgba(255, 0, 110, 0.25);
		border: 1px solid rgba(255, 0, 110, 0.4);
		backdrop-filter: blur(4px);
	}
</style>
