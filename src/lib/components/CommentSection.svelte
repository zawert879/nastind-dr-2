<script lang="ts">
	import { base } from '$app/paths';
	import type { Comment } from '$lib/types/Comment';
	import { formatDate } from '$lib/utils/formatDate';

	interface Props {
		comments: Comment[];
	}

	const { comments }: Props = $props();

	// Track which avatar images failed to load
	const avatarErrors = $state<Record<string, boolean>>({});

	function handleAvatarError(key: string) {
		avatarErrors[key] = true;
	}

	function avatarKey(comment: Comment): string {
		return comment.author + comment.date;
	}

	function getInitials(name: string): string {
		return name
			.split(' ')
			.map((part) => part[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	}
</script>

<section class="comments-section" aria-label="Комментарии к статье">
	<div class="mb-6 flex items-center gap-4">
		<h2 class="font-serif text-2xl font-bold text-white" id="comments-heading">
			Комментарии
		</h2>
		{#if comments.length > 0}
			<span
				class="comment-count rounded-full px-2.5 py-0.5 text-xs font-semibold"
				aria-label="{comments.length} {comments.length === 1 ? 'комментарий' : comments.length >= 2 && comments.length <= 4 ? 'комментария' : 'комментариев'}"
			>
				{comments.length}
			</span>
		{/if}
		<div class="accent-line flex-1" aria-hidden="true"></div>
	</div>

	{#if comments.length === 0}
		<div class="empty-state glass-card flex flex-col items-center gap-3 py-12 text-center" role="status">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
			</svg>
			<p class="font-serif text-lg text-white/50">Комментариев пока нет</p>
			<p class="text-sm" style="color: var(--color-text-muted);">Станьте первой, кто выскажется</p>
		</div>
	{:else}
		<ol class="flex flex-col gap-4" aria-labelledby="comments-heading">
			{#each comments as comment (comment.author + comment.date)}
				<li>
					<article class="comment-card glass-card gradient-border p-4 md:p-5">
						<div class="flex items-start gap-3 md:gap-4">
							<!-- Avatar -->
							<div class="avatar-wrapper flex-shrink-0">
								{#if !avatarErrors[avatarKey(comment)]}
									<img
										src="{base}{comment.avatar}"
										alt="{comment.author}"
										class="h-10 w-10 rounded-full object-cover md:h-11 md:w-11"
										loading="lazy"
										decoding="async"
										onerror={() => handleAvatarError(avatarKey(comment))}
									/>
								{:else}
									<div
										class="avatar-fallback flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white md:h-11 md:w-11"
										aria-label="Аватар {comment.author}"
									>
										{getInitials(comment.author)}
									</div>
								{/if}
							</div>

							<!-- Content -->
							<div class="min-w-0 flex-1">
								<div class="mb-1.5 flex flex-wrap items-baseline gap-2">
									<span class="font-semibold text-[#f5f5f5]">{comment.author}</span>
									<time
										datetime={comment.date}
										class="text-xs"
										style="color: var(--color-text-muted);"
									>
										{formatDate(comment.date)}
									</time>
								</div>
								<p class="text-sm leading-relaxed" style="color: rgba(245, 245, 245, 0.85);">
									{comment.text}
								</p>
							</div>
						</div>
					</article>
				</li>
			{/each}
		</ol>
	{/if}
</section>

<style>
	.comment-count {
		background: rgba(255, 0, 110, 0.2);
		border: 1px solid rgba(255, 0, 110, 0.35);
		color: var(--color-hot-pink);
	}

	.empty-state {
		border-style: dashed;
	}

	.avatar-fallback {
		background: linear-gradient(135deg, var(--color-hot-pink), var(--color-purple));
	}
</style>
