import {
  GridItem,
  GridItemDateInputWithLabel,
  GridItemTextInputWithLabel,
  InputsGridContainer,
} from "..";
import AttachedFilesController from "./AttachedFilesController";
import { FormSectionProps } from "./BaseProps";
import Typography from "@mui/material/Typography";

function MainFormSection({ registerFn }: PropsType) {
  return (
    <InputsGridContainer>
      <GridItemTextInputWithLabel {...registerFn("name_ar")} label="اسم التصميم بالعربي" />
      <GridItemTextInputWithLabel label="اسم التصميم بالانجليزي" />
      <GridItemTextInputWithLabel label="نبذة عن التصميم بالعربي" />
      <GridItemTextInputWithLabel label="نبذة عن التصميم بالانجليزي" />
      <GridItem lg={12}>يوجد خصم</GridItem>
      <GridItemTextInputWithLabel type="number" label="السعر قبل الخصم" />
      <GridItemTextInputWithLabel type="number" label="السعر بعد الخصم" />
      <GridItemDateInputWithLabel
        // {...registerFn("desc_date_from")}
        label="عرض الخصم من تاريخ"
      />
      <GridItemDateInputWithLabel
        // {...registerFn("desc_date_from")}
        label="الي تاريخ"
      />
      <GridItemTextInputWithLabel type="number" label="المساحة" />
      <GridItemTextInputWithLabel type="number" label="عدد الطوابق" />
      <GridItemTextInputWithLabel type="number" label="غرف النوم" />
      <GridItemTextInputWithLabel type="number" label="عرض الارض" />
      <GridItemTextInputWithLabel type="number" label="طول الارض" />
      <GridItemTextInputWithLabel type="number" label="عرض الشارع الامامي" />
      <GridItemTextInputWithLabel type="number" label="عدد دورات المياه" />
      <GridItem lg={12}>
        <Typography sx={{ py: 2 }} variant="h5">
          معلومات المخطط الهندسي
        </Typography>
      </GridItem>
      <GridItemTextInputWithLabel label="اسم المخطط" />
      <GridItemTextInputWithLabel label="غرفة نوم رئيسية" />
      <GridItemTextInputWithLabel label="مطبخ" />
      <GridItemTextInputWithLabel label="غرفة معيشة" />
      <GridItemTextInputWithLabel label="غرفة العشاء" />
      <GridItem lg={12}>
        <Typography sx={{ py: 2 }} variant="h5">
          محتويات ملف التصميم
        </Typography>
      </GridItem>
      <AttachedFilesController />
    </InputsGridContainer>
  );
}

interface PropsType extends FormSectionProps { }

export default MainFormSection;
