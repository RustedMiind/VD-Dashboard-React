import { FormControlLabel, Switch } from "@mui/material";
import {
  CreateFormType,
  GridItem,
  GridItemDateInputWithLabel,
  GridItemTextInputWithLabel,
  InputsGridContainer,
} from "..";
import { FormSectionProps } from "./BaseProps";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { UseFormResetField } from "react-hook-form";

function MainFormSection({ registerFn, resetField }: PropsType) {
  const [hasDescount, setHasDiscount] = useState(false);

  return (
    <InputsGridContainer>
      <GridItemTextInputWithLabel
        label="اسم التصميم بالعربي"
        register={registerFn("name_ar")}
      />
      <GridItemTextInputWithLabel
        label="اسم التصميم بالانجليزي"
        register={registerFn("name_en")}
      />
      <GridItemTextInputWithLabel
        label="نبذة عن التصميم بالعربي"
        register={registerFn("desc_ar")}
      />
      <GridItemTextInputWithLabel
        label="نبذة عن التصميم بالانجليزي"
        register={registerFn("desc_en")}
      />
      <GridItem lg={12}>
        <FormControlLabel
          control={
            <Switch
              checked={hasDescount}
              onChange={(e, checked) => {
                setHasDiscount(checked);
                resetField("price_after");
              }}
            />
          }
          label="يوجد خصم"
        />
      </GridItem>

      <GridItemTextInputWithLabel
        type="number"
        label={hasDescount ? "السعر قبل الخصم" : "السعر"}
        register={registerFn("price_before")}
      />
      <GridItemTextInputWithLabel
        type="number"
        label="السعر بعد الخصم"
        register={registerFn("price_after")}
        disabled={!hasDescount}
      />
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
        register={registerFn("area")}
      />
      <GridItemTextInputWithLabel
        type="number"
        label="عدد الطوابق"
        register={registerFn("floors_num")}
      />
      <GridItemTextInputWithLabel
        type="number"
        label="غرف النوم"
        register={registerFn("bed_rooms_num")}
      />
      <GridItemTextInputWithLabel
        type="number"
        label="عرض الارض"
        register={registerFn("width_floor")}
      />
      <GridItemTextInputWithLabel
        type="number"
        label="طول الارض"
        register={registerFn("height_floor")}
      />
      <GridItemTextInputWithLabel
        type="number"
        label="عرض الشارع الامامي"
        register={registerFn("width_front_street")}
      />
      <GridItemTextInputWithLabel
        type="number"
        label="عدد دورات المياه"
        register={registerFn("bathroom_num")}
      />
      <GridItem lg={12}>
        <Typography sx={{ py: 2 }} variant="h5">
          معلومات المخطط الهندسي
        </Typography>
      </GridItem>
      <GridItemTextInputWithLabel
        label="اسم المخطط"
        register={registerFn("engineering_name")}
      />
      <GridItemTextInputWithLabel
        label="غرفة نوم رئيسية"
        register={registerFn("main_bedroom")}
      />
      <GridItemTextInputWithLabel
        label="مطبخ"
        register={registerFn("kitchen")}
      />
      <GridItemTextInputWithLabel
        label="غرفة معيشة"
        register={registerFn("living_room")}
      />
      <GridItemTextInputWithLabel
        label="غرفة العشاء"
        register={registerFn("dinner_room")}
      />
      <GridItem lg={12}></GridItem>
    </InputsGridContainer>
  );
}

interface PropsType extends FormSectionProps {
  resetField: UseFormResetField<CreateFormType>;
}

export default MainFormSection;
