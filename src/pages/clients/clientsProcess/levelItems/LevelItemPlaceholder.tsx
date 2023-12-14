import { Stack, Skeleton } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";

function LevelItemPlaceholder() {
  return (
    <Stack my={0.5}>
      <Accordion
        sx={{ bgcolor: "Background", overflow: "hidden" }}
        elevation={0}
        disableGutters
      >
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          sx={{ ".MuiAccordionSummary-content": { my: 0.75 } }}
          id="panel1a-header"
        >
          <Stack
            direction="row"
            alignItems="center"
            width={1}
            justifyContent="space-between"
          >
            <Skeleton width={175} />
            <Stack direction="row" alignItems="center" gap={1}>
              <Skeleton width={80} />
              <Skeleton width={130} />
            </Stack>
          </Stack>
        </AccordionSummary>
      </Accordion>
    </Stack>
  );
}

export default LevelItemPlaceholder;
