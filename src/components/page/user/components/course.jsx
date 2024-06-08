import { Box, Button, Typography } from "@mui/material";
import ImageCustom from "./imageCustom";
import { Link } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import courseVip1 from "../assets/images/coursevip1.png";
import iconVip from "../assets/images/vip.svg";
import { useEffect, useState } from "react";
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
function Course({ isPrice, isStuded, value }) {
  const [isHovered, setIsHovered] = useState(false);

  const [course, setCourse] = useState({});

  useEffect(() => {
    if (value) {
      setCourse(value);
    }
  }, [value]);

  return (
    <Box
      component={Link}
      to={`/course/id?course_id=${course.id}`}
      sx={{ display: "block", textDecoration: "none", mb: "20px" }}
    >
      <Box
        sx={{ position: "relative", width: "100%" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Box
          sx={{
            backgroundColor: "rgba(0, 0, 0, .3)",
            width: "28px",
            height: "28px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "8px",
            position: "absolute",
            top: "12px",
            left: "12px",
          }}
        >
          <ImageCustom
            src={iconVip}
            alt="vip icon"
            sx={{
              width: "16px",
              height: "16px",
            }}
          />
        </Box>
        <ImageCustom
          // src={courseVip1}
          src={course?.img}
          alt="courseVip1"
          sx={{
            display: "block",
            width: "100%",
            height: "100%",
            borderRadius: "16px",
          }}
        />

        {isHovered && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, .5)",
              borderRadius: "16px",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                bottom: "50%" /* Điểm xuất phát là dưới cùng của item */,
                left: "50%" /* Điểm xuất phát là giữa của item */,
                transform:
                  "translate(-50%, 50%)" /* Di chuyển lên trên và đến giữa */,
                backgroundColor: "#fff",
                borderColor: "#fff",
                color: "#000",
                padding: "6px 16px",
                width: "max-content",
                borderRadius: "99px",
                transition: "transform 0.3s ease" /* Hiệu ứng di chuyển */,
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px !important",
                  fontWeight: "500 !important",
                }}
              >
                Xem khóa học
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      <Typography
        sx={{
          color: "#292929",
          fontSize: "16px",
          lineHeight: "16px",
          fontWeight: "500",
          mt: "14px",
        }}
      >
        {course?.name}
      </Typography>
      <Box sx={{  height: '20px' ,display:'flex', alignItems:'center'}}>
        <QueryBuilderIcon sx={{height:'90%'}} />
        <Typography sx={{ fontSize: '13px', fontWeight: '1px' }}>
          {course?.dateUpload}
        </Typography>
      </Box>
      {isPrice && (
        <Box
          sx={{ display: "flex", alignItems: "end", gap: "12px", mt: "12px" }}
        >
          {/* giá gốc */}
          {/* <Typography
            sx={{
              fontSize: "14px",
              color: "#000",
              textDecoration: "line-through",
            }}
          >
            2.500.000đ
          </Typography> */}
          {/* Giá giảm */}
          <Typography
            sx={{
              fontSize: "16px",
              color: "#f05123",
              fontWeight: "500",
            }}
          >
            {course.price}
          </Typography>
        </Box>
      )}

      {isStuded && (
        <Box
          sx={{
            display: "flex",
            alignItems: "end",
            gap: "12px",
            mt: "16px",
            color: "#666",
          }}
        >
          <GroupIcon />
          <Typography sx={{ fontSize: "14px" }}>126.074</Typography>
        </Box>
      )}
    </Box>
  );
}

export default Course;
