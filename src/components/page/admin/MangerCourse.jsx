import { Box, TextField } from "@mui/material";
import CardCourse from "./layout/CardCourse";
import LayoutAdmin, { LayoutContentAdmin, LayoutHeaderAdmin } from "./layout/LayoutAdmin";

export default function MangerCourse() {

    return (
        <LayoutAdmin>
            <LayoutHeaderAdmin>
                XÉT DUYỆT KHÓA HỌC
            </LayoutHeaderAdmin>
            <LayoutContentAdmin>
                <Box>
                    <TextField label="Tìm kiếm khóa học" />
                </Box>
            </LayoutContentAdmin>
            <LayoutContentAdmin>

                <CardCourse />
            </LayoutContentAdmin>
        </LayoutAdmin>
    );
}