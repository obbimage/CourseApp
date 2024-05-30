import { Box, Button, InputBase, Typography, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ImageCustom from "./imageCustom";
import logoImage from "../assets/images/f8-icon.18cd71cfcfa33566a22b.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { registerUser } from "../../../../api/auth";
import { handleApiRequest, handleApiResponse } from "../../../../api/instance";

//bi loi thi focus mau do #f33a58
const InputCustom = styled("div")(({ isFocused, isError }) => ({
  color: "#292929",
  fontSize: "14px",
  height: "44px",
  backgroundColor: "rgba(22, 24, 35, .06)",
  marginTop: "14px",
  width: "100%",

  borderRadius: "44px",
  border: isFocused
    ? "1.5px solid #1dbfaf"
    : isError
      ? "1.5px solid #f33a58"
      : "1.5px solid rgba(22, 24, 35, .06)",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",

  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: "20px",
    transition: theme.transitions.create("width"),
    borderRadius: "44px",
  },
  width: "100%",
  height: "44px",
}));

function Register({ isLogin, setIsLogin,setCurrentUser }) {
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false);
  const [isFocusedPass2, setIsFocusedPass2] = useState(false);
  const [clickLogin, setClickLogin] = useState(false);
  const [registerResult, setRegisterResult] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [pass2Value, setPass2Value] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  // Đăng ký
  const handleSubmitLogin = async () => {
    setClickLogin(true); // hien thi chung voi loi khong nhap vao input
    console.log(passValue.length < 8);

    // console.log(passValue === "" || (passValue.length < 8 && passValue.length > 16));
    if (emailValue === "" || passValue === "" || pass2Value === "") return;
    if (passValue !== pass2Value || passValue.length < 8) return;
    await registerUser(emailValue, passValue)
      .then(response => {
        handleApiResponse(response,
          (dataResponse) => {
            setIsLogin(true); // thay doi giao dien khi nguoi dung dan dang nhap thanh cong
            setCurrentUser(dataResponse)
            setRegisterResult(false); // hien thi alert success or error
            navigate("/");// chuyen ve trang chu
          },
          (err) => {
            setRegisterResult(false); // hien thi alert success or error
            setOpen(false); //hien thi success hay error
          }
        )
      });

    setOpen(true); //hien thi alert
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChangeEmail = (e) => {
    setEmailValue(e.target.value);
  };

  const handleChangePass = (e) => {
    setPassValue(e.target.value);
  };

  const handleChangePass2 = (e) => {
    setPass2Value(e.target.value);
  };

  const handleFocusEmail = () => {
    setIsFocusedEmail(true);
  };

  const handleBlurEmail = () => {
    setIsFocusedEmail(false);
  };

  const handleFocusPass = () => {
    setIsFocusedPass(true);
  };

  const handleBlurPass = () => {
    setIsFocusedPass(false);
  };

  const handleFocusPass2 = () => {
    setIsFocusedPass2(true);
  };

  const handleBlurPass2 = () => {
    setIsFocusedPass2(false);
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "94%",
          height: "94%",
          maxWidth: "540px",
          maxHeight: "660px",
          position: "relative",
          overflow: "hidden",
          borderRadius: "20px",
          boxShadow: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          component={Link}
          to="/"
          sx={{
            p: "0",
            position: "absolute",
            top: "16px",
            right: "16px",
            minWidth: "40px !important",
            height: "40px",

            color: "#333",
            boxShadow: "none",
            borderRadius: "99px",
            background: "rgba(22, 24, 35, .03)",
            "&:hover": {
              background: "rgba(22, 24, 35, .03)",
              opacity: 0.9,
              boxShadow: "none",
            },
          }}
        >
          <CloseIcon />
        </Button>
        <Box
          sx={{
            width: { xs: "80%", sm: "70%" },
            height: "80%",

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ImageCustom
            src={logoImage}
            alt="logo"
            sx={{ height: "40px", borderRadius: "8px" }}
          />
          <Typography
            sx={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#292929",
              m: "12px 0",
            }}
          >
            Đăng ký tài khoản
          </Typography>
          <Box component="form" sx={{ width: "100%", mt: "40px" }}>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#292929",
                opacity: 0.7,
                display: "block",
                marginBottom: "8px",
              }}
            >
              Email / Số điện thoại
            </Typography>
            <InputCustom
              isFocused={isFocusedEmail}
              isError={clickLogin && emailValue === ""}
            >
              <StyledInputBase
                type="email"
                onFocus={handleFocusEmail}
                onBlur={handleBlurEmail}
                onChange={handleChangeEmail}
                placeholder="Địa chỉ email"
                name="email"
                inputProps={{ "aria-label": "email" }}
              />
            </InputCustom>
            {clickLogin && emailValue === "" && (
              <Typography
                sx={{
                  fontSize: "12px",
                  display: "block",
                  ml: "18px",
                  color: "#f33a58",
                }}
              >
                Email không được để trống
              </Typography>
            )}
            <InputCustom
              isFocused={isFocusedPass}
              isError={clickLogin && passValue === ""}
            >
              <StyledInputBase
                type="password"
                onFocus={handleFocusPass}
                onBlur={handleBlurPass}
                onChange={handleChangePass}
                placeholder="Mật khẩu"
                name="password"
                inputProps={{ "aria-label": "pass" }}
              />
            </InputCustom>
            {clickLogin && (passValue === "" || (passValue.length < 8 || passValue.length > 16)) && (
              <Typography
                sx={{
                  fontSize: "12px",
                  display: "block",
                  ml: "18px",
                  color: "#f33a58",
                }}
              >
                {
                  passValue.length < 8 || passValue.length > 16 ?
                    'Độ dài mật khẩu từ 8 đến 16' :
                    'Mật khẩu không được để trống'
                }
              </Typography>
            )}
            <InputCustom
              isFocused={isFocusedPass2}
              isError={clickLogin && pass2Value === ""}
            >
              <StyledInputBase
                type="password"
                onFocus={handleFocusPass2}
                onBlur={handleBlurPass2}
                onChange={handleChangePass2}
                placeholder="Nhập lại mật khẩu"
                name="password"
                inputProps={{ "aria-label": "conform pass" }}
              />
            </InputCustom>
            {clickLogin && passValue === "" ? (
              <Typography
                sx={{
                  fontSize: "12px",
                  display: "block",
                  ml: "18px",
                  color: "#f33a58",
                }}
              >
                Nhập lại mật khẩu không được để trống
              </Typography>
            ) : passValue !== pass2Value ? (
              <Typography
                sx={{
                  fontSize: "12px",
                  display: "block",
                  ml: "18px",
                  color: "#f33a58",
                }}
              >
                Mật khẩu nhập lại không trùng khớp
              </Typography>
            ) : (
              ""
            )}
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
              Đăng ký
            </Button>

            {registerResult ? (
              <Snackbar
                open={open}
                autoHideDuration={1000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  variant="filled"
                  sx={{ width: "100%" }}
                >
                  Đăng ký thành công!
                </Alert>
              </Snackbar>
            ) : (
              <Snackbar
                open={open}
                autoHideDuration={1000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert
                  onClose={handleClose}
                  severity="warning"
                  variant="filled"
                  sx={{ width: "100%" }}
                >
                  Tài khoản đã tồn tại!
                </Alert>
              </Snackbar>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "40px",
              alignItems: "center",
              mt: "40px",
            }}
          >
            <Typography sx={{ fontSize: "14px" }}>
              Bạn đã có tài khoản?{" "}
              <Typography
                sx={{
                  textDecoration: "none",
                  color: "#f50123",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
                component={Link}
                to="/login"
              >
                Đăng nhập
              </Typography>
            </Typography>
            <Typography
              sx={{ fontSize: "11px", color: "#666", textAlign: "center" }}
            >
              Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với{" "}
              <Typography
                sx={{ fontSize: "11px", color: "#666" }}
                component={Link}
                to="/"
              >
                điều khoản sử dụng
              </Typography>{" "}
              của chúng tôi.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Register;
