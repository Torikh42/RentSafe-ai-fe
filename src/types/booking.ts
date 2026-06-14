import type { Property } from './property';

export type BookingStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'cancelled'
  | 'completed';

export interface Booking {
  id: string;
  propertyId: string;
  userId: string;
  startDate: string;
  endDate: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
  property?: Property;
  tenant?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface CreateBookingInput {
  propertyId: string;
  startDate: string;
  endDate: string;
}

export interface BookingResponse {
  message: string;
  data: Booking;
}

export interface BookingsListResponse {
  message: string;
  data: Booking[];
}
