import { Alert, Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { changePassword, registerEducator } from "../../api/auth";
import { stringAlert } from "../../static/stringAlert";
import TextFieldPassword from "../layouts/TextFieldPassword";
import { CurrentUserContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";

export default function ChangePassword() {
    // password
    const [password, setPassword] = useState("");
    const [isNotValidPassword, setIsNotValidPassword] = useState(false)
    const [alertPassword, setAlertPassword] = useState("");
    // new password
    const [newPassword, setNewPassword] = useState("");
    const [alertNewPassword, setAlertNewPassword] = useState("");
    const [isNotValidNewPassword, setIsNotValidNewPassword] = useState(false);
    // confirm new password
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [isNotValidConfirmNewPassword, setIsNotValidConfirmNewPassword] = useState(false)
    const [alertConfirmNewPassword, setAlertConfirmNewPassword] = useState("");
    // Hiển thị thông báo khi đăng nhập thành công hoạc thất bại
    const [isShowAlert, setIsShowAlert] = useState(false); // toogle thông báo khi login faile
    const [alert, setAlert] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    // context provider
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    // chuyển hướng trang
    const navigate = useNavigate();
    /* ===== xử lý đầu vào các input ===== */
    const handleInputPassword = (e) => {
        setPassword(e.target.value.trim());
        setIsNotValidPassword(false);
    }

    const handleInputConfirmNewPassword = (e) => {
        setConfirmNewPassword(e.target.value.trim());
        setIsNotValidConfirmNewPassword(false);
    }

    const handleInputNewPassword = (e) => {
        setNewPassword(e.target.value.trim());
        setIsNotValidNewPassword(false);
    }
    /*===================================*/

    const handleChangePassword = (e) => {
        let isValidate = true;
        // kiểm tra các giá trị hợp lệ hay chưa
        // nếu chưa thì bật thông báo cho người dùng
        if (!validatePassword()) {
            setIsNotValidPassword(true);
            isValidate = false;
        }
        if (!validateNewPassword()) {
            setIsNotValidNewPassword(true);
            isValidate = false;
        }
        if (!validateConfirmNewPassword()) {
            setIsNotValidConfirmNewPassword(true);
            isValidate = false;
        }

        // nếu tất cả hợp lệ thì đổi mật khẩu
        if (isValidate) {
            changePassword(currentUser.id, password, newPassword)
                .then((reponse) => {
                    if (reponse.status == 200) {
                        setAlert(stringAlert.changePasswordSuccess);
                        setIsSuccess(true);
                        setIsShowAlert(true);
                    } else {
                        setAlert(stringAlert.PasswordNotCorrect);
                        setIsSuccess(false);
                        setIsShowAlert(true);
                    }
                })

        }
    }

    const handleBack = () => {

    }

    /*---------------- kiểm tra validate ---------------- */
    const validatePassword = () => {
        if (!password) {
            setAlertPassword(stringAlert.require);
            return false;
        }
        if (password.length < 8 || password.length > 16) {
            setAlertPassword(stringAlert.lengthPassWord);
            return false;
        }
        return true;
    }

    const validateNewPassword = () => {
        if (!newPassword) {
            setAlertNewPassword(stringAlert.require);
            return false;
        }
        if (newPassword.length < 8 || newPassword.length > 16) {
            return false;
        }
        return true;

    }

    const validateConfirmNewPassword = () => {
        // nếu input trống
        if (!confirmNewPassword) {
            setAlertConfirmNewPassword(stringAlert.require);
            return false;
        }
        // nếu pass word và confirm không bằng nhau
        if (confirmNewPassword !== newPassword) {
            setAlertConfirmNewPassword(stringAlert.confirmPassword);
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
                    Đổi mật khẩu
                </Typography>
                <Box display={isShowAlert ? 'block' : 'none'}>
                    <Alert variant="filled" severity={isSuccess ? "success" : "error"} >{alert}</Alert>
                </Box>
                <TextFieldPassword
                    label="password"
                    onChange={handleInputPassword}
                    value={password}
                    error={isNotValidPassword}
                    helperText={isNotValidPassword ? alertPassword : ""}
                />
                <TextFieldPassword
                    placeholder="New password"
                    error={isNotValidNewPassword}
                    helperText={isNotValidNewPassword ? alertNewPassword : ""}
                    onChange={handleInputNewPassword}
                    value={newPassword}
                />
                <TextFieldPassword
                    placeholder="Confirm new password"
                    error={isNotValidConfirmNewPassword}
                    helperText={isNotValidConfirmNewPassword ? alertConfirmNewPassword : ""}
                    onChange={handleInputConfirmNewPassword}
                    value={confirmNewPassword}
                />

                <Button onClick={handleChangePassword} variant="contained" color="primary">Đổi mật khẩu</Button>
                <Button onClick={handleBack} variant="contained" color="success">
                    <Link to={-1} style={{color:'inherit'}}>
                        Quay trở lại
                    </Link>
                </Button>
            </Stack>
        </Paper>
    )
}