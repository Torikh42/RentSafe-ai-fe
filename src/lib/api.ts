import type { InspectionResponse } from '@/types/inspection';

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

// API methods
export const api = {
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
