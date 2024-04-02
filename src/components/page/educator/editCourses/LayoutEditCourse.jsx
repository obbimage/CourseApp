import { Box, Divider, Paper, Typography, useTheme } from "@mui/material";
import theme from "../../../../theme";


export default function LayoutEditCourse({ Header, children }) {
    const theme = useTheme();
    return (
        <Paper sx={{
            width: '1000px',
            paddingBottom: theme.spacing(5)
        }}
            elevation={6}
        >
            {children}
        </Paper>
    )
}

export const WrapContentLayoutEditCourse = ({ children }) => {

    return (
        <Box sx={{
            my: theme.spacing(2.5)
        }}>
            {children}
        </Box>
    )
}
export function TitleHeaderEditCourse({children}){

    return (
        <Typography fontWeight={'600'} variant="h6">{children}</Typography>
    )
}

export function WrapBoxEditLayoutCourse({ children, disablePadding, sx }) {
    return (
        <Box
            padding={disablePadding ? 'none' : theme.spacing(0, 6)}
            sx={sx}
        >
            {children}
        </Box >
    );
}

export function HeaderEditLayoutCourse({ children, sx }) {

    return (
        <>
            <Box sx={{ padding: theme.spacing(4, 6) }}>
                {children}
            </Box>
            <Divider />
        </>
    )
}