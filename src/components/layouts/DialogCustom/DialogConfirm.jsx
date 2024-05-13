import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export default function DialogConfirm({ open, children, title, onCancel, onSave }) {

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
    }
    const handleSave = () => {
        if (onSave) {
            onSave();
        }
    }
    return (
        <Dialog open={open}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Hủy</Button>
                <Button onClick={handleSave}>Tiếp tục</Button>
            </DialogActions>
        </Dialog>
    )
}