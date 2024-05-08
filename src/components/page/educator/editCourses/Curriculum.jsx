// Chương trình giảng dạy
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Paper, Typography, styled, useTheme } from "@mui/material";
import LayoutEditCourse, { HeaderEditLayoutCourse, TitleHeaderEditCourse, WrapBoxEditLayoutCourse, WrapContentLayoutEditCourse } from "./LayoutEditCourse";
import { grey } from "@mui/material/colors";
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TextFieldCounter from "../../../layouts/TextFieldCounter";
// icon
import AddIcon from '@mui/icons-material/Add';
import theme from "../../../../theme";
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { useContext, useEffect, useState } from "react";
import { ConstructionOutlined, Edit, Mode } from "@mui/icons-material";
import { Editor } from "@tinymce/tinymce-react";
import { apiKey } from "../../../../static/tiny";
import InputFileUpload, { InputFileVideoUpload } from "../../../layouts/InputFileUpload";
import InputCounter from "../../../layouts/InputCounter";
import TextEditor from "../../../layouts/Editor";
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { deleteUnitById, getUnitsByCourseId, insertUnit, insertUnits } from "../../../../api/unit";
import { CourseContext } from "../../../../provider/CourseProvider";
import { v4 as uuidv4 } from 'uuid';
import { handleApiResponse } from "../../../../api/instance";
import { deleteSectionById, getSectionByUnitId, insertSection, insertSections, insertVideoSection } from "../../../../api/section";
import { stringAlert } from "../../../../static/stringAlert";
import DialogProgress from "../../../feedback/DialogProgress";
import convertStringHtml from "../../../../util/convertStringHtml";
import OpenVideo from "../../../OpenVideo";

const heightIcon = '20px';

const EditSection = ({ open, onClose, onSave, valueEdit = {}, sx }) => {

    const [section, setSection] = useState(valueEdit);

    // useEffect(() => {
    //     setSection(valueEdit);
    // }, [valueEdit])

    const handleOnchangeNumberSection = (value) => {
        let newUnit = { numberSection: value };
        setSection({
            ...section,
            ...newUnit
        });
    };

    const handleOnchangeTitleSection = (value) => {
        let newUnit = { title: value };
        setSection({
            ...section,
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
            onSave(section);
        }
    }


    return (
        <Box sx={{
            display: open ? 'flex' : 'none',
            flexDirection: 'column',
            border: '1px solid black',
            py: theme.spacing(3),
            px: theme.spacing(3),
            marginLeft: theme.spacing(7),
            marginRight: theme.spacing(1),
            my: theme.spacing(2),
            backgroundColor: 'white ',
            ...sx
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontWeight: 600 }}>Bài giảng:</Typography>
                <Box sx={{
                    marginBottom: theme.spacing(2)
                }}>
                    <InputCounter sx={{
                        width: '350px',
                        marginLeft: theme.spacing(2)
                    }}
                        require
                        onChange={handleOnchangeNumberSection}
                        type="number"
                        max={2}
                        defaultValue={valueEdit.numberSection}
                        placeholder={"Nhập số chương"} />
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ fontWeight: 600 }}>Tên bài giảng:</Typography>
                <InputCounter
                    require
                    defaultValue={valueEdit.title}
                    onChange={handleOnchangeTitleSection}
                    placeholder={"Nhập tiêu đề"}
                    min={80} />
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1, mx: theme.spacing(1),
                marginBottom: theme.spacing(1)
            }}>
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

const AddContentSection = ({ initValueSection, open, onSave, onClose }) => {
    const [section, setSection] = useState(initValueSection);


    const handleCloseAddContent = () => {
        if (onClose) {
            onClose();
        }
    };



    const handleOnChangeContentSection = (value) => {
        let newValue = {
            content: value
        };
        setSection({
            ...section,
            ...newValue
        });
    }



    const handleOnchangeFile = (Files) => {
        let newValue = {
            video: Files
        };
        setSection({
            ...section,
            ...newValue
        });
    }

    const handleOnSave = () => {
        if (onSave) {
            onSave(section);
        }
    }

    return (
        <Dialog sx={{
            top: '-5%',
        }}
            fullWidth={true}
            maxWidth="xl"
            open={open}>
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
                    <Typography fontWeight='600' marginBottom={theme.spacing(1)}>Mô tả bài giảng</Typography>
                    <TextEditor
                        initialValue={initValueSection?.content}
                        onChange={handleOnChangeContentSection}
                    />
                </Box>
                <Divider />
                <Box sx={{
                    padding: theme.spacing(2, 4)
                }}>
                    <Typography fontWeight='600' marginBottom={theme.spacing(1)}>Thêm video</Typography>
                    {/* <InputFileUpload
                        fileNameDefault={section?.urlVideo}
                        handleFiles={handleOnchangeFile} /> */}
                    <InputFileVideoUpload
                        fileNameDefault={section?.urlVideo}
                        handleFiles={handleOnchangeFile} />
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    <Button sx={{
                    }}
                        onClick={handleOnSave}
                        variant="contained">
                        Lưu
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
const Section = ({ unitId, section = {}, onDelete, onChangeSection }) => {

    const [openEditUnit, setOpenEditUnit] = useState(false);
    const [openMoreSection, setOpenMoreSection] = useState(false);
    const [openDialogAddContent, setOpenDialogAddContent] = useState(false);
    const [openDialogProgress, setOpenDialogProgress] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [alert, setAlert] = useState('');
    const [severityAlert, setSeverityAlert] = useState('success');
    const [sectionState, setSectionState] = useState(section);
    const handleEditUnit = () => {
        console.log('click')
        setOpenEditUnit(true);
    }

    const handleToggleEditUnit = () => {
        setOpenEditUnit(!openEditUnit)
    }

    const handleAddContent = (e) => {
        setOpenDialogAddContent(true);
    }

    const handleOnCloseAlert = () => {
        setOpenAlert(false);
    }

    const handleCloseAddContent = () => {
        setOpenDialogAddContent(false);
    }

    const handleToggleMoreSection = () => {
        setOpenMoreSection(!openMoreSection);
    }

    // save content and video Url
    const handleSaveAddContent = async (contentSection) => {
        console.log('content section: ', contentSection);
        let content = contentSection?.content;
        let videos = contentSection?.video;
        let sectionId = section.id;
        // nếu content không rỗng thì thêm vào csdl
        setOpenDialogProgress(true);
        if (content && videos) {
            let newSection = {
                ...section,
                content: content
            }
            await insertSection(unitId, newSection)
                .then(response => {
                    handleApiResponse(response,
                        // thêm thành công
                        (sectionResponse) => {
                            setSectionState(sectionResponse);
                            setAlert(stringAlert.updateContentSectionSuccess);
                            setSeverityAlert('success'); // cập nhật trạng thái cho alert
                        },
                        () => {
                            setAlert(stringAlert.updateContentSectionFailed);
                            setSeverityAlert('error'); // cập nhật trạng thái cho alert
                        });
                });

            // them video vao section
            let videoFile = videos[0];
            console.log(videoFile)
            await insertVideoSection(sectionId, videoFile)
                .then(response => {
                    handleApiResponse(response,
                        // thêm thành công
                        (sectionResponse) => {
                            setSectionState(sectionResponse);
                            setAlert(alert + " " + stringAlert.updateSuccess);
                            setSeverityAlert('success'); // cập nhật trạng thái cho alert
                        },
                        () => {
                            setAlert(alert + " " + stringAlert.updateFailed);
                            setSeverityAlert('error'); // cập nhật trạng thái cho alert
                        });
                });

        } else {
            setAlert("file video không hợp lệ");
            setSeverityAlert('error'); // cập nhật trạng thái cho alert
        }
        setOpenAlert(true);
        setOpenDialogProgress(false);
        setOpenDialogProgress(false);
        setOpenDialogAddContent(false);
    }

    const handleOnClickDelete = () => {
        if (onDelete) {
            onDelete(section);
        }
    }

    const handleOnChangeSection = (section) => {
        if (onChangeSection) {
            onChangeSection(section);
        }
    }

    const handleShowMoreSection = () => {
        handleToggleMoreSection();
    }

    return (
        <>
            <AlertCustom
                sx={{
                    top: '30%',
                }}
                open={openAlert}
                onClose={handleOnCloseAlert}
                severity={severityAlert}>
                {alert}
            </AlertCustom>
            <DialogProgress
                open={openDialogProgress} />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: theme.spacing(1, 0),
                margin: theme.spacing(1, 0),
                border: '1px solid black',
                backgroundColor: theme.palette.background.default,
            }}>
                <EditSection
                    sx={{
                        width: '100%'
                    }}
                    valueEdit={section}
                    open={openEditUnit}
                    onClose={handleToggleEditUnit}
                    onSave={handleOnChangeSection}
                />
                <Box sx={{
                    display: !openEditUnit ? 'flex' : 'none', // turn off when edit on
                    flexDirection: 'row',
                    flexGrow: 1,
                    borderBottom: openMoreSection ? '1px solid black' : 'none',
                    paddingBottom: theme.spacing(1),
                }}>
                    <Box sx={{ display: 'flex', flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CheckCircleIcon sx={{ height: heightIcon }} />
                            <Typography sx={{ marginRight: theme.spacing(1) }}>Bài giảng: {sectionState.numberSection} </Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <DescriptionIcon sx={{ height: heightIcon }} />
                            <Typography>{section.title}</Typography>
                        </Box>
                    </Box>
                    {/* edit, delete 'edit' and add 'content'*/}
                    <Box sx={{
                        display: 'flex',
                        mx: theme.spacing(2),
                        height: '100%'
                    }}>
                        <Button sx={{
                            color: 'initial', padding: 0, minWidth: '0'
                        }}
                            startIcon={<ModeIcon sx={{ height: heightIcon, }} />}
                            onClick={handleEditUnit}
                        ></Button>
                        <Button sx={{ color: 'initial', padding: 0, minWidth: '0' }}
                            startIcon={<DeleteIcon sx={{ height: heightIcon }} />}
                            onClick={handleOnClickDelete}
                        ></Button>
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
                        <Button sx={{
                            padding: 0,
                            color: 'inherit'
                        }}
                            onClick={handleShowMoreSection}
                            startIcon={!openMoreSection ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}>
                        </Button>
                    </Box>

                </Box>
                <Box sx={{
                    display: openMoreSection ? 'block' : 'none',
                    margin: theme.spacing(1)
                }}>
                    <Box>
                        <Typography fontWeight="600">Mô tả: </Typography>
                        <Box>{sectionState.content ? convertStringHtml(sectionState.content) : "Trống"}</Box>
                    </Box>
                    <Box>
                        <Typography fontWeight="600">Video: </Typography>
                        <OpenVideo
                            source={sectionState?.urlVideo}>
                            <Typography>{sectionState.urlVideo ? sectionState.urlVideo : 'Trống'}</Typography>
                        </OpenVideo>
                    </Box>
                </Box>
                {/* màng hình nổi */}
                <AddContentSection
                    initValueSection={section}
                    open={openDialogAddContent}
                    onClose={handleCloseAddContent}
                    onSave={handleSaveAddContent} />
            </Box>
        </>
    )
};



const Unit = ({ unit, onClickDeleteUnit, onChangeUnit }) => {
    const defaultSection = [];

    const [openEdit, setOpenEdit] = useState(false);
    const [openConfirmDeleteSection, setOpenConfirmDeleteSection] = useState(false);
    const [openAddSection, setOpenAddSection] = useState(false);
    const [sections, setSections] = useState(defaultSection);
    const [maxNumberSection, setMaxNumberSection] = useState(0);
    const [sectionDelete, setDeleteSection] = useState({}); // chưa section muốn xố

    const [openAlert, setOpenAlert] = useState(false);
    const [openDialogProgress, setOpenDialogProgress] = useState(false);
    const [severityAlert, setSeverityAlert] = useState('success');
    const [alert, setAlert] = useState("");

    useEffect(() => {
        // nap sections
        let unitId = unit.id;
        if (unitId) {
            getSectionByUnitId(unitId)
                .then(response => {
                    handleApiResponse(response,
                        (sectionsData) => {
                            if (sectionsData.length > 0) {
                                setSections(sectionsData);
                            }
                        })
                })

        }
    }, [])

    useEffect(() => {
        // khi sections thay đổi thì cập nhật lại sô chuong lớn nhât
        if (sections && sections.length > 0) {
            let max = sections[0].numberSection;
            for (let section of sections) {
                if (section.numberSection > max)
                    max = section.numberSection;
            }
            setMaxNumberSection(max);
        }
    }, [sections])

    const handleToggleEdit = () => {
        setOpenEdit(!openEdit);
    }

    const handleToggleAddSection = () => {
        setOpenAddSection(!openAddSection);
    }
    const handleToggleAlert = () => {
        setOpenAlert(!openAlert)
    }
    const handleToggleConfirmDeleteSection = () => {
        setOpenConfirmDeleteSection(!openConfirmDeleteSection);
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

    const handleOnCloseAlert = () => {
        handleToggleAlert();
    }


    const handleSaveSection = async (section) => {

        let unitId = unit.id
        insertSection(unitId, section)
            .then(response => {
                handleApiResponse(response,
                    (section) => {
                        // update sections
                        setSections([
                            ...sections,
                            section
                        ]);
                        // cap nhật alert
                        setAlert(stringAlert.updateSuccess);
                        setSeverityAlert('success');
                        // turn of block add section
                        handleToggleAddSection();
                    },
                    () => {
                        setAlert(stringAlert.updateFailed);
                        setSeverityAlert('error');
                    });
                setOpenAlert(true);
            })
    }

    const handleClickDeleteSection = async (section) => {
        console.log(section)
        await setDeleteSection(section);
        handleToggleConfirmDeleteSection();
    }
    const handleDeleteSection = () => {
        let sectionId = sectionDelete.id;
        deleteSectionById(sectionId)
            .then(response => {
                handleApiResponse(response,
                    () => {
                        // cap nha state sections
                        const filData = sections.filter((sectionItem) => {
                            return sectionItem.id !== sectionDelete.id;
                        });
                        console.log('delete section success: ', sectionDelete);
                        setSections(filData);
                        // cap nhat alert
                        setAlert(stringAlert.deleteSuccess);
                        setSeverityAlert('success');
                    },
                    () => {
                        setAlert(stringAlert.deleteFailed);
                        setSeverityAlert('error');
                    });
                setOpenAlert(true); // bat thong bao
                handleToggleConfirmDeleteSection(); // tăt block confirm
            })


    }


    const handleChangeSection = (section, index) => {
        let unitId = unit.id;
        insertSection(unitId, section)
            .then(response => {
                handleApiResponse(response,
                    (newSection) => {
                        // update state sections
                        let updateSections = sections;
                        updateSections[index] = newSection;
                        setSections(updateSections);
                        // update alert
                        setAlert(stringAlert.updateSuccess);
                        setSeverityAlert('success');
                    },
                    () => {
                        // update alert failed
                        setAlert(stringAlert.updateFailed);
                        setSeverityAlert('error');
                    });
                setOpenAlert(true);
            })
    }
    return (
        <>
            <Box sx={{
                py: theme.spacing(3),
                backgroundColor: grey[200],
                border: '1px solid black'
            }}>
                <AlertCustom sx={{
                    top: '30%'
                }}
                    open={openAlert}
                    onClose={handleOnCloseAlert}
                >
                    {alert}
                </AlertCustom>
                <DialogConfirm
                    open={openConfirmDeleteSection}
                    title={"Thông báo"}
                    contentText={"Sau khi xóa không thể khoi phục"}
                    onCancel={handleToggleConfirmDeleteSection}
                    onAgree={handleDeleteSection}>
                    <Typography fontWeight={'600'}>Bài giảng: {sectionDelete?.numberSection}</Typography>
                    {sectionDelete?.title}
                </DialogConfirm>
                <Box sx={{ mx: theme.spacing(2) }}>
                    <EditUnit
                        valueUnit={unit}
                        open={openEdit}
                        onClose={handleToggleEdit}
                        onSave={handleOnSaveEdit}
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
                    marginLeft: theme.spacing(7),
                    marginRight: theme.spacing(1),
                    marginBottom: theme.spacing(2)
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',

                    }}>
                        {/* input */}

                        {
                            sections.map((section, index) => {
                                return (
                                    <Section
                                        key={uuidv4()}
                                        unitId={unit.id}
                                        section={section}
                                        onDelete={handleClickDeleteSection}
                                        onChangeSection={(section) => handleChangeSection(section, index)} />
                                );
                            })
                        }
                        {/* </Box> */}
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
                    onClick={handleToggleAddSection}
                    variant="outline"
                    startIcon={!openAddSection ? <AddIcon /> : <CloseIcon />}
                >
                    {!openAddSection ? "Thêm bài giảng" : null}
                </Button>
                <EditSection
                    valueEdit={{
                        numberSection: maxNumberSection + 1
                    }}
                    open={openAddSection}
                    onClose={handleToggleAddSection}
                    onSave={handleSaveSection} />
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

const AlertCustom = ({ open, children, severity = 'success', onClose, sx }) => {
    const handleOnClose = () => {
        if (onClose) {
            onClose();
        }
    }
    return (
        <Paper sx={{
            display: open ? 'block' : 'none',
            position: 'fixed',
            zIndex: 1,
            ...sx
        }}>
            <Alert sx={{
            }}
                severity={severity}
                onClose={handleOnClose}>
                {children}
            </Alert>
        </Paper>
    )
}

const DialogConfirm = ({ open, title, contentText, onCancel, onAgree, children }) => {
    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
    }
    const handleAgree = () => {
        if (onAgree) {
            onAgree();
        }
    }
    return (
        <Dialog
            open={open}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{contentText}</DialogContentText>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Hủy</Button>
                <Button onClick={handleAgree}>Đồng ý</Button>
            </DialogActions>
        </Dialog>
    );
}

export default function Curriculum() {
    const [isAddUnit, setIsAddUnit] = useState(false);
    const [newUnitNumber, setNewUnitNumber] = useState(1); // so chuong moi nhat
    const [units, setUnits] = useState([]);
    const [deleteUnit, setDeleteUnit] = useState({}); // chưa unit cần được xóa

    const [openAlert, setOpenAlert] = useState(false);
    const [severityAlert, setSeverityAlert] = useState('');
    const [alert, setAlert] = useState('');

    const [openConfirmDeleteUnit, setOpenConfirmDeleteUnit] = useState(false); // trạng thái đóng mở
    const [contentDelete, setcontentDelete] = useState(""); // cho biết nội dung nào đuọc chọn để xóa

    const theme = useTheme();
    const { courseProvider, setCourseProvider } = useContext(CourseContext);

    useEffect(() => {
        // nap units
        if (courseProvider && courseProvider.id) {
            const courseId = courseProvider.id;
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
    const handleToggleAlert = () => {
        console.log("close Alert")
        setOpenAlert(!openAlert);
    }
    const handleToggleConfirmDeleteUnit = () => {
        setOpenConfirmDeleteUnit(!openConfirmDeleteUnit);
    }
    const handleCloseEditUnit = () => {
        handleToggleAddUint();
    }
    // thêm unit mới
    const handleAddUnit = async (newUnit) => {
        // cai dat so chuong cho bai hoc
        if (newUnit.numberUnit && newUnit.title) {
            let newUnitItem = {
                key: uuidv4(),
                // numberUnit: newUnitNumber,
                ...newUnit
            }
            const courseId = courseProvider.id;
            insertUnit(courseId, newUnitItem)
                .then(response => {
                    handleApiResponse(response,
                        // duoc chay khi insert thanh cong
                        (unit) => {
                            console.log('insert unit:', unit)
                            setUnits(preUnits => ([
                                ...preUnits,
                                unit
                            ]));
                            setSeverityAlert('success'); // cập nhật trạng thái cho alert
                            setAlert(stringAlert.updateSuccess); // cập nhật alert
                            handleToggleAddUint(); // tắt thông báo
                        },
                        // duoc chay khi thất bại
                        () => {
                            setSeverityAlert('error'); // cập nhật trạng thái
                            setAlert(stringAlert.updateFailed); // cập nhật alert
                        },
                        () => {
                            setOpenAlert(true);
                        });
                })
        }

    }
    const isValidateUnit = (unit) => {
        if (unit && unit.title && unit.numberUnit) {
            return true;
        }
        return false;
    }

    const handleChangeUnit = (changedUnit, index) => {
        if (isValidateUnit(changedUnit)) {
            let courseId = courseProvider.id;
            console.log(changedUnit)
            insertUnit(courseId, changedUnit)
                .then(response => {
                    handleApiResponse(response,
                        // cập nhật thành công
                        (unit) => {
                            // cập nhật lại units
                            let newUnits = units;
                            newUnits[index] = unit;
                            setUnits(newUnits);
                            // cập nhật thông báo
                            setAlert(stringAlert.updateSuccess);
                            setSeverityAlert('success'); // cập nhật trạng thái cho alert
                            setAlert(stringAlert.updateSuccess); // cập nhật alert
                            handleToggleAlert();
                        },
                        // chay khi cập nhật thất bại
                        () => {
                            setSeverityAlert('error'); // cập nhật trạng thái cho alert
                            setAlert(stringAlert.updateFailed); // cập nhật alert
                        })
                    setOpenAlert(true);
                });
        }
    }

    const handleClickDeleteUnit = async (unitItem) => {
        setDeleteUnit(unitItem);
        handleToggleConfirmDeleteUnit();
    };

    // thực hiện xóa unit đã được chọn
    const handleAgreeConfirmDeleteUnit = () => {

        let unitId = deleteUnit.id;
        if (unitId) {
            deleteUnitById(unitId)
                .then(response => {
                    handleApiResponse(response,
                        () => {
                            setAlert(stringAlert.deleteSuccess);
                            setSeverityAlert('success');
                            // loai uint da xoa ra khoi state
                            const newUnits = units.filter((unit) => {
                                return unit.id !== deleteUnit.id;
                            })
                            setUnits(newUnits);
                        },
                        () => {
                            setAlert(stringAlert.deleteFailed);
                            setSeverityAlert('error');
                        });
                    handleToggleConfirmDeleteUnit();
                    setOpenAlert(true);
                })
        }
    }

    const handleCancelConfirmDeleteUnit = () => {
        console.log('cancel confirm delete unit')
        handleToggleConfirmDeleteUnit();
    }
    return (
        <LayoutEditCourse>
            <HeaderEditLayoutCourse>
                <TitleHeaderEditCourse>Chương Trình Giảng dạy</TitleHeaderEditCourse>
            </HeaderEditLayoutCourse>

            <WrapBoxEditLayoutCourse>
                <WrapContentLayoutEditCourse>
                    <DialogConfirm
                        open={openConfirmDeleteUnit}
                        title={"Thông báo"}
                        contentText={"Sau khi xóa không thể khôi phục"}
                        onCancel={handleCancelConfirmDeleteUnit}
                        onAgree={handleAgreeConfirmDeleteUnit} >
                        <Typography fontWeight='600'>
                            Phần {deleteUnit.numberUnit}:
                        </Typography>
                        {deleteUnit.title}
                    </DialogConfirm>
                    <AlertCustom
                        open={openAlert}
                        onClose={handleToggleAlert}
                        severity={severityAlert}
                    >
                        {alert}
                    </AlertCustom>

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
                                    onClickDeleteUnit={handleClickDeleteUnit}
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
        </LayoutEditCourse >
    )
}