<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
	<p class="text-sm uppercase tracking-widest text-white/30">Ошибка</p>

	<h1 class="gradient-text mt-4 font-serif text-8xl font-black">
		{$page.status}
	</h1>

	<p class="mt-3 text-lg text-white/60">
		{#if $page.status === 404}
			Страница не найдена
		{:else}
			Что-то пошло не так
		{/if}
	</p>

	{#if $page.error?.message && $page.status !== 404}
		<p class="mt-2 text-sm text-white/30">{$page.error.message}</p>
	{/if}

	<a
		href="/"
		class="mt-8 rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-white/70 transition-all hover:border-white/40 hover:text-white"
	>
		На главную
	</a>
</div>
