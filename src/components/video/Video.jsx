import { Player } from "video-react";

export default function Video({ source }) {
    return (
        <>
            <Player playsInline
                src={source}
            />
        </>
    )
}