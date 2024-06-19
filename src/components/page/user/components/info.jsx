import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import ImageCustom from "./imageCustom";
import banner_portfolio from "../assets/images/banner_portfolio.png";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ImageUser from "../assets/images/662a66043215d.jpg";
import KeyIcon from "@mui/icons-material/Key";
import SaveIcon from "@mui/icons-material/Save";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../../../App";
import { handleApiRequest, handleApiResponse } from "../../../../api/instance";
import { updateAvatar, updateUser } from "../../../../api/auth";
import ChangePassword from "./ChangePassword";
import { stringAlert } from "../../../../static/stringAlert";
import { convertFileToSrc, isImageFile } from "../../../../util/file";

const InputFile = styled('input')({
  opacity: 0, // Sử dụng opacity thay vì clip để ẩn phần tử input
  position: 'absolute',
  right: 0,
  left: 0,
  top: 0,
  bottom: 0,
  zIndex: 1, // Đặt zIndex để input được ẩn phía sau nút button
});

function Info() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [updateUserState, setUpdateUserState] = useState({
    lastName: '',
    firstName: '',
    phone: '',
    city: '',
    email: '',
    country: '',
    educator:{
      
    }
  });

  const [openAlert, setOpenAlert] = useState(false);
  const [alert, setAlert] = useState("");
  const [severity, setSeverity] = useState("success");

  const [imgSrc, setImgSrc] = useState("");
  const [fileImg, setFileImg] = useState(null);



  const [openChangPassword, setOpenChangePassword] = useState(false);

  useEffect(() => {
    // tạo giá trị ban dầu cho update user
    if (currentUser) {
      setUpdateUserState(currentUser);

      let avatarSrc = currentUser.avatar;
      if (avatarSrc) {
        setImgSrc(avatarSrc);
      }
    }
  }, [currentUser]);

  // toogle page change password
  const handleToggleChangePassWord = () => {
    setOpenChangePassword(!openChangPassword);
  }

  const handleOnchangeUser = (e, key) => {
    let value = e.target.value;
    let newUser = { [key]: value };
    setUpdateUserState({ ...updateUserState, ...newUser });
  }

  const handleToggleAlert = () => {
    setOpenAlert(!openAlert);
  }

  const handleCloseChangePassword = () => {
    handleToggleChangePassWord();
  }

  const handleChangePasswordSuccess = () => {
    setAlert(stringAlert.updateSuccess);
    setOpenAlert(true);
    handleToggleChangePassWord();
  }

  const handlChangeFile = async (e) => {
    let files = e.target.files;
    // Kiểm tra có phải file ảnh hay không
    if (isImageFile(files[0])) {
      setFileImg(files);
      const base64String = await convertFileToSrc(files[0]);
      setImgSrc(base64String);
      setAlert("Click vào Save để lưu ảnh");
      setOpenAlert(true);
    }else{
      setSeverity('error');
      setAlert("File ảnh không hợp lệ");
      setOpenAlert(true);
    }
  }

  const handleUpdateSuccess = () => {
    setAlert("Cập nhật thành công");
    setSeverity('success');
  }

  const handleUpdatFailed = () => {
    setAlert("Cập nhật thất bại");
    setSeverity('error');
  }

  const handleOnSubmit = () => {
    const userId = updateUserState.id;
    if (userId) {
      // update avatar
      if (fileImg) {
        updateAvatar(userId, fileImg)
          .then(response => {
            handleApiResponse(response,
              // success
              (dataResponse) => {
                console.log('img:', dataResponse);
                setCurrentUser(dataResponse);
                handleUpdateSuccess();
              },
              () => {
                handleUpdatFailed();
              }
            )
          });
      }
      // update info user
      updateUser(userId, updateUserState)
        .then(response => {
          handleApiResponse(response,
            // request success
            (userResponse) => {
              setCurrentUser(userResponse);
              handleUpdateSuccess();
            },
            // request error
            (err) => {
              handleUpdatFailed();
            }
          )
        })
    }
    setOpenAlert(true);
  }
  return (
    <Box
      sx={{
        maxWidth: "1100px",
        margin: "auto",
        minHeight: "700px",
      }}
    >
      <Dialog
        open={openChangPassword}>
        <DialogContent>
          <ChangePassword
            onClose={handleCloseChangePassword}
            onSuccess={handleChangePasswordSuccess}
          />
        </DialogContent>
      </Dialog>
      <Snackbar
        open={openAlert}
        autoHideDuration={1000}
        // onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleToggleAlert}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alert}
        </Alert>
      </Snackbar>
      <Box sx={{ position: "relative" }}>
        <ImageCustom
          src={banner_portfolio}
          alt="banner portfolio"
          sx={{
            width: "100%",
            height: { xs: "120px", sm: "308px" },
            borderBottomLeftRadius: "16px",
            borderBottomRightRadius: "16px",
          }}
        />
        <Button
          variant="contained"
          startIcon={<CameraAltIcon />}
          sx={{
            backgroundColor: "#fff",
            color: "#4f4d4d",
            boxShadow: "none",
            position: "absolute",
            bottom: { xs: "10px", sm: "18px" },
            right: { xs: "6px", sm: "14px" },
            p: { xs: "5px 8px", sm: "10px 12px" },
            borderRadius: "6px",
            textTransform: "none",
            "&:hover": {
              opacity: "0.9 ",
              backgroundColor: "#fff",
              boxShadow: "none",
            },
          }}
        >
          <Typography sx={{ fontWeight: "500", fontSize: "14px" }}>
            Thay Avatar
          </Typography>
          <InputFile type="file" onChange={handlChangeFile} />
        </Button>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "center", sm: "end" },
            position: "absolute",
            bottom: { xs: "-138px", sm: "-70px" },
            left: { xs: "50%", sm: "40px" },
            transform: { xs: "translateX(-50%)", sm: "translateX(0)" },
          }}
        >
          <Box
            sx={{
              width: { xs: "128px", sm: "172px" },
              height: { xs: "128px", sm: "172px" },
              borderRadius: "99px",
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <ImageCustom
                src={imgSrc ? imgSrc : ImageUser}
                alt="image user"
                sx={{
                  width: { xs: "108px", sm: "154px" },
                  height: { xs: "108px", sm: "154px" },
                  borderRadius: "99px",
                }}
              />
            </Box>
          </Box>
          <Box sx={{ mb: "13px", ml: "13px" }}>
            <Typography
              sx={{ fontSize: { xs: "24px", sm: "28px" }, fontWeight: "700" }}
            >
              {`${currentUser?.lastName} ${currentUser.firstName}`}
            </Typography>
            <Typography
              sx={{ fontSize: { xs: "12px", sm: "15px" }, fontWeight: "500" }}
            >
              {`ID: ${currentUser.id}`}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ p: "0 24px" }}>
        <Grid
          container
          sx={{
            mt: { xs: "150px", sm: "90px" },
          }}
        >
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              height: "100%",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow:
                "0 0 5px 0 rgba(0, 0, 0, .1), 0 0 1px 0 rgba(0, 0, 0, .1)",
              wordBreak: "break-word",
              marginBottom: "20px",
              padding: "18px 14px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                color: "#000",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Khóa học của tôi 666
            </Typography>
            <Divider sx={{ m: "16px 0", width: "100%", height: "1px" }} />
            <Button
              onClick={handleToggleChangePassWord}
              variant="outlined"
              startIcon={<KeyIcon />}
              size="small"
              sx={{
                backgroundColor: "#fff",
                color: "#4f4d4d",
                boxShadow: "none",
                p: "10px 12px",
                borderRadius: "6px",
                textTransform: "none",
                "&:hover": {
                  opacity: "0.9 ",
                  backgroundColor: "#fff",
                  boxShadow: "none",
                },
              }}
            >
              <Typography sx={{ fontWeight: "500", fontSize: "14px" }}>
                Thay đổi mật khẩu
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12} md={9} sx={{ pl: { xs: "0px", sm: "20px" } }}>
            <Box
              component="form"
              sx={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow:
                  "0 0 5px 0 rgba(0, 0, 0, .1), 0 0 1px 0 rgba(0, 0, 0, .1)",
                wordBreak: "break-word",
                marginBottom: "20px",
                padding: "18px 14px",
              }}
            >
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Họ và chữ lót"
                    id="outlined-size-small"
                    defaultValue={updateUserState?.lastName || 'null'}
                    value={updateUserState?.lastName}
                    size={isSmallScreen ? "medium" : "small"}
                    sx={{ width: "100%", mb: "40px" }}
                    onChange={(e) => handleOnchangeUser(e, 'lastName')}
                  />
                  <TextField
                    label="Số điện thoại"
                    id="outlined-size-small"
                    defaultValue={updateUserState?.phone || 'null'}
                    value={updateUserState?.phone}
                    size={isSmallScreen ? "medium" : "small"}
                    sx={{ width: "100%", mb: "40px" }}
                    onChange={(e) => handleOnchangeUser(e, 'phone')}
                  />
                  <TextField
                    label="Thành Phố"
                    id="outlined-size-small"
                    defaultValue={updateUserState?.city || 'null'}
                    value={updateUserState?.city}
                    size={isSmallScreen ? "medium" : "small"}
                    sx={{ width: "100%", mb: "40px" }}
                    onChange={(e) => handleOnchangeUser(e, 'city')}
                  />
                  {/* <TextField
                    label="Id User"
                    id="outlined-size-small"
                    defaultValue={'dd'}
                    size={isSmallScreen ? "medium" : "small"}
                    sx={{ width: "100%" }}
                  /> */}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Tên"
                    id="outlined-size-small"
                    defaultValue={updateUserState?.firstName || 'null'}
                    value={updateUserState?.firstName}
                    size={isSmallScreen ? "medium" : "small"}
                    sx={{ width: "100%", mb: "40px" }}
                    onChange={(e) => handleOnchangeUser(e, 'firstName')}
                  />
                  <TextField
                    label="Địa chỉ Email"
                    id="outlined-size-small"
                    defaultValue={updateUserState?.email || 'null'}
                    value={updateUserState?.email}
                    size={isSmallScreen ? "medium" : "small"}
                    sx={{ width: "100%", mb: "40px" }}
                    onChange={(e) => handleOnchangeUser(e, 'email')}
                  />
                  <TextField
                    label="Quốc gia"
                    id="outlined-size-small"
                    defaultValue={updateUserState?.country || 'null'}
                    value={updateUserState?.country}
                    size={isSmallScreen ? "medium" : "small"}
                    sx={{ width: "100%", mb: "40px" }}
                    onChange={(e) => handleOnchangeUser(e, 'country')}
                  />
                  {/* <TextField
                    label="Giới Thiệu"
                    id="outlined-size-small"
                    defaultValue="info user"
                    size={isSmallScreen ? "medium" : "small"}
                    sx={{ width: "100%" }}
                  /> */}
                </Grid>
              </Grid>
              <Divider sx={{ m: "16px 0", width: "100%", height: "1px" }} />
              <Button onClick={handleOnSubmit} variant="contained" endIcon={<SaveIcon />}>
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Info;
