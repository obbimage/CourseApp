import { FormControl, FormHelperText, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

export function DropDownMenu({ ListItem }) {
    const [value, setValue] = useState("");


    const handleChange = (e) => {
        setValue(e.target.value);
    }

    // trong lần render đầu tiên
    // nếu List item tồn tại thì mặc định trong select sẽ hiển thị phần tử đầu tiên
    useEffect(()=>{
        if(ListItem){
            setValue(ListItem[0].value);
        }
    },[]);

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
                value={value}
                onChange={handleChange}
                displayEmpty={true}
                inputProps={{ 'aria-label': 'Without label' }}
            >
                {

                    ListItem && 
                    ListItem.map((item,index)=>{
                        return(
                            <MenuItem key={index} value={item.value}>{item.key}</MenuItem>
                        )
                    })
                }
                {/* <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
            {/* <FormHelperText>Without label</FormHelperText> */}
        </FormControl>
    )
}