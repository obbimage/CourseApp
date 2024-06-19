import CircleIcon from "@mui/icons-material/Circle";
import NearMeIcon from "@mui/icons-material/NearMe";
import StarIcon from "@mui/icons-material/Star";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Rating,
  Typography,
  ratingClasses,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import Tab from "@mui/material/Tab";
import { alpha, styled } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";

import { handleApiResponse } from "../../../../api/instance";

import Chat from "./chat";
import * as React from "react";

import { getChatsByCourseId, insertChat } from "../../../../api/chat";
import { isObjEmpty } from "../../../../util/object";

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

function QuestionCourse({ courseId, currentUser, idActor }) {
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

  useEffect(() => {
    if (!isObjEmpty(currentUser)) {
      //chi lay danh sach cau hoi
      const getChatsQuestion = (chatResponse) => {
        chatResponse.forEach((q) => {
          if (q.idFeedback === 0) {
            setQuestions((prevQuestions) => [q, ...prevQuestions]);
          }
        });
      };

      // lấy tat ca danh sách cuoc tro chuyen cua khoa hoc do
      getChatsByCourseId(courseId).then((response) => {
        handleApiResponse(
          response,
          // success
          (chatResponse) => {
            setChat(chatResponse);
            getChatsQuestion(chatResponse);
            console.log("chat response: ", chatResponse);
          }
        );
      });
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

    insertChat(courseId, chatNew).then((response) => {
      handleApiResponse(
        response,
        // success
        (responseData) => {
          console.log("inser chat success:", responseData);
          setQuestions([responseData, ...questions]);
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
          mb: "24px",
        }}
      >
        <Typography
          sx={{
            color: "#2d2f31",
            fontSize: { sm: "24px" },
            fontWeight: "700",
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
                  courseId={courseId}
                  idActor={idActor}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}

export default QuestionCourse;
