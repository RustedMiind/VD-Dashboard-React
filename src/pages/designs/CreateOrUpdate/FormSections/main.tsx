import { FormControlLabel, Switch } from "@mui/material";
import {
  GridItem,
  GridItemDateInputWithLabel,
  GridItemTextInputWithLabel,
  InputsGridContainer,
} from "..";
import AttachedFilesController from "./DesignFile";
import { FormSectionProps } from "./BaseProps";
import Typography from "@mui/material/Typography";
import { useState } from "react";

function MainFormSection({ registerFn }: PropsType) {
  const [hasDescount, setHasDiscount] = useState(false);

  return (
    <InputsGridContainer>
      <GridItemTextInputWithLabel
        label="اسم التصميم بالعربي"
        {...registerFn("name_ar")}
      />
      <GridItemTextInputWithLabel
        label="اسم التصميم بالانجليزي"
        {...registerFn("name_en")}
      />
      <GridItemTextInputWithLabel
        label="نبذة عن التصميم بالعربي"
        {...registerFn("desc_ar")}
      />
      <GridItemTextInputWithLabel
        label="نبذة عن التصميم بالانجليزي"
        {...registerFn("desc_en")}
      />
      <GridItem lg={12}>
        <FormControlLabel
          control={
            <Switch
              checked={hasDescount}
              onChange={(e, checked) => setHasDiscount(checked)}
            />
          }
          label="يوجد خصم"
        />
      </GridItem>

      <GridItemTextInputWithLabel
        type="number"
        label={hasDescount ? "السعر قبل الخصم" : "السعر"}
        {...registerFn("price_before")}
      />
      {hasDescount ? (
        <GridItemTextInputWithLabel
          type="number"
          label="السعر بعد الخصم"
          {...registerFn("price_before")}
        />
      ) : (
        <GridItem />
      )}
      <GridItemDateInputWithLabel
        // {...registerFn("desc_date_from")}
        label="عرض الخصم من تاريخ"
      />
      <GridItemDateInputWithLabel
        // {...registerFn("desc_date_from")}
        label="الي تاريخ"
      />
      <GridItemTextInputWithLabel
        type="number"
        label="المساحة"
        {...registerFn("area")}
      />
      <GridItemTextInputWithLabel
        type="number"
        label="عدد الطوابق"
        {...registerFn("floors_num")}
      />
      <GridItemTextInputWithLabel
        type="number"
        label="غرف النوم"
        {...registerFn("bed_rooms_num")}
      />
      <GridItemTextInputWithLabel
        type="number"
        label="عرض الارض"
        {...registerFn("width_floor")}
      />
      <GridItemTextInputWithLabel
        type="number"
        label="طول الارض"
        {...registerFn("height_floor")}
      />
      <GridItemTextInputWithLabel
        type="number"
        label="عرض الشارع الامامي"
        {...registerFn("width_front_street")}
      />
      <GridItemTextInputWithLabel
        type="number"
        label="عدد دورات المياه"
        {...registerFn("bathroom_num")}
      />
      <GridItem lg={12}>
        <Typography sx={{ py: 2 }} variant="h5">
          معلومات المخطط الهندسي
        </Typography>
      </GridItem>
      <GridItemTextInputWithLabel
        label="اسم المخطط"
        {...registerFn("engineering_name")}
      />
      <GridItemTextInputWithLabel label="غرفة نوم رئيسية" />
      <GridItemTextInputWithLabel label="مطبخ" />
      <GridItemTextInputWithLabel
        label="غرفة معيشة"
        {...registerFn("living_room")}
      />
      <GridItemTextInputWithLabel
        label="غرفة العشاء"
        {...registerFn("dinner_room")}
      />
      <GridItem lg={12}></GridItem>
    </InputsGridContainer>
  );
}

interface PropsType extends FormSectionProps {}

export default MainFormSection;
