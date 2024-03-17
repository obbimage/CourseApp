import { Button, Link, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { stringAlert } from "../../static/stringAlert";
import TextFieldPassword from "../layouts/TextFieldPassword";

export default function Signup() {
    const [userName, setUserName] = useState("");
    const [isNotValidUserName, setIsNotValidUserName] = useState(false);
    const [password, setPassword] = useState("");
    const [isNotValidPassword, setIsNotValidPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isNotValidConfirmPassword, setIsNotValidConfirmPassword] = useState(false)
    const [alertConfirmPassword, setAlertConfirmPassword] = useState("");


    const handleInputUser = (e) => {
        setUserName(e.target.value);
        setIsNotValidUserName(false);
    }
    const handleInputPassword = (e) => {
        setPassword(e.target.value);
        setIsNotValidPassword(false);
    }

    const handleInputConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        setIsNotValidConfirmPassword(false);
        setAlertConfirmPassword("");
    }


    const handleSignup = (e) => {
        if (!validateUserName()) {
            setIsNotValidUserName(true)
        }
        if (!validatePassword()) {
            setIsNotValidPassword(true);
        }
        if (!validateConfirmPassword()) {
            setIsNotValidConfirmPassword(true);
        }

    }

    const validateUserName = () => {
        if (!userName)
            return false;
        return true;
    }

    const validatePassword = () => {
        if (!password)
            return false;
        return true;
    }

    const validateConfirmPassword = () => {
        // nếu input trống
        if (!confirmPassword) {
            setAlertConfirmPassword(stringAlert.require);
            return false;
        }
        // nếu pass word và confirm không bằng nhau
        if (confirmPassword !== password) {
            setAlertConfirmPassword(stringAlert.confirmPassword);
            return false;
        }
        return true;
    }
    return (
        <Paper
            sx={{
                maxWidth: "450px",
                minWidth: '420px',
                padding: "5px 20px 20px",
                margin: 'auto'

            }}>
            <Stack direction="column" spacing={2}>
                <Typography variant="title" sx={{ textAlign: 'center' }} >
                    Đăng Ký
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
                <TextFieldPassword
                    placeholder="Confirm password"
                    error={isNotValidConfirmPassword}
                    helperText={alertConfirmPassword}
                    onChange={handleInputConfirmPassword}
                    value={confirmPassword}
                />
                <Typography variant="body2" >
                    Bằng cách đăng ký Bạn đồng ý
                    <Link sx={{margin:0.5}}>Điều khoản sử dụng</Link> và  
                    <Link sx={{margin:0.5}}>Chính sách quyền riêng tư</Link> của chúng tôi.
                </Typography>
                <Button onClick={handleSignup} variant="contained" color="success">Đăng Ký</Button>
                <Typography variant="body2" >
                    Đã có tài khoản?
                    <Link href="./login"> Đăng nhập</Link> 
                </Typography>
            </Stack>
        </Paper>
    )
}