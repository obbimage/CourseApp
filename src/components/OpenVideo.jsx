import { Box, Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useState } from "react";
import { Player } from "video-react";

export default function OpenVideo({ children, source }) {
    const [open, setOpen] = useState(false);

    const handleToggleOpen = () => {
        setOpen(!open);
    }

    const handleOpen = ()=>{
        if(source){
            handleToggleOpen();
        }
    }
    return (
        <>
            <Dialog open={open}>
                <DialogContent sx={{
                    minHeight: '380px',
                    minWidth:'600px'
                }} >
                    <Player
                        // playsInline
                        >
                        <source src={source} />
                    </Player>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleToggleOpen}>
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
            <Box>
                <Button sx={{
                    padding:0,
                    textTransform:'none',
                    
                }}
                 onClick={handleOpen}
                >
                    {children}
                </Button>
            </Box>
        </>
    )
}