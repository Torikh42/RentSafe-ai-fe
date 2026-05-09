'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function usePropertiesList(page: number = 1, limit: number = 12) {
  return useQuery({
    queryKey: ['properties', 'list', page, limit],
    queryFn: () => api.properties.list(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function usePropertyDetail(id: string | null) {
  return useQuery({
    queryKey: ['properties', 'detail', id],
    queryFn: () =>
      id ? api.properties.getDetail(id) : Promise.reject('No ID'),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function usePropertySearch(
  query: string,
  filters?: { minPrice?: number; maxPrice?: number; available?: boolean },
  page: number = 1,
  limit: number = 12
) {
  return useQuery({
    queryKey: ['properties', 'search', query, filters, page, limit],
    queryFn: () => api.properties.search(query, filters, page, limit),
    enabled:
      !!query ||
      (filters && Object.values(filters).some((v) => v !== undefined)),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
