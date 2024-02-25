export interface User {
  id: number;
  employee_id?: number;
  name: string;
  email: string;
  phone?: string;
  image: string;
  lang: string;
  active: number;
  employee?: Employee;
}

export interface Employee {
  full_name?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  personal_photo?: string;
  id_number?: string;
  end_id_number?: string;
  end_medical_insurance?: string;
  end_saudi_authority?: string;
  national_id: ?string;
  passport_no?: string;
  nationality?: string;
  gender?: string;
  birth_date?: Date;
  job_name?: string;
  job_type?: string;
  job_grade?: null;
  branch?: string;
  management?: string;
  department?: string;
  qr_link?: string;
}
