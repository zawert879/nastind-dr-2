export const prerender = true;

export function entries() {
	const modules = import.meta.glob('/src/content/articles/*.md', { query: '?raw', eager: false });
	return Object.keys(modules).map((path) => {
		const slug = path.split('/').at(-1)?.replace('.md', '') ?? '';
		return { slug };
	});
}
