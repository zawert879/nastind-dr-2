import matter from 'gray-matter';
import { marked } from 'marked';
import type { Article } from '$lib/types/Article';
import type { CommentFile } from '$lib/types/Comment';

export function parseArticle(raw: string, slug: string): Article {
	const { data, content } = matter(raw);

	const html = marked.parse(content);

	return {
		slug,
		title: String(data.title ?? ''),
		subject: String(data.subject ?? ''),
		tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
		cover: String(data.cover ?? ''),
		featured: Boolean(data.featured),
		date: String(data.date ?? ''),
		content: typeof html === 'string' ? html : '',
	};
}

export function parseComments(raw: string): CommentFile {
	const { data } = matter(raw);

	return {
		article: String(data.article ?? ''),
		comments: Array.isArray(data.comments) ? data.comments : [],
	};
}
