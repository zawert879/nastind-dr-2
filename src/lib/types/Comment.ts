export interface Comment {
	author: string;
	avatar: string;
	date: string;
	text: string;
}

export interface CommentFile {
	article: string; // article slug
	comments: Comment[];
}
