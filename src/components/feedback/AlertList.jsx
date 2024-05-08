import { Alert, Box, useTheme } from "@mui/material";
import { useState } from "react";

export default function AlertList({ open, children }) {
    return (
        <Box sx={{
            display: open ? 'block' : 'none',
            zIndex: 1,
            position: 'fixed',
            top: '10%',
            left: '30%'
        }}>
            {children}
        </Box>
    )

}

export function AlertItem({ severity = 'success', onClose, children }) {
    const theme = useTheme();
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
        if (onClose) {
            onClose();
        }
    }
    return (
        <Box sx={{
            display: open ? 'block' : 'none',
            marginBottom: theme.spacing(1)
        }}>
            <Alert severity={severity}
                onClose={handleClose}>
                {children}
            </Alert>
        </Box>
    );
}
export const alertsItem = (content, severity = 'success') => {
    return {
        content: content,
        severity: severity
    }
}