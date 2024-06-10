import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    const nameParts = name.split(' ');

    if (nameParts.length >= 2) {
        return {
            sx: {
                bgcolor: stringToColor(name),
                height: '100%',
                width: '100%'
            },
            children: `${nameParts[0][0]}${nameParts[1][0]}`,
        };
    } else if (nameParts.length === 1) {
        return {
            sx: {
                bgcolor: stringToColor(name),
                height: '100%',
                width: '100%'
            },
            children: `${nameParts[0][0]}`,
        };
    } else {
        return {
            sx: {
                bgcolor: stringToColor('Anonymous'),
                height: '100%',
                width: '100%'
            },
            children: 'A',
        };
    }
}

export default function AvatarLetter({ name }) {
    const defalutValue = 'not name'
    const [value, setValue] = useState(defalutValue);

    useEffect(() => {
        if (name) {
            setValue(name)
        } else {
            setValue(defalutValue);
        }
    }, [name])

    return (
        <>
            {

                <Avatar  {...stringAvatar(value)} />
            }
        </>
    );


}