import { Box } from "@mui/material";
import convertStringHtml from "./convertStringToHtml";

function Test() {
  return (
    <Box>{convertStringHtml('<h1 class="color-red">Đây là màu đỏ</h1>')}</Box>
  );
}

export default Test;
