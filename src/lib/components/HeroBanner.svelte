<script lang="ts">
	import { base } from '$app/paths';
	import type { ArticleMeta } from '$lib/types/Article';
	import { formatDate } from '$lib/utils/formatDate';

	interface Props {
		article: ArticleMeta;
	}

	const { article }: Props = $props();
</script>

<section class="hero-section relative w-full overflow-hidden" aria-label="Героиня номера: {article.subject}">
	<!-- Background image — decorative, aria-hidden -->
	<div class="absolute inset-0" aria-hidden="true">
		<img
			src="{base}{article.cover}"
			alt=""
			class="h-full w-full object-cover object-top"
			fetchpriority="high"
			decoding="async"
		/>
		<!-- Dark overlay -->
		<div class="absolute inset-0 bg-[#0a0a0a]/60"></div>
		<!-- Gradient overlay from bottom -->
		<div class="absolute inset-0" style="background: var(--gradient-overlay);"></div>
		<!-- Side vignette -->
		<div class="absolute inset-0" style="background: radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.7) 100%);"></div>
	</div>

	<!-- Issue badge -->
	<div class="relative z-10 flex items-start justify-between px-6 pt-8 md:px-12 md:pt-12" aria-hidden="true">
		<div class="flex flex-col gap-1">
			<span class="text-[10px] font-semibold uppercase tracking-[0.3em]" style="color: var(--color-gold);">
				Выпуск апрель 2026
			</span>
			<div class="accent-line w-16"></div>
		</div>
		<span class="rounded-full border border-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/60 backdrop-blur-sm">
			Героиня номера
		</span>
	</div>

	<!-- Main content -->
	<div class="relative z-10 flex min-h-[50vh] flex-col justify-end px-6 pb-10 md:px-12 md:pb-14">
		<div class="max-w-2xl">
			<!-- Subject -->
			<p class="mb-3 text-sm font-semibold uppercase tracking-[0.2em]" style="color: var(--color-hot-pink);">
				{article.subject}
			</p>

			<!-- Title -->
			<h2 class="font-serif text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
				{article.title}
			</h2>

			<!-- Meta row -->
			<div class="mt-5 flex flex-wrap items-center gap-4">
				<time
					datetime={article.date}
					class="text-xs"
					style="color: var(--color-text-muted);"
				>
					{formatDate(article.date)}
				</time>

				{#if article.tags.length > 0}
					<div class="flex flex-wrap gap-2" aria-label="Теги">
						{#each article.tags as tag}
							<a
								href="{base}/?tag={encodeURIComponent(tag)}"
								class="hero-tag rounded-full px-3 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white transition-opacity hover:opacity-80"
								aria-label="Показать статьи по тегу {tag}"
							>
								{tag}
							</a>
						{/each}
					</div>
				{/if}
			</div>

			<!-- CTA button -->
			<a
				href="{base}/articles/{article.slug}"
				class="cta-btn mt-6 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
				aria-label="Читать статью «{article.title}»"
			>
				Читать статью
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
			</a>
		</div>
	</div>
</section>

<style>
	.hero-section {
		min-height: clamp(400px, 65vh, 720px);
	}

	.hero-tag {
		background: rgba(131, 56, 236, 0.3);
		border: 1px solid rgba(131, 56, 236, 0.5);
		backdrop-filter: blur(4px);
	}

	.cta-btn {
		background: var(--gradient-accent-h);
	}
</style>
