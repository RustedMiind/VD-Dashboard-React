import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import StatusChip from "../../../../components/StatusChip";
import { TenderEntityStatus } from "../../../../types/Tenders/Status.enum";
import { useMemo, useState } from "react";
import { Menu, MenuItem } from "@mui/material";

function StatusOrDropdown(props: PropsType) {
  const hasAccess = useMemo(() => !!props.setCurrent, [props.current]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const iconToShow = useMemo(
    () => (!anchorEl ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />),
    [!!anchorEl]
  );
  const setCurrent = (selected: TenderEntityStatus) => {
    return () => {
      console.log("Chip Clicked");
      props.setCurrent && props.setCurrent(selected);
      handleClose();
    };
  };
  let currentStatus:
    | {
        name: string;
        severity:
          | "default"
          | "success"
          | "primary"
          | "secondary"
          | "error"
          | "info"
          | "warning";
      }
    | undefined;
  if (props.current)
    switch (props.current) {
      case TenderEntityStatus.ONGOING:
        currentStatus = { name: "جاري", severity: "success" };
        break;
      case TenderEntityStatus.SENT:
        currentStatus = { name: "مقدمة", severity: "warning" };
        break;
      case TenderEntityStatus.ENDED:
        currentStatus = { name: "منتهي", severity: "error" };
        break;
      case TenderEntityStatus.AWARDED:
        currentStatus = { name: "تم الترسية", severity: "primary" };
        break;
      case TenderEntityStatus.TECHNICAL_REVIEW:
        currentStatus = { name: "فحص فني", severity: "primary" };
        break;
      case TenderEntityStatus.EXCLUDED:
        currentStatus = { name: "مستعبد فني", severity: "primary" };
        break;
      case TenderEntityStatus.FINANCIAL_EXCLUDE:
        currentStatus = { name: "مستعبد مالي", severity: "primary" };
        break;
      default:
        break;
    }
  return (
    <>
      <StatusChip
        label={currentStatus?.name}
        color={currentStatus?.severity}
        icon={hasAccess ? iconToShow : undefined}
        onClick={hasAccess ? handleClick : undefined}
      />
      {hasAccess && (
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={setCurrent(TenderEntityStatus.ONGOING)}>
            جاري
          </MenuItem>
          <MenuItem onClick={setCurrent(TenderEntityStatus.ENDED)}>
            منتهي
          </MenuItem>
          <MenuItem onClick={setCurrent(TenderEntityStatus.EXCLUDED)}>
            مستبعد فني
          </MenuItem>
          <MenuItem onClick={setCurrent(TenderEntityStatus.FINANCIAL_EXCLUDE)}>
            مستبعد مالي
          </MenuItem>
          <MenuItem onClick={setCurrent(TenderEntityStatus.TECHNICAL_REVIEW)}>
            فحص فني
          </MenuItem>
          <MenuItem onClick={setCurrent(TenderEntityStatus.AWARDED)}>
            تم الترسية
          </MenuItem>
        </Menu>
      )}
    </>
  );
}

type PropsType = {
  current?: TenderEntityStatus;
  setCurrent?: (x: TenderEntityStatus) => void;
};

export default StatusOrDropdown;
