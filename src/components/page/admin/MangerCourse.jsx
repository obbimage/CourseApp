import { Box, Grid, TextField } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CardCourse from "./layout/CardCourse";
import LayoutAdmin, {
  LayoutContentAdmin,
  LayoutHeaderAdmin,
} from "./layout/LayoutAdmin";
import { useEffect, useState } from "react";
import {
  getAllCourseNew,
  getCoursesByComplete,
  getCoursesByConfirm,
} from "../../../api/course";
import { handleApiResponse } from "../../../api/instance";

export default function MangerCourse() {
  const [course2, setCourse2] = useState([]);
  const [course1, setCourse1] = useState([]);
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getCoursesByComplete(true).then((response) => {
      handleApiResponse(
        response,
        // success
        (courseResponse) => {
          console.log(courseResponse);
          setCourse1(courseResponse);
        }
      );
    });

    getCoursesByConfirm(true).then((response) => {
      handleApiResponse(
        response,
        // success
        (courseResponse) => {
          console.log(courseResponse);
          setCourse2(courseResponse);
        }
      );
    });
  }, []);

  return (
    <LayoutAdmin>
      <LayoutHeaderAdmin>XÉT DUYỆT KHÓA HỌC</LayoutHeaderAdmin>
      <LayoutContentAdmin>
        <Box>
          <TextField label="Tìm kiếm khóa học" />
        </Box>
      </LayoutContentAdmin>
      <LayoutContentAdmin>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Khóa học chưa duyệt" value="1" />
                <Tab label="Khóa học đã duyệt" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Grid container spacing={2}>
                {course1.map((course) => {
                  return (
                    <Grid
                      key={course.id}
                      item
                      xs={4}
                      sm={6}
                      lg={3}
                      sx={{ minWidth: "320px" }}
                    >
                      <CardCourse course={course} />
                    </Grid>
                  );
                })}
                {/* {
                        courses.map((course) => {
                            return (
                                <Grid key={course.id} item xs={3} sm={6} lg={3} sx={{ minWidth: "320px" }}>
                                    <CardCourse course={course} />
                                </Grid>
                            );
                        })
                    } */}
              </Grid>
            </TabPanel>
            <TabPanel value="2">
              <Grid container spacing={2}>
                {course2.map((course) => {
                  return (
                    <Grid
                      key={course.id}
                      item
                      xs={4}
                      sm={6}
                      lg={3}
                      sx={{ minWidth: "320px" }}
                    >
                      <CardCourse course={course} />
                    </Grid>
                  );
                })}
                {/* {
                        courses.map((course) => {
                            return (
                                <Grid key={course.id} item xs={3} sm={6} lg={3} sx={{ minWidth: "320px" }}>
                                    <CardCourse course={course} />
                                </Grid>
                            );
                        })
                    } */}
              </Grid>
            </TabPanel>
          </TabContext>
        </Box>
      </LayoutContentAdmin>
    </LayoutAdmin>
  );
}
