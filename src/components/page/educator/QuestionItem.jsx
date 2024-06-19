import NearMeIcon from "@mui/icons-material/NearMe";
import { Box, Button, Grid, Typography } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import { useEffect, useState } from "react";

import * as React from "react";
import { isObjEmpty } from "../../../util/object";
import { getChatsByCourseId, insertChat } from "../../../api/chat";
import { handleApiResponse } from "../../../api/instance";
import Chat from "../user/components/chat";

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

function QuestionItem({
  courseId,
  currentUser,
  idActor,
  numberQuestion,
  setNumberQuestion,
  noAnswer,
  setNoAnswer,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isValue, setIsValue] = useState(false);
  const [chatValue, setChatValue] = useState("");

  const [chats, setChat] = useState([]); //danh sach tro chuyen
  const [questions, setQuestions] = useState([]); //danh sach cau hoi

  const [chatNew, setChatNew] = useState({
    time: "1 giay truoc",
    enjoy: 0,
    idFeedback: 0,
    status: false,
  });

  //chi lay danh sach cau hoi
  const getChatsQuestion = (chatResponse) => {
    chatResponse.forEach((q) => {
      if (q.idFeedback === 0) {
        setQuestions((prevQuestions) => [q, ...prevQuestions]);
      }
    });
  };

  const getAllChatById = (courseId) => {
    // lấy tat ca danh sách cuoc tro chuyen cua khoa hoc do
    getChatsByCourseId(courseId).then((response) => {
      handleApiResponse(
        response,
        // success
        (chatResponse) => {
          setChat(chatResponse);
          getChatsQuestion(chatResponse);
        }
      );
    });
  };

  useEffect(() => {
    if (!isObjEmpty(currentUser)) {
      getAllChatById(courseId);
    }
  }, [courseId]);

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

  const handleQuestion = (e) => {
    setChatValue(e.target.value);
    e.target.value ? setIsValue(true) : setIsValue(false);
    let value1 = e.target.value;
    setChatNew({ ...chatNew, content: value1 });
  };

  const handleAddChat = () => {
    console.log("chat new: ", chatNew);
    console.log(noAnswer);
    const i = numberQuestion + 1;
    const j = noAnswer + 1;
    insertChat(courseId, chatNew).then((response) => {
      handleApiResponse(
        response,
        // success
        (responseData) => {
          console.log("inser chat success:", responseData);
          setQuestions([responseData, ...questions]);
          //tang so cau hoi len 1 don vi
          setNumberQuestion(i);
          setNoAnswer(j);
        }
      );
    });
    setChatValue("");
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          m: "12px 0",
        }}
      >
        <Typography
          sx={{
            color: "#2d2f31",
            fontSize: { sm: "18px" },
            fontWeight: "600",
          }}
        >
          Trao đổi giữa giảng viên và học viên
        </Typography>
      </Box>
      <Search isFocused={isFocused}>
        <StyledInputBase
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleQuestion}
          onKeyPress={handleKeyPress}
          value={chatValue}
          placeholder="Nhập câu hỏi cần giải đáp..."
          inputProps={{ "aria-label": "search" }}
        />
        {isValue && (
          <Button
            onClick={handleAddChat}
            sx={{
              backgroundColor: "#2d2f31",
              p: "6px",
              width: "80px",
              height: "34px",
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

      <Box sx={{ mt: "24px" }}>
        <Grid container spacing={2}>
          {questions.map((c) => {
            return (
              <Grid item xs={12} sx={{ minWidth: "320px" }}>
                <Chat
                  key={c?.id}
                  id={c?.id}
                  idUser={c?.user?.id}
                  img={c?.user?.avatar}
                  name={c?.user?.firstName + " " + c?.user?.lastName}
                  content={c?.content}
                  time={c?.time}
                  enjoy={c?.enjoy}
                  idFeedback={c?.idFeedback}
                  statusChat={c?.status}
                  courseId={courseId}
                  isEducator={true}
                  idActor={idActor}
                  noAnswer={noAnswer}
                  setNoAnswer={setNoAnswer}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}

export default QuestionItem;
