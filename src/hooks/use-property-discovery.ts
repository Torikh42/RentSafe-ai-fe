'use client';

import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function usePropertiesList(limit: number = 12) {
  return useInfiniteQuery({
    queryKey: ['properties', 'list', limit],
    queryFn: ({ pageParam }) =>
      api.properties.list(pageParam as string | undefined, limit),
    getNextPageParam: (lastPage) => lastPage.pagination.nextCursor || undefined,
    initialPageParam: undefined as string | undefined,
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
  limit: number = 12
) {
  return useInfiniteQuery({
    queryKey: ['properties', 'search', query, filters, limit],
    queryFn: ({ pageParam }) =>
      api.properties.search(
        query,
        filters,
        pageParam as string | undefined,
        limit
      ),
    getNextPageParam: (lastPage) => lastPage.pagination.nextCursor || undefined,
    initialPageParam: undefined as string | undefined,
    enabled:
      !!query ||
      (filters && Object.values(filters).some((v) => v !== undefined)),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function usePropertyInspections(propertyId: string | null) {
  return useQuery({
    queryKey: ['properties', propertyId, 'inspections'],
    queryFn: () =>
      propertyId
        ? api.inspections.getByProperty(propertyId)
        : Promise.reject('No Property ID'),
    enabled: !!propertyId,
    staleTime: 5 * 60 * 1000,
  });
}
