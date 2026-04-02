// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { parseArticle, parseComments } from './parseContent';

const ARTICLE_RAW = `---
title: "Тестовая статья"
subject: "Тест"
tags: ["Стиль", "Карьера"]
cover: "/images/covers/test.jpg"
featured: true
date: "2026-04-01"
---

## Заголовок

Текст статьи с **жирным** и *курсивом*.
`;

const COMMENT_RAW = `---
article: "test-article"
comments:
  - author: "Аня"
    avatar: "/images/avatars/anya.jpg"
    date: "2026-04-01"
    text: "Отличная статья!"
  - author: "Петя"
    avatar: "/images/avatars/petya.jpg"
    date: "2026-04-02"
    text: "Согласен полностью."
---
`;

describe('parseArticle', () => {
	it('parses frontmatter fields correctly', () => {
		const article = parseArticle(ARTICLE_RAW, 'test-article');

		expect(article.slug).toBe('test-article');
		expect(article.title).toBe('Тестовая статья');
		expect(article.subject).toBe('Тест');
		expect(article.tags).toEqual(['Стиль', 'Карьера']);
		expect(article.cover).toBe('/images/covers/test.jpg');
		expect(article.featured).toBe(true);
		expect(article.date).toBe('2026-04-01');
	});

	it('renders markdown body to HTML', () => {
		const article = parseArticle(ARTICLE_RAW, 'test-article');

		expect(article.content).toContain('<h2>');
		expect(article.content).toContain('<strong>жирным</strong>');
		expect(article.content).toContain('<em>курсивом</em>');
	});

	it('defaults featured to false when not set', () => {
		const raw = `---
title: "Без featured"
subject: "Тест"
tags: []
cover: ""
date: "2026-04-01"
---
Текст.
`;
		const article = parseArticle(raw, 'no-featured');
		expect(article.featured).toBe(false);
	});

	it('defaults tags to empty array when missing', () => {
		const raw = `---
title: "Без тегов"
subject: "Тест"
cover: ""
date: "2026-04-01"
---
Текст.
`;
		const article = parseArticle(raw, 'no-tags');
		expect(article.tags).toEqual([]);
	});
});

describe('parseComments', () => {
	it('parses article slug and comments array', () => {
		const result = parseComments(COMMENT_RAW);

		expect(result.article).toBe('test-article');
		expect(result.comments).toHaveLength(2);
	});

	it('parses individual comment fields', () => {
		const result = parseComments(COMMENT_RAW);
		const first = result.comments[0];

		expect(first.author).toBe('Аня');
		expect(first.avatar).toBe('/images/avatars/anya.jpg');
		expect(first.date).toBe('2026-04-01');
		expect(first.text).toBe('Отличная статья!');
	});

	it('returns empty comments array when missing', () => {
		const raw = `---
article: "test"
---
`;
		const result = parseComments(raw);
		expect(result.comments).toEqual([]);
	});
});
