import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { useState } from "react";

export default function TextFieldPassword({ placeholder = "Password", error, helperText, value, onChange }) {
    const [isShowPassword, setIsShowPassowrd] = useState(true);

    const handleShowPassword = () => {
        setIsShowPassowrd(!isShowPassword);
    }
    return (
        <FormControl error={error} sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">{placeholder}</InputLabel>
            <OutlinedInput
                onChange={onChange}
                value={value}
                label={placeholder}
                id="outlined-adornment-password"
                type={isShowPassword ? "text" : "password"}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleShowPassword}
                            aria-label="toggle password visibility"
                            edge="end">
                            {
                                isShowPassword ? <Visibility /> : <VisibilityOff />
                            }
                        </IconButton>
                    </InputAdornment>
                }
            />
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    )
}