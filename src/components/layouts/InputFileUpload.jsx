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
export default function InputFileUpload({ fileNameDefault = "", label = "Upload a File", helperText, handleFiles }) {
  const theme = useTheme();
  const [fileName, setFileName] = useState(fileNameDefault);

  const handleOnchange = (e) => {
    const files = e.target.files;

    setFileName(e.target.files[0].name);
    if (files && files.length > 0) {
      handleFiles(files);
    }
  }

  return (
    <Box>
      <Typography sx={{ marginBottom: theme.spacing(0.5) }}>
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
        <Typography sx={{ color: theme.palette.error.main }}>{helperText}</Typography>
      }
    </Box>

  );
}

export function InputFileVideoUpload({ fileNameDefault = "", label = "Upload a File", handleFiles, isFileVideo }) {
  const [helperText, setHelperText] = useState(null);

  const handleVideoFiles = (files) => {
    const typeFile = files[0].type;
    console.log(files[0].type)
    if (typeFile.startsWith('video/')) {
      if (handleFiles) {
        handleFiles(files);
        if (isFileVideo) {
          handleFiles(null);
          isFileVideo(true);
        }
      }
    } else {
      setHelperText("Vui lòng chọn một tệp video");
      if (isFileVideo)
        isFileVideo(false);
    }
  }
  return (
    <>
      <InputFileUpload
        fileNameDefault={fileNameDefault}
        label={label}
        helperText={helperText}
        handleFiles={handleVideoFiles} />
    </>
  )
}


export function InputFileImgUpload({ fileNameDefault = "", label = "Upload a File", handleFiles, isFileImg }) {
  const [helperText, setHelperText] = useState(null);

  const handleImgFiles = (files) => {
    const typeFile = files[0].type;
    console.log(files[0].type)
    if (typeFile.startsWith('image/')) {
      if (handleFiles) {
        handleFiles(files);
        if (isFileImg) {
          handleFiles(null);
          isFileImg(true);
        }
      }
    } else {
      setHelperText("Vui lòng chọn một tệp ảnh");
      if (isFileImg)
        isFileImg(false)
    }
  }
  return (
    <>
      <InputFileUpload
        fileNameDefault={fileNameDefault}
        label={label}
        helperText={helperText}
        handleFiles={handleImgFiles} />
    </>
  )
}

