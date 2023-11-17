import {
  KeyToArabic,
  KeyWithArabic,
  RequestDetails,
} from "../types/RequestDetails";
import { formatDate } from "./formateDate";

export const keyToArabic: KeyToArabic[] = [
  { key: "car_type", name: "نوع السيارة" },
  { key: "number_car", name: "رقم السيارة" },
  { key: "created_at", name: "تاريخ الورود" },
  // { key: "updated_at", name: "تاريخ التعديل" },
  { key: "typeInArabic", name: "نوع الطلب" },
  { key: "name", name: "الاسم" },
  { key: "responsible", name: "المسؤول" },
  { key: "time_from", name: "الوقت من" },
  { key: "time_valid_in_seconds", name: "الوقت المتاح بالثواني" },
  { key: "time_valid_to", name: "الوقت المتاح الي" },
  { key: "latitude", name: "خط الطول" },
  { key: "longitude", name: "خط العرض" },
  { key: "address", name: "العنوان" },
  { key: "project_name", name: "اسم المشروع" },
  { key: "description", name: "الوصف" },
  { key: "amount", name: "الكمية" },
  { key: "departmentName", name: "القسم" },
  // { key: "type", name: "النوع" },
  { key: "duration", name: "المدة" },
  { key: "date", name: "التاريخ" },
  // { key: "salary_first", name: "الراتب الاول" },
];

export function objectToArrayWithArName(obj: RequestDetails): KeyWithArabic[] {
  const keysWithArabic: KeyWithArabic[] = [];
  for (let key in obj) {
    const value = obj[key as keyof RequestDetails];
    console.log(key);
    const found = keyToArabic.find((f) => f.key === key);
    if (found) {
      if (
        found.key.includes("date") ||
        found.key.includes("created_at") ||
        found.key.includes("updated_at")
      ) {
        keysWithArabic.push({ ...found, value: formatDate(value as string) });
      } else keysWithArabic.push({ ...found, value: value });
    }
  }
  console.log(keysWithArabic);
  return keysWithArabic;
}
