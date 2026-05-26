import { apiRequest } from './client';

export type TodoPayload = {
  text: string;
  dueAt: string;
  isAllDay: boolean;
};

export type TodoItem = {
  todoId: number;
  text: string;
  dueAt: string;
  isAllDay: boolean;
  isCompleted: boolean;
};

export type ToggleTodoCompleteResponse = {
  todoId: number;
  isCompleted: boolean;
};

export function createTodo(payload: TodoPayload) {
  return apiRequest<void>('/v1/todos', {
    method: 'POST',
    body: payload,
  });
}

export function getTodosByDate(date: string) {
  return apiRequest<{ todos: TodoItem[] }>(`/api/todos?${new URLSearchParams({ date })}`);
}

export function toggleTodoComplete(todoId: number) {
  return apiRequest<ToggleTodoCompleteResponse>(`/v1/todos/${todoId}/complete`, {
    method: 'PATCH',
  });
}
