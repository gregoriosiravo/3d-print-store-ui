export interface Material {
  id: number;
  name: string;
  type: string;
  cost_per_gram: number;
  density: number; // g/cm³
  color: string | null;
  is_available: boolean;
  created_at: Date;
}

export interface CreateMaterialDTO {
  name: string;
  type: string;
  cost_per_gram: number;
  density: number;
  color?: string;
  is_available?: boolean;
}

export interface UpdateMaterialDTO extends Partial<CreateMaterialDTO> {
  id: number;
}

export interface MaterialDisplay extends Material {
  priceFormatted: string;
}
