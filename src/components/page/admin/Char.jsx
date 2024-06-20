import { Box, Button, Card, CardContent, CardMedia, Chip, Collapse, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from "@mui/material";
import LayoutAdmin, { LayoutContentAdmin, LayoutHeaderAdmin } from "./layout/LayoutAdmin";
import { useContext, useEffect, useState } from "react";
import { handleApiResponse } from "../../../api/instance";
import { getAllEducator } from "../../../api/auth";
import AvatarCustom from "../../layouts/AvatarCustom";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { CreditScore } from "@mui/icons-material";
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import useCurrentUser from "../../../hook/useCurrentUser";
import { CurrentUserContext } from "../../../App";
import { getAllTakeWallet, updateTakeWallet } from "../../../api/pay/takeWallet";
import { grey } from "@mui/material/colors";
import { formatDateFromArray } from "../../../util/date";
import VisibilityIcon from '@mui/icons-material/Visibility';

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

function Row({ value, onSuccess, onFailed }) {
    const [wallet, setWallet] = useState(value);
    const [order, setOrder] = useState({});
    const [user, setUser] = useState({});
    const [open, setOpen] = useState(false);
    const [codePay, setCodePay] = useState('');
    const [note, setNote] = useState('Thanh toán qua VNPay');

    const {currentUser,setCurrentUser} = useContext(CurrentUserContext);

    useEffect(() => {
        setWallet(value);
        setUser(value.user);
    }, [value]);

    const toggleOpen = () => {
        setOpen(!open);
    }

    const handleSentData = () => {
        let walletRequest = {
            ...wallet,
            note:note,
            tradingCode: codePay,

        }

        updateTakeWallet(walletRequest)
        .then(response=>{
            handleApiResponse(response,
                // success
                (data)=>{
                    setWallet(data);
                    setCurrentUser({
                        ...currentUser,
                        wallet: currentUser.wallet - data.price
                    })
                }
            )
        })
        
    }

    const handleChangeCodePay = (e) => {
        let value = e.target.value;
        setCodePay(value);
    }
    const handleChangeNote = (e) => {
        let value = e.target.value;
        setNote(value);
    }

    return (
        <>
            <TableRow
                sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">
                    {wallet?.id}
                </TableCell>
                <TableCellInfo value={user} />
                <TableCell align="left">
                    <Button color={"success"}>
                        + {wallet?.price} VND
                    </Button>
                </TableCell>
                <TableCell>
                    <Chip color={wallet.get ? 'success' : 'error'} label={wallet.get ? "Đã chuyển" : "Yêu cầu"} />
                </TableCell>
                <TableCell>
                    {formatDateFromArray(wallet.dateRequest)}
                </TableCell>
                <TableCell>
                    <Button onClick={toggleOpen}>
                        <VisibilityIcon />
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow >
                <TableCell colSpan={6}>
                    <Collapse in={open}>
                        <Grid container>
                            <Grid item xs={4}>
                                <TextField label="Mã giao dịch"
                                defaultValue={wallet.tradingCode}
                                    onChange={handleChangeCodePay} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField label="Chú thích" defaultValue={"Thanh toán qua VNPay"}
                                    onChange={handleChangeNote} />
                            </Grid>
                            <Grid item xs={2}>
                                <Button sx={{
                                    width: '140px'
                                }}
                                    disabled= {wallet.get ? true : false}
                                    onClick={handleSentData}
                                    variant="contained">Thanh toán hoàn tất</Button>
                            </Grid>
                        </Grid>
                    </Collapse>
                </TableCell>
            </TableRow>

        </>
    );
}
function Char() {
    const theme = useTheme();
    const [countEducator, setCountEducator] = useState(0);
    const [walletNotGet, setWalletNotGet] = useState([]);

    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

    useEffect(() => {
        getAllTakeWallet()
            .then(response => {
                handleApiResponse(response,
                    handleApiResponse(response,
                        // success
                        (WalletResponse) => {
                            console.log(WalletResponse)
                            setWalletNotGet(WalletResponse);
                        }
                    )
                )
            })
    }, []);

    return (
        <LayoutAdmin sx={{ backgroundColor: "#ffff" }}>
            <LayoutHeaderAdmin>
                Tổng quan
            </LayoutHeaderAdmin>
            <LayoutContentAdmin>
                <Grid container spacing={3}>
                    <CarInfo
                        title={"Tổng tiền"}
                        title1={`+ ${currentUser.wallet} VND`}
                        title2={`+ ${0} VND tháng này`}
                        icon={<Button color="success"><LocalAtmIcon /></Button>} />
                    <CarInfo
                        title={"Giang Viên đăng ký"}
                        title1={` ${walletNotGet.length} Giảng viên `}
                        title2={` ${walletNotGet.length} Giảng viên tháng nay`}
                        icon={<Button color="error"><CreditScore /></Button>} />
                </Grid>
                <Paper>
                    <Typography>Danh Yêu cầu rút tiền</Typography>
                    <Box>
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: grey[300] }}>
                                        <TableCell align='left' sx={{ width: theme.spacing(10) }}>ID</TableCell>
                                        <TableCell align="left">INFO</TableCell>
                                        <TableCell align="left">Money</TableCell>
                                        <TableCell align="left">Status</TableCell>
                                        <TableCell align="left">Date</TableCell>
                                        <TableCell align="left">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        walletNotGet.map((wallet,index) => {
                                            return <Row value={wallet} />
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Paper>
            </LayoutContentAdmin>
        </LayoutAdmin>
    );
}

export default Char;