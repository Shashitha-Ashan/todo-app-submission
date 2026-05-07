import { httpClient } from "./httpClient";
import { getApiErrorMessage } from "./errors";
import type { ApiResponse, Todo, TodoInput } from "../features/todos/types";

const unwrap = <T>(response: { data: ApiResponse<T> }) =>
  response.data.data as T;

export const fetchTodos = async () => {
  try {
    const response = await httpClient.get<ApiResponse<Todo[]>>("/todos");
    return unwrap<Todo[]>(response) ?? [];
  } catch (error) {
    throw new Error(getApiErrorMessage(error));
  }
};

export const createTodo = async (payload: TodoInput) => {
  try {
    const response = await httpClient.post<ApiResponse<Todo>>(
      "/todos",
      payload
    );
    return unwrap<Todo>(response);
  } catch (error) {
    throw new Error(getApiErrorMessage(error));
  }
};

export const updateTodo = async (id: string, payload: TodoInput) => {
  try {
    const response = await httpClient.put<ApiResponse<Todo>>(
      `/todos/${id}`,
      payload
    );
    return unwrap<Todo>(response);
  } catch (error) {
    throw new Error(getApiErrorMessage(error));
  }
};

export const toggleTodoDone = async (id: string) => {
  try {
    const response = await httpClient.patch<ApiResponse<Todo>>(
      `/todos/${id}/done`
    );
    return unwrap<Todo>(response);
  } catch (error) {
    throw new Error(getApiErrorMessage(error));
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const response = await httpClient.delete<ApiResponse<Todo>>(`/todos/${id}`);
    return unwrap<Todo>(response);
  } catch (error) {
    throw new Error(getApiErrorMessage(error));
  }
};
