import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export function SeparatedAccordion({
  children,
  title,
  ...accordionProps
}: PropsType) {
  return (
    <Stack>
      <Accordion
        {...accordionProps}
        sx={{ bgcolor: "transparent", overflow: "hidden" }}
        elevation={0}
        disableGutters
      >
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          sx={{
            p: 0,
            bgcolor: "background.paper",
          }}
        >
          <Stack
            // component={Button}
            direction="row"
            alignItems="center"
            width={1}
            px={2}
            justifyContent="space-between"
          >
            <Typography variant="subtitle1" fontWeight={700}>
              {title}
            </Typography>
            <IconButton color="primary" size="small">
              {!accordionProps?.expanded ? (
                <AddCircleOutlineIcon sx={{ fontSize: 28 }} />
              ) : (
                <RemoveCircleOutlineIcon sx={{ fontSize: 28 }} />
              )}
            </IconButton>
          </Stack>
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: "background.paper", mt: 1 }}>
          <Stack>{children}</Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}

type PropsType = {
  title: string;
} & AccordionProps;
