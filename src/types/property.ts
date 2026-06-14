export interface Property {
  id: string;
  name: string;
  address: string;
  price: number;
  description?: string | null;
  available: boolean;
  landlordId: string;
  image?: string | null;
  type?: 'kos' | 'apartemen' | null;
  rooms?: number | null;
  facilities?: string[] | null;
  images?: string[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePropertyInput {
  name: string;
  address: string;
  price: number;
  description?: string;
  available?: boolean;
  image?: File | string | null;
}

export interface UpdatePropertyInput extends Partial<CreatePropertyInput> {}

export interface PropertyResponse {
  message: string;
  data: Property;
}

export interface PropertiesListResponse {
  message: string;
  data: Property[];
}
