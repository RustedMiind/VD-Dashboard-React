import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function SectionAccordion(props: PropsType) {
  return (
    <Accordion
      onChange={(e, opened) => {
        !props.disabled && props.setOpened();
      }}
      expanded={props.opened && !props.disabled}
      disableGutters
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{props.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{props.children}</AccordionDetails>
    </Accordion>
  );
}

export default SectionAccordion;

type PropsType = {
  children?: React.ReactNode;
  title?: string;
  opened: boolean;
  setOpened: () => void;
  disabled?: boolean;
  contentDisabled?: boolean;
};
