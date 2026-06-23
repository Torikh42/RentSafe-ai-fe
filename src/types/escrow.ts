export type EscrowStatus = 'pending' | 'held' | 'released' | 'refunded';

export interface Escrow {
  id: string;
  contractId: string;
  amount: number;
  fee: number;
  status: EscrowStatus;
  midtransOrderId: string | null;
  paymentUrl: string | null;
  snapToken: string | null;
  createdAt: string;
  updatedAt: string;
  paidAt: string | null;
  releasedAt: string | null;
}

export interface EscrowDetail extends Escrow {
  contract: {
    propertyId: string;
    tenantId: string;
    landlordId: string;
    depositAmount: number;
    monthlyRent: number;
    status: string;
  };
}
