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
import { useContext, useEffect, useState } from "react";
import { Edit, Mode } from "@mui/icons-material";
import { Editor } from "@tinymce/tinymce-react";
import { apiKey } from "../../../../static/tiny";
import InputFileUpload from "../../../layouts/InputFileUpload";
import InputCounter from "../../../layouts/InputCounter";
import TextEditor from "../../../layouts/Editor";
import CloseIcon from '@mui/icons-material/Close';
import { deleteUnitById, getUnitsByCourseId, insertUnits } from "../../../../api/unit";
import { CourseContext } from "../../../../provider/CourseProvider";
import { v4 as uuidv4 } from 'uuid';
import { handleApiResponse } from "../../../../api/instance";

const heightIcon = '20px';

const Section = () => {
    const [toggleEditUnit, setToggleEditUnit] = useState(false);
    const [toggleDialogAddContent, setToggleDialogAddContent] = useState(false);

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
        <>
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
        </>
    )
};

const Unit = ({ unit, onClickDeleteUnit, onChangeUnit }) => {

    const [openEdit, setOpenEdit] = useState(false);
    const [section,setSection] = useState(unit.section);

    const handleToggleEdit = () => {
        setOpenEdit(!openEdit);
    }
    const handleDeleteUnit = () => {
        if (onClickDeleteUnit) {
            onClickDeleteUnit(unit);
        }
    }
    const handleOnSaveEdit = (unit) => {
        if (onChangeUnit) {
            if (onChangeUnit) {
                onChangeUnit(unit);
            }
        }
    }

    return (
        <>
            <Box sx={{
                py: theme.spacing(3),
                backgroundColor: grey[200],
                border: '1px solid black'
            }}>
                <Box sx={{ mx: theme.spacing(2) }}>
                    <EditUnit
                        valueUnit={unit}
                        open={openEdit}
                        onClose={handleToggleEdit}
                        onSave={handleOnSaveEdit}
                        setUnitNumber={unit.numberUnit}
                        titleUnitDefault={unit.title}
                    />
                </Box>
                {/* tên chương */}
                <Box sx={{
                    display: 'flex',
                    padding: theme.spacing(3, 2),

                }}>
                    <Typography sx={{ fontWeight: '600' }}>Phần:{unit?.numberUnit} </Typography>
                    <DescriptionIcon sx={{ height: heightIcon, mx: theme.spacing(0.5) }} />
                    <Typography>{unit?.title}</Typography>
                    <Box sx={{ color: 'initial', display: 'flex', alignItems: 'center' }}>
                        <Button sx={{ color: 'inherit', minWidth: '0', padding: 0 }}
                            onClick={handleToggleEdit}>
                            <ModeIcon sx={{ height: heightIcon }} />
                        </Button>
                        <Button sx={{ color: 'inherit', minWidth: '0', padding: 0, height: heightIcon }}
                            onClick={handleDeleteUnit}
                        >
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
                            <Section />
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
        </>
    );
}

const EditUnit = ({
    open, onSave, onClose, valueUnit = {}
}) => {

    const [unit, setUnit] = useState(valueUnit);

    useEffect(() => {
        setUnit(valueUnit);
    }, [valueUnit])
    const handleOnchangeNumberUnit = (value) => {
        let newUnit = { numberUnit: value };
        setUnit({
            ...unit,
            ...newUnit
        });
    };

    const handleOnchangeTitleUnit = (value) => {
        let newUnit = { title: value };
        setUnit({
            ...unit,
            ...newUnit
        });
    };

    const handleOnClose = () => {
        if (onClose) {
            onClose();
        }
    }

    const handleOnSave = () => {
        if (onSave) {
            onSave(unit);
        }
    }

    return (
        <Box sx={{
            display: open ? 'flex' : 'none',
            border: '1px solid black',
            py: theme.spacing(3),
            px: theme.spacing(3),
            backgroundColor: 'white '
        }}>
            <Box>
                <Typography sx={{ fontWeight: 600 }}>Phần:</Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1, mx: theme.spacing(1),
                marginBottom: theme.spacing(1)
            }}>
                <Box sx={{
                    marginBottom: theme.spacing(2)
                }}>
                    <InputCounter sx={{
                        width: '300px'
                    }}
                        require
                        onChange={handleOnchangeNumberUnit}
                        type="number"
                        max={2}
                        defaultValue={valueUnit.numberUnit}
                        placeholder={"Nhập số chương"} />
                </Box>
                <InputCounter
                    require
                    defaultValue={valueUnit.title}
                    onChange={handleOnchangeTitleUnit}
                    placeholder={"Nhập tiêu đề"}
                    min={80} />
                <Box sx={{ color: 'black', marginTop: theme.spacing(2) }}>
                    <Button sx={{
                        color: 'initial',
                        marginRight: theme.spacing(2)
                    }}
                        onClick={handleOnClose}
                    >
                        Hủy
                    </Button>
                    <Button sx={{
                        color: theme.palette.background.default,
                        backgroundColor: 'black',
                        '&:hover': {
                            backgroundColor: "gray"
                        }
                    }}
                        onClick={handleOnSave}
                        variant="contained">Thêm</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default function Curriculum() {
    const [isAddUnit, setIsAddUnit] = useState(false);
    const [newUnitNumber, setNewUnitNumber] = useState(1); // so chuong moi nhat
    const unitDefault = {
        numberUnit: 1,
        title: 'Bài giảng 1'
    }
    const [units, setUnits] = useState([unitDefault]);

    const [deleteUnitsList, setDeleteUnitList] = useState([]); // chứa các danh sach cac untits can xoa

    const theme = useTheme();

    const { courseProvider, setCourseProvider } = useContext(CourseContext);

    useEffect(() => {
        const courseId = courseProvider.id;
        if (courseId) {
            getUnitsByCourseId(courseId)
                .then(response => {
                    handleApiResponse(response, () => {
                        const unitsData = response.data.data;
                        // data khong bi rong
                        if (unitsData.length > 0) {
                            setUnits(unitsData);
                        }
                    })
                });
        }
    }, [courseProvider]);

    useEffect(() => {
        // tim va cap nhat so chuong lon nhat hien tai
        if (units.length > 0) {
            let maxNumber = units[0].numberUnit
            for (let unit of units) {
                if (unit.numberUnit > maxNumber)
                    maxNumber = unit.numberUnit;
            }
            setNewUnitNumber(maxNumber + 1);
        }
    }, [units]);


    // toggle block add unit
    const handleToggleAddUint = () => {
        setIsAddUnit(!isAddUnit);
    }
    const handleCloseEditUnit = () => {
        handleToggleAddUint();
    }

    // gui data len server
    const handleSave = async () => {
        const courseId = courseProvider.id;
        // them va cap nhat data
        await insertUnits(courseId, units)
            .then(response => {
                handleApiResponse(response, () => {
                    console.log('insert unit', units);
                })
            });
        // xoa cac units da delete
        for (let unit of deleteUnitsList) {
            await deleteUnitById(unit.id)
                .then(response => {
                    handleApiResponse(response, () => {
                        console.log('delete unit:', unit.id);
                    })
                })
        }
    };
    // thêm unit mới
    const handleAddUnit = async (newUnit) => {
        // cai dat so chuong cho bai hoc
        if (newUnit.numberUnit && newUnit.title) {
            let newUnitItem = {
                key: uuidv4(),
                ...newUnit
            }
            await setUnits(preUnits => ([
                ...preUnits,
                newUnitItem
            ]));
            // tat block them sau khi them thanh cong
            handleToggleAddUint();
        }

    }

    const handleDeleteUnit = (unitItem) => {
        // data co trong csdl lieu
        // nen can phai them vao danh sach de xoa khi nhan save
        if (unitItem.id) {
            setDeleteUnitList([...deleteUnitsList, unitItem]);
        }
        const fillData = units.filter((unit, index) => {
            if (unit.id) {
                return unit.id !== unitItem.id;
            } else {
                return unit.key !== unitItem.key;
            }
        });
        console.log(unitItem)
        console.log('fill data:', fillData)
        setUnits(fillData);

    };

    const handleChangeUnit = (newUnit, index) => {
        let newUnitList = [...units];
        newUnitList[index] = newUnit;
        console.log('newList:', newUnitList)
        setUnits(newUnitList);
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
                {
                    units.map((unit, index) => {
                        return (
                            <Box key={uuidv4()} sx={{ marginBottom: theme.spacing(2) }}>
                                <Unit
                                    unit={unit}
                                    onClickDeleteUnit={handleDeleteUnit}
                                    onChangeUnit={(unit) => handleChangeUnit(unit, index)} />
                            </Box>
                        )
                    })
                }
                <Button sx={{
                    border: !isAddUnit ? '1px solid black' : 'none',
                    backgroundColor: theme.palette.background.default,
                    outline: 'none',
                    borderRadius: '0',
                    color: 'inherit',
                    marginBottom: theme.spacing(2),
                    "&:hover": {
                        borderColor: 'black'
                    }
                }}
                    onClick={handleToggleAddUint}
                    variant={!isAddUnit ? 'outlined' : 'text'}
                    startIcon={!isAddUnit ? <AddIcon /> : <CloseIcon />}>
                    {!isAddUnit && 'Thêm phần'}
                </Button>
                <EditUnit
                    valueUnit={{
                        numberUnit: newUnitNumber
                    }}
                    open={isAddUnit}
                    onClose={handleCloseEditUnit}
                    onSave={handleAddUnit} />
            </WrapBoxEditLayoutCourse>
            <WrapBoxEditLayoutCourse>
                <Button sx={{ marginTop: theme.spacing(2) }}
                    onClick={handleSave}
                    variant="contained">
                    Lưu
                </Button>
            </WrapBoxEditLayoutCourse>
        </LayoutEditCourse >
    )
}