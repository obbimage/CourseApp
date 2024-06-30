import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  useTheme,
} from "@mui/material";
import LayoutEditCourse, {
  HeaderEditLayoutCourse,
  TitleHeaderEditCourse,
  WrapBoxEditLayoutCourse,
  WrapContentLayoutEditCourse,
} from "./LayoutEditCourse";
import { useState } from "react";
import { deleteCourseById, setCompleteCourse } from "../../../../api/course";
import {
  getStorageCourseId,
  removeStorageCourseId,
} from "../../../../util/localStorage";
import { handleApiResponse } from "../../../../api/instance";
import { stringAlert } from "../../../../static/stringAlert";
import { useNavigate } from "react-router-dom";

const DialogConfirm = ({ open, onCancel, onAgree }) => {
  const handleCancel = () => {
    if (onCancel) onCancel();
  };
  const handleAgree = () => {
    if (onAgree) onAgree();
  };
  return (
    <Dialog open={open}>
      <DialogTitle>{"Thông báo"}</DialogTitle>
      <DialogContent>
        <DialogContentText>Sau khi xóa không thể khôi phục</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Hủy</Button>
        <Button onClick={handleAgree}>Tiếp tục</Button>
      </DialogActions>
    </Dialog>
  );
};

const DialogConfirm2 = ({ open, onCancel, onAgree }) => {
  const handleCancel = () => {
    if (onCancel) onCancel();
  };
  const handleAgree = () => {
    if (onAgree) onAgree();
  };
  return (
    <Dialog open={open}>
      <DialogTitle>{"Thông báo"}</DialogTitle>
      <DialogContent>
        <DialogContentText>Sau khi gở có thể mở lại</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Hủy</Button>
        <Button onClick={handleAgree}>Tiếp tục</Button>
      </DialogActions>
    </Dialog>
  );
};

export default function Setting() {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openConfirm2, setOpenConfirm2] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alert, setAlert] = useState("");
  const [severity, setSeverity] = useState("success");
  const theme = useTheme();

  const navigate = useNavigate();
  const handleToggleConfirm = () => {
    setOpenConfirm(!openConfirm);
  };

  const handleToggleConfirm2 = () => {
    setOpenConfirm2(!openConfirm2);
  };

  const handleDeleteCourse = async () => {
    const courseId = getStorageCourseId();
    if (courseId) {
      await deleteCourseById(courseId).then((response) => {
        handleApiResponse(
          response,
          () => {
            setAlert(stringAlert.deleteSuccess);
          },
          () => {
            setAlert(stringAlert.deleteFailed);
            setSeverity("error");
          }
        );
      });
      setOpenAlert(true);
      handleToggleConfirm();
      removeStorageCourseId();
      navigate("/educator/");
    }
  };

  const handleUnCourse = async () => {
    const courseId = getStorageCourseId();
    if (courseId) {
      setCompleteCourse(courseId, false).then((response) => {
        handleApiResponse(
          response,
          // success
          (courseResponse) => {
            console.log("da huy thanh cong");
            setAlert("Hủy thành công");
            setSeverity("success");
          },

          // failed
          (err) => {
            console.log(err);
            setAlert("Hủy thất bại");
            setSeverity("error");
          }
        );
      });
      setOpenAlert(true);
      handleToggleConfirm();
      removeStorageCourseId();
      navigate("/educator/");
    }
  };
  return (
    <>
      <Box
        sx={{
          display: openAlert ? "block" : "none",
          position: "fixed",
          top: "20%",
          left: "30%",
        }}
      >
        <Alert severity={severity}>{alert}</Alert>
      </Box>
      <DialogConfirm
        open={openConfirm}
        onCancel={handleToggleConfirm}
        onAgree={handleDeleteCourse}
      />

      <DialogConfirm2
        open={openConfirm2}
        onCancel={handleToggleConfirm2}
        onAgree={handleUnCourse}
      />
      <LayoutEditCourse>
        <HeaderEditLayoutCourse>
          <TitleHeaderEditCourse>Cài đặt</TitleHeaderEditCourse>
        </HeaderEditLayoutCourse>
        <WrapBoxEditLayoutCourse>
          <WrapContentLayoutEditCourse>
            <Box
              sx={{
                marginBottom: theme.spacing(2),
              }}
            >
              <Typography fontWeight={"600"}>Trạng thái khóa học</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Button
                sx={{
                  width: "200px",
                  height: "38px",
                  marginRight: theme.spacing(3),
                }}
                variant="outlined"
                onClick={handleToggleConfirm}
              >
                Xóa Khóa học
              </Button>
              <Typography>
                Chúng tôi cam kết học viên có quyền truy cập suốt đời. Vì vậy,
                bạn không thể xóa khóa học sau khi học viên đã ghi danh.
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Button
                sx={{
                  width: "200px",
                  height: "38px",
                  marginRight: theme.spacing(3),
                }}
                variant="outlined"
                onClick={handleToggleConfirm2}
              >
                Gỡ khóa học{" "}
              </Button>
              <Typography>
                Sau khi ẩn khóa học thì chỉ mình bạn thấy được khóa học và các
                học viên không thể đăng ký được khóa học này trên các nền tản
              </Typography>
            </Box>
          </WrapContentLayoutEditCourse>
        </WrapBoxEditLayoutCourse>
      </LayoutEditCourse>
    </>
  );
}
