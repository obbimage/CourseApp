import { CreditScore } from "@mui/icons-material";
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { Box, Button, Dialog, DialogActions, DialogContent, Grid, Icon, Paper, Slider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../../App";
import { handleApiRequest, handleApiResponse } from "../../../api/instance";
import { getOrderDetailByUserId } from "../../../api/orderDetail";
import { formatDateFromArray } from "../../../util/date";
import AvatarCustom from "../../layouts/AvatarCustom";
import LayoutAdmin, { LayoutContentAdmin } from "../admin/layout/LayoutAdmin";
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import { getWallet } from "../../../api/auth";
import { getCourseByUserId } from "../../../api/course";
import { insertTakeWallet } from "../../../api/pay/takeWallet";
const colorGrey = grey[200];

function TableCellInfo({ value }) {
    const theme = useTheme();
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
                        marginRight: theme.spacing(0.5)
                    }}>
                        <AvatarCustom
                            src={value.avatar}
                            name={value.username} />
                    </Box>
                    <Box>
                        <Typography sx={{
                            fontWeight: '500'
                        }}
                        >{`${value.lastName} ${value.firstName}`}</Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography align='left' sx={{
                        fontSize: '12px',
                    }}
                    >{`${value.email}`}</Typography>
                </Box>
            </Box>
        </TableCell>
    )
}
function Row({ value }) {
    const [orderDetail, setOrderDetail] = useState(value);
    const [order, setOrder] = useState({});
    const [userByCourse, setUserByCourse] = useState({});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOrderDetail(value);
        setOrder(orderDetail.order);
        setUserByCourse(orderDetail.order.user);
    }, [value]);

    const handleToggleOpenRow = () =>
        setOpen(!open);


    return (
        <>
            <TableRow
                sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">
                    {order?.id}
                </TableCell>
                <TableCellInfo value={userByCourse} />
                <TableCell align="left">
                    <Button color={"success"}>
                        + {orderDetail?.price} VND
                    </Button>
                </TableCell>
                <TableCell>
                    {formatDateFromArray(orderDetail.order.orderDate)}
                </TableCell>
            </TableRow>

        </>
    );
}


function CarInfo({ title, title1, title2, icon }) {
    const theme = useTheme();
    return (
        <Grid item xs={3} sx={{ minWidth: 0, paddingTop: '0' }}>
            <Paper sx={{ display: 'flex', justifyContent: 'space-between', padding: theme.spacing(2, 3) }}>
                <Box>
                    <Typography variant="body2">{title}</Typography>
                    <Typography variant="h6">{title1}</Typography>
                    <Typography variant="body2">{title2}</Typography>
                </Box>
                {icon}
            </Paper>
        </Grid>
    )
}

function CardButton({ content, icon, onClick }) {
    const theme = useTheme();

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    }
    return (
        <Grid item xs={2}>
            <Paper sx={{ width: '100%' }}>
                <Button
                    onClick={handleClick}
                    color="success" sx={{ width: '100%', marginRight: theme.spacing(1) }}>
                    {icon}
                    <Typography sx={{ marginLeft: theme.spacing(1) }}>
                        {content}
                    </Typography>
                </Button>
            </Paper>
        </Grid>
    )
}

function TakeWallet({ open, max, onClose, onSuccess }) {

    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

    const [price, setPrice] = useState(0); // số tiền muốn rút
    const [numberBank, setNumberBank] = useState("");

    function valuetext(value) {
        setPrice(value);
    }

    const handleTake = () => {
        if (onClose) {
            onClose();
        }

        let walletRequest = {
            price: price,
            numberBank: numberBank,
            nameBank: "VNPay"
        }



        insertTakeWallet(currentUser.id, walletRequest)
            .then(response => {
                handleApiResponse(response,
                    // success
                    (data) => {
                        console.log('get wallet: ', data);
                        handleSuccess();
                    }
                )
            })
    }

    const handleSuccess = () => {
        if (onSuccess)
            onSuccess(price);
    }

    const handleChangeNumBerBank = (e) => {
        let value = e.target.value;
        setNumberBank(value);
    }


    return (
        <Dialog open={open} >
            <DialogContent sx={{ width: '450px' }}>
                <Box sx={{ width: "100%" }}>
                    <Typography>Bạn muốn rút bao nhiêu?</Typography>
                    <Typography fontWeight={"600"}>{price} VND</Typography>
                    <Slider
                        sx={{
                            width: "95%"
                        }}
                        aria-label="Temperature"
                        defaultValue={0}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        shiftStep={30}
                        step={10000}
                        marks
                        min={0}
                        max={max}
                    />
                </Box>
                <Box>
                    <Typography>Nhập Số tài khoản VnPay:</Typography>
                    <Typography variant="body2" >Kiểm tra số tài khoản trước khi yêu cầu</Typography>
                    <TextField sx={{ width: '100%' }}
                        onChange={handleChangeNumBerBank}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleTake}>
                    Yêu cầu rút
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default function CharEducator() {
    const theme = useTheme();
    const [orderDetails, setOrderDetails] = useState([]);
    const [courses, setCourses] = useState([]);
    const [wallet, setWallet] = useState(0);

    const [openTakeWallet, setOpenTakeWallet] = useState(false);

    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);


    useEffect(() => {
        let userId = currentUser.id;
        getOrderDetailByUserId(userId)
            .then(response => {
                handleApiResponse(response,
                    //success
                    (orderDetailResponse) => {
                        setOrderDetails(orderDetailResponse);

                    }
                )
            })

        getWallet()
            .then(response => {
                handleApiResponse(response,
                    //sucess
                    (walletResponse) => {
                        setWallet(walletResponse);
                    }
                )
            });

        getCourseByUserId(userId)
            .then(response => {
                handleApiResponse(response,
                    // success
                    (coursesResponse) => {
                        setCourses(coursesResponse);
                    }
                )
            })
    }, [currentUser]);

    const handleSuccessWallet = (price) => {
        setWallet(price);
    }

    const handleColseWallet = () => {
        setOpenTakeWallet(false);
    }
    const handleOpenWallet = () => {
        setOpenTakeWallet(true);
    }
    return (
        <LayoutAdmin sx={{ p: theme.spacing(3), width: '100%', backgroundColor: '#ffff' }}>
            <TakeWallet
                open={openTakeWallet}
                onClose={handleColseWallet}
                onSuccess={handleSuccessWallet}
                max={wallet} />
            <LayoutContentAdmin sx={{ marginTop: '0', backgroundColor: '#ffff' }}>
                <Box sx={{ backgroundColor: 'initial', marginBottom: theme.spacing(4) }}>
                    <Grid container spacing={3}>
                        <CarInfo
                            title={"Tổng tiền"}
                            title1={`+ ${wallet} VND`}
                            title2={`+ ${wallet} VND tháng này`}
                            icon={<Button color="success"><LocalAtmIcon /></Button>} />
                        <CarInfo
                            title={"Khóa học đã tạo"}
                            title1={` ${courses.length} Khóa học `}
                            title2={` ${courses.length} khóa học tháng này`}
                            icon={<Button color="error"><CreditScore /></Button>} />
                        <CarInfo
                            title={"Khóa học đã đăng"}
                            title1={`+ ${courses.length} Khóa`}
                            title2={`+ ${courses.length} Khóa tháng này`}
                            icon={<Button color="warning"><CastForEducationIcon /></Button>} />
                        <CardButton
                            onClick={handleOpenWallet}
                            icon={<PointOfSaleIcon />}
                            content="rút tiền"
                        />
                    </Grid>
                </Box>
                <Box>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: colorGrey }}>
                                    <TableCell align='left' sx={{ width: theme.spacing(10) }}>ID</TableCell>
                                    <TableCell align="left">INFO</TableCell>
                                    <TableCell align="left">Money</TableCell>
                                    <TableCell align="left">Date buying</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orderDetails.map((orderDetail) => {
                                    return (
                                        <Row value={orderDetail} key={orderDetail.id} />
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </LayoutContentAdmin>
        </LayoutAdmin>
    )
}