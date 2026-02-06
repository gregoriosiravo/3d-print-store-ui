export interface PrintConfig {
  id: number;
  name: string;
  layer_height: number;
  infill_percentage: number;
  support_enabled: boolean;
  print_speed: number | null;
  time_multiplier: number;
  created_at: Date;
}

export interface CreatePrintConfigDTO {
  name: string;
  layer_height: number;
  infill_percentage: number;
  support_enabled?: boolean;
  print_speed?: number;
  time_multiplier?: number;
}

export interface UpdatePrintConfigDTO extends Partial<CreatePrintConfigDTO> {
  id: number;
}
