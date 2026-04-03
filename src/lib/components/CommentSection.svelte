<script lang="ts">
	import type { Comment } from '$lib/types/Comment';

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

	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleDateString('ru-RU', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		});
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

<section class="comments-section">
	<div class="mb-6 flex items-center gap-4">
		<h2 class="font-serif text-2xl font-bold text-white">
			Комментарии
		</h2>
		{#if comments.length > 0}
			<span class="comment-count rounded-full px-2.5 py-0.5 text-xs font-semibold">
				{comments.length}
			</span>
		{/if}
		<div class="accent-line flex-1"></div>
	</div>

	{#if comments.length === 0}
		<div class="empty-state glass-card flex flex-col items-center gap-3 py-12 text-center">
			<span class="text-3xl" aria-hidden="true">💬</span>
			<p class="font-serif text-lg text-white/50">Комментариев пока нет</p>
			<p class="text-sm" style="color: var(--color-text-muted);">Станьте первой, кто выскажется</p>
		</div>
	{:else}
		<div class="flex flex-col gap-4">
			{#each comments as comment (comment.author + comment.date)}
				<article class="comment-card glass-card gradient-border p-4 md:p-5">
					<div class="flex items-start gap-3 md:gap-4">
						<!-- Avatar -->
						<div class="avatar-wrapper flex-shrink-0">
							{#if !avatarErrors[avatarKey(comment)]}
								<img
									src={comment.avatar}
									alt={comment.author}
									class="h-10 w-10 rounded-full object-cover md:h-11 md:w-11"
									onerror={() => handleAvatarError(avatarKey(comment))}
								/>
							{:else}
								<div
									class="avatar-fallback flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white md:h-11 md:w-11"
									aria-hidden="true"
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
			{/each}
		</div>
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
