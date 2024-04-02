import { Box, styled, useTheme } from "@mui/material"

const Input = styled('input')
    (({ theme }) => ({
        flexGrow: 1,
        minHeight: theme.spacing(4),
        height:'100%',
        border: 'none',
        outline: 'none',
        fontSize:'inherit'
    }))

export default function InputCounter({ placeholder }) {
    const theme = useTheme();
    return (
        <Box sx={{
            height:'100%',
            px: theme.spacing(1),
            display: 'flex',
            justifyContent: 'center',
            flexGrow: 1,
            alignItems: 'center',
            border: '1px solid black'
        }}>
            <Input placeholder={placeholder} />
            <span>120</span>
        </Box>
    )
}