import ReactPlayer from "react-player";
import { BigPlayButton, Player } from "video-react";

export default function Video({ source }) {
    return (
        <>
            <ReactPlayer
                style={{
                    backgroundColor: 'black'
                }}
                controls={true}
                width={'100%'}
                height={'100%'}
                url={source} />
        </>
    )
}