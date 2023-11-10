export const requestTypes: RequestTypeType[] = [
  { name: "سلفة", prefix: "GeneralRequestAdvance" },
  { name: "صيانة سيارة", prefix: "GeneralRequestMaintenanceCar" },
  { name: "عهدة", prefix: "GeneralRequestCustody" },
  { name: "اجازات", prefix: "GeneralRequestVacation" },
  { name: "احتياجات عمل", prefix: "GeneralRequestWorkNeed" },
];

type RequestTypeType = {
  name: string;
  prefix: string;
};
