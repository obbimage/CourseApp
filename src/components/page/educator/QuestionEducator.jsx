import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { grey } from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

import {
  Button,
  FormControl,
  Icon,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  styled,
} from "@mui/material";
import theme from "../../../theme";
import React, { useContext, useEffect, useState } from "react";
import { findeEducators, getAllEducator } from "../../../api/auth";
import LayoutAdmin, { LayoutContentAdmin } from "../admin/layout/LayoutAdmin";
import { getCourseByUserId } from "../../../api/course";
import { CurrentUserContext } from "../../../App";
import QuestionItem from "./QuestionItem";
import { handleApiResponse } from "../../../api/instance";
import { isObjEmpty } from "../../../util/object";
import { getChatsByCourseId } from "../../../api/chat";

const colorGrey = grey[200];
const ButtonAction = styled(Button)({
  padding: 0,
  minWidth: "30px",
  height: "30px",
  marginLeft: theme.spacing(2),
});

function RowMoreInfoEducator({
  open,
  value,
  numberQuestion,
  setNumberQuestion,
  noAnswer,
  setNoAnswer,
}) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [user, setUser] = useState(value);
  const [educator, setEducator] = useState({});

  useEffect(() => {
    setUser(value);
    setEducator(value.educator);
  }, [value]);

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <QuestionItem
        courseId={value?.id}
        currentUser={currentUser}
        idActor={value?.user?.id}
        numberQuestion={numberQuestion}
        setNumberQuestion={setNumberQuestion}
        noAnswer={noAnswer}
        setNoAnswer={setNoAnswer}
      />
    </Collapse>
  );
}
function Row({ value }) {
  const [user, setUser] = useState(value);
  const [educator, setEducator] = useState({});
  const [open, setOpen] = useState(false);
  const [numberQuestion, setNumberQuestion] = useState(0);
  const [noAnswer, setNoAnswer] = useState(0);

  const [questions, setQuestions] = useState([]); //danh sach cau hoi

  //chi lay danh sach cau hoi
  let i = 0;
  let j = 0;
  const getChatsQuestion = (chatResponse) => {
    chatResponse.forEach((q) => {
      if (q.idFeedback === 0) {
        i = i + 1;
        setQuestions((prevQuestions) => [q, ...prevQuestions]);
        if (!q.status) j = j + 1;
      }
    });
    setNumberQuestion(i);
    setNoAnswer(j);
  };

  let courseId = value.id;
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const getAllChatById = (courseId) => {
    // lấy tat ca danh sách cuoc tro chuyen cua khoa hoc do
    getChatsByCourseId(courseId).then((response) => {
      handleApiResponse(
        response,
        // success
        (chatResponse) => {
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

  useEffect(() => {
    setUser(value);
    setEducator(value.educator);
  }, [value]);

  const handleToggleOpenRow = () => setOpen(!open);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {value?.id}
        </TableCell>
        <TableCell align="left">{value?.name}</TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left">{numberQuestion}</TableCell>
        <TableCell align="left">{noAnswer}</TableCell>
        <TableCell align="left">
          <ButtonAction
            onClick={handleToggleOpenRow}
            color={!open ? "secondary" : "error"}
          >
            {open ? <CloseIcon /> : <VisibilityOutlinedIcon />}
          </ButtonAction>
          <ButtonAction>
            <EditIcon />
          </ButtonAction>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <RowMoreInfoEducator
            open={open}
            value={user}
            numberQuestion={numberQuestion}
            setNumberQuestion={setNumberQuestion}
            noAnswer={noAnswer}
            setNoAnswer={setNoAnswer}
          />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function InputSearch({ placeholder, sx, onChange, onClickSearch }) {
  const handleChange = (e) => {
    let value = e.target.value;
    if (onChange) {
      onChange(value);
    }
  };
  const handleClickButton = () => {
    if (onClickSearch) {
      onClickSearch();
    }
  };
  return (
    <FormControl>
      <OutlinedInput
        onChange={handleChange}
        sx={{
          height: theme.spacing(5),
          ...sx,
        }}
        placeholder={placeholder || "Tìm kiếm"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleClickButton}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

function SortBySelect({ onChange }) {
  const [value, setValue] = useState("");

  const handleOnChange = (e) => {
    let valueItem = e.target.value;
    setValue(valueItem);
    if (onChange) {
      onChange(valueItem);
    }
  };
  return (
    <FormControl>
      <InputLabel
        sx={{
          overflow: "visible",
          lineHeight: "0.4370em",
          "&.Mui-focused": {
            lineHeight: "1.436em",
          },
        }}
        id="sort-by-label"
      >
        Sort by
      </InputLabel>
      <Select
        labelId="sort-by-label"
        id="sort-by-label"
        label="Sort by"
        sx={{
          height: theme.spacing(5),
          width: theme.spacing(20),
        }}
        onChange={handleOnChange}
        value={value}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={"id"}>ID</MenuItem>
        <MenuItem value={"lastName"}>name</MenuItem>
        <MenuItem value={"phone"}>Phone</MenuItem>
        {/* <MenuItem value={'course total'}>Course total</MenuItem> */}
      </Select>
    </FormControl>
  );
}

export default function QuestionEducator() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [courses, setCourses] = useState([]);
  const [coursesOrgin, setcoursesOrigin] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [pageTotal, setPageTotal] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);

  const [search, setSearch] = useState("");

  useEffect(() => {
    getCourseByUserId(currentUser.id).then((response) => {
      handleApiResponse(response, (coursesResponse) => {
        setCourses(coursesResponse);
      });
    });
  }, [currentUser.id]);

  useEffect(() => {
    if (!sortBy) {
      setCourses([...coursesOrgin]);
    } else {
      console.log(sortBy);
      let newValue = handleSortBy([...coursesOrgin]);
      setCourses(newValue);
    }
  }, [sortBy]);

  const handleNumberPage = (e, page) => {
    setPageNumber(page - 1);
  };

  // get key sort by
  const handleSortByKey = (key) => {
    setSortBy(key);
  };
  // get key when you have the key
  const handleSortBy = (value) => {
    let reslut = value.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return -1;
      }
      if (a[sortBy] > b[sortBy]) {
        return 1;
      }
      return 0;
    });
    return reslut;
  };

  const handleChangeSearch = (value) => {
    setSearch(value);
  };
  const handleClickButtonSearch = () => {
    findeEducators(search, pageNumber, pageSize).then((response) => {
      handleApiResponse(
        response,
        // success
        (response) => {
          console.log(response);
        }
      );
    });
  };
  return (
    <LayoutAdmin>
      <LayoutContentAdmin
        sx={{
          backgroundColor: "inherit",
          marginTop: 0,
          paddingTop: theme.spacing(2),
        }}
      >
        <Typography variant="h5" fontWeight={"500"}>
          List Question
        </Typography>
      </LayoutContentAdmin>
      <LayoutContentAdmin>
        <Box sx={{ padding: theme.spacing(2), display: "flex" }}>
          <InputSearch
            sx={{ marginRight: theme.spacing(2) }}
            placeholder={"Id, Name, Phone"}
            onClickSearch={handleClickButtonSearch}
            onChange={handleChangeSearch}
          />
          <SortBySelect onChange={handleSortByKey} />
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow sx={{ backgroundColor: colorGrey }}>
                <TableCell align="left" sx={{ width: theme.spacing(10) }}>
                  ID
                </TableCell>
                <TableCell align="left">Name course</TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left">number question</TableCell>
                <TableCell align="left">not answered</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => {
                return <Row value={course} key={course.id} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <Divider/> */}
        <Box sx={{ padding: theme.spacing(2), display: "flex" }}>
          <Pagination
            count={pageTotal}
            variant="outlined"
            shape="rounded"
            onChange={handleNumberPage}
          />
        </Box>
      </LayoutContentAdmin>
    </LayoutAdmin>
  );
}
