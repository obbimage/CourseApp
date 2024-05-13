import { useEffect, useState } from "react";
import { containsOnlySpaces } from "../../../js/String";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, OutlinedInput } from "@mui/material";




export default function DialogInput({ open, title, onCancel, onSave }) {
    const [valueInput, setValueInput] = useState("");
    const [disableInput, setDisableInput] = useState(false);

    useEffect(() => {
        if (valueInput && !containsOnlySpaces(valueInput) && valueInput.trim().length > 0) {
            setDisableInput(false);
        } else {
            setDisableInput(true);
        }
    }, [valueInput]);
    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
    }
    const handleSave = () => {
        if (onSave) {
            onSave(valueInput);
        }
    }

    const handleOnChangeInput = (e) => {
        setValueInput(e.target.value);
    }
    return (
        <Dialog
            open={open}>
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <OutlinedInput
                    onChange={handleOnChangeInput} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Hủy</Button>
                <Button disabled={disableInput} onClick={handleSave}>Thêm</Button>

            </DialogActions>
        </Dialog>
    )
}