export const requestTypes: RequestTypeType[] = [
  { name: "اجازات", value: 1, prefix: "GeneralRequestVacation" },
  { name: "مهام عمل", value: 2, prefix: "mployeeRequest" },
  { name: "سلفة", value: 3, prefix: "GeneralRequestAdvance" },
  { name: "عهدة", value: 4, prefix: "GeneralRequestCustody" },
  { name: "احتياجات عمل", value: 5, prefix: "GeneralRequestWorkNeed" },
  { name: "صيانة سيارة", value: 6, prefix: "GeneralRequestMaintenanceCar" },
];

type RequestTypeType = {
  name: string;
  prefix: string;
  value: number;
};
