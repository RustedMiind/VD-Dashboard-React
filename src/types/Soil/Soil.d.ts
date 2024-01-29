export type Soil = {
  soil_area: Area[];
  soil_floor: Floor[];
  soil_location: Location[];
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
type Location = {
  building_system: String;
  city: City;
  city_id: number;
  created_at: String;
  deleted_at: null;
  id: number;
  location_name: String;
  map: {};
  status: number;
  updated_at: String;
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
