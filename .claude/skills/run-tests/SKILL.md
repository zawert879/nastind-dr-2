# /run-tests — Запустить тесты

## Описание
Запустить тесты и сообщить результат.

## Вход (опционально)
Модуль или файл для тестирования. Без аргумента — все тесты.

## Шаги

1. Переключись в режим Test Agent (`.claude/agents/test-agent.md`)
2. Определи какие тесты запускать:
   - Без аргумента: `npm run test`
   - С аргументом: `npx vitest run [путь]` или `npx playwright test [путь]`
3. Запусти тесты
4. Проанализируй результат
5. Если есть падения — предложи исправления

## Команды

```bash
# Все unit-тесты
npm run test

# Конкретный файл
npx vitest run src/lib/utils/formatDate.test.ts

# E2E тесты
npx playwright test

# Конкретный e2e тест
npx playwright test tests/e2e/navigation.spec.ts
```

## Формат вывода

```
## Результаты тестов

- **Unit**: X passed, Y failed
- **E2E**: X passed, Y failed

### Упавшие тесты
<!-- если есть -->

### Рекомендации
<!-- если есть -->
```
