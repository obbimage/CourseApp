import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

export function AlertFeddback({ open, severity, alert, onClose }) {
    const [openState, setOpenState] = useState(open);
    useEffect(() => {
        setOpenState(open);
    }, [open])
    const handleClose = () => {
        setOpenState(false)
        if (onClose) {
            onClose();
        }
    }
    return (
        <Snackbar
            open={openState}
            autoHideDuration={5000}
            // onClose={handleClose}
            sx={{zIndex:1}}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert
                onClose={handleClose}
                severity={severity}
                variant="filled"
                sx={{ width: "100%" }}
            >
                {alert}
            </Alert>
        </Snackbar>
    )
}