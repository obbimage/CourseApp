import { CircularProgress, Dialog, DialogContent } from "@mui/material";

export default function DialogProgress({ open }) {
    return (
        <Dialog
            open={open}>
            <DialogContent>
                <CircularProgress />
            </DialogContent>
        </Dialog>
    );
}