import {User} from '@typed/login';

export interface SendLocationResponse {
  success: boolean;
  interval: number;
  user: User;
  data: Data;
  payload: Payload;
}

interface Data {
  current_page: number;
  data: LocationEntry[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface LocationEntry {
  id: number;
  user_id: string;
  brand: string;
  deviceid: string;
  model: string;
  uniqueId: string;
  latitude: string;
  longitude: string;
  created_at: string;
  updated_at: string;
}

interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

interface Payload {
  brand: string;
  deviceid: string;
  model: string;
  uniqueId: string;
  latitude: string;
  longitude: string;
}
