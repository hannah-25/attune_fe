import { apiRequest } from './client';

export type TodoPayload = {
  text: string;
  dueAt: string;
  isAllDay: boolean;
};

export function createTodo(payload: TodoPayload) {
  return apiRequest<void>('/v1/todos', {
    method: 'POST',
    body: payload,
  });
}
