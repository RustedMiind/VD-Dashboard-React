import { ProceduresModelTypeCode } from "./types";

type ModelNameIdType = {
  name: string;
  id: ProceduresModelTypeCode;
};

export const modelNamesIds: ModelNameIdType[] = [
  { id: 1, name: "نموذج مالية" },
  { id: 2, name: "نموذج الموظف البديل" },
  { id: 3, name: "نموذج الاعتماد" },
  { id: 4, name: "نموذج الموافقة" },
];
