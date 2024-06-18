import {
  Alert,
  Box,
  Button,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginEducator } from "../../api/auth";
import useToken from "../../hook/token";
import { stringAlert } from "../../static/stringAlert";
import theme from "../../theme";
import TextFieldPassword from "../layouts/TextFieldPassword";
import TextLine from "../layouts/TextLine";
import { CurrentUserContext } from "../../App";
import { handleApiResponse } from "../../api/instance";

export default function Login({ onLoginSuccess }) {
  const [userName, setUserName] = useState("");
  const [isNotValidUserName, setIsNotValidUserName] = useState(false); // dùng để toggle err input
  const [password, setPassword] = useState("");
  const [isNotValidPassword, setIsNotValidPassword] = useState(false); // dùng để toggle err input
  const [isShowLoginFaile, setIsShowLoginFailed] = useState(false); // toogle thông báo khi login faile

  const { token, setToken } = useToken();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const handleChangeInputUser = (e) => {
    setUserName(e.target.value);
    setIsNotValidUserName(false); // tắt err
    setIsShowLoginFailed(false); // tắt alert faile
  };

  const handleChangeInputPassword = (e) => {
    setPassword(e.target.value);
    setIsNotValidPassword(false); // tăt err
    setIsShowLoginFailed(false); // tắt alert faile
  };

  const handleLogin = (e) => {
    let isValidate = true;
    if (!validateUserName()) {
      setIsNotValidUserName(true);
      isValidate = false;
    }
    if (!validatePassword()) {
      setIsNotValidPassword(true);
      isValidate = false;
    }
    if (isValidate) {
      loginEducator(userName, password).then((response) => {
        handleApiResponse(
          response,
          (data) => {
            setToken(data.token);
            console.log(data);
            setCurrentUser(data.user);
            if (onLoginSuccess) {
              onLoginSuccess();
            }
          },
          () => {
            setIsShowLoginFailed(true);
          }
        );
      });
    }
  };

  const validateUserName = () => {
    if (userName) return true;
    return false;
  };

  const validatePassword = () => {
    if (password) return true;
    return false;
  };

  return (
    <Box
      flexGrow={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Paper
        sx={{
          maxWidth: "450px",
          minWidth: "420px",
          padding: "5px 20px",
          // margin: 'auto'
        }}
      >
        <Stack direction="column" spacing={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "220px",
                borderRadius: "0 0 20px 20px",
                backgroundColor: theme.palette.primary.main,
              }}
            >
              <Typography
                variant="title"
                sx={{
                  textAlign: "center",
                  color: theme.palette.primary.contrastText,
                }}
              >
                Đăng nhập
              </Typography>
            </Box>
          </Box>
          <Box display={isShowLoginFaile ? "block" : "none"}>
            <Alert variant="filled" severity="error">
              Tài Khoản hoặc mật khẩu không đúng vui lòng đăng nhập lại!
            </Alert>
          </Box>
          <TextField
            onChange={handleChangeInputUser}
            value={userName}
            label="UserName"
            error={isNotValidUserName}
            helperText={isNotValidUserName ? stringAlert.require : ""}
          />
          <TextFieldPassword
            error={isNotValidPassword}
            helperText={isNotValidPassword ? stringAlert.require : ""}
            onChange={handleChangeInputPassword}
            value={password}
          />
          <Link underline="hover">Quên mật khẩu</Link>
          <Button onClick={handleLogin} variant="contained" color="success">
            Đăng nhập
          </Button>
          <TextLine />
          <Button href="/signup/educator">Tạo tài khoản mới</Button>
        </Stack>
      </Paper>
    </Box>
  );
}
