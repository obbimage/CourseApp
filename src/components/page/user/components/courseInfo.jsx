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
import { getSectionByUnitId } from "../../../../api/section";
import { handleApiResponse } from "../../../../api/instance";

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

function Section({
  unitId,
  videoActive,
  setVideoActive,
  setUrlVideo,
  setImageVideo,
  isBuy = false,
}) {

  const [unitIdState, setUnitIdState] = React.useState(unitId);
  const [sections, setSections] = React.useState([]);


  React.useEffect(() => {
    getSectionByUnitId(unitId)
      .then(response => {
        handleApiResponse(response,
          // success
          (sectionsResponse) => {
            setSections(sectionsResponse);
          }
        )
      })
  }, [unitIdState]);

  const handleWatchVideo = (id, urlVideo, courseVip) => {
    if (!isBuy) return;
    // if (setUrlVideo) {
    setUrlVideo(urlVideo);
    // }
    // if (setVideoActive) {
    setVideoActive(id);
    // }
    // if (setImageVideo) {
    setImageVideo(courseVip);
    // }
  };
  return (
    <AccordionDetails
      sx={{
        display: "flex",
        flexDirection: "column",
        p: "0",
      }}
    >
      {
        sections.map(section => {
          return (
            <Box key = {section.id}
              onClick={(e) => {
                handleWatchVideo(
                  section.numberSection,
                  section.urlVideo,
                  courseVip1
                );
              }}
              sx={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                p: "8px 24px",
                backgroundColor: videoActive === section.numberSection ? "#d1d7dc" : "#fff",
                "&:hover": {
                  backgroundColor: "#d1d7dc",
                  opacity: 0.8,
                },
                height: "42px",
                cursor: "pointer",
              }}
            >
              <OndemandVideoIcon sx={{ fontSize: "16px" }} />
              <Typography sx={{ fontSize: "14px" }}>{section?.title}</Typography>
            </Box>
          );
        })
      }
    </AccordionDetails>
  )
}

function CourseInfo({
  value,
  videoActive,
  setVideoActive,
  setUrlVideo,
  setImageVideo,
  isBuy = false,
}) {
  const [expanded, setExpanded] = React.useState(["panel1"]);

  const [units, setUnits] = React.useState([]);

  React.useEffect(() => {
    if (value)
      setUnits(value);
  }, [value]);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(
      isExpanded
        ? [...expanded, panel]
        : expanded.filter((item) => item !== panel)
    );
  };

  const handleUrlVideo = (url) => {
    console.log(url);
    if (setUrlVideo) {
      setUrlVideo(url)
    }
  }

  return (
    <Box>
      {
        units.map((unit, index) => {
          return (
            <Accordion
              key={unit.id}
              defaultExpanded
              expanded={expanded.includes(`panel${index + 1}`)}
              onChange={handleChange(`panel${index + 1}`)}
            >
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography sx={{ color: "#2d2f31", fontWeight: "600" }}>
                  {unit.title}
                </Typography>
              </AccordionSummary>
              <Section
                unitId={unit.id}
                videoActive={videoActive}
                setVideoActive={setVideoActive}
                setUrlVideo={handleUrlVideo}
                setImageVideo={setImageVideo}
                isBuy={isBuy}
              />

            </Accordion>
          );
        })
      }
    </Box>
  );
}

export default CourseInfo;
