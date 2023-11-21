export interface Requestable {
  id: number;
  type: string;
  name: string;
  responsible: string;
  time_from: string;
  time_to: string;
  // "time_zone": null,
  time_valid_in_seconds: string;
  time_valid_to: string;
  latitude: string;
  longitude: string;
  address: string;
  reason: string;
  project_name: string;
  // "response": null,
  employee_id: number;
  status_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  typeInArabic: string;
  duration: string;
  date: string;
  details?: detail[];
  builder?: Builder[];
  car_type?: string;
}

interface detail {
  id: number;
  general_request_work_needs_id: number;
  statement: string;
  quantity: string;
  price: string;
  created_at: string;
  updated_at: string;
}

interface Builder {
  id: number;
  general_request_maintenance_car_id: 131;
  description: "تظبط  العفشه";
  created_at: "2023-11-21T06:12:14.000000Z";
  updated_at: "2023-11-21T06:12:14.000000Z";
  pictures: [];
  media: Media[];
}

interface Media {
  id: number;
  model_type: string;
  model_id: number;
  uuid: string;
  collection_name: string;
  name: string;
  file_name: string;
  mime_type: string;
  disk: string;
  conversions_disk: string;
  size: number;
  // "manipulations": [],
  // "custom_properties": [],
  // "generated_conversions": [],
  // "responsive_images": [],
  order_column: number;
  created_at: string;
  updated_at: string;
  original_url: string;
  preview_url: "";
}
