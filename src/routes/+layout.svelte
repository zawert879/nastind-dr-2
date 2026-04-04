<script lang="ts">
	import '../app.css';
	import { base } from '$app/paths';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();

	let menuOpen = $state(false);

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}
</script>

<svelte:head>
	<title>Модные Сучки</title>
	<meta name="description" content="Модные Сучки — глянцевый журнал для избранных" />
</svelte:head>

<a href="#main-content" class="skip-nav">Перейти к основному содержимому</a>

<div class="flex min-h-screen flex-col bg-[#0a0a0a] text-[#f5f5f5]">
	<header class="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md">
		<div class="mx-auto max-w-6xl px-4 py-4">
			<div class="flex items-center justify-between">
				<a href="{base}/" class="flex flex-col gap-0.5">
					<span
						class="gradient-text font-serif text-2xl font-black tracking-tight md:text-3xl"
					>
						Модные Сучки
					</span>
					<span class="text-[10px] font-light uppercase tracking-[0.25em] text-white/40">
						Глянцевый журнал
					</span>
				</a>

				<nav class="hidden items-center gap-6 md:flex" aria-label="Основная навигация">
					<a
						href="{base}/"
						class="text-sm font-medium text-white/60 transition-colors hover:text-white"
					>
						Выпуски
					</a>
					<a
						href="{base}/?tag=Стиль"
						class="text-sm font-medium text-white/60 transition-colors hover:text-white"
					>
						Стиль
					</a>
					<a
						href="{base}/?tag=Карьера"
						class="text-sm font-medium text-white/60 transition-colors hover:text-white"
					>
						Карьера
					</a>
				</nav>

				<button
					onclick={toggleMenu}
					class="flex md:hidden flex-col items-center justify-center gap-1.5 p-2 text-white/60 hover:text-white transition-colors"
					aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
					aria-expanded={menuOpen}
					aria-controls="mobile-nav"
				>
					{#if menuOpen}
						<span class="block h-0.5 w-5 rotate-45 translate-y-2 bg-current transition-transform"></span>
						<span class="block h-0.5 w-5 opacity-0 bg-current transition-opacity"></span>
						<span class="block h-0.5 w-5 -rotate-45 -translate-y-2 bg-current transition-transform"></span>
					{:else}
						<span class="block h-0.5 w-5 bg-current transition-transform"></span>
						<span class="block h-0.5 w-5 bg-current transition-opacity"></span>
						<span class="block h-0.5 w-5 bg-current transition-transform"></span>
					{/if}
				</button>
			</div>
		</div>

		{#if menuOpen}
			<div id="mobile-nav" class="md:hidden border-t border-white/10 bg-[#0a0a0a]/95 backdrop-blur-md">
				<nav class="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-1" aria-label="Мобильная навигация">
					<a
						href="{base}/"
						onclick={closeMenu}
						class="px-3 py-3 text-sm font-medium text-white/60 transition-colors hover:text-white hover:bg-white/5 rounded-md"
					>
						Выпуски
					</a>
					<a
						href="{base}/?tag=Стиль"
						onclick={closeMenu}
						class="px-3 py-3 text-sm font-medium text-white/60 transition-colors hover:text-white hover:bg-white/5 rounded-md"
					>
						Стиль
					</a>
					<a
						href="{base}/?tag=Карьера"
						onclick={closeMenu}
						class="px-3 py-3 text-sm font-medium text-white/60 transition-colors hover:text-white hover:bg-white/5 rounded-md"
					>
						Карьера
					</a>
				</nav>
			</div>
		{/if}

		<div class="accent-line"></div>
	</header>

	<main id="main-content" class="flex-1" tabindex="-1">
		{@render children()}
	</main>

	<footer class="mt-16 border-t border-white/10">
		<div class="mx-auto max-w-6xl px-4 py-8">
			<div class="flex flex-col items-center gap-3 text-center">
				<span class="gradient-text font-serif text-xl font-bold">
					Модные Сучки
				</span>
				<p class="text-xs text-white/30">
					© 2026 · Глянцевый журнал для избранных
				</p>
			</div>
		</div>
	</footer>
</div>
