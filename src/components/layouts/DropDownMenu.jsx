import { FormControl, FormHelperText, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

export function DropDownMenu({ ListItem,onChange }) {
    const [value, setValue] = useState("");


    const handleSelect = (e) => {
        setValue(e.target.value);
    }

    useEffect(()=>{
        onChange(value);
    },[value]);

    // trong lần render đầu tiên
    // nếu List item tồn tại thì mặc định trong select sẽ hiển thị phần tử đầu tiên
    useEffect(() => {
        if (ListItem) {
            setValue(ListItem[0].value);
        }
    }, []);

    return (
        <FormControl sx={{ height: '100%',width:'100%', minWidth: 120, boxSizing: 'border-box' }}>
            <Select
                sx={{ height: '100%' }}
                value={value}
                onChange={handleSelect}
                displayEmpty={true}
                inputProps={{ 'aria-label': 'Without label' }}
            >
                {

                    ListItem &&
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