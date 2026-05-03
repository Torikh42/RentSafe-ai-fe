export interface AiAnalysisIssue {
  description: string;
  severity: 'low' | 'medium' | 'high';
  estimatedRepairCost?: number;
}

export interface AiAnalysisResult {
  detectedIssues: AiAnalysisIssue[];
  overallCondition: string;
  roomType: string;
}

export interface InspectionImage {
  id: string;
  url: string;
  aiAnalysis: AiAnalysisResult | null;
}

export interface ComparisonReport {
  summary: string;
  newDamages: AiAnalysisIssue[];
  totalEstimatedCost: number;
}

export interface InspectionResponse {
  id: string;
  propertyId: string;
  landlordId: string;
  type: 'pre' | 'post';
  referenceInspectionId?: string | null;
  comparisonReport?: ComparisonReport | null;
  summary: string | null;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  images: InspectionImage[];
}
