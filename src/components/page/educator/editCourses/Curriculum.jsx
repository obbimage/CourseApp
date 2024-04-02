// Chương trình giảng dạy
import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, Typography, styled, useTheme } from "@mui/material";
import LayoutEditCourse, { HeaderEditLayoutCourse, TitleHeaderEditCourse, WrapBoxEditLayoutCourse, WrapContentLayoutEditCourse } from "./LayoutEditCourse";
import { grey } from "@mui/material/colors";
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TextFieldCounter from "../../../layouts/TextFieldCounter";
import AddIcon from '@mui/icons-material/Add';
import theme from "../../../../theme";
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { Mode } from "@mui/icons-material";
import { Editor } from "@tinymce/tinymce-react";
import { apiKey } from "../../../../static/tiny";
import InputFileUpload from "../../../layouts/InputFileUpload";
import InputCounter from "../../../layouts/InputCounter";
import TextEditor from "../../../layouts/Editor";

const heightIcon = '20px';


export default function Curriculum() {
    const [toggleEditUnit, setToggleEditUnit] = useState(false);
    const [toggleDialogAddContent, setToggleDialogAddContent] = useState(false);
    const theme = useTheme();

    const handleEditUnit = () => {
        console.log('click')
        setToggleEditUnit(true);
    }

    const handleCancleEditUnit = () => {
        setToggleEditUnit(false);
    }
    const handleButtonSave = () => {
        setToggleEditUnit(false);
    }

    const handleAddContent = (e) => {
        setToggleDialogAddContent(true);
    }

    const handleCloseAddContent = () => {
        setToggleDialogAddContent(false);
    }

    const handleSaveAddContent = () => {
        setToggleDialogAddContent(false);
    }
    return (
        <LayoutEditCourse>
            <HeaderEditLayoutCourse>
                <TitleHeaderEditCourse>Chương Trình Giảng dạy</TitleHeaderEditCourse>
            </HeaderEditLayoutCourse>

            <WrapBoxEditLayoutCourse>
                <WrapContentLayoutEditCourse>
                    <Typography>
                        Hãy bắt đầu xây dựng khóa học của bạn bằng cách tạo các phần, bài giảng và bài thực hành.
                    </Typography>
                    <Typography>
                        Sử dụng đề cương khóa học của bạn để cấu trúc nội dung của bạn và gắn nhãn các phần và bài giảng của bạn một cách rõ ràng.
                    </Typography>
                </WrapContentLayoutEditCourse>
            </WrapBoxEditLayoutCourse>
            <WrapBoxEditLayoutCourse>
                <Box sx={{
                    py: theme.spacing(3),
                    backgroundColor: grey[200],
                    border: '1px solid black'
                }}>
                    {/* tên chương */}
                    <Box sx={{
                        display: 'flex',
                        padding: theme.spacing(3, 2),

                    }}>
                        <Typography sx={{ fontWeight: '600' }}>Phần 1: </Typography>
                        <DescriptionIcon sx={{ height: heightIcon, mx: theme.spacing(0.5) }} />
                        <Typography>  Giới thiệu</Typography>
                        <Box sx={{ color: 'initial', display: 'flex', alignItems: 'center' }}>
                            <Button sx={{ color: 'inherit', minWidth: '0', padding: 0 }}>
                                <ModeIcon sx={{ height: heightIcon }} />
                            </Button>
                            <Button sx={{ color: 'inherit', minWidth: '0', padding: 0, height: heightIcon }}>
                                <DeleteIcon sx={{ height: heightIcon }} />
                            </Button>

                        </Box>
                    </Box>
                    {/* Bài giảng unit trong chương */}
                    <Box sx={{
                        backgroundColor: theme.palette.background.default,
                        border: '1px solid black',
                        marginLeft: theme.spacing(7),
                        marginRight: theme.spacing(1),
                        marginBottom: theme.spacing(2)
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',

                        }}>
                            {/* input */}
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                padding: theme.spacing(1, 0),
                                width: '100%',
                                alignItems: 'center',
                                borderBottom: '1px solid black'
                            }}>
                                {/* unit */}
                                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <CheckCircleIcon sx={{ height: heightIcon }} />
                                        <Typography sx={{ marginRight: theme.spacing(1) }}>Bài giảng 1: </Typography>
                                    </Box>
                                    <Box sx={{
                                        display: toggleEditUnit ? 'block' : 'none',
                                        flexGrow: 1,
                                        margin: theme.spacing(0, 2)
                                    }}>
                                        <Box height={theme.spacing(5)}>
                                            <InputCounter placeholder="Nhập tiêu đề" />
                                        </Box>
                                        {/* button edit and delete */}
                                        <Box sx={{
                                            margin: theme.spacing(2),
                                            display: 'flex',
                                            justifyContent: 'flex-end'
                                        }}>
                                            <Button onClick={handleCancleEditUnit} sx={{ mx: theme.spacing(1) }}>Hủy</Button>
                                            <Button onClick={handleButtonSave} variant="contained">Lưu</Button>
                                        </Box>
                                    </Box>
                                    <Box sx={{
                                        display: !toggleEditUnit ? 'flex' : 'none',
                                        alignItems: 'center',
                                    }}>
                                        <DescriptionIcon sx={{ height: heightIcon }} />
                                        <Typography> Giới thiệu</Typography>
                                    </Box>
                                </Box>
                                {/* edit, delete 'edit' and add 'content'*/}
                                <Box sx={{
                                    display: !toggleEditUnit ? 'flex' : 'none',
                                    mx: theme.spacing(2),
                                    height: '100%'
                                }}>
                                    <Button sx={{
                                        color: 'initial', padding: 0, minWidth: '0'
                                    }}
                                        onClick={handleEditUnit}
                                    >
                                        <ModeIcon sx={{ height: heightIcon, }} />
                                    </Button>
                                    <Button sx={{ color: 'initial', padding: 0, minWidth: '0' }}>
                                        <DeleteIcon sx={{ height: heightIcon }} />
                                    </Button>
                                    {/* Button add content */}
                                    <Button
                                        sx={{
                                            height: '100%',
                                            textTransform: 'none',
                                            color: 'inherit',
                                            border: '1px solid black',
                                            borderRadius: '0px'
                                        }}
                                        onClick={handleAddContent}
                                        startIcon={<AddIcon />}>
                                        Nội dung
                                    </Button>
                                    {/* màng hình nổi */}
                                    <Dialog sx={{
                                        top: '-5%',
                                    }}
                                        fullWidth={true}
                                        maxWidth="xl"
                                        open={toggleDialogAddContent}>
                                        <DialogTitle paddingBottom='0'>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography variant="h5" fontWeight='600'>Thêm nội dung</Typography>
                                                <Button
                                                    variant="contained"
                                                    onClick={handleCloseAddContent}
                                                >Hủy</Button>
                                            </Box>
                                        </DialogTitle>
                                        <DialogContent>
                                            <Box sx={{
                                                width: '100%',
                                                padding: theme.spacing(4, 4)

                                            }}>
                                                <Typography fontWeight='600' marginBottom={theme.spacing(1)}>Mô tả nội dung</Typography>
                                                <TextEditor />
                                            </Box>
                                            <Divider />
                                            <Box sx={{
                                                padding: theme.spacing(2, 4)
                                            }}>
                                                <Typography fontWeight='600' marginBottom={theme.spacing(1)}>Thêm video</Typography>
                                                <InputFileUpload />
                                            </Box>
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end'
                                            }}>
                                                <Button sx={{
                                                }}
                                                    onClick={handleSaveAddContent}
                                                    variant="contained">
                                                    Lưu
                                                </Button>
                                            </Box>
                                        </DialogContent>
                                    </Dialog>
                                </Box>
                            </Box>
                            <Box sx={{
                                flexGrow: 1
                            }}>
                            </Box>
                        </Box>
                    </Box>
                    {/* thêm bài giảng */}
                    <Button
                        sx={{
                            borderRadius: '0',
                            backgroundColor: theme.palette.background.default,
                            marginLeft: theme.spacing(7),
                            border: '1px solid black'
                        }}
                        variant="outline"
                        startIcon={<AddIcon />}>
                        Thêm bài giảng
                    </Button>
                </Box>
            </WrapBoxEditLayoutCourse>
        </LayoutEditCourse >
    )
}