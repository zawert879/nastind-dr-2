<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { selectedTag } from '$lib/stores/filteredArticlesStore';

	interface Props {
		tags: string[];
	}

	const { tags }: Props = $props();

	// Sync selectedTag store with URL on mount and whenever URL changes
	$effect(() => {
		const tagParam = $page.url.searchParams.get('tag');
		selectedTag.set(tagParam || null);
	});

	function selectTag(tag: string | null) {
		const url = new URL($page.url);
		if (tag) {
			url.searchParams.set('tag', tag);
		} else {
			url.searchParams.delete('tag');
		}
		goto(url.toString(), { replaceState: true, keepFocus: true });
	}

	const activeTag = $derived($page.url.searchParams.get('tag') || null);
</script>

<div class="flex flex-wrap items-center gap-2" role="group" aria-label="Фильтр по тегам">
	<button
		onclick={() => selectTag(null)}
		class="filter-chip {activeTag === null ? 'filter-chip--active' : ''}"
		aria-pressed={activeTag === null}
	>
		Все
	</button>

	{#each tags as tag}
		<button
			onclick={() => selectTag(tag)}
			class="filter-chip {activeTag === tag ? 'filter-chip--active' : ''}"
			aria-pressed={activeTag === tag}
		>
			{tag}
		</button>
	{/each}
</div>

<style>
	.filter-chip {
		border-radius: 9999px;
		padding: 0.375rem 1rem;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: rgba(245, 245, 245, 0.6);
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		transition: all 0.2s ease;
		cursor: pointer;
		white-space: nowrap;
	}

	.filter-chip:hover {
		color: #f5f5f5;
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.2);
	}

	.filter-chip--active {
		color: #fff;
		background: linear-gradient(135deg, #ff006e 0%, #8338ec 50%, #ffd700 100%);
		border-color: transparent;
	}

	.filter-chip--active:hover {
		background: linear-gradient(135deg, #ff006e 0%, #8338ec 50%, #ffd700 100%);
		opacity: 0.9;
	}
</style>
