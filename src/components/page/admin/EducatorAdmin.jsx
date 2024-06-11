
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { grey } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import PhoneIcon from '@mui/icons-material/Phone';
import PlaceIcon from '@mui/icons-material/Place';

import { Avatar, Button, Divider, FormControl, Grid, Icon, Input, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, styled } from '@mui/material';
import theme from '../../../theme';
import React, { useEffect, useState } from 'react';
import { getAllEducator } from '../../../api/auth';
import { handleApiRequest, handleApiResponse } from '../../../api/instance';
import LayoutAdmin, { LayoutContentAdmin } from './layout/LayoutAdmin';
import AvatarCustom from '../../layouts/AvatarCustom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const colorGrey = grey[200];
const ButtonAction = styled(Button)({
    padding: 0,
    minWidth: '30px',
    height: '30px',
    marginLeft: theme.spacing(2)
});

const ContentWeight = styled(Typography)({
    fontWeight: '500'
});

const Content = styled(Typography)({
    color: grey[600]
})

function TableCellInfo({ educator }) {

    return (
        <TableCell align="right">
            <Box sx={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row'

                }}>
                    <Box sx={{
                        width: '30px',
                        height: '30px',
                    }}>
                        <AvatarCustom
                            src={educator.avatar}
                            name={educator.username} />
                    </Box>
                    <Box>
                        <Typography sx={{
                            fontWeight: '500'
                        }}
                        >{`${educator.lastName} ${educator.firstName}`}</Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography align='left' sx={{
                        fontSize: '12px',
                    }}
                    >{`${educator.email}`}</Typography>
                </Box>
            </Box>
        </TableCell>
    )
}

function RownIconText({ iconComponent, title, content }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: theme.spacing(2) }}>
            <Box sx={{ display: 'flex', flex: 'row' }}>
                <Icon component={iconComponent} sx={{ marginRight: theme.spacing(1) }} />
                <Typography >
                    {title}
                </Typography>
            </Box>
            <Box>
                <Typography fontSize={'15px'}>{content}</Typography>
            </Box>
        </Box>
    );
}

function RowMoreInfoEducator({ open, value }) {
    const [user, setUser] = useState(value);
    const [educator, setEducator] = useState({});

    useEffect(() => {
        setUser(value);
        setEducator(value.educator);
    }, [value]);

    return (
        <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid container spacing={4} sx={{ height: '500px', padding: theme.spacing(3, 0, 2, 10), marginTop: 0, backgroundColor: grey[50] }}>
                <Grid item xs={4} sx={{ height: '100%' }}>
                    <Paper sx={{ height: '100%', padding: theme.spacing(2) }}>
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            margin: theme.spacing(3, 0),
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}>
                            <Box sx={{ width: '60px', height: '60px' }}>
                                <AvatarCustom
                                    src={user.avatar}
                                    name={user.name} />
                            </Box>
                            <Box>
                                <ContentWeight align='center'>{`${user.lastName} ${user.firstName}`}</ContentWeight>
                                <Content align='center'>{`${educator.biography}`}</Content>
                            </Box>
                        </Box>
                        <Divider />
                        <Grid container sx={{ py: theme.spacing(3) }}>
                            <Grid item xs={4} sx={{ borderRight: '1px solid #ccc', display: 'flex', alignItems: 'center' }}>
                                <Content>Khóa học</Content>
                            </Grid>
                            <Grid item xs={4} sx={{ borderRight: '1px solid #ccc' }}>
                                <ContentWeight align='center'>55</ContentWeight>
                                <Content align='center'>Đã tạo</Content>
                            </Grid>
                            <Grid item xs={4} sx={{}}>
                                <ContentWeight align='center'>55</ContentWeight>
                                <Content align='center'>Đã bán</Content>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Box sx={{ margin: theme.spacing(2, 0) }}>
                            <RownIconText
                                iconComponent={MailOutlineIcon}
                                title={'Email'}
                                content={user.email} />
                            <RownIconText
                                iconComponent={PhoneIcon}
                                title={'Phone'}
                                content={user.phone}
                            />
                            <RownIconText
                                iconComponent={PlaceIcon}
                                title={'Địa chỉ'}
                                content={user.address}
                            />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }} >
                    <Paper sx={{}}>
                        <Box sx={{ padding: theme.spacing(2, 2) }}>
                            <ContentWeight>Thông tin cá nhân</ContentWeight>
                        </Box>
                        <Divider />
                        <Box sx={{ padding: theme.spacing(2, 3) }}>
                            <Grid container sx={{ height: theme.spacing(8), padding: theme.spacing(0.5, 3) }} >
                                <Grid item xs={6}>
                                    <Content>Họ</Content>
                                    <ContentWeight>{user.lastName}</ContentWeight>
                                </Grid>
                                <Grid item xs={6}>
                                    <Content>Tên</Content>
                                    <ContentWeight>{user.firstName}</ContentWeight>
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid container sx={{ height: theme.spacing(8), padding: theme.spacing(0.5, 3) }} >
                                <Grid item xs={6}>
                                    <Content>Thành Phố</Content>
                                    <Content>{user.city}</Content>
                                </Grid>
                                <Grid item xs={6} >
                                    <Content>Zip Code</Content>
                                    <Content>{user.zipCode}</Content>
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid container sx={{ height: theme.spacing(8), padding: theme.spacing(0.5, 3) }} >
                                <Grid item  >
                                    <Content>Address</Content>
                                    <ContentWeight>{user.address}</ContentWeight>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                    <Paper sx={{ marginTop: theme.spacing(2), flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                        <Box sx={{ padding: theme.spacing(1, 2) }}>
                            <Content>About me</Content>
                        </Box>
                        <Divider />
                        <Box sx={{ padding: theme.spacing(2, 2), overflow: 'auto' }}>
                            <Typography>{educator.description}</Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Collapse>
    );
}
function Row({ value }) {
    const [user, setUser] = useState(value);
    const [educator, setEducator] = useState({});
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setUser(value);
        setEducator(value.educator);
    }, [value]);

    const handleToggleOpenRow = () =>
        setOpen(!open);


    return (
        <React.Fragment>
            <TableRow
                sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">
                    {user?.id}
                </TableCell>
                <TableCellInfo educator={user} />
                <TableCell align="left">{user?.phone}</TableCell>
                <TableCell align="left">{user?.fat}</TableCell>
                <TableCell align="left">{user?.carbs}</TableCell>
                <TableCell align="left">
                    <ButtonAction
                        onClick={handleToggleOpenRow}
                        color={!open ? 'secondary' : 'error'}>
                        {open ? <CloseIcon /> : <VisibilityOutlinedIcon />}
                    </ButtonAction>
                    <ButtonAction>
                        <EditIcon />
                    </ButtonAction>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <RowMoreInfoEducator
                        open={open}
                        value={user} />
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function InputSearch({ placeholder, sx }) {

    return (
        <FormControl >
            <OutlinedInput
                sx={{
                    height: theme.spacing(5),
                    ...sx
                }}
                placeholder={placeholder || "Tìm kiếm"}
                endAdornment={
                    <InputAdornment position='end'>
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                }
            />

        </FormControl>
    );
}

function SortBySelect({ onChange }) {
    const [value, setValue] = useState("");

    const handleOnChange = (e) => {
        let valueItem = e.target.value;
        setValue(valueItem);
        if (onChange) {
            onChange(value);
        }
    }
    return (
        <FormControl >
            <InputLabel sx={{
                overflow: "visible",
                lineHeight: '0.4370em',
                '&.Mui-focused': {
                    lineHeight: '1.436em',
                }
            }}
                id="sort-by-label">Sort by</InputLabel>
            <Select
                labelId="sort-by-label"
                id="sort-by-label"
                label="Sort by"
                sx={{
                    height: theme.spacing(5),
                    width: theme.spacing(20)
                }}
                onChange={handleOnChange}
            >
                {/* <MenuItem value="">
                    <em>Sort by</em>
                </MenuItem> */}
                <MenuItem value={"id"}>ID</MenuItem>
                <MenuItem value={'name'}>name</MenuItem>
                <MenuItem value={'phone'}>Phone</MenuItem>
                <MenuItem value={'course total'}>Course total</MenuItem>
            </Select>
        </FormControl>
    )
}

export default function EducatorAdmin() {
    const [educators, setEducators] = useState([]);

    useEffect(() => {
        getAllEducator()
            .then(response => {
                handleApiResponse(response,
                    // success
                    (educatorResponse) => {
                        setEducators(educatorResponse);
                    }
                )
            })
    }, [])
    return (
        <LayoutAdmin>
            <LayoutContentAdmin sx={{ backgroundColor: 'inherit', marginTop: 0, paddingTop: theme.spacing(2) }}>
                <Typography variant='h5' fontWeight={'500'}>List Educator</Typography>
            </LayoutContentAdmin>
            <LayoutContentAdmin>
                <Box sx={{ padding: theme.spacing(2), display: 'flex' }}>
                    <InputSearch sx={{marginRight: theme.spacing(2)}} />
                    <SortBySelect />
                </Box>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: colorGrey }}>
                                <TableCell align='left' sx={{ width: theme.spacing(10) }}>ID</TableCell>
                                <TableCell align="left">INFO</TableCell>
                                <TableCell align="left">PHONE</TableCell>
                                <TableCell align="left">COURSE</TableCell>
                                <TableCell align="left">STATUS</TableCell>
                                <TableCell align="left">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {educators.map((educator) => {
                                return (
                                    <Row value={educator} key={educator.id} />
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </LayoutContentAdmin>
        </LayoutAdmin>
    );
}
