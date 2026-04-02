# Template: New Route

## Информация

- **Путь роута**: `/<!-- path -->`
- **Файл**: `src/routes/<!-- path -->/+page.svelte`
- **Назначение**: <!-- что показывает страница -->

## Данные

- **Источник**: <!-- какой API-эндпоинт -->
- **Загрузка**: onMount + store
- **Состояния**: loading / error / empty / data

## Каркас

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  // Импорт API, stores, компонентов

  let loading = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      // загрузить данные
    } catch (e) {
      error = e instanceof Error ? e.message : 'Ошибка загрузки';
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <p>Загрузка...</p>
{:else if error}
  <p>{error}</p>
{:else}
  <!-- Основной контент -->
{/if}
```

## Компоненты на странице

<!-- Список компонентов, используемых на этой странице -->

- ...

## Навигация

- **Откуда приходят**: <!-- какие страницы ведут сюда -->
- **Куда уходят**: <!-- куда можно перейти -->
