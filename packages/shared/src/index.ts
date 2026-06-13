// Shared types for the Tawo monorepo

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface Lead {
  id: number;
  name?: string;
  phone: string;
  email?: string;
  vehicle_year?: number;
  vehicle_make?: string;
  vehicle_model?: string;
  service_interest?: string;
  call_notes?: string;
  status: string;
  created_at: string;
}

export interface Appointment {
  id: number;
  lead_id: number;
  appointment_date: string;
  appointment_time: string;
  service_requested?: string;
  mobile_address?: string;
  status: string;
  google_calendar_event_id?: string;
  created_at: string;
}

export interface ServiceSlot {
  date: string;
  time: string;
  available: boolean;
}

export interface HealthCheckResponse {
  status: 'ok' | 'degraded' | 'down';
  version: string;
  uptime: number;
}