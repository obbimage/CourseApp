// quản lý dữ liệu

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItemButton, ListItemText, OutlinedInput, Paper, Tab, Tooltip, Typography, useTheme } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useEffect, useState } from "react";
import LayoutAdmin, { LayoutContentAdmin } from "./layout/LayoutAdmin";
import { getAllCourseRole, getCourseRoleById, insertCourseRole, toggleAllowRole } from "../../../api/roleCourse";
import { handleApiResponse } from "../../../api/instance";
import { getSubRoleCourseByCourseId, insertSubRole } from "../../../api/subRole";
import { containsOnlySpaces } from "../../../js/String";
import DialogConfirm from "../../layouts/DialogCustom/DialogConfirm";
import DialogInput from "../../layouts/DialogCustom/DialogInput";
import HelpIcon from '@mui/icons-material/Help';
import { getAllLanguage } from "../../../api/language";


const ListData = ({ value, sx, onChange }) => {
    const [data, setData] = useState(value || []);
    const [selectedIndex, setSelectedIndex] = useState(0);
    

    useEffect(() => {
        setData(value);
    }, [value]);

    useEffect(()=>{
        console.log(data);
    },[data])
    const handleSelected = (e, value, index) => {
        setSelectedIndex(index);

        if (onChange) {
            onChange(value);
        }
    }
    const handleToggle = (e, index, item) => {
        let id = item.id;

        toggleAllowRole(id)
            .then(response => {
                handleApiResponse(response,
                    // success
                    (dataResponse) => {
                        let newData = data;
                        newData[index] = dataResponse;
                        setData(newData);
                    }
                )
            })
    }
    return (
        <List sx={{ ...sx }}>
            {
                data.map((item, index) => {
                    return (
                        <ListItemButton
                            key={item.id}
                            selected={selectedIndex === index}
                            onClick={(e) => handleSelected(e, item.id, index)}
                        >
                            <ListItemText primary={item.name} />
                            {/* <Tooltip title="Educator Không thể chọn thể loại này khi tắt đi">
                                <Button
                                    onClick={(e) => handleToggle(e, index, item)}
                                    color={item.allow ? "success" : "error"}
                                >
                                    {item.allow ? "Tắt" : "Bật"}
                                </Button>
                            </Tooltip> */}
                        </ListItemButton>
                    );
                })
            }
        </List>
    )
}

const RolesCourseList = ({ onSelect }) => {
    const [roles, setRoles] = useState([]);
    const [newRole, setRole] = useState("");
    const [openDialogAdd, setOpenDialogAdd] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    useEffect(() => {
        getAllCourseRole()
            .then(response => {
                handleApiResponse(response,
                    (allRoleResponse) => {
                        setRoles(allRoleResponse);
                        if (onSelect) {
                            onSelect(allRoleResponse[0].id);
                        }
                    }
                )
            })
    }, []);

    const handleOnChange = (value) => {
        if (onSelect) {
            onSelect(value);
        }
    }
    const handleToggleConfirm = () => {
        setOpenConfirm(!openConfirm);
    }

    const handleToggleAdd = () => {
        setOpenDialogAdd(!openConfirm);
    }
    const handleOnAdd = (namRole) => {
        let roleNew = {
            name: namRole
        }
        setRole(roleNew);
        handleToggleConfirm();
    }

    // sau khi xac nhan thi gui data
    const handleSendData = () => {
        insertCourseRole(newRole)
            .then(response => {
                handleApiResponse(response,
                    (roleResponse) => {
                        setRoles([
                            ...roles,
                            roleResponse
                        ]);
                    }
                )
            });
        handleToggleAdd();
        handleToggleConfirm();
    }
    const handleCloseAdd = () => {
        setOpenDialogAdd(false);
    }
    return (
        <>
            <DialogInput
                title={"Thêm thể loại con"}
                open={openDialogAdd}
                onCancel={handleCloseAdd}
                onSave={handleOnAdd}
            />
            <DialogConfirm
                title="Xác nhận thêm thể loại con"
                open={openConfirm}
                onCancel={handleToggleConfirm}
                onSave={handleSendData}
            >
                <Typography color={'error'}>{newRole?.name}</Typography>
            </DialogConfirm>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '95%'
            }}>
                <ListData sx={{ flex: 1 }}
                    onChange={handleOnChange}
                    value={roles} />
                <Button
                    onClick={handleToggleAdd}
                >Thêm</Button>
            </Box>
        </>
    );
};

const LanguageList = ({ }) => {
    const [languages, setLanguages] = useState([]);
    useEffect(() => {
        getAllLanguage()
            .then(response => {
                handleApiResponse(response,
                    (languagesResponse) => {
                        setLanguages(languagesResponse);
                    }
                )
            })
    }, []);

    const handleOnChange = () => {

    }
    const handleToggleAdd = () => {

    }
    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '95%'
            }}>
                <ListData sx={{ flex: 1 }}
                    onChange={handleOnChange}
                    value={languages} />
                <Button
                    onClick={handleToggleAdd}
                >Thêm</Button>
            </Box>
        </>
    );
}
const SubRolesCourse = ({ roleId }) => {
    const [subRolesCourse, setSubRolesCourse] = useState([]);
    const [newSubRolesCourse, setNewSubRolesCourse] = useState("");
    const [openDialogAdd, setOpenDialogAdd] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [role, setRole] = useState({});

    useEffect(() => {
        getSubRoleCourseByCourseId(roleId)
            .then(response => {
                handleApiResponse(response,
                    (subRolesResponse) => {
                        setSubRolesCourse(subRolesResponse);
                    }
                )
            })

        getCourseRoleById(roleId)
            .then(response => {
                handleApiResponse(response,
                    (roleResponse) => {
                        setRole(roleResponse);
                    }
                )
            })
    }, [roleId]);

    const handleToggleConfirm = () => {
        setOpenConfirm(!openConfirm);
    }
    const handleSendData = async () => {
        let subRoleNew = {
            name: newSubRolesCourse
        };

        console.log(subRoleNew)
        await insertSubRole(roleId, subRoleNew)
            .then(response => {
                handleApiResponse(response,
                    (subRoleResponse) => {
                        setSubRolesCourse([
                            ...subRolesCourse,
                            subRoleResponse
                        ]);
                    }
                )
            }
            )

        setOpenDialogAdd(false)
        setOpenConfirm(false)
    }

    const handleOnAdd = (value) => {
        setNewSubRolesCourse(value);
        setOpenConfirm(true);
    }

    const handleOpenAdd = () => {
        setOpenDialogAdd(true);
    }

    const handleCloseAdd = () => {
        setOpenDialogAdd(false);
    }
    return (
        <>
            <DialogInput
                title={"Thêm thể loại con"}
                open={openDialogAdd}
                onCancel={handleCloseAdd}
                onSave={handleOnAdd}
            />
            <DialogConfirm
                title="Xác nhận thêm thể loại con"
                open={openConfirm}
                onCancel={handleToggleConfirm}
                onSave={handleSendData}
            >
                <Typography fontWeight={'500'}>Thể loại cha {role?.name}</Typography>
                <Typography color='error' >{newSubRolesCourse}</Typography>
            </DialogConfirm>
            <Box sx={{
                display: 'flex',
                height: '95%',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <ListData
                    value={subRolesCourse}
                />
                <Button onClick={handleOpenAdd}>
                    Thêm
                </Button>
            </Box>
        </>
    )
}

export default function Data() {
    const [value, setValue] = useState('1');
    const [roleId, setRoleId] = useState();
    const theme = useTheme();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSelectRole = (role) => {
        console.log(role)
        setRoleId(role);
    }

    return (
        <>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Thể loại khóa học" value="1" />
                            <Tab label="Ngôn ngữ" value="2" />
                            <Tab label="Giá tiền đề xuất" value="3" />
                        </TabList>
                    </Box>
                    <LayoutAdmin>
                        <LayoutContentAdmin>
                            <TabPanel value="1">
                                <Box sx={{
                                    height: '780px',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center'
                                }}>
                                    <Paper sx={{
                                        width: '320px',
                                    }}>
                                        <Typography fontWeight={"500"}
                                            sx={{
                                                display: 'block',
                                                fontSize: "600",
                                                textAlign: 'center',
                                                margin: 'auto',
                                                my: theme.spacing(1)
                                            }}
                                        >Thể loại</Typography>
                                        <RolesCourseList
                                            onSelect={handleSelectRole}
                                        />
                                    </Paper>
                                    <Paper sx={{
                                        width: '320px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        marginLeft: theme.spacing(2)
                                    }}>
                                        <Typography fontWeight={"500"}
                                            sx={{
                                                fontSize: "600",
                                                textAlign: 'center',
                                                margin: 'auto'
                                            }}
                                        >Thể loại con</Typography>
                                        <SubRolesCourse
                                            roleId={roleId} />
                                    </Paper>
                                </Box>
                            </TabPanel>
                            <TabPanel value="2">
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>
                                    <Paper sx={{
                                        width: '600px'
                                    }}>
                                        <LanguageList />
                                    </Paper>
                                </Box>
                            </TabPanel>
                            <TabPanel value="3">Item Three</TabPanel>
                        </LayoutContentAdmin>
                    </LayoutAdmin>
                </TabContext>
            </Box>
        </>
    )
}