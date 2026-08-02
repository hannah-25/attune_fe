import { apiRequest } from './client';

export type TodoPayload = {
  text: string;
  dueAt: string;
  isAllDay: boolean;
};

export type UpdateTodoPayload = Partial<TodoPayload> & {
  isCompleted?: boolean;
};

export type TodoItem = {
  todoId: number;
  text: string;
  dueAt: string;
  isAllDay: boolean;
  isCompleted: boolean;
};

export type UpdateTodoResponse = {
  todoId: number;
  text?: string;
  dueAt?: string;
  isAllDay?: boolean;
  isCompleted?: boolean;
};

export function createTodo(payload: TodoPayload) {
  return apiRequest<void>('/v1/todos', {
    method: 'POST',
    body: payload,
  });
}

export function getTodosByDate(date: string) {
  return apiRequest<{ todos: TodoItem[] }>(`/v1/todos?${new URLSearchParams({ date })}`);
}

export function getTodosByDateRange(startDate: string, endDate: string) {
  return apiRequest<{ todos: TodoItem[] }>(`/v1/todos?${new URLSearchParams({ startDate, endDate })}`);
}

export function getTodo(todoId: number) {
  return apiRequest<TodoItem>(`/v1/todos/${todoId}`);
}

export function updateTodo(todoId: number, payload: UpdateTodoPayload) {
  return apiRequest<UpdateTodoResponse>(`/v1/todos/${todoId}`, {
    method: 'PATCH',
    body: payload,
  });
}
