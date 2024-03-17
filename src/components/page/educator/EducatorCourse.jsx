import { Box, Button, Typography, useTheme } from "@mui/material";
import Search from "../../layouts/Search";
import { DropDownMenu } from "../../layouts/DropDownMenu";

function itemSelectMenu(key, value) {
    return { key, value }
}
export default function EducatorCourse() {
    const theme = useTheme();
    const listFillterMenu = [
        itemSelectMenu("Mới nhất", 'new'),
        itemSelectMenu("Cũ nhất", "old"),
        itemSelectMenu("A-Z", "ascending"), // tăng dần
        itemSelectMenu("Z-A", "decrease"),// giảm dần
    ]

    return (
        <Box>
            <Typography sx={{
                fontSize: theme.spacing(4),
                fontWeight: '600'
            }}>Khóa học</Typography>
            <Box>
                <Search />
                <DropDownMenu ListItem={listFillterMenu} />
                <Button>tttt</Button>
            </Box>
        </Box>
    )
}