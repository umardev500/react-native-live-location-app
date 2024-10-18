// Notification item type
export interface Notification {
  id: number;
  user_id: number;
  title: string;
  message: string;
  created_at: string; // ISO 8601 format or any valid date-time string
}

// Pagination links for navigating pages
export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

// Main response structure
export interface NotificationResponse {
  success: boolean;
  data: {
    current_page: number;
    data: Notification[]; // Array of notifications
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[]; // Pagination links
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
  interval: number;
}
