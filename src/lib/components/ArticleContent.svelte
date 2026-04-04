<script lang="ts">
	interface Props {
		html: string;
	}

	const { html }: Props = $props();
</script>

<!-- Контент из MD-файлов репо, не UGC — использование @html обосновано -->
<div class="article-body">
	{@html html}
</div>

<style>
	.article-body {
		font-family: var(--font-sans);
		color: var(--color-text);
		line-height: 1.8;
		max-width: 65ch;
		/* Prevent long words / URLs from breaking layout on mobile */
		overflow-wrap: break-word;
		word-break: break-word;
	}

	/* Headings */
	.article-body :global(h1),
	.article-body :global(h2),
	.article-body :global(h3),
	.article-body :global(h4),
	.article-body :global(h5),
	.article-body :global(h6) {
		font-family: var(--font-serif);
		font-weight: 700;
		color: #f5f5f5;
		margin-top: 2em;
		margin-bottom: 0.6em;
		line-height: 1.3;
	}

	.article-body :global(h2) {
		font-size: clamp(1.25rem, 4vw, 1.6rem);
		padding-bottom: 0.3em;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	.article-body :global(h3) {
		font-size: clamp(1.1rem, 3vw, 1.25rem);
	}

	/* Paragraphs */
	.article-body :global(p) {
		margin-bottom: 1.4em;
	}

	/* Bold & italic */
	.article-body :global(strong) {
		color: #f5f5f5;
		font-weight: 700;
	}

	.article-body :global(em) {
		color: rgba(245, 245, 245, 0.85);
		font-style: italic;
	}

	/* Blockquote */
	.article-body :global(blockquote) {
		border-left: 3px solid var(--color-hot-pink);
		margin: 2em 0;
		padding: 0.8em 1.4em;
		background: rgba(255, 0, 110, 0.06);
		border-radius: 0 8px 8px 0;
		font-family: var(--font-serif);
		font-size: clamp(1rem, 3vw, 1.1rem);
		font-style: italic;
		color: rgba(245, 245, 245, 0.9);
	}

	.article-body :global(blockquote p) {
		margin-bottom: 0;
	}

	/* Lists */
	.article-body :global(ul),
	.article-body :global(ol) {
		padding-left: 1.6em;
		margin-bottom: 1.4em;
	}

	.article-body :global(li) {
		margin-bottom: 0.5em;
	}

	.article-body :global(ul li::marker) {
		color: var(--color-hot-pink);
	}

	.article-body :global(ol li::marker) {
		color: var(--color-gold);
		font-weight: 700;
	}

	/* Table — wrapped in overflow container for mobile */
	.article-body :global(table) {
		width: 100%;
		border-collapse: collapse;
		margin: 2em 0;
		font-size: 0.9rem;
		overflow: hidden;
		border-radius: 8px;
		display: block;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
	}

	.article-body :global(thead tr) {
		background: rgba(255, 0, 110, 0.15);
	}

	.article-body :global(th) {
		padding: 0.75em 1em;
		text-align: left;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-size: 0.78rem;
		color: var(--color-hot-pink);
		border-bottom: 1px solid rgba(255, 0, 110, 0.3);
		white-space: nowrap;
	}

	.article-body :global(td) {
		padding: 0.65em 1em;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
		color: rgba(245, 245, 245, 0.85);
	}

	.article-body :global(tr:last-child td) {
		border-bottom: none;
	}

	.article-body :global(tbody tr:hover td) {
		background: rgba(255, 255, 255, 0.03);
	}

	/* Code */
	.article-body :global(code) {
		font-family: 'Courier New', monospace;
		font-size: 0.87em;
		background: rgba(255, 255, 255, 0.07);
		padding: 0.15em 0.45em;
		border-radius: 4px;
		color: var(--color-gold);
	}

	/* Links */
	.article-body :global(a) {
		color: var(--color-hot-pink);
		text-decoration: underline;
		text-decoration-color: rgba(255, 0, 110, 0.4);
		transition: color 0.2s;
	}

	.article-body :global(a:hover) {
		color: var(--color-purple);
	}

	.article-body :global(a:focus-visible) {
		outline: 2px solid var(--color-hot-pink);
		outline-offset: 2px;
		border-radius: 2px;
	}

	/* Images */
	.article-body :global(img) {
		max-width: 100%;
		height: auto;
		border-radius: 8px;
		margin: 1.5em 0;
	}

	/* HR */
	.article-body :global(hr) {
		border: none;
		height: 1px;
		background: rgba(255, 255, 255, 0.1);
		margin: 2.5em 0;
	}
</style>
