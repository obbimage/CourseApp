import { Divider, Typography } from "@mui/material";
import theme from "../../theme";


export default function TextLine() {

    return (
        // <Typography sx={{
        //     textAlign:'center',
        //     '& ::after':{
        //         width:40,
        //         height:1,
        //         backgroundColor:'success.main'
        //     }
        // }}>
        //     <span style={{textAlign:'center'}}>Hoặc</span>
        // </Typography>
        <Divider textAlign="center">
            <Typography variant="body2">
                Hoặc
            </Typography>
        </Divider>
    )
}