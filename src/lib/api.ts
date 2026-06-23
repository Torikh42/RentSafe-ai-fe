import type { InspectionResponse } from '@/types/inspection';
import type { Property } from '@/types/property';
import type { PaymentWithEscrow } from '@/types/payment';
import type { EscrowDetail } from '@/types/escrow';
import type {
  BookingResponse,
  BookingsListResponse,
  CreateBookingInput,
} from '@/types/booking';
import type {
  ContractResponse,
  ContractsListResponse,
  FairnessResponse,
} from '@/types/contract';

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ||
  'http://localhost:8787';

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  // Create a copy of headers
  const headers = new Headers(options.headers);

  // Don't set Content-Type automatically if body is FormData
  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    let message = 'An error occurred';
    try {
      const errorData = await response.json();
      message = errorData.error || errorData.message || message;
    } catch {
      // Ignored
    }
    throw new Error(message);
  }

  return response.json();
}

export interface PropertyListResponse {
  message: string;
  data: Property[];
  pagination: {
    nextCursor: string | null;
    hasNext: boolean;
  };
}

export interface PropertyDetailResponse {
  message: string;
  data: Property & {
    landlord?: {
      id: string;
      name: string;
      image?: string | null;
    } | null;
  };
}

// API methods
export const api = {
  properties: {
    list: (cursor?: string, limit: number = 12) => {
      const params = new URLSearchParams();
      if (cursor) params.append('cursor', cursor);
      params.append('limit', String(limit));
      return fetchApi<PropertyListResponse>(
        `/api/properties?${params.toString()}`
      );
    },
    getDetail: (id: string) =>
      fetchApi<PropertyDetailResponse>(`/api/properties/${id}`),
    search: (
      query: string,
      filters?: { minPrice?: number; maxPrice?: number; available?: boolean },
      cursor?: string,
      limit: number = 12
    ) => {
      const params = new URLSearchParams();
      if (query) params.append('q', query);
      if (filters?.minPrice)
        params.append('minPrice', String(filters.minPrice));
      if (filters?.maxPrice)
        params.append('maxPrice', String(filters.maxPrice));
      if (filters?.available !== undefined)
        params.append('available', String(filters.available));
      if (cursor) params.append('cursor', cursor);
      params.append('limit', String(limit));
      return fetchApi<PropertyListResponse>(
        `/api/properties/search?${params.toString()}`
      );
    },
  },
  inspections: {
    analyze: (formData: FormData) =>
      fetchApi<InspectionResponse>('/api/inspections/analyze', {
        method: 'POST',
        body: formData,
      }),
    getByProperty: (propertyId: string) =>
      fetchApi<InspectionResponse[]>(`/api/inspections/property/${propertyId}`),
    compare: (inspectionId: string) =>
      fetchApi<InspectionResponse>(`/api/inspections/${inspectionId}/compare`, {
        method: 'POST',
      }),
  },
  bookings: {
    create: (data: CreateBookingInput) =>
      fetchApi<BookingResponse>('/api/bookings', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    listMy: () => fetchApi<BookingsListResponse>('/api/bookings/my'),
    accept: (id: string) =>
      fetchApi<BookingResponse>(`/api/bookings/${id}/accept`, {
        method: 'POST',
      }),
    reject: (id: string) =>
      fetchApi<BookingResponse>(`/api/bookings/${id}/reject`, {
        method: 'POST',
      }),
    cancel: (id: string) =>
      fetchApi<BookingResponse>(`/api/bookings/${id}/cancel`, {
        method: 'POST',
      }),
  },
  contracts: {
    listMy: () => fetchApi<ContractsListResponse>('/api/contracts/my'),
    generate: (bookingId: string) =>
      fetchApi<ContractResponse>('/api/contracts/generate', {
        method: 'POST',
        body: JSON.stringify({ bookingId }),
      }),
    getDetail: (id: string) =>
      fetchApi<ContractResponse>(`/api/contracts/${id}`),
    sign: (id: string) =>
      fetchApi<ContractResponse>(`/api/contracts/${id}/sign`, {
        method: 'POST',
      }),
    getFairness: (id: string) =>
      fetchApi<FairnessResponse>(`/api/contracts/${id}/fairness`),
  },
  escrows: {
    pay: (contractId: string) =>
      fetchApi<{
        paymentUrl: string;
        token: string;
      }>(`/api/escrows/${contractId}/pay`, {
        method: 'POST',
      }),
    getDetail: (escrowId: string) =>
      fetchApi<EscrowDetail>(`/api/escrows/${escrowId}`),
  },
  payments: {
    listMy: () => fetchApi<PaymentWithEscrow[]>('/api/payments/my'),
  },
  statistics: {
    get: () => fetchApi<{ message: string; data: unknown }>('/api/statistics'),
  },
};
