export interface ArticleMeta {
	slug: string;
	title: string;
	subject: string;
	tags: string[];
	cover: string;
	featured: boolean;
	date: string;
}

export interface Article extends ArticleMeta {
	content: string; // rendered HTML
}
