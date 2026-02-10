export interface Quote {
  quoteId: string;
  userId: string;
  filename: string;
  filesize: number;
  filepath: string;
  config: QuoteConfig;
  pricing: QuotePricing;
  materialWeightGrams: number;
  estimatedPrintTimeMinutes: number;
  status: QuoteStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuoteConfig {
  material: string;
  layerHeight: string;
  infillDensity: string;
  color: string;
  supports?: boolean;
  quantity: number;
}

export interface QuotePricing {
  materialCost: number;
  totalPrice: number;
  machineCost: number;
  laborCost: number;
}

export enum QuoteStatus {
  DRAFT = "draft",
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export interface CreateQuoteDTO {
  file: File;
  config: QuoteConfig;
}

export interface QuoteResponse {
  quote: Quote;
  estimatedDelivery: string;
}
