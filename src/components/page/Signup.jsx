import { Alert, Box, Button, Link, Paper, Stack, TextField, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { registerEducator } from "../../api/auth";
import { stringAlert } from "../../static/stringAlert";
import TextFieldPassword from "../layouts/TextFieldPassword";

export default function Signup() {
    const [userName, setUserName] = useState("");
    const [isNotValidUserName, setIsNotValidUserName] = useState(false);
    const [alertUserName, setAlertUserName] = useState("");

    const [password, setPassword] = useState("");
    const [isNotValidPassword, setIsNotValidPassword] = useState(false)
    const [alertPassword, setAlertPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");
    const [isNotValidConfirmPassword, setIsNotValidConfirmPassword] = useState(false)

    const [alertConfirmPassword, setAlertConfirmPassword] = useState("");
    const [isShowLoginFaile, setIsShowLoginFaile] = useState(false); // toogle thông báo khi login faile

    // thong bao trang thai sao khi dang ky
    const [isSuccess, setIsSuccess] = useState(false);
    const [isShowAlert, setIsShowAlert] = useState(false);
    const [alert, setAlert] = useState("");

    const theme = useTheme();

    //=========== xử lý input===============//
    const handleInputUser = (e) => {
        setUserName(e.target.value);
        setIsNotValidUserName(false);
        setIsShowAlert(false);
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

    // kiem tra gia tri
    // xu ly dang ky
    const handleSignUp = (e) => {
        let isValidate = true;
        if (!validateUserName()) {
            setIsNotValidUserName(true)
            isValidate = false;
        }
        if (!validatePassword()) {
            setIsNotValidPassword(true);
            isValidate = false;
        }
        if (!validateConfirmPassword()) {
            setIsNotValidConfirmPassword(true);
            isValidate = false;
        }
        // nếu các giá trị hợp hợp thì đăng ky
        if (isValidate) {
            registerEducator(userName, password)
                .then((response) => {
                    setIsShowLoginFaile(true);
                    if (response.status === 200) {
                        setAlert(stringAlert.signupSuccess);
                        setIsSuccess(true);
                    }
                    else {
                        setIsSuccess(false);
                        setAlert(stringAlert.userExit);
                    }
                })
        }
    }

    const validateUserName = () => {
        if (!userName) {
            setAlertUserName(stringAlert.require);
            return false;
        }
        return true;
    }

    const validatePassword = () => {
        if (!password) {
            setAlertPassword(stringAlert.require);
            return false;
        }
        if (password.length < 8 || password.length >= 16) {
            console.log(password.length)
            setAlertPassword(stringAlert.lengthPassWord);
            return false;
        }
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
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{
                        width: '220px',
                        borderRadius: '0 0 20px 20px',
                        backgroundColor: theme.palette.primary.main,
                        margin: 'auto'
                    }}>
                        <Typography variant="title" sx={{ textAlign: 'center', color: theme.palette.primary.contrastText }} >
                            EDUCATOR
                        </Typography>
                    </Box>
                    <Typography variant="h5" sx={{ textAlign: 'center' }} >
                        Đăng Ký
                    </Typography>
                </Box>
                <Box display={isShowLoginFaile ? 'block' : 'none'}>
                    <Alert variant="filled" severity={isSuccess ? 'success' : 'error'} >{alert}</Alert>
                </Box>
                <TextField
                    onChange={handleInputUser}
                    value={userName}
                    label="UserName"
                    error={isNotValidUserName}
                    helperText={isNotValidUserName ? alertUserName : ""}
                />
                <TextFieldPassword
                    error={isNotValidPassword}
                    helperText={isNotValidPassword ? alertPassword : ""}
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
                    <Link sx={{ margin: 0.5 }}>Điều khoản sử dụng</Link> và
                    <Link sx={{ margin: 0.5 }}>Chính sách quyền riêng tư</Link> của chúng tôi.
                </Typography>
                <Button onClick={handleSignUp} variant="contained" color="success">Đăng Ký</Button>
                <Typography variant="body2" >
                    Đã có tài khoản?
                    <Link href="/login/educator"> Đăng nhập</Link>
                </Typography>
            </Stack>
        </Paper>
    )
}