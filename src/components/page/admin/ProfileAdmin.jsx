import { Avatar, Box, Button, Divider, FormControl, InputBase, InputLabel, Paper, TextareaAutosize, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { alpha, styled, useTheme } from '@mui/material/styles';
import AvatarLetter from "../../layouts/AvatarLetter";
import Cover from "../../layouts/imgComponents/Cover";
import { stringToColor } from "../../../js/String";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../../App";
import Link from '@mui/material/Link';
import { Key, TextFields } from "@mui/icons-material";
import { getUser, updateAvatar, updateUser } from "../../../api/auth";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import * as React from 'react';
import Alert from '@mui/material/Alert';
import InputFileUpload from "../../layouts/InputFileUpload";
import AvatarCustom from "../../layouts/AvatarCustom";

const PaperContain = styled(Paper)
  (({ theme }) => ({
    width: '100%',
    height: '100%',
    padding: '20px 5px',
  }));

const InfoTotal = ({ user, onClickButtonAvatar }) => {
  const theme = useTheme();

  const InfoBox = ({ text }) => {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        height: theme.spacing(8),
        alignItems: 'center',
        padding: `0 ${theme.spacing(2)}`,
      }}>
        <Typography sx={{
          fontWeight: '450'
        }}>{text}</Typography>
        <Typography sx={{
          color: stringToColor(text),
          fontWeight: '900',
          fontSize: '25px'
        }}>0</Typography>
      </Box>
    )
  }

  const sizeAvatar = "100px";
  return (
    <PaperContain sx={{
      maxWidth: '500px'
    }} >
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: theme.spacing(2) }}>
        <Box sx={{ width: sizeAvatar, height: sizeAvatar, margin: 'auto' }}>
          <AvatarCustom src={user.avatar} name={`${user.lastName} ${user.firstName}`} />
        </Box>
        <Typography sx={{ marginTop: '3px' }} textAlign='center'>id: {user.id}</Typography>
        <Typography sx={{ marginTop: '2px' }} textAlign='center'>User name: {user.username}</Typography>
      </Box>
      <Divider />
      {/* <InfoBox text="Khóa học đã tạo: " />
      <Divider />
      <InfoBox text="Khóa học đã bán: " /> */}
      <Divider />
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px',
        flexDirection: 'column'
      }}>
        <Button
          sx={{
            width: '70%',
            height: '50px',
            margin: 'auto',
            marginBottom: theme.spacing(2)
          }}
          onClick={onClickButtonAvatar}
          variant="outlined">
          Thay Ảnh Hồ sơ
        </Button>
        <Button
          sx={{
            width: '70%',
            height: '50px',
            margin: 'auto',
          }}
          variant="outlined">
          <Link href="/changepassword" sx={{ textDecoration: 'none' }}  >
            Đổi mật khẩu
          </Link>
        </Button>
      </Box>
    </PaperContain>
  )
}

const Input = styled(InputBase)
  (({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      border: '1px solid',
      borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
      fontSize: 16,
      padding: '10px 12px',
      height: '30px',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-disabled': {
        backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
      }
    },
  }));

const CustomTextField = ({ label, defaultValue, value, disabled, onChange }) => {
  return (
    <FormControl sx={{ width: '100%' }} variant="standard">
      <InputLabel sx={{ fontSize: '22px' }} shrink htmlFor="name-input">
        {label}
      </InputLabel>
      <Input id="name-input" disabled={disabled} defaultValue={defaultValue} value={value || ""} onChange={onChange} />
    </FormControl>

  )
}

const DescriptionWrap = ({ children }) => {

  return (
    <Grid container spacing={5}>
      {children.map((item, index) => {
        return (
          <Grid xs={6} key={index}>
            {item}
          </Grid>
        )
      })}
    </Grid>
  )
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AdminProfile() {
  const theme = useTheme();

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [editUser, setEditUser] = useState(currentUser);
  // toggle edit profile
  const [isNotAllowEdit, setIsNotAllowEdit] = useState(true);
  // allow update dat
  const [isAllowUpdate, setIsAllowUpdate] = useState(false);
  const [isDialog, setIsDialog] = useState(false);
  const [isDialogAlert, setIsDialogAlert] = useState(false);

  // toggle dialog de change avatar
  const [isDialogUpdateAvatar, setIsDialogUpdateAvatar] = useState(false);
  // cho biết da update thành công hay không
  const [isSuccess, setIsSuccess] = useState(false);

  //file
  const [files, setFile] = useState();
  // toggle button Đông ý thay avatar
  const [isChangeAvatar, setIsChangeAvatar] = useState(false);

  const ItemTextFiled = (key, label, defaultValue) => {
    return { key, label, defaultValue }
  }
  const ListTextField = [
    ItemTextFiled("lastName", "Họ", currentUser.lastName),
    ItemTextFiled("firstName", "Tên", currentUser.firstName),
    ItemTextFiled("phone", "Số điện thoại", currentUser.phone),
    ItemTextFiled("email", "Email", currentUser.email),
    ItemTextFiled("city", "Thành phố", currentUser.city),
    ItemTextFiled("country", "Đất nước", currentUser.country),
    ItemTextFiled("zipCode", "Mã bưu chính", currentUser.zipCode),
    ItemTextFiled("zipCodeCountry", "Thành Phố", currentUser.zipCodeCountry),

  ]


  useEffect(() => {
    // nếu allow update thì tiến hành update info
    if (isAllowUpdate) {
      // xóa đi thuộc tính student
      // khi truyền vào với student is null gửi cho sever sẽ bị lỗi
      delete editUser.student
      updateUser(currentUser.id, editUser)
        .then((reponse) => {
          if (reponse.status === 200) {
            setCurrentUser({ ...currentUser, editUser })
          }
          return reponse;
        })
        .then((reponse) => {
          // tắt dialog xác nhận update
          setIsDialog(false);
          //  kiểm tra update có thành công hay không
          if (reponse.status !== 200) {
            setIsSuccess(false);
          } else {
            setIsSuccess(true);
          }
          // bật thông báo 
          setIsDialogAlert(true);
        });
    };
  }, [isAllowUpdate]);

  useEffect(() => {
    if (!files || files.length === 0) {
      setIsChangeAvatar(false);
    } else {
      setIsChangeAvatar(true);
    }
  }, [files]);

  // sử lý event cho button
  const handleEdit = () => {
    setIsNotAllowEdit(!isNotAllowEdit);
  };

  const handleEditCancel = () => {
    setIsNotAllowEdit(!isNotAllowEdit);
    setEditUser(currentUser);
  }

  const handleSave = () => {
    // bật dialog hỏi đồng ý cập nhật hay không
    setIsDialog(true);
    // tắt trang thái update
    setIsNotAllowEdit(!isNotAllowEdit);
  };


  /////////// xử lý handle cho dialog xác nhận update
  const handleDialogClose = () => {
    setIsDialog(false);
  }

  const handleDialogAllow = () => {
    setIsAllowUpdate(true);
  }
  ///////////// xử lý handle cho dialog hiển thị thông báo
  const handleDialogAlertClose = () => {
    setIsDialogAlert(false);
  }

  // xử lý event textFiled
  const handleChangeInput = (e, key) => {
    let updateValue = { ...editUser, [key]: e.target.value }
    setEditUser(updateValue);
  };

  const handleOnchangeTextArea = (e) => {
    let updateValue = {
      educator: {
        description: e.target.value
      }
    };
    setEditUser({ ...editUser, ...updateValue })
  }

  // xử lý file ảnh
  const handleFiles = (files) => {
    setFile(files);
  }

  // up img lên server
  const handleUpdateAvatar = () => {
    setIsDialogUpdateAvatar(false);

    updateAvatar(currentUser.id, files)
      .then(response => {
        if (response.status === 200) {
          setIsSuccess(true);
          setIsDialogAlert(true);
          setCurrentUser(response.data.data);
        } else {
          setIsSuccess(true);
        }
      })

  }
  const handleCloseUpdateAvatar = () => {
    setIsDialogUpdateAvatar(false);
    setFile(null);
  }

  // toggle dialog avatar
  const handleAvatar = () => {
    setIsDialogUpdateAvatar(true);
  }


  return (
    <Box flexGrow={1}>
      {/* dialog thay đổi avatar */}
      <Dialog
        open={isDialogUpdateAvatar}
      >
        <DialogTitle>{"Thay đổi ảnh hồ sơ"}</DialogTitle>
        <DialogContent>
          <InputFileUpload handleFiles={handleFiles} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateAvatar}>Hủy</Button>
          <Button disabled={!isChangeAvatar} onClick={handleUpdateAvatar}>Lưu</Button>
        </DialogActions>
      </Dialog>
      {/* dialog xác nhân thay đổi thông tin */}
      <Dialog
        open={isDialog}
        TransitionComponent={Transition}
      >
        <DialogTitle>
          {"Bạn có muốn thay đổi thông tin?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Thông tin sẽ được thay đổi khi bấm đồng ý
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Hủy</Button>
          <Button onClick={handleDialogAllow} >Đồng ý</Button>
        </DialogActions>
      </Dialog>
      {/* dialog thông báo trạng thái updata thông tin */}
      <Dialog
        open={isDialogAlert}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialogAlertClose}
      >
        <DialogTitle>
          {"Thông báo"}
        </DialogTitle>
        <DialogContent>
          {
            isSuccess ?
              <Alert variant="outlined" severity="success">
                Cập nhật thành công
              </Alert> :
              <Alert variant="outlined" severity="error">
                Cập nhật thông tin thất bại
              </Alert>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogAlertClose}>Đồng ý</Button>
        </DialogActions>
      </Dialog>
      <Box width='100%' height='200px' >
        {/* ảnh cover đầu trang */}
        <Cover />
      </Box>
      <Box flexGrow={1} sx={{
        display: "flex",
        justifyContent: 'center',
        position: 'relative',
        top: '-100px',
        margin: `2px ${theme.spacing(4)}`
      }}>
        <Grid container spacing={1} sx={{
          width: '1700px'
        }}>
          {/* Thông tin bên trái */}
          <Grid xs={4}>
            <InfoTotal user={currentUser} onClickButtonAvatar={handleAvatar} />
          </Grid>
          {/* Thông tin bên phải */}
          <Grid xs={8}>
            <PaperContain sx={{
              maxWidth: '1100px'
            }}>
              <Grid container spacing={4}
                sx={{
                  padding: '20px 50px'
                }}>
                {
                  ListTextField.map((item) => {
                    return (
                      <Grid xs={6} key={item.key}>
                        <CustomTextField
                          onChange={(event) => handleChangeInput(event, item.key)}
                          disabled={isNotAllowEdit}
                          label={item.label}
                          value={editUser[item.key]}
                        />
                      </Grid>
                    )
                  })
                }
                <Grid xs={12}>
                  <FormControl variant="standard" sx={{
                    width: '100%',
                    marginTop: '10px',
                    '& label ': {
                      marginTop: theme.spacing(1),
                      position: 'static',
                      fontSize: '22px'
                    },
                  }} >
                    {/* <InputLabel shrink>Tiểu sử</InputLabel>
                    <TextareaAutosize disabled={isNotAllowEdit}
                      onChange={handleOnchangeTextArea}
                      value={editUser.educator.description || ""}
                      style={{ resize: 'none', width: '100%', padding: '10px', outline: 'none' }}
                      minRows={7}
                    /> */}
                  </FormControl>
                </Grid>
              </Grid>
              <Divider sx={{
                marginTop: '10px',
                marginBottom: '10px'
              }} />
              <Box sx={{
                padding: '0px 50px'
              }}>
                {
                  isNotAllowEdit ?
                    <Button sx={{
                      width: '120px',
                      height: '50px'
                    }}
                      onClick={handleEdit}
                      variant="contained">Sửa</Button>
                    :
                    <Button sx={{
                      width: '120px',
                      height: '50px'
                    }}
                      onClick={handleEditCancel}
                      variant="contained">{"Hủy"}</Button>
                }
                <Button sx={{
                  width: '120px',
                  height: '50px',
                  marginLeft: theme.spacing(2)
                }}
                  disabled={isNotAllowEdit}
                  onClick={handleSave}
                  variant="contained">Lưu</Button>
              </Box>
            </PaperContain>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}