# Template: New Test

## Информация

- **Тип**: unit / component / e2e
- **Цель**: <!-- что тестируем -->
- **Файл теста**: <!-- путь -->
- **Тестируемый файл**: <!-- путь -->

## Сценарии

| Сценарий | Ожидание |
|---|---|
| ... | ... |

## Каркас (Unit — Vitest)

```ts
import { describe, it, expect } from 'vitest';

describe('<!-- название -->', () => {
  it('should <!-- сценарий -->', () => {
    // Arrange
    // Act
    // Assert
    expect(result).toBe(expected);
  });
});
```

## Каркас (Component — Testing Library)

```ts
import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Component from './Component.svelte';

describe('Component', () => {
  it('should render correctly', () => {
    render(Component, { props: { /* ... */ } });
    expect(screen.getByText('...')).toBeInTheDocument();
  });
});
```

## Каркас (E2E — Playwright)

```ts
import { test, expect } from '@playwright/test';

test('<!-- сценарий -->', async ({ page }) => {
  await page.goto('/<!-- path -->');
  // взаимодействия
  await expect(page.getByText('...')).toBeVisible();
});
```
