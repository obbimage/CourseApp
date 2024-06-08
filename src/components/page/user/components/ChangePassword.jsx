import { Box, Button, Typography, useTheme } from "@mui/material";
import InputCustom from "./input/InputCustom";
import { useContext, useState } from "react";
import { stringAlert } from "../../../../static/stringAlert";
import { CurrentUserContext } from "../../../../App";
import { AlertFeddback } from "../../../feedback/AlertFeedback";
import { changePassword } from "../../../../api/auth";
import { handleApiResponse } from "../../../../api/instance";
import CloseIcon from '@mui/icons-material/Close';
//bi loi thi focus mau do #f33a58


export default function ChangePassword({ onSuccess, onFailed, onClose }) {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [isErrPass, setIsErroPass] = useState(false);
    const [isErrNewPass, setIsErrNewPass] = useState(false);
    const [isConfirmNewPass, setIsConfirmNewPass] = useState(false);

    const [labelErrPass, setLabelErrPass] = useState("");
    const [labelErrNewPass, setLabelErrNewPass] = useState("");
    const [labelErrConfirmPass, setLabelConfirmPass] = useState("");

    const [openAlert, setOpenAlert] = useState(false);
    const [severityAlert, setSeverity] = useState('success');
    const [alert, setAlert] = useState("");
    const theme = useTheme();

    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const handleChangePassword = (e) => {
        let value = e.target.value;
        setPassword(value);
        setIsErroPass(false);
    }

    const handleOnClose = () => {
        if (onClose) {
            onClose();
        }
    }
    const handleChangeNewPassword = (e) => {
        let value = e.target.value;
        setNewPassword(value);
        setIsErrNewPass(false);
    }
    const handleChangeConfrimPassword = (e) => {
        let value = e.target.value;
        setConfirmNewPassword(value);
        setIsConfirmNewPass(false);
    };
    // valid date pass
    const handleValidatePass = () => {
        let isValidate = true;
        if (password.length === 0) {
            setIsErroPass(true);
            setLabelErrPass(stringAlert.require);
            isValidate = false;
        }
        return isValidate;
    }
    // validate new pass
    const handleValidateNewPass = () => {
        let isValidate = true;
        if (newPassword.length == 0) {
            setIsErrNewPass(true);
            setLabelErrNewPass(stringAlert.require);
            isValidate = false;
        } else if (newPassword.length < 8 || newPassword.length > 16) {
            setIsErrNewPass(true);
            setLabelErrNewPass(stringAlert.lengthPassWord);
            isValidate = false;
        }
        return isValidate;
    }
    // validate confirm pass
    const handleValidateConfirmNewPass = () => {
        let isValidate = true;
        if (confirmNewPassword != newPassword) {
            setIsConfirmNewPass(true);
            setLabelConfirmPass(stringAlert.confirmPassword);
            isValidate = false;
        }
        return isValidate;
    }

    const handleOnSuccess = () => {
        if (onSuccess) {
            onSuccess();
        }
    }
    const handleOnFailed = () => {
        if (onFailed) {
            onFailed();
        }
    }
    const handleSubmitLogin = () => {
        if (!handleValidatePass() || !handleValidateNewPass()
            || !handleValidateConfirmNewPass())
            return;

        const request = {
            id: currentUser.id,
            oldPassword: password,
            newPassword: newPassword,
        };
        console.log(request);

        // change pass
        let userId = currentUser.id;
        changePassword(userId, password, newPassword)
            .then(response => {
                handleApiResponse(response,
                    (userResponse) => {
                        console.log(userResponse);
                        handleOnSuccess();
                    },
                    (err) => {
                        setAlert(stringAlert.updateFailed);
                        setSeverity('error')
                        setOpenAlert(true);
                        handleOnFailed();
                    }
                )
            })
    }
    return (
        <Box sx={{
            width: '420px',
            padding: theme.spacing(2)
        }}>
            <AlertFeddback
                open={openAlert}
                alert={alert}
                severity={severityAlert}
            />
            <Button
                sx={{
                    position:'absolute',
                    top:'5px',
                    right  :'1px'
                }}
                startIcon={<CloseIcon />}
                onClick={handleOnClose}
                />
            <Typography
                sx={{
                    fontWeight: '600',
                    fontSize: '23px',
                    textAlign: 'center',
                    marginBottom: theme.spacing(1)
                }}>Đổi mật khẩu</Typography>
            <Typography
                sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#292929",
                    opacity: 0.7,
                    display: "block",
                }}
            >
                Mật khẩu của bạn phải có tối thiểu 8 ký tự, bao gồm cả chữ số, và chữ cái đặt biệt
            </Typography>
            <InputCustom
                isError={isErrPass}
                labelError={labelErrPass}
                type='text'
                label='Mật khẩu hiện tại'
                placeholder='password'
                onChange={handleChangePassword} />
            <InputCustom
                isError={isErrNewPass}
                labelError={labelErrNewPass}
                type='text'
                label='Mật khẩu mới'
                placeholder='New password'
                onChange={handleChangeNewPassword} />
            <InputCustom
                isError={isConfirmNewPass}
                labelError={labelErrConfirmPass}
                type='text'
                label='Xác nhận mật khẩu mới'
                placeholder='Confirm new password'
                onChange={handleChangeConfrimPassword} />
            <Button
                sx={{
                    mt: "20px",
                    width: "100%",
                    borderRadius: "44px",
                    height: "44px",
                    backgroundColor: "#1dbfaf",
                    boxShadow: 3,
                    backgroundImage:
                        "linear-gradient(70.06deg, #2cccff -5%, #22dfbf 106%)",
                }}
                onClick={handleSubmitLogin}
                variant="contained"
            >
                Đổi mật khẩu
            </Button>
        </Box>
    )
}