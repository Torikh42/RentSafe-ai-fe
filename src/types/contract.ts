export type ContractStatus =
  | 'draft'
  | 'pending_signature'
  | 'active'
  | 'expired'
  | 'terminated';

export interface Contract {
  id: string;
  propertyId: string;
  tenantId: string;
  landlordId: string;
  bookingId: string;
  startDate: string;
  endDate: string;
  depositAmount: number;
  monthlyRent: number;
  contractText?: string | null;
  fairnessScore?: number | null;
  status: ContractStatus;
  signedByTenant: boolean;
  signedByLandlord: boolean;
  signedAt?: string | null;
  expiresAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ContractResponse {
  message: string;
  data: Contract;
}

export interface ContractsListResponse {
  message: string;
  data: Contract[];
}

export interface FairnessResponse {
  message: string;
  data: {
    score: number;
    summary: string;
  };
}
