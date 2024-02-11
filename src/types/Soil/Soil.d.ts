export type Soil = {
  soil_area: Area[];
  soil_floor: Floor[];
  soil_location: Location[];
};
export type Location = {
  building_system: string;
  price: string;
  city?: City;
  city_id?: number;
  created_at: string;
  deleted_at: null;
  id: number;
  location_name: string;
  map: Position[];
  status: number;
  updated_at: string;
};
type Area = {
  area_from: number;
  area_to: number;
  id: number;
  minimum: number;
  number: number;
  created_at: null;
  deleted_at: null;
  updated_at: null;
};

type Floor = {
  depth: number;
  id: number;
  minimum: number;
  number_floors: number;
  created_at: null;
  deleted_at: null;
  updated_at: null;
};
export type City = {
  country_code: string;
  country_id: number;
  created_at: string;
  fips_code: string;
  flag: number;
  id: number;
  iso2: string;
  latitude: string;
  longitude: string;
  name: string;
  updated_at: string;
  wikiDataId: string;
  type: null;
};
type Position = {
  lat: number;
  long: number;
};
