import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Button, Chip, Link, Typography, useTheme } from "@mui/material";
import EditNavbarCourse from "./NavEditbarCourse";
import Intended from "./editCourses/Intended";
import { Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CourseContext } from "../../../provider/CourseProvider";
import { getStorageCourseId } from "../../../util/localStorage";
import { getCourseById } from "../../../api/course";
import { handleApiResponse } from "../../../api/instance";

export default function EditCourse() {
  const theme = useTheme();

  const { courseProvider, setCourseProvider } = useContext(CourseContext);
  const [course, setCourse] = useState({});

  useEffect(() => {
    const idCourse = getStorageCourseId();

    if (idCourse !== null) {
      getCourseById(idCourse).then((response) => {
        handleApiResponse(
          response,
          //success
          (data) => {
            setCourseProvider(data);
            setCourse(data);
          }
        );
      });
    }
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      {/* header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: "0",
          left: "0",
          right: "0",
          zIndex: 1,
          padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link href="/educator/course">
            <Button
              sx={{
                marginRight: theme.spacing(0.5),
                textTransform: "none",
                boxShadow: "none",
              }}
              variant="contained"
              startIcon={<ArrowBackIosNewIcon />}
            >
              <Typography variant="body1">Quay lại khóa học</Typography>
            </Button>
          </Link>
          <Chip
            variant="contained"
            color={course.complete ? "success" : "error"}
            label={course.complete ? "Đã xuất bản" : "Bản nháp"}
          />
          <Typography sx={{ color: "white", margin: theme.spacing(0, 1) }}>
            {courseProvider.name}
          </Typography>
        </Box>
        <Link
          sx={{
            color: theme.palette.primary.contrastText,
            boxShadow: "none",
            cursor: "pointer",
          }}
          href="edit/setting"
        >
          <SettingsIcon />
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: theme.spacing(5, 2),
        }}
      >
        <EditNavbarCourse
          courseId={course.id}
          isCourseConfirm={course.confirm}
        />
        <Outlet />
      </Box>
      <Box></Box>
    </Box>
  );
}
