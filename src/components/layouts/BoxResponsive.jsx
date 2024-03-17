import { Box, styled } from "@mui/material";
import { useTheme } from "@emotion/react";

const BoxResponsive = styled(Box,{ shouldForwardProp: (prop)=> prop !== 'hiddentMobile'})(
    ({hiddentMobile,theme})=>({
        [theme.breakpoints.down('xl')]:{
            display:'none'
        }
    })
);

export default BoxResponsive;