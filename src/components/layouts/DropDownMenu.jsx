import { ResetTvRounded } from "@mui/icons-material";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

export const dropDownItem = (key, value) => {

    return ({
        key, value
    });
}

export function DropDownMenu({ ListItem, onChange, label, defaultValue }) {
    const [value, setValue] = useState("");


    const handleSelect = (e) => {
        setValue(e.target.value);
    }

    useEffect(() => {
        onChange && onChange(value);
    }, [value]);

    // trong lần render đầu tiên
    // nếu List item tồn tại thì mặc định trong select sẽ hiển thị phần tử đầu tiên
    useEffect(() => {
        if (ListItem && ListItem.length > 0) {
            if (defaultValue) {
                setValue(defaultValue);
            } else {
                setValue(ListItem[0].value);
            }
        }
    }, []);
    return (
        <FormControl sx={{ height: '100%', width: '100%', minWidth: 120, boxSizing: 'border-box' }}
            variant="standard">
            <label>{label}</label>
            <Select
                sx={{ height: '100%' }}
                value={value}
                onChange={handleSelect}
                displayEmpty={true}
                inputProps={{ 'aria-label': 'Without label' }}
            >
                {
                    defaultValue &&
                    <MenuItem value="">{defaultValue}</MenuItem>
                }
                {

                    ListItem && ListItem.length > 0 &&
                    ListItem.map((item, index) => {
                        return (
                            <MenuItem key={index} value={item.value}>{item.key}</MenuItem>
                        )
                    })
                }
            </Select>
            {/* <FormHelperText>Without label</FormHelperText> */}
        </FormControl>
    )
}