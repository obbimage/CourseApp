import {
  Avatar,
  Box,
  Button,
  Grid,
  InputBase,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { alpha, styled } from "@mui/material/styles";
import NearMeIcon from "@mui/icons-material/NearMe";
import {
  getChatsByCourseId,
  insertChat,
  updateStatusChatById,
} from "../../../../api/chat";
import { handleApiResponse } from "../../../../api/instance";
import { isObjEmpty } from "../../../../util/object";
import { CurrentUserContext } from "../../../../App";

const Search = styled("div")(({ theme, isFocused }) => ({
  position: "relative",
  color: "#707070",
  fontSize: "14px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: "#fff",
  },

  marginLeft: 0,
  width: { xs: "100%", sm: "420px" },
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  borderRadius: "20px",
  border: isFocused ? "2px solid #444" : "2px solid #ccc",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
  width: "90%",
}));

function Chat({
  id,
  name,
  idUser,
  img,
  content,
  time,
  enjoy,
  idFeedback,
  statusChat,
  courseId,
  isEducator,
  idActor,
  noAnswer,
  setNoAnswer,
}) {
  const idCurrentFeed = id;
  const [alert, setAlert] = useState("");
  const [severity, setSeverity] = useState("success");
  const [isFocused, setIsFocused] = useState(false);
  const [isValue, setIsValue] = useState(false);
  const [status, setStatus] = useState(statusChat);
  const [toggleFeed, setToogleFeed] = useState(false);
  const [chatValue, setChatValue] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [chatNew, setChatNew] = useState({
    time: "1 giay truoc",
    enjoy: 0,
    idFeedback: id,
    status: false,
  });

  const [updateChatState, setUpdateChatState] = useState({
    id: id,
    content: content,
    time: time,
    courseId: courseId,
    userId: idUser,
    enjoy: enjoy,
    idFeedback: idFeedback,
    status: true,
  });

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  //dung idfeedback de tim nhung feedback do

  const getChatsFeedback = (chatResponse) => {
    if (isEducator) {
      chatResponse?.forEach((f) => {
        if (f.user.id === currentUser.id && f.idFeedback === id) {
          setFeedback((prevFeedbacks) => [...prevFeedbacks, f]);
        }
      });
    } else {
      chatResponse?.forEach((f) => {
        if (f.idFeedback === id) {
          setFeedback((prevFeedbacks) => [...prevFeedbacks, f]);
        }
      });
    }
  };
  useEffect(() => {
    if (!isObjEmpty(currentUser)) {
      // lấy tat ca danh sách cuoc tro chuyen cua khoa hoc do
      getChatsByCourseId(courseId).then((response) => {
        handleApiResponse(
          response,
          // success
          (chatResponse) => {
            getChatsFeedback(chatResponse);
          }
        );
      });
    }
    console.log("so lan useffect chay");
  }, [courseId]);

  const handleFeedback = () => {
    setToogleFeed(!toggleFeed);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      //navigate(`/search?course-name=${searchValue}`);
    }
  };

  const handleUpdateSuccess = () => {
    setAlert("Cập nhật thành công");
    setSeverity("success");
  };

  const handleUpdatFailed = () => {
    setAlert("Cập nhật thất bại");
    setSeverity("error");
  };

  const updateStatus = (idQuestion) => {
    updateStatusChatById(idQuestion, updateChatState).then((response) => {
      handleApiResponse(
        response,
        // request success
        (chatResponse) => {
          console.log("status quetion chat ", chatResponse);
          handleUpdateSuccess();
        },
        // request error
        (err) => {
          handleUpdatFailed();
        }
      );
    });
  };

  let j = 0;
  const getChatsNoAnswer = (chatResponse) => {
    chatResponse.forEach((q) => {
      if (q.idFeedback === 0 && !q.status) {
        j = j + 1;
      }
    });
    setNoAnswer(j);
  };

  const getNoAnswer = (courseId) => {
    getChatsByCourseId(courseId).then((response) => {
      handleApiResponse(
        response,
        // success
        (chatResponse) => {
          getChatsNoAnswer(chatResponse);
        }
      );
    });
  };

  //khi phan hoi
  const handleQuestion = (e) => {
    setChatValue(e.target.value);
    e.target.value ? setIsValue(true) : setIsValue(false);
    let value1 = e.target.value;
    setChatNew({ ...chatNew, content: value1, status: true });
  };

  const handleAddChat = () => {
    console.log("chat new: ", chatNew);
    const i = noAnswer - 1;
    insertChat(courseId, chatNew).then((response) => {
      handleApiResponse(
        response,
        // success
        (responseData) => {
          setFeedback([responseData, ...feedback]);
          setStatus(true);
          //giam so cau hoi chua phan hoi 1
          getNoAnswer(courseId);
        }
      );
    });

    //neu la ong tac gia phan hoi thi cap nhat lai trang thai cho cau hoi
    if (currentUser.id === idActor) {
      updateStatus(id);
    }

    //xet rong cho o input khi nguoi dung da submit
    setChatValue("");
  };

  return (
    <Box sx={{ p: "0" }}>
      <Box
        sx={{
          display: "flex",
          gap: "14px",
        }}
      >
        <Box sx={{ overflow: "hidden" }}>
          <Avatar alt={name} src={img} sx={{ width: 40, height: 40 }} />
          <Box
            sx={{
              borderRight: feedback?.length > 0 ? "2px solid #ccc" : "none",
              height: "100%",
              width: "50%",
            }}
          ></Box>
        </Box>

        <Box
          sx={{
            flex: "1",
          }}
        >
          <Box>
            <Box
              sx={{
                bgcolor: "#e2e7e9",
                p: "4px 8px",
                mb: "4px",
                borderRadius: "8px",
              }}
            >
              <Typography
                sx={{
                  color: "#2d2f31",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                {name ? name : "anonymous user"}
              </Typography>
              <Typography
                sx={{
                  color: "#2d2f31",
                }}
              >
                {content}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: { xs: "100%", sm: "50%" },
              }}
            >
              <Typography
                sx={{
                  p: "2px",
                  fontWeight: "500",
                  fontSize: "14px",
                  color: "#b0b2b3",
                }}
              >
                {time}
              </Typography>

              <Button
                sx={{
                  p: "2px",
                  fontWeight: "500",
                  fontSize: "14px",
                  color: "#2d2f31",
                  cursor: "pointer",
                  textTransform: "none",
                }}
                size="small"
              >
                {enjoy} Thích
              </Button>
              {idFeedback === 0 && (
                <Button
                  sx={{
                    p: "2px",
                    fontWeight: "500",
                    fontSize: "14px",
                    color: "#2d2f31",
                    cursor: "pointer",
                    textTransform: "none",
                  }}
                  size="small"
                  onClick={handleFeedback}
                >
                  Phản hồi
                </Button>
              )}
            </Box>
          </Box>
          {idFeedback === 0 && toggleFeed && idCurrentFeed === id && (
            <Box
              sx={{
                display: "flex",
                mb: "12px",
                gap: { xs: "14px", sm: "0px" },
              }}
            >
              <Avatar alt={name} src={img} sx={{ width: 40, height: 40 }} />

              <Box
                sx={{
                  flex: "1",
                }}
              >
                <Search isFocused={isFocused}>
                  <StyledInputBase
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleQuestion}
                    onKeyPress={handleKeyPress}
                    value={chatValue}
                    placeholder="Nhập câu bình luận..."
                    inputProps={{ "aria-label": "search" }}
                  />
                  {isValue && (
                    <Button
                      onClick={handleAddChat}
                      sx={{
                        backgroundColor: "#2d2f31",
                        p: "6px",
                        width: { xs: "60px", sm: "80px" },
                        height: { xs: "34px", sm: "34px" },
                        borderRadius: "20px",
                        position: "absolute",
                        top: "2px",
                        right: "2px",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "#2d2f31 !important",
                          opacity: 0.9,
                        },
                      }}
                    >
                      <NearMeIcon />
                    </Button>
                  )}
                </Search>
              </Box>
            </Box>
          )}
          {feedback?.length > 0 && (
            <Box sx={{ mt: "24px" }}>
              <Grid container spacing={2}>
                {feedback.map((c) => {
                  return (
                    <Grid item xs={12} sx={{ minWidth: "320px" }}>
                      <Chat
                        key={c?.id}
                        id={c?.id}
                        img={c?.user?.avatar}
                        name={c?.user?.firstName + " " + c?.user?.lastName}
                        content={c?.content}
                        time={c?.time}
                        enjoy={c?.enjoy}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          )}
        </Box>
        {isEducator &&
          (status ? (
            <Box>
              <Button
                sx={{ textTransform: "none" }}
                variant="outlined"
                color="success"
              >
                Đã phản hồi
              </Button>
            </Box>
          ) : (
            <Box>
              <Button
                sx={{ textTransform: "none" }}
                variant="outlined"
                color="warning"
              >
                Chưa phản hồi
              </Button>
            </Box>
          ))}
      </Box>
    </Box>
  );
}

export default Chat;
