import {
  Accordion,
  AccordionDetails,
  AccordionDetailsProps,
  AccordionProps,
  AccordionSummary,
  AccordionSummaryProps,
  Box,
} from "@mui/material";

function CustomAccordion({
  accordionDetailsProps,
  accordionSummaryProps,
  children,
  ...accordionProps
}: PropsType) {
  return (
    <Box>
      <Accordion
        elevation={0}
        disableGutters
        {...accordionProps}
        sx={{
          bgcolor: "background.med",
          overflow: "hidden",
          ...accordionProps?.sx,
        }}
      >
        <AccordionSummary
          {...accordionSummaryProps}
          sx={{
            ".MuiAccordionSummary-content": { my: 0.75 },
            ...accordionSummaryProps?.sx,
          }}
        />

        <AccordionDetails
          {...accordionDetailsProps}
          sx={{
            bgcolor: "background.paper",
            my: 0,
            ...accordionDetailsProps?.sx,
          }}
        >
          {children}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

type PropsType = {
  accordionSummaryProps?: AccordionSummaryProps;
  accordionDetailsProps?: AccordionDetailsProps;
} & AccordionProps;

export type CustomAccordionProps = PropsType;

export default CustomAccordion;
