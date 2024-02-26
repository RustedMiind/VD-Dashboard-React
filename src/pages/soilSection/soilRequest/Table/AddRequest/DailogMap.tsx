import { Button, DialogActions } from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { MapComponent } from "./Leaflet/Map";

export default function DailogMap({
  selectedPin,
  setSelectedPin,
  openMap,
  handleCloseMap,
}: PropsType) {
  return (
    <Dialog fullWidth maxWidth={"lg"} open={openMap} onClose={handleCloseMap}>
      <DialogContent>
        <MapComponent
          setSelectedPin={setSelectedPin}
          selectedPin={selectedPin}
          handleCloseMap={handleCloseMap}
        />
      </DialogContent>
    </Dialog>
  );
}
type SelectedPinType = [number, number] | null;
type PropsType = {
  selectedPin: SelectedPinType;
  setSelectedPin: (value: SelectedPinType) => void;
  openMap: boolean;
  handleCloseMap: () => void;
};
