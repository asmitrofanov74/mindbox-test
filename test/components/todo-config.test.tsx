import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { render, RenderResult, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TodoValueProps } from "../../src/interfaces";
import { clearCompleted, countItemsWithFalse } from "../../src/helpers";
import { TodoConfig } from "../../src/components/todo-config";

describe("Тестирование todo-config.tsx", () => {
  describe("Тестирование функции clearCompleted", () => {
    let todo: TodoValueProps[];

    afterEach(() => {
      vi.clearAllMocks();
    });

    describe("Удаление из массива всех задач с  isCheck: true", () => {
      beforeEach(() => {
        todo = [
          { text: "Task 1", isCheck: false },
          { text: "Task 2", isCheck: true },
        ];
      });

      test("Должно удалить все задачи с isCheck: true из массива", () => {
        const updatedTodo = clearCompleted(todo);
        expect(updatedTodo).toEqual([{ text: "Task 1", isCheck: false }]);
      });
    });

    describe("Обработка входного значения null", () => {
      test("Должно вернуть null, если входное значение null", () => {
        expect(clearCompleted(null)).toBeNull();
      });
    });

    describe("Обработка пустого массива", () => {
      beforeEach(() => {
        todo = [];
      });

      test("Должно вернуть пустой массив, если входной массив пуст", () => {
        const updatedTodo = clearCompleted(todo);
        expect(updatedTodo).toEqual([]);
      });
    });
  });

  describe("Тестирование функции countItemsWithFalse", () => {
    let todo: TodoValueProps[];

    afterEach(() => {
      vi.clearAllMocks();
    });

    describe("Подсчет задач с isCheck: false", () => {
      beforeEach(() => {
        todo = [
          { text: "Task 1", isCheck: false },
          { text: "Task 2", isCheck: true },
          { text: "Task 3", isCheck: false },
        ];
      });

      test("Должно вернуть количество задач с isCheck установленным в false", () => {
        const count = countItemsWithFalse(todo);
        expect(count).toBe(2);
      });
    });

    describe("Обработка входного значения null", () => {
      test("Должно вернуть 0, если входное значение null", () => {
        expect(countItemsWithFalse(null)).toBe(0);
      });
    });

    describe("Обработка пустого массива", () => {
      beforeEach(() => {
        todo = [];
      });

      test("Должно вернуть 0, если входной массив пуст", () => {
        const count = countItemsWithFalse(todo);
        expect(count).toBe(0);
      });
    });
  });

  describe("Тестирование компонента TodoConfig", () => {
    const setValueMock = vi.fn();
    const setFilterMock = vi.fn();
    let renderOption: RenderResult;

    const todo = [
      { text: "Task 1", isCheck: false },
      { text: "Task 2", isCheck: true },
      { text: "Task 3", isCheck: false },
    ];

    beforeEach(() => {
      renderOption = render(
        <TodoConfig
          value={todo}
          setValue={setValueMock}
          filter="All"
          setFilter={setFilterMock}
        />
      );
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    test("Компонент рендерится", () => {
      expect(renderOption).toBeTruthy();
    });

    describe("Тестирование интерактивных элементов TodoConfig", () => {
      test('При клике "Clear completed" все выполненные задачи удаляются', async () => {
        await userEvent.click(screen.getByText("Clear completed"));
        expect(setValueMock).toBeCalledWith([
          { text: "Task 1", isCheck: false },
          { text: "Task 3", isCheck: false },
        ]);
      });

      test('Работают фильтры "All", "Active", "Completed"', async () => {
        await userEvent.click(screen.getByText("Active"));
        expect(setFilterMock).toBeCalledWith("Active");
        renderOption.rerender(
          <TodoConfig
            value={todo}
            setValue={setValueMock}
            filter="Active"
            setFilter={setFilterMock}
          />
        );
        expect(
          screen
            .getByText("Active")
            .classList.contains("TodoConfigListTypeItemActive")
        ).toBeTruthy();

        await userEvent.click(screen.getByText("Completed"));
        expect(setFilterMock).toBeCalledWith("Completed");
        renderOption.rerender(
          <TodoConfig
            value={todo}
            setValue={setValueMock}
            filter="Completed"
            setFilter={setFilterMock}
          />
        );
        expect(
          screen
            .getByText("Completed")
            .classList.contains("TodoConfigListTypeItemActive")
        ).toBeTruthy();

        await userEvent.click(screen.getByText("All"));
        expect(setFilterMock).toBeCalledWith("All");
        renderOption.rerender(
          <TodoConfig
            value={todo}
            setValue={setValueMock}
            filter="All"
            setFilter={setFilterMock}
          />
        );
        expect(
          screen
            .getByText("All")
            .classList.contains("TodoConfigListTypeItemActive")
        ).toBeTruthy();
      });
    });
  });
});
