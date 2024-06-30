import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
  useTheme,
} from "@mui/material";
import Search from "../../layouts/Search";
import { DropDownMenu } from "../../layouts/DropDownMenu";
import CardCourse from "./CardCourse";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { findAllCourseByName, getCourseByUserId } from "../../../api/course";
import { CurrentUserContext } from "../../../App";
import { handleApiResponse } from "../../../api/instance";
import theme from "../../../theme";
import SearchIcon from "@mui/icons-material/Search";

function itemSelectMenu(id, name) {
  return { id, name };
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

export default function EducatorCourse() {
  // context
  const theme = useTheme();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const [courses, setCourses] = useState([]);
  const [sort, setSort] = useState("");
  const [pageSize, setPageSize] = useState(100);
  const [pageNumber, setPageNumber] = useState(0);
  const [courseName, setCourseName] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getCourseByUserId(currentUser.id).then((response) => {
      handleApiResponse(response, (coursesResponse) => {
        setCourses(coursesResponse);
      });
    });
  }, [currentUser.id]);

  const handleSelectSort = (value) => {
    setSort(value);
  };

  const handleChangeSearch = (value) => {
    setSearch(value);
  };
  const handleClickButtonSearch = () => {
    setCourseName(search);
  };

  useEffect(() => {
    if (courseName) {
      findAllCourseByName(courseName, pageNumber, pageSize).then((response) => {
        handleApiResponse(response, (dataResponse) => {
          let coursesResponse = dataResponse.content;
          console.log(coursesResponse);
          setCourses(coursesResponse);
        });
      });
    }
  }, [courseName]);

  return (
    <Box
      sx={{
        margin: "10px 40px",
      }}
    >
      <Typography
        sx={{
          fontSize: theme.spacing(4),
          fontWeight: "600",
        }}
      >
        Khóa học
      </Typography>
      {/* tìm kiếm và tạo khóa học */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 0px 20px  ",
          height: "50px",
        }}
      >
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Box sx={{ padding: theme.spacing(2), display: "flex" }}>
            <InputSearch
              sx={{ marginRight: theme.spacing(2) }}
              placeholder={"Name course..."}
              onClickSearch={handleClickButtonSearch}
              onChange={handleChangeSearch}
            />
          </Box>
        </Box>
        <Link to="create" sx={{ height: "100%" }}>
          <Button sx={{ height: "100%" }} variant="contained">
            Khóa học mới
          </Button>
        </Link>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          margin: "0 -10px",
        }}
      >
        {courses.map((course) => {
          return (
            <Box key={course.id} sx={{ margin: "15px", width: "300px" }}>
              {/* <Link to="edit"> */}
              <CardCourse course={course} />
              {/* </Link> */}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
