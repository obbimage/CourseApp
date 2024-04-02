import { Box, Button, Typography, styled } from "@mui/material";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

const InputFile = styled('input')({
  opacity: 0, // Sử dụng opacity thay vì clip để ẩn phần tử input
  position: 'absolute',
  right: 0,
  left: 0,
  top: 0,
  bottom: 0,
  zIndex: 1, // Đặt zIndex để input được ẩn phía sau nút button
});
export default function InputFileUpload({ label = "Upload a File", helperText }) {
  return (
    <Box>
      <Button sx={{
        textTransform: 'none',
        color: 'initial',
        border: '1px solid black'
      }}
        startIcon={<CloudUploadOutlinedIcon />}>
        {label}
        <InputFile type="file" />
      </Button>
      {
        helperText &&
        <Typography>{helperText}</Typography>
      }
    </Box>

  );
}