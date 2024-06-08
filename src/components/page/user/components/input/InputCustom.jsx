import { Box, InputBase, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";

const InputWrap = styled("div")(({ isFocused, isError }) => ({
    color: "#292929",
    fontSize: "14px",
    height: "44px",
    backgroundColor: "rgba(22, 24, 35, .06)",
    marginTop: "10px",
    width: "100%",

    borderRadius: "44px",
    border: isFocused
        ? "1.5px solid #1dbfaf"
        : isError
            ? "1.5px solid #f33a58"
            : "1.5px solid rgba(22, 24, 35, .06)",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",

    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: "20px",
        transition: theme.transitions.create("width"),
        borderRadius: "44px",
    },
    width: "100%",
    height: "44px",
}));


export default function InputCustom({
    type = 'text', placeholder, name,
    onChange, label, isError, labelError
}) {
    const [isFocused, setIsFocused] = useState(false);
    const [isBlur, setIsBlur] = useState(false);
    const [err, setErr] = useState(isError);

    useEffect(() => {
        setErr(isError);
    }, [isError]);

    const handleFocus = () => {
        setIsFocused(true);
    }
    const handleBlur = () => {
        setIsFocused(false);
    }

    const handleOnchange = (e) => {
        // setErr(false);
        if (onChange) {
            onChange(e);
        }
    }
    return (
        <Box sx={{ marginTop: '14px' }}>
            <Typography
                sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#292929",
                    opacity: 0.7,
                    display: "block",
                }}
            >
                {label}
            </Typography>
            <InputWrap
                isFocused={isFocused}
                isError={err}
            >
                <StyledInputBase
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    onChange={handleOnchange}
                />
            </InputWrap>
            {
                err &&
                <Typography
                    sx={{
                        fontSize: "12px",
                        display: "block",
                        ml: "18px",
                        color: "#f33a58",
                    }}
                >
                    {labelError}
                </Typography>
            }
        </Box>
    )
}