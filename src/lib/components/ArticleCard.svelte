<script lang="ts">
	import type { ArticleMeta } from '$lib/types/Article';

	interface Props {
		article: ArticleMeta;
	}

	const { article }: Props = $props();

	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleDateString('ru-RU', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		});
	}
</script>

<a href="/articles/{article.slug}" class="group block">
	<article class="glass-card gradient-border overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
		<!-- Cover image -->
		<div class="relative aspect-[3/2] overflow-hidden">
			<img
				src={article.cover}
				alt={article.title}
				class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
				loading="lazy"
			/>
			<div class="absolute inset-0" style="background: var(--gradient-overlay);"></div>

			<!-- Tags overlay -->
			{#if article.tags.length > 0}
				<div class="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
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
			<p class="mt-3 text-xs" style="color: var(--color-text-muted);">
				{formatDate(article.date)}
			</p>
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
