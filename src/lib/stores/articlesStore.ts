import { writable, derived } from 'svelte/store';
import { parseArticle } from '$lib/utils/parseContent';
import type { Article } from '$lib/types/Article';

const rawModules = import.meta.glob('/src/content/articles/*.md', {
	eager: true,
	query: '?raw',
	import: 'default',
}) as Record<string, string>;

function slugFromPath(path: string): string {
	return path.split('/').pop()!.replace('.md', '');
}

const initialArticles: Article[] = Object.entries(rawModules)
	.map(([path, raw]) => parseArticle(raw, slugFromPath(path)))
	.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const articles = writable<Article[]>(initialArticles);

export const featuredArticle = derived(
	articles,
	($articles) => $articles.find((a) => a.featured) ?? $articles[0] ?? null,
);

export const allTags = derived(articles, ($articles) => {
	const tags = new Set<string>();
	$articles.forEach((a) => a.tags.forEach((t) => tags.add(t)));
	return Array.from(tags).sort();
});
