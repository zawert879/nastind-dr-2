import { writable, derived } from 'svelte/store';
import { articles } from '$lib/stores/articlesStore';
import type { Article } from '$lib/types/Article';

export const selectedTag = writable<string | null>(null);

export const filteredArticles = derived<[typeof articles, typeof selectedTag], Article[]>(
	[articles, selectedTag],
	([$articles, $selectedTag]) => {
		if (!$selectedTag) return $articles;
		return $articles.filter((a) => a.tags.includes($selectedTag));
	},
);
