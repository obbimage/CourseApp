import { Box, Divider, Typography, useTheme, useThemeProps } from "@mui/material";
import { grey } from "@mui/material/colors";

const backgroundColor = grey[300];

export default function LayoutAdmin({ sx, children }) {
    const theme = useTheme();
    return (
        <Box sx={{
            width: '100%',
            backgroundColor: backgroundColor,
            ...sx
        }}>
            {children}
        </Box>
    )
}

export function LayoutContentAdmin({ sx, children }) {
    const theme = useTheme();
    return (
        <Box sx={{
            margin: theme.spacing(3, 15),
            backgroundColor:'#ffffff',

            ...sx
        }}>
            {children}
        </Box>
    )
}

export function LayoutHeaderAdmin({ children }) {
    const theme = useTheme();

    return (
        <>
            <Box sx={{
                my: theme.spacing(1),
                width: '100%',
                display: 'flex',
                justifyContent:'center'

            }}>
                <Typography variant="h6" textAlign={'center'}>
                    {children}
                </Typography>
            </Box>
                <Divider />
        </>
    )
}