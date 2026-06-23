export type PaymentStatus = 'pending' | 'success' | 'failed';
export type PaymentType = 'deposit' | 'rent' | 'refund' | 'deduction';

export interface Payment {
  id: string;
  escrowId: string | null;
  type: PaymentType;
  amount: number;
  status: PaymentStatus;
  midtransTransactionId: string | null;
  paymentMethod: string | null;
  paidAt: string | null;
  createdAt: string;
}

export interface PaymentWithEscrow extends Payment {
  escrow?: {
    id: string;
    contractId: string;
    amount: number;
    fee: number;
    status: string;
    midtransOrderId: string | null;
    paymentUrl: string | null;
    snapToken: string | null;
    createdAt: string;
    updatedAt: string;
    paidAt: string | null;
    releasedAt: string | null;
    contract?: {
      propertyId: string;
      tenantId: string;
      landlordId: string;
    };
  };
}
