import { Box } from "@mui/material";

export default function Cover({ href }) {

    return (
        <Box sx={{
            height: '100%',
            width: '100%',
            background: `url("${process.env.PUBLIC_URL}/imgs/cover.jpg")`,
            'background-position': 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        }}>

        </Box>
        // <img style={{height:'100%',width:'100%'}} src={`${process.env.PUBLIC_URL}/imgs/cover.jpg`} alt="coverimg" />
    )
}