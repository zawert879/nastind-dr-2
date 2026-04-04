import fm from 'front-matter';
import { marked } from 'marked';
import type { Article } from '$lib/types/Article';
import type { CommentFile } from '$lib/types/Comment';

// Явно отключаем вставку raw HTML из MD-файлов (защита от XSS)
marked.use({ breaks: false });

export function parseArticle(raw: string, slug: string): Article {
	const { attributes, body } = fm<Record<string, unknown>>(raw);

	const html = marked.parse(body, { async: false });

	return {
		slug,
		title: String(attributes.title ?? ''),
		subject: String(attributes.subject ?? ''),
		tags: Array.isArray(attributes.tags) ? (attributes.tags as string[]) : [],
		cover: String(attributes.cover ?? ''),
		featured: Boolean(attributes.featured),
		date: String(attributes.date ?? ''),
		content: typeof html === 'string' ? html : '',
	};
}

export function parseComments(raw: string): CommentFile {
	const { attributes } = fm<Record<string, unknown>>(raw);

	return {
		article: String(attributes.article ?? ''),
		comments: Array.isArray(attributes.comments) ? attributes.comments : [],
	};
}
