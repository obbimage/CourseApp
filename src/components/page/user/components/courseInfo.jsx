import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import courseVip1 from "../assets/images/coursevip1.png";
import coursevip2 from "../assets/images/coursevip2.png";

//https://player.vimeo.com/video/938646663?h=be83838d50
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.8rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "#f7f9fa",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function CourseInfo({
  videoActive,
  setVideoActive,
  setUrlVideo,
  setImageVideo,
  isBuy = false,
}) {
  const [expanded, setExpanded] = React.useState(["panel1"]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(
      isExpanded
        ? [...expanded, panel]
        : expanded.filter((item) => item !== panel)
    );
  };

  const handleWatchVideo = (id, urlVideo, courseVip) => {
    if (!isBuy) return;
    setUrlVideo(urlVideo);
    setVideoActive(id);
    setImageVideo(courseVip);
  };

  return (
    <Box>
      <Accordion
        defaultExpanded
        expanded={expanded.includes("panel1")}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography sx={{ color: "#2d2f31", fontWeight: "600" }}>
            Giới thiệu về giảng viên & khoá học
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: "flex",
            flexDirection: "column",
            p: "0",
          }}
        >
          <Box
            onClick={(e) => {
              handleWatchVideo(
                "1",
                "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
                courseVip1
              );
            }}
            sx={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              p: "8px 24px",
              backgroundColor: videoActive === "1" ? "#d1d7dc" : "#fff",
              "&:hover": {
                backgroundColor: "#d1d7dc",
                opacity: 0.8,
              },
              height: "42px",
              cursor: "pointer",
            }}
          >
            <OndemandVideoIcon sx={{ fontSize: "16px" }} />
            <Typography sx={{ fontSize: "14px" }}>About me</Typography>
          </Box>
          <Box
            onClick={(e) => {
              handleWatchVideo(
                "2",
                "https://player.vimeo.com/video/938646663?h=be83838d50",
                coursevip2
              );
            }}
            sx={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              p: "8px 24px",
              backgroundColor: videoActive === "2" ? "#d1d7dc" : "#fff",
              "&:hover": {
                backgroundColor: "#d1d7dc",
                opacity: 0.8,
              },
              height: "42px",
              cursor: "pointer",
            }}
          >
            <OndemandVideoIcon sx={{ fontSize: "16px" }} />
            <Typography sx={{ fontSize: "14px" }}>
              Khoá học này dành cho ai? không dành cho ai?
            </Typography>
          </Box>
          <Box
            onClick={(e) => {
              handleWatchVideo(
                "3",
                "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
                courseVip1
              );
            }}
            sx={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              p: "8px 24px",
              backgroundColor: videoActive === "3" ? "#d1d7dc" : "#fff",
              "&:hover": {
                backgroundColor: "#d1d7dc",
                opacity: 0.8,
              },
              height: "42px",
              cursor: "pointer",
            }}
          >
            <OndemandVideoIcon sx={{ fontSize: "16px" }} />
            <Typography sx={{ fontSize: "14px" }}>
              Nội dung khoá học này bao gồm những gì?
            </Typography>
          </Box>
          <Box
            onClick={(e) => {
              handleWatchVideo(
                "4",
                "https://player.vimeo.com/video/938646663?h=be83838d50",
                coursevip2
              );
            }}
            sx={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              p: "8px 24px",
              backgroundColor: videoActive === "4" ? "#d1d7dc" : "#fff",
              "&:hover": {
                backgroundColor: "#d1d7dc",
                opacity: 0.8,
              },
              height: "42px",
              cursor: "pointer",
            }}
          >
            <OndemandVideoIcon sx={{ fontSize: "16px" }} />
            <Typography sx={{ fontSize: "14px" }}>
              Mục tiêu sau khi kết thúc quá học.
            </Typography>
          </Box>
          <Box
            onClick={(e) => {
              handleWatchVideo(
                "5",
                "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
                courseVip1
              );
            }}
            sx={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              p: "8px 24px",
              backgroundColor: videoActive === "5" ? "#d1d7dc" : "#fff",
              "&:hover": {
                backgroundColor: "#d1d7dc",
                opacity: 0.8,
              },
              height: "42px",
              cursor: "pointer",
            }}
          >
            <OndemandVideoIcon sx={{ fontSize: "16px" }} />
            <Typography sx={{ fontSize: "14px" }}>
              Lưu ý cho các bạn học viên
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded.includes("panel2")}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography sx={{ color: "#2d2f31", fontWeight: "600" }}>
            Giới thiệu về career paths trong lĩnh vực Cloud Computing & AWS
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: "flex",
            flexDirection: "column",
            p: "0",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              p: "8px 24px",
              backgroundColor: videoActive === "1" ? "#d1d7dc" : "#fff",
              "&:hover": {
                backgroundColor: "#d1d7dc",
                opacity: 0.8,
              },
              height: "42px",
              cursor: "pointer",
            }}
          >
            <OndemandVideoIcon sx={{ fontSize: "16px" }} />
            <Typography sx={{ fontSize: "14px" }}>About me</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              p: "8px 24px",
              backgroundColor: videoActive === "1" ? "#d1d7dc" : "#fff",
              "&:hover": {
                backgroundColor: "#d1d7dc",
                opacity: 0.8,
              },
              height: "42px",
              cursor: "pointer",
            }}
          >
            <OndemandVideoIcon sx={{ fontSize: "16px" }} />
            <Typography sx={{ fontSize: "14px" }}>
              Khoá học này dành cho ai? không dành cho ai?
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              p: "8px 24px",
              backgroundColor: videoActive === "1" ? "#d1d7dc" : "#fff",
              "&:hover": {
                backgroundColor: "#d1d7dc",
                opacity: 0.8,
              },
              height: "42px",
              cursor: "pointer",
            }}
          >
            <OndemandVideoIcon sx={{ fontSize: "16px" }} />
            <Typography sx={{ fontSize: "14px" }}>
              Nội dung khoá học này bao gồm những gì?
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              p: "8px 24px",
              backgroundColor: videoActive === "1" ? "#d1d7dc" : "#fff",
              "&:hover": {
                backgroundColor: "#d1d7dc",
                opacity: 0.8,
              },
              height: "42px",
              cursor: "pointer",
            }}
          >
            <OndemandVideoIcon sx={{ fontSize: "16px" }} />
            <Typography sx={{ fontSize: "14px" }}>
              Mục tiêu sau khi kết thúc quá học.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              p: "8px 24px",
              backgroundColor: videoActive === "1" ? "#d1d7dc" : "#fff",
              "&:hover": {
                backgroundColor: "#d1d7dc",
                opacity: 0.8,
              },
              height: "42px",
              cursor: "pointer",
            }}
          >
            <OndemandVideoIcon sx={{ fontSize: "16px" }} />
            <Typography sx={{ fontSize: "14px" }}>
              Lưu ý cho các bạn học viên
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded.includes("panel3")}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography sx={{ color: "#2d2f31", fontWeight: "600" }}>
            Giới thiệu về Cloud Computing
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: "flex",
            flexDirection: "column",
            p: "0",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              p: "8px 24px",
              backgroundColor: videoActive === "1" ? "#d1d7dc" : "#fff",
              "&:hover": {
                backgroundColor: "#d1d7dc",
                opacity: 0.8,
              },
              height: "42px",
              cursor: "pointer",
            }}
          >
            <OndemandVideoIcon sx={{ fontSize: "16px" }} />
            <Typography sx={{ fontSize: "14px" }}>About me</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              p: "8px 24px",
              backgroundColor: videoActive === "1" ? "#d1d7dc" : "#fff",
              "&:hover": {
                backgroundColor: "#d1d7dc",
                opacity: 0.8,
              },
              height: "42px",
              cursor: "pointer",
            }}
          >
            <OndemandVideoIcon sx={{ fontSize: "16px" }} />
            <Typography sx={{ fontSize: "14px" }}>
              Khoá học này dành cho ai? không dành cho ai?
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              p: "8px 24px",
              backgroundColor: videoActive === "1" ? "#d1d7dc" : "#fff",
              "&:hover": {
                backgroundColor: "#d1d7dc",
                opacity: 0.8,
              },
              height: "42px",
              cursor: "pointer",
            }}
          >
            <OndemandVideoIcon sx={{ fontSize: "16px" }} />
            <Typography sx={{ fontSize: "14px" }}>
              Nội dung khoá học này bao gồm những gì?
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              p: "8px 24px",
              backgroundColor: videoActive === "1" ? "#d1d7dc" : "#fff",
              "&:hover": {
                backgroundColor: "#d1d7dc",
                opacity: 0.8,
              },
              height: "42px",
              cursor: "pointer",
            }}
          >
            <OndemandVideoIcon sx={{ fontSize: "16px" }} />
            <Typography sx={{ fontSize: "14px" }}>
              Mục tiêu sau khi kết thúc quá học.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              p: "8px 24px",
              backgroundColor: videoActive === "1" ? "#d1d7dc" : "#fff",
              "&:hover": {
                backgroundColor: "#d1d7dc",
                opacity: 0.8,
              },
              height: "42px",
              cursor: "pointer",
            }}
          >
            <OndemandVideoIcon sx={{ fontSize: "16px" }} />
            <Typography sx={{ fontSize: "14px" }}>
              Lưu ý cho các bạn học viên
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded.includes("panel4")}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography sx={{ color: "#2d2f31", fontWeight: "600" }}>
            Giới thiệu Amazon Web Service (AWS)
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: "flex",
            flexDirection: "column",
            p: "0",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              p: "8px 24px",
              backgroundColor: videoActive === "1" ? "#d1d7dc" : "#fff",
              "&:hover": {
                backgroundColor: "#d1d7dc",
                opacity: 0.8,
              },
              height: "42px",
              cursor: "pointer",
            }}
          >
            <OndemandVideoIcon sx={{ fontSize: "16px" }} />
            <Typography sx={{ fontSize: "14px" }}>About me</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              p: "8px 24px",
              backgroundColor: videoActive === "1" ? "#d1d7dc" : "#fff",
              "&:hover": {
                backgroundColor: "#d1d7dc",
                opacity: 0.8,
              },
              height: "42px",
              cursor: "pointer",
            }}
          >
            <OndemandVideoIcon sx={{ fontSize: "16px" }} />
            <Typography sx={{ fontSize: "14px" }}>
              Khoá học này dành cho ai? không dành cho ai?
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              p: "8px 24px",
              backgroundColor: videoActive === "1" ? "#d1d7dc" : "#fff",
              "&:hover": {
                backgroundColor: "#d1d7dc",
                opacity: 0.8,
              },
              height: "42px",
              cursor: "pointer",
            }}
          >
            <OndemandVideoIcon sx={{ fontSize: "16px" }} />
            <Typography sx={{ fontSize: "14px" }}>
              Nội dung khoá học này bao gồm những gì?
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              p: "8px 24px",
              backgroundColor: videoActive === "1" ? "#d1d7dc" : "#fff",
              "&:hover": {
                backgroundColor: "#d1d7dc",
                opacity: 0.8,
              },
              height: "42px",
              cursor: "pointer",
            }}
          >
            <OndemandVideoIcon sx={{ fontSize: "16px" }} />
            <Typography sx={{ fontSize: "14px" }}>
              Mục tiêu sau khi kết thúc quá học.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              p: "8px 24px",
              backgroundColor: videoActive === "1" ? "#d1d7dc" : "#fff",
              "&:hover": {
                backgroundColor: "#d1d7dc",
                opacity: 0.8,
              },
              height: "42px",
              cursor: "pointer",
            }}
          >
            <OndemandVideoIcon sx={{ fontSize: "16px" }} />
            <Typography sx={{ fontSize: "14px" }}>
              Lưu ý cho các bạn học viên
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded.includes("panel5")}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography sx={{ color: "#2d2f31", fontWeight: "600" }}>
            Đăng ký tài khoản AWS, setup ban đầu.
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              p: "8px 24px",
              backgroundColor: videoActive === "1" ? "#d1d7dc" : "#fff",
              "&:hover": {
                backgroundColor: "#d1d7dc",
                opacity: 0.8,
              },
              height: "42px",
              cursor: "pointer",
            }}
          >
            <OndemandVideoIcon sx={{ fontSize: "16px" }} />
            <Typography sx={{ fontSize: "14px" }}>About me</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              p: "8px 24px",
              backgroundColor: videoActive === "1" ? "#d1d7dc" : "#fff",
              "&:hover": {
                backgroundColor: "#d1d7dc",
                opacity: 0.8,
              },
              height: "42px",
              cursor: "pointer",
            }}
          >
            <OndemandVideoIcon sx={{ fontSize: "16px" }} />
            <Typography sx={{ fontSize: "14px" }}>
              Khoá học này dành cho ai? không dành cho ai?
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              p: "8px 24px",
              backgroundColor: videoActive === "1" ? "#d1d7dc" : "#fff",
              "&:hover": {
                backgroundColor: "#d1d7dc",
                opacity: 0.8,
              },
              height: "42px",
              cursor: "pointer",
            }}
          >
            <OndemandVideoIcon sx={{ fontSize: "16px" }} />
            <Typography sx={{ fontSize: "14px" }}>
              Nội dung khoá học này bao gồm những gì?
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              p: "8px 24px",
              backgroundColor: videoActive === "1" ? "#d1d7dc" : "#fff",
              "&:hover": {
                backgroundColor: "#d1d7dc",
                opacity: 0.8,
              },
              height: "42px",
              cursor: "pointer",
            }}
          >
            <OndemandVideoIcon sx={{ fontSize: "16px" }} />
            <Typography sx={{ fontSize: "14px" }}>
              Mục tiêu sau khi kết thúc quá học.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              p: "8px 24px",
              backgroundColor: videoActive === "1" ? "#d1d7dc" : "#fff",
              "&:hover": {
                backgroundColor: "#d1d7dc",
                opacity: 0.8,
              },
              height: "42px",
              cursor: "pointer",
            }}
          >
            <OndemandVideoIcon sx={{ fontSize: "16px" }} />
            <Typography sx={{ fontSize: "14px" }}>
              Lưu ý cho các bạn học viên
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default CourseInfo;
