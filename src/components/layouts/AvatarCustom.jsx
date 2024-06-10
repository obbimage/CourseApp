import { Avatar } from "@mui/material";
import AvatarLetter from "./AvatarLetter";

export default function AvatarCustom({ src, name }) {
    return (
        <>
            {
                src ?
                    <Avatar sx={{width:'100%',height:'100%'}} src={src} /> :
                    <AvatarLetter name={name} />
            }
        </>
    )
}