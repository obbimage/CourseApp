import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";

export default function TextFieldCounter({ placeHolder, sx, onChange, value = "", max = 60 }) {

    const handleValue = () => {
        if (value.length > max) {
            value = value.substring(0, max);
        }   

        return value;
    }

    return (
        <FormControl sx={sx}>
            <OutlinedInput
                value={handleValue()}
                endAdornment={<InputAdornment position="end">{60 - value.length}</InputAdornment>}
                placeholder={placeHolder}
                onChange={onChange} />
        </FormControl>
    );
}