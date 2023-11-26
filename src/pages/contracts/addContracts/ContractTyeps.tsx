export const contractTypes: ContractType[] = [
  { type: 1, name: "عقد مباشر" },
  { type: 2, name: "منتهي" },
  { type: 3, name: "ساري" },
  { type: 4, name: "جاري" },
];

export type ContractType = { type: number; name: string };
