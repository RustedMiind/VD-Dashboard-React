import { useState } from "react";
import { PanelData, StepStatusData } from "../clientRequest/types";
import ModelDialog from "../clientRequest/Dialogs/ModelDialog";
import DetailsDialog from "../clientRequest/Dialogs/DetailsDialog";
import StatusDialog from "../clientRequest/Dialogs/StatusDialog";
import FinanceDialog from "../clientRequest/Dialogs/financeDialog";
import AcceptDialog from "../clientRequest/Dialogs/acceptDialog";
import ReportDialog from "../clientRequest/Dialogs/reportDialog";
import TestDialog from "../clientRequest/Dialogs/testDialog";
import VisitDialog from "../clientRequest/Dialogs/visitDialog";

function useOpenDialog() {
  const [dialogRequest, setDialogRequest] = useState<
    PanelData | StepStatusData | null
  >(null);

  const [dialogOpen, setDialogOpen] = useState<
    | undefined
    | "model"
    | "status"
    | "details"
    | "accept"
    | "finance"
    | "report"
    | "test"
    | "visit"
  >(undefined);

  const handleOpenModel = (request: PanelData | StepStatusData) => {
    return () => {
      setDialogOpen("model");
      setDialogRequest(request);
    };
  };
  const handleOpenStatus = (request: PanelData | StepStatusData) => {
    return () => {
      setDialogRequest(request);
      setDialogOpen("status");
    };
  };
  const handleOpenDetails = (request: PanelData | StepStatusData) => {
    return () => {
      setDialogRequest(request);
      setDialogOpen("details");
    };
  };
  const handleOpenFinance = (request: PanelData | StepStatusData) => {
    return () => {
      setDialogRequest(request);
      setDialogOpen("finance");
    };
  };
  const handleOpenVisit = (request: PanelData | StepStatusData) => {
    return () => {
      setDialogRequest(request);
      setDialogOpen("visit");
    };
  };
  const handleOpenReport = (request: PanelData | StepStatusData) => {
    return () => {
      setDialogRequest(request);
      setDialogOpen("report");
    };
  };
  const handleOpenTest = (request: PanelData | StepStatusData) => {
    return () => {
      setDialogRequest(request);
      setDialogOpen("test");
    };
  };
  const handleOpenAccept = (request: PanelData | StepStatusData) => {
    return () => {
      setDialogRequest(request);
      setDialogOpen("accept");
    };
  };
  const handleCloseDialog = () => {
    setDialogOpen(undefined);
  };

  const DialogComponent = (
    <>
      <ModelDialog
        open={dialogOpen === "model"}
        onClose={handleCloseDialog}
        requestId={dialogRequest?.id}
        stepId={dialogRequest?.id}
      />
      <DetailsDialog
        open={dialogOpen === "details"}
        requestId={dialogRequest?.id}
        onClose={handleCloseDialog}
      />
      <StatusDialog
        open={dialogOpen === "status"}
        onClose={handleCloseDialog}
        id={dialogRequest?.id}
      />
      <FinanceDialog
        open={dialogOpen === "finance"}
        onClose={handleCloseDialog}
        requestId={dialogRequest?.id}
        stepId={dialogRequest?.id}
      />
      <AcceptDialog
        open={dialogOpen === "accept"}
        onClose={handleCloseDialog}
        requestId={dialogRequest?.id}
        stepId={dialogRequest?.id}
      />

      <ReportDialog
        open={dialogOpen === "report"}
        onClose={handleCloseDialog}
        requestId={dialogRequest?.id}
        stepId={dialogRequest?.id}
      />
      <TestDialog
        open={dialogOpen === "test"}
        onClose={handleCloseDialog}
        requestId={dialogRequest?.id}
        stepId={dialogRequest?.id}
      />
      <VisitDialog
        open={dialogOpen === "visit"}
        onClose={handleCloseDialog}
        requestId={dialogRequest?.id}
        stepId={dialogRequest?.id}
      />
    </>
  );

  return {
    dialogRequest,
    setDialogRequest,
    dialogOpen,
    setDialogOpen,
    handleOpenModel,
    handleOpenStatus,
    handleOpenDetails,
    handleOpenFinance,
    handleOpenVisit,
    handleOpenReport,
    handleOpenTest,
    handleOpenAccept,
    handleCloseDialog,
    DialogComponent,
  };
}

export default useOpenDialog;
