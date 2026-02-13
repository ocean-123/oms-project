  export interface LoginRequest {
    employeeCode: string;
    password: string;
  }

  export interface LoginResponse {
    token: string;
    role: string;
    createdAt: string;
  }

  export interface User {
    id?: number;
    username: string;
    password?: string; 
    role: string;
  }