import { Box, styled, useTheme } from "@mui/material"
import { useEffect, useState } from "react";

const Input = styled('input')
    (({ theme }) => ({
        flexGrow: 1,
        minHeight: theme.spacing(4),
        height: '100%',
        border: 'none',
        outline: 'none',
        fontSize: 'inherit'
    }))

export default function InputCounter({
    require, placeholder, max = 120,
    onChange, sx, type = 'text', defaultValue }) {
    const [inputValue, setInputValue] = useState(defaultValue || "");
    const [isValid, setIsValid] = useState(true); // Sử dụng state để kiểm tra tính hợp lệ của input

    // Sử dụng useEffect để cập nhật giá trị inputValue khi defaultValue thay đổi
    useEffect(() => {
        setInputValue(defaultValue || "");
    }, [defaultValue]);
    const handleOnchange = (e) => {
        const newValue = e.target.value
        if (newValue.toString().length <= max) {
            setInputValue(newValue);
            setIsValid(true); // Đặt trạng thái isValid thành true khi input có giá trị hợp lệ
            if (onChange) {
                onChange(newValue);
            }
        }
    }
    const remainingCharacters = max - inputValue.toString().length;

    const theme = useTheme();
    return (
        <Box sx={{
            height: '100%',
            width: '100%',
            px: theme.spacing(1),
            display: 'flex',
            justifyContent: 'center',
            flexGrow: 1,
            alignItems: 'center',
            border: '1px solid black',
            ...sx
        }}>
            <Input placeholder={placeholder}
                onChange={handleOnchange}
                value={inputValue}
                type={type}

            />
            {require && !inputValue && <span style={{ color: 'red' }}> * Bắt buộc</span>} {/* Hiển thị dấu * nếu input là bắt buộc và không được bỏ trống */}
            <span>{remainingCharacters}</span>
        </Box>
    )
}