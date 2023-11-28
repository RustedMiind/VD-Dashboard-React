export const requestTypes: RequestTypeType[] = [
  { name: "تسجيل عميل", value: 1, prefix: "GeneralRequestVacation" },
  { name: "اجتماع عميل", value: 2, prefix: "mployeeRequest" },
  { name: "طلب عرض سعر", value: 3, prefix: "GeneralRequestAdvance" },
  { name: "طلب 4", value: 4, prefix: "GeneralRequestCustody" },
  { name: "طلب 5", value: 5, prefix: "GeneralRequestWorkNeed" },
];

type RequestTypeType = {
  name: string;
  prefix: string;
  value: number;
};
