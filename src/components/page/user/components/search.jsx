import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import NearMeIcon from "@mui/icons-material/NearMe";
import { Box, Button, IconButton, Input, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { findAllCourseByName } from "../../../../api/course";
import { handleApiRequest, handleApiResponse } from "../../../../api/instance";
import CourseList from "./courseList";
const ariaLabel = { "aria-label": "description" };

function Search() {
  const [courseName, setCourseName] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValue, setIsValue] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [courses, setCourses] = useState([]);
  const location = useLocation();

  const [pageNumber, setPageNumber] = useState(0);
  const pageSize = 5;

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    e.target.value ? setIsValue(true) : setIsValue(false);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const courseNameParam = searchParams.get("course-name");
    setCourseName(courseNameParam);

    courseName === "" || courseName === null
      ? setIsSearch(false)
      : setIsSearch(true);
  }, [courseName, location.search]);

  useEffect(() => {
    if (courseName) {
      findAllCourseByName(courseName, pageNumber, pageSize)
        .then(response => {
          handleApiResponse(response,
            (dataResponse) => {
              let coursesResponse = dataResponse.content;
              setCourses(coursesResponse);
            }
          )
        });
    }

  }, [courseName]);
  return (
    <Box sx={{ mt: "20px", minHeight: { xs: "770px", sm: "620px" } }}>
      <Box
        sx={{
          display: { xs: "block", sm: "flex" },
          alignItems: "center",
        }}
      >
        <Button
          sx={{ display: { xs: "none", sm: "flex" } }}
          component={Link}
          to="/"
        >
          <KeyboardArrowLeftIcon /> Quay lại
        </Button>
        {isSearch ? (
          <Box sx={{ padding: "0 16px" }}>
            <Typography sx={{ color: "#0000008a" }}>
              Kết quả cho '{courseName}'
            </Typography>
          </Box>
        ) : (
          <Box sx={{ padding: "0 16px" }}>
            <Typography sx={{ color: "#0000008a" }}>
              Vui lòng nhập từ khóa tìm kiếm!
            </Typography>
          </Box>
        )}
      </Box>
      <Box
        component="form"
        sx={{
          p: "10px 16px",
          display: { xs: "block", sm: "none" },
          position: "relative",
        }}
        noValidate
        autoComplete="off"
      >
        <Input
          sx={{
            width: "100%",
          }}
          onChange={handleSearch}
          placeholder="Tìm kiếm..."
          inputProps={ariaLabel}
        />
        {isValue && (
          <IconButton
            component={Link}
            to={`/search?course-name=${searchValue}`}
            sx={{
              cursor: "pointer",
              p: "6px",
              position: "absolute",
              top: "4px",
              right: "16px",
              color: "#000",
            }}
          >
            <NearMeIcon />
          </IconButton>
        )}
      </Box>

      {isSearch &&
        (isLoading ? (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              mt: "24px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <CourseList
            isNew={false}
            title={"Khóa học"}
            isPrice={true}
            isStuded={true}
            value={courses}
          />
        ))}
    </Box>
  );
}

export default Search;
