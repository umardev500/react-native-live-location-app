// Define the User type
export interface User {
  id: number;
  name: string;
  username: string;
  created_at: string | null; // `null` or ISO date string
  updated_at: string | null; // `null` or ISO date string
}

// Define the response type
export interface LoginResponse {
  success: boolean;
  user: User;
  token: string;
  interval: number;
}
