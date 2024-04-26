import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  GridProps,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { ContractItem } from "../../../../../../../types/Contracts/ContractItems";
import { useContext, useEffect, useState } from "react";
import CustomAccordion from "../../../../../../../components/CustomAccordion";
import AddLabelToEl from "../../../../../../../components/AddLabelToEl";
import ItemActions from "./Actions";
import ItemDetails from "./Details";
import { ContractItemContext } from "./ItemContext";

const GridItem = (props: GridProps) => (
  <Grid item xs={12} md={6} lg={4} {...props} />
);

const LabelAndValue = ({ label, value }: { label: string; value?: string }) => (
  <AddLabelToEl
    label={label}
    labelTypographyProps={{ variant: "body2", color: "text.disabled" }}
  >
    <Typography variant="body1" fontWeight={700}>
      {value}
    </Typography>
  </AddLabelToEl>
);

function ItemAccordion({ item: parentItem }: PropsType) {
  const [expanded, setExpanded] = useState(false);

  const { fetchItemDetails, item, isLoading } = useContext(ContractItemContext);
  useEffect(() => {
    if (expanded) fetchItemDetails?.({ optimized: true, soft: false });
  }, [expanded]);

  console.log("item rerendered", parentItem);

  return (
    <CustomAccordion
      expanded={Boolean(expanded && parentItem)}
      accordionSummaryProps={{
        children: (
          <Box py={1} width={1}>
            <Grid
              container
              spacing={1}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <GridItem onClick={() => setExpanded(!expanded)}>
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    {parentItem.name}
                  </Typography>
                  <Typography variant="subtitle2" color={"info.main"}>
                    عدد البنود الفرعية :{" "}
                    {parentItem.contract_sub_items?.length || 0}
                  </Typography>
                </Box>
              </GridItem>
              <GridItem>
                <Stack direction={"row"}>
                  <LabelAndValue
                    label="المسؤول"
                    value={parentItem.manager?.name}
                  />
                  <LabelAndValue
                    label="تاريخ الانتهاء"
                    value={new Date(
                      parentItem.end_date ?? ""
                    ).toLocaleDateString("en-GB")}
                  />
                </Stack>
              </GridItem>
              <GridItem>
                <ItemActions item={parentItem} />
              </GridItem>
            </Grid>
            {isLoading && <LinearProgress color="secondary" />}
          </Box>
        ),
      }}
    >
      {item ? <ItemDetails item={item} /> : <></>}
    </CustomAccordion>
  );
}

export default ItemAccordion;

type PropsType = {
  item: ContractItem;
};
