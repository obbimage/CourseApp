import { ResetTvRounded } from "@mui/icons-material";
import { FormControl, FormHelperText, InputLabel, MenuItem, NativeSelect, Select } from "@mui/material";
import { useEffect, useState } from "react";
import theme from "../../theme";

export const dropDownItem = (id, name) => {

    return ({
        id, name
    });
}

export function DropDownMenu({ labelOption, value, onChange, label, defaultValue }) {
    const [selectValue, setSelectValue] = useState("");
    const [valueState, setValueState] = useState(value || []);

    const handleSelect = (e) => {
        let value = e.target.value
        setSelectValue(value);
        if (onChange) {
            onChange(value);
        }
    }

    useEffect(() => {
        if (value !== undefined)
            setValueState(value)
    }, [value]);

    useEffect(() => {
        setSelectValue(defaultValue || "");
    }, [defaultValue])
    // trong lần render đầu tiên
    // nếu List item tồn tại thì mặc định trong select sẽ hiển thị phần tử đầu tiên
    useEffect(() => {
    }, []);

    return (
        <FormControl sx={{ height: '100%', width: '100%', minWidth: 120, boxSizing: 'border-box' }}
            variant="standard">
            <label>{label}</label>
            <NativeSelect
                sx={{
                    height: '100%',
                    marginTop: theme.spacing(1)
                }}
                value={selectValue}
                onChange={handleSelect}
                inputProps={{ 'aria-label': 'Without label' }}
            >
                {
                    labelOption &&
                    <option value="">{labelOption}</option>
                }
                {
                    valueState.map((item) => {
                        return (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        )
                    })
                }

            </NativeSelect>
        </FormControl>
    )
}