import { fetchApi } from '@/lib/api';
import { PropertyDiscoveryClient } from '@/components/features/property-discovery/PropertyDiscoveryClient';
import type { PropertyListResponse } from '@/lib/api';

interface PropertiesListingPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PropertiesListingPage({
  searchParams,
}: PropertiesListingPageProps) {
  const params = await searchParams;
  const queryString = new URLSearchParams(
    params as Record<string, string>
  ).toString();

  // If there are search params, use the search endpoint, otherwise use the list endpoint
  let initialData: PropertyListResponse;

  try {
    if (queryString) {
      initialData = await fetchApi<PropertyListResponse>(
        `/api/properties/search?${queryString}`
      );
    } else {
      initialData = await fetchApi<PropertyListResponse>(
        `/api/properties?page=1&limit=12`
      );
    }
  } catch (error) {
    console.error('Failed to fetch initial properties:', error);
    // Provide an empty fallback so the client can still render and try again
    initialData = {
      message: 'Error',
      data: [],
      pagination: {
        page: 1,
        limit: 12,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false,
      },
    };
  }

  // Parse initial query params to pass to client state
  const initialSearch = typeof params.q === 'string' ? params.q : '';
  const initialMinPrice =
    typeof params.minPrice === 'string' ? Number(params.minPrice) : undefined;
  const initialMaxPrice =
    typeof params.maxPrice === 'string' ? Number(params.maxPrice) : undefined;
  const initialAvailable =
    typeof params.available === 'string'
      ? params.available === 'true'
      : undefined;

  return (
    <PropertyDiscoveryClient
      initialData={initialData}
      initialSearch={initialSearch}
      initialMinPrice={initialMinPrice}
      initialMaxPrice={initialMaxPrice}
      initialAvailable={initialAvailable}
    />
  );
}
