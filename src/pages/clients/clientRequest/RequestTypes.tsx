export const requestTypes: RequestTypeType[] = [
  { name: "تسجيل عميل", value: 1, disabled: false },
  { name: "اجتماع عميل", value: 2, disabled: true },
  { name: "طلب عرض سعر", value: 3, disabled: true },
  { name: "طلب 4", value: 4, disabled: true },
  { name: "طلب 5", value: 5, disabled: true },
];

type RequestTypeType = {
  name: string;
  value: number;
  disabled?: boolean;
};
