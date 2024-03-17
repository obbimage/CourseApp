import { Box, Button, Divider, FormControl, InputBase, InputLabel, Paper, TextareaAutosize, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { alpha, styled, useTheme } from '@mui/material/styles';
import AvatarLetter from "../../layouts/AvatarLetter";
import Cover from "../../layouts/imgComponents/Cover";
import { stringToColor } from "../../../js/String";



const PaperContain = styled(Paper)
  (({ theme }) => ({
    width: '100%',
    height: '100%',
    padding: '20px 5px',
  }));

const InfoTotal = () => {
  const theme = useTheme();
  const InfoBox = ({ text }) => {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        height: theme.spacing(8),
        alignItems: 'center',
        padding: `0 ${theme.spacing(2)}`,
      }}>
        <Typography sx={{
          fontWeight: '450'
        }}>{text}</Typography>
        <Typography sx={{
          color: stringToColor(text),
          fontWeight: '900',
          fontSize: '25px'
        }}>0</Typography>
      </Box>
    )
  }

  const sizeAvatar = "100px";
  return (
    <PaperContain sx={{
      maxWidth: '500px'
    }} >
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: theme.spacing(2) }}>
        <Box sx={{ width: sizeAvatar, height: sizeAvatar, margin: 'auto' }}>
          <AvatarLetter name="Sinh Tiến" />
        </Box>
        <Typography sx={{ marginTop: '3px' }} textAlign='center'>Id:1234567</Typography>
        <Typography sx={{ marginTop: '2px' }} textAlign='center'>User name: sinhtienit</Typography>
      </Box>
      <Divider />
      <InfoBox text="Khóa học đã tạo: " />
      <Divider />
      <InfoBox text="Khóa học đã bán: " />
      <Divider />
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px'
      }}>
        <Button
          sx={{
            width: '70%',
            height: '50px'
          }}
          variant="outlined">
          Đổi mật khẩu
        </Button>
      </Box>
    </PaperContain>
  )
}

const Input = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    fontSize: 16,
    padding: '10px 12px',
    height: '30px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const CustomeTextField = ({ label }) => {
  return (
    <FormControl sx={{ width: '100%' }} variant="standard">
      <InputLabel sx={{ fontSize: '22px' }} shrink htmlFor="name-input">
        {label}
      </InputLabel>
      <Input defaultValue="" id="name-input" />
    </FormControl>

  )
}

const DescriptionWrap = ({ children }) => {

  return (
    <Grid container spacing={5}>
      {children.map((item, index) => {
        return (
          <Grid xs={6} key={index}>
            {item}
          </Grid>
        )
      })}
    </Grid>
  )
}


export default function EducatorProfile() {
  const theme = useTheme();

  return (
    <Box flexGrow={1}>
      <Box width='100%' height='200px' >
        {/* ảnh cover đầu trang */}
        <Cover />
      </Box>
      <Box flexGrow={1} sx={{
        display: "flex",
        justifyContent: 'center',
        position: 'relative',
        top: '-100px',
        margin: `2px ${theme.spacing(4)}`
      }}>
        <Grid container spacing={1} sx={{
          width: '1700px'
        }}>
          {/* Thông tin bên trái */}
          <Grid xs={4}>
            <InfoTotal />
          </Grid>
          {/* Thông tin bên phải */}
          <Grid xs={8}>
            <PaperContain sx={{
              maxWidth: '1100px'
            }}>
              <Box sx={{
                padding: '20px 50px'
              }}>
                <DescriptionWrap>
                  <CustomeTextField label="Họ" />
                  <CustomeTextField label="Tên" />
                </DescriptionWrap>
                <DescriptionWrap>
                  <CustomeTextField label="Số điện thoại" />
                  <CustomeTextField label="Email" />
                </DescriptionWrap>
                <DescriptionWrap>
                  <CustomeTextField label="Thành phố" />
                  <CustomeTextField label="Đất Nước" />
                </DescriptionWrap>
                <DescriptionWrap>
                  <CustomeTextField label="Mã Bưu chính" />
                  <CustomeTextField label="Thành phố" />
                </DescriptionWrap>
                <FormControl variant="standard" sx={{
                  width: '100%',
                  marginTop: '10px',
                  '& label ': {
                    marginTop: theme.spacing(1),
                    position: 'static',
                    fontSize: '22px'
                  },
                }} >
                  <InputLabel shrink>Tiểu sử</InputLabel>
                  <TextareaAutosize
                    style={{ resize: 'none', width: '100%' }}
                    minRows={7}
                  />
                </FormControl>
              </Box>
              <Divider sx={{
                marginTop: '10px',
                marginBottom: '10px'
              }} />
              <Box sx={{
                padding: '0px 50px'
              }}>
                <Button sx={{
                  width: '120px',
                  height: '50px'
                }}
                  variant="contained">Sửa</Button>
              </Box>
            </PaperContain>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}