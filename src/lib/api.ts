import type { InspectionResponse } from '@/types/inspection';
import type { Property } from '@/types/property';

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
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
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
    list: (page: number = 1, limit: number = 12) =>
      fetchApi<PropertyListResponse>(
        `/api/properties?page=${page}&limit=${limit}`
      ),
    getDetail: (id: string) =>
      fetchApi<PropertyDetailResponse>(`/api/properties/${id}`),
    search: (
      query: string,
      filters?: { minPrice?: number; maxPrice?: number; available?: boolean },
      page: number = 1,
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
      params.append('page', String(page));
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
};
