import { Box, Button, Link, Paper, Stack, TextField, Typography } from "@mui/material";
import TextFieldPassword from "../layouts/TextFieldPassword";
import TextLine from "../layouts/TextLine";
import { useState } from "react";
import { stringAlert } from "../../static/stringAlert";


export default function Login() {
    const [userName, setUserName] = useState("");
    const [isNotValidUserName, setIsNotValidUserName] = useState(false);
    const [password, setPassword] = useState("");
    const [isNotValidPassword, setIsNotValidPassword] = useState(false)


    const handleInputUser = (e) => {
        setUserName(e.target.value);
        setIsNotValidUserName(false);
    }
    const handleInputPassword = (e) => {
        setPassword(e.target.value);
        setIsNotValidPassword(false);
    }


    const handleLogin = (e) => {
        if (validateUserName()) {
            setIsNotValidUserName(true)
        }
        if (validatePassword()) {
            setIsNotValidPassword(true);
        }

    }

    const validateUserName = () => {
        if (userName)
            return false;
        return true;
    }

    const validatePassword = () => {
        if (password)
            return false;
        return true;
    }

    return (
        <Box flexGrow={1} display="flex" alignItems="center" justifyContent="center">
            <Paper
                sx={{
                    maxWidth: "450px",
                    minWidth: '420px',
                    padding: "5px 20px",
                    // margin: 'auto'

                }}>
                <Stack direction="column" spacing={2}>
                    <Typography variant="title" sx={{ textAlign: 'center' }} >
                        Đăng nhập
                    </Typography>
                    <TextField
                        onChange={handleInputUser}
                        value={userName}
                        label="UserName"
                        error={isNotValidUserName}
                        helperText={isNotValidUserName ? stringAlert.require : ""}
                    />
                    <TextFieldPassword
                        error={isNotValidPassword}
                        helperText={isNotValidPassword ? stringAlert.require : ""}
                        onChange={handleInputPassword}
                        value={password}
                    />
                    <Link underline="hover">Quên mật khẩu</Link>
                    <Button onClick={handleLogin} variant="contained" color="success">Đăng nhập</Button>
                    <TextLine />
                    <Button href="./signup" >Tạo tài khoản mới</Button>
                </Stack>
            </Paper>
        </Box>
    )
}