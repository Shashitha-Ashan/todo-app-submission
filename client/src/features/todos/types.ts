export interface Todo {
  _id: string;
  title: string;
  description?: string;
  done: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TodoInput {
  title: string;
  description?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  timestamp: string;
  data?: T;
}
