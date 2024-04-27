import { Box, Button, Typography, styled, useTheme } from "@mui/material";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { useState } from "react";

const InputFile = styled('input')({
  opacity: 0, // Sử dụng opacity thay vì clip để ẩn phần tử input
  position: 'absolute',
  right: 0,
  left: 0,
  top: 0,
  bottom: 0,
  zIndex: 1, // Đặt zIndex để input được ẩn phía sau nút button
});
export default function InputFileUpload({ label = "Upload a File", helperText, handleFiles }) {
  const theme = useTheme();
  const [fileName, setFileName] = useState("");

  const handleOnchange = (e) => {
    const files = e.target.files;

    setFileName(e.target.files[0].name);
    if (files && files.length > 0) {
      handleFiles(files);
    }
  }

  return (
    <Box>
      <Typography sx={{ marginBottom: theme.spacing(2) }}>
        {fileName}
      </Typography>
      <Button sx={{
        textTransform: 'none',
        color: 'initial',
        border: '1px solid black'
      }}
        startIcon={<CloudUploadOutlinedIcon />}>
        {label}
        <InputFile type="file" onChange={handleOnchange} />
      </Button>
      {
        helperText &&
        <Typography>{helperText}</Typography>
      }
    </Box>

  );
}