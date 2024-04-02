import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {
  Checkbox,
  DialogTitle,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

export default function ChooseAttachmentTypesDialog({
  open,
  setOpen,
  setAttachmentTypes,
  attachmentTypes,
}: ChooseAttachmentTypesDialogProps) {
  //   TODO::define our component state variables

  //TODO::define helper functions
  const handleClose = () => {
    setOpen(false);
    setAttachmentTypes([]);
  };
  const handleCheckBtn = (checked: boolean, val: string) => {
    let arr = attachmentTypes;
    if (checked) {
      arr.push(val);
    } else {
      arr = arr.filter((v) => v != val);
    }
    setAttachmentTypes(arr);
  };
  const handleSave = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            width: "100vw",
            minHeight: 300,
          },
        }}
      >
        <DialogTitle
          sx={{ textAlign: "center" }}
          bgcolor={"background.default"}
          fontWeight={800}
        >
          اختيار المرفقات
        </DialogTitle>
        <DialogContent
          sx={{
            bgcolor: "#fff",
            padding: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) =>
                    handleCheckBtn(e.target.checked, "رخص البناء")
                  }
                />
              }
              label="رخص البناء"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) =>
                    handleCheckBtn(e.target.checked, "المعاملات")
                  }
                />
              }
              label="المعاملات"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) =>
                    handleCheckBtn(e.target.checked, "السجل التجاري")
                  }
                />
              }
              label="السجل التجاري"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) =>
                    handleCheckBtn(e.target.checked, "اعمال الانارة")
                  }
                />
              }
              label="اعمال الانارة"
            />
          </FormGroup>
          <Button
            sx={{
              width: "50%",
              marginTop: "3rem",
              borderRadius: "4px",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
            onClick={handleSave}
            variant="contained"
          >
            حفظ
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

type ChooseAttachmentTypesDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAttachmentTypes: React.Dispatch<React.SetStateAction<string[]>>;
  attachmentTypes: string[];
};
