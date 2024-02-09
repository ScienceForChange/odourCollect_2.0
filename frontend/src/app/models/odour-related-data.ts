//Esto es lo que recibo del observationRelatedData
export interface OdourRelatedDataRes {
  status: string;
  data: OdourData;
}

export interface OdourData {
  OdourType: OdourTypeData[];
  OdourIntensity: OdourIntensity[];
  OdourHedonicTone: OdourHedonicTone[];
}

export interface OdourHedonicTone {
  id: number;
  index: number;
  name: string;
  slug: string;
}

export interface OdourIntensity {
  id: number;
  name: string;
  power: number;
  slug: string;
}

export interface OdourTypeData {
  id: number;
  name: string;
  slug: string;
  relationships: {
    odourSubTypes: OdourSubType[];
  };
}

export interface OdourSubType {
  id: number;
  odourTypeId: number;
  name: string;
  slug: string;
  relationships?: { odourType: OdourTypeData };
}

//Esto es lo que envio al back para crear una observación
export interface OdourCreateForm {
  odour_sub_type_id: number;
  odour_intensity_id: number;
  odour_hedonic_tone_id: number;
  latitude: string;
  longitude: string;
  description: string;
  origin: string;
}
