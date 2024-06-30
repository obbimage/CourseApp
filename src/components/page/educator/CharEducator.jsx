import { CreditScore } from "@mui/icons-material";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import {
  Box,
  Button,
  Chip,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Icon,
  Paper,
  Slider,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../../App";
import { handleApiRequest, handleApiResponse } from "../../../api/instance";
import { getOrderDetailByUserId } from "../../../api/orderDetail";
import { formatDateFromArray } from "../../../util/date";
import AvatarCustom from "../../layouts/AvatarCustom";
import LayoutAdmin, { LayoutContentAdmin } from "../admin/layout/LayoutAdmin";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import { getWallet } from "../../../api/auth";
import { getCourseByUserId } from "../../../api/course";
import {
  getTakeWalletByGet,
  insertTakeWallet,
} from "../../../api/pay/takeWallet";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { AlertFeddback } from "../../feedback/AlertFeedback";
import VisibilityIcon from "@mui/icons-material/Visibility";
const colorGrey = grey[200];

function TableCellInfo({ value }) {
  const theme = useTheme();
  return (
    <TableCell align="right">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              width: "30px",
              height: "30px",
              marginRight: theme.spacing(0.5),
            }}
          >
            <AvatarCustom src={value?.avatar} name={value?.username} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontWeight: "500",
              }}
            >{`${value?.lastName} ${value?.firstName}`}</Typography>
          </Box>
        </Box>
        <Box>
          <Typography
            align="left"
            sx={{
              fontSize: "12px",
            }}
          >{`${value?.email}`}</Typography>
        </Box>
      </Box>
    </TableCell>
  );
}
function Row({ value }) {
  const [orderDetail, setOrderDetail] = useState(value);
  const [order, setOrder] = useState({});
  const [userByCourse, setUserByCourse] = useState({});
  const [open, setOpen] = useState(false);
  console.log(value);

  useEffect(() => {
    setOrderDetail(value);
    setOrder(orderDetail?.order);
    setUserByCourse(orderDetail?.order?.user);
  }, [value]);

  const handleToggleOpenRow = () => setOpen(!open);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {order?.id}
        </TableCell>
        <TableCellInfo value={userByCourse} />
        <TableCell align="left">
          <Button color={"success"}>+ {orderDetail?.price} VND</Button>
        </TableCell>
        <TableCell>
          {formatDateFromArray(orderDetail?.order?.orderDate)}
        </TableCell>
      </TableRow>
    </>
  );
}

function Row2({ value, onSuccess, onFailed }) {
  const [wallet, setWallet] = useState(value);
  const [order, setOrder] = useState({});
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [codePay, setCodePay] = useState("");
  const [note, setNote] = useState("Thanh toán qua VNPay");

  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [alert, setAlert] = useState("");

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    setWallet(value);
    setUser(value.user);
  }, [value]);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleSentData = () => {
    let walletRequest = {
      ...wallet,
      note: note,
      tradingCode: codePay,
    };
  };

  const handleChangeCodePay = (e) => {
    let value = e.target.value;
    setCodePay(value);
  };
  const handleChangeNote = (e) => {
    let value = e.target.value;
    setNote(value);
  };

  return (
    <>
      <AlertFeddback open={openAlert} alert={alert} severity={severity} />
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {wallet?.id}
        </TableCell>
        <TableCellInfo value={user} />
        <TableCell align="left">
          <Button color={"success"}>+ {wallet?.price} VND</Button>
        </TableCell>
        <TableCell>
          <Chip
            color={wallet.get ? "success" : "error"}
            label={wallet.get ? "Đã chuyển" : "Yêu cầu"}
          />
        </TableCell>
        <TableCell>{formatDateFromArray(wallet.dateRequest)}</TableCell>
        <TableCell>
          <Button onClick={toggleOpen}>
            <VisibilityIcon />
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6}>
          <Collapse in={open}>
            <Grid container>
              <Grid item xs={4}>
                <TextField
                  label="Mã giao dịch"
                  defaultValue={wallet.tradingCode}
                  onChange={handleChangeCodePay}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Chú thích"
                  defaultValue={"Thanh toán qua VNPay"}
                  onChange={handleChangeNote}
                />
              </Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function CarInfo({ title, title1, title2, icon }) {
  const theme = useTheme();
  return (
    <Grid item xs={3} sx={{ minWidth: 0, paddingTop: "0" }}>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: theme.spacing(2, 3),
        }}
      >
        <Box>
          <Typography variant="body2">{title}</Typography>
          <Typography variant="h6">{title1}</Typography>
          <Typography variant="body2">{title2}</Typography>
        </Box>
        {icon}
      </Paper>
    </Grid>
  );
}

function CardButton({ content, icon, onClick }) {
  const theme = useTheme();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <Grid item xs={2}>
      <Paper sx={{ width: "100%" }}>
        <Button
          onClick={handleClick}
          color="success"
          sx={{ width: "100%", marginRight: theme.spacing(1) }}
        >
          {icon}
          <Typography sx={{ marginLeft: theme.spacing(1) }}>
            {content}
          </Typography>
        </Button>
      </Paper>
    </Grid>
  );
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
      nameBank: "VNPay",
    };

    insertTakeWallet(currentUser.id, walletRequest).then((response) => {
      handleApiResponse(
        response,
        // success
        (data) => {
          console.log("get wallet: ", data);
          handleSuccess();
        }
      );
    });
  };

  const handleSuccess = () => {
    if (onSuccess) onSuccess(price);
  };

  const handleChangeNumBerBank = (e) => {
    let value = e.target.value;
    setNumberBank(value);
  };

  return (
    <Dialog open={open}>
      <DialogContent sx={{ width: "450px" }}>
        <Box sx={{ width: "100%" }}>
          <Typography>Bạn muốn rút bao nhiêu?</Typography>
          <Typography fontWeight={"600"}>{price} VND</Typography>
          <Slider
            sx={{
              width: "95%",
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
          <Typography variant="body2">
            Kiểm tra số tài khoản trước khi yêu cầu
          </Typography>
          <TextField sx={{ width: "100%" }} onChange={handleChangeNumBerBank} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleTake}>Yêu cầu rút</Button>
      </DialogActions>
    </Dialog>
  );
}
export default function CharEducator() {
  const theme = useTheme();
  const [orderDetails, setOrderDetails] = useState([]);
  const [courses, setCourses] = useState([]);
  const [wallet, setWallet] = useState(0);
  const [currentTab, setCurrentTab] = useState("1");
  const [walletNotGet, setWalletNotGet] = useState([]);

  const [openTakeWallet, setOpenTakeWallet] = useState(false);

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    let userId = currentUser.id;
    getOrderDetailByUserId(userId).then((response) => {
      handleApiResponse(
        response,
        //success
        (orderDetailResponse) => {
          setOrderDetails(orderDetailResponse);
        }
      );
    });

    getTakeWalletByGet(false).then((response) => {
      handleApiResponse(
        response,
        handleApiResponse(
          response,
          // success
          (WalletResponse) => {
            setWalletNotGet(WalletResponse);
          },
          // falied
          (err) => {}
        )
      );
    });

    getWallet().then((response) => {
      handleApiResponse(
        response,
        //sucess
        (walletResponse) => {
          setWallet(walletResponse);
        }
      );
    });

    getCourseByUserId(userId).then((response) => {
      handleApiResponse(
        response,
        // success
        (coursesResponse) => {
          setCourses(coursesResponse);
        }
      );
    });
  }, [currentUser]);

  const handleChangeTab = (e, tabClick) => {
    setCurrentTab(tabClick);
  };

  const handleSuccessWallet = (price) => {
    setWallet(price);
  };

  const handleColseWallet = () => {
    setOpenTakeWallet(false);
  };
  const handleOpenWallet = () => {
    setOpenTakeWallet(true);
  };
  return (
    <LayoutAdmin
      sx={{ p: theme.spacing(3), width: "100%", backgroundColor: "#ffff" }}
    >
      <TakeWallet
        open={openTakeWallet}
        onClose={handleColseWallet}
        onSuccess={handleSuccessWallet}
        max={wallet}
      />
      <LayoutContentAdmin sx={{ marginTop: "0", backgroundColor: "#ffff" }}>
        <Box
          sx={{ backgroundColor: "initial", marginBottom: theme.spacing(4) }}
        >
          <Grid container spacing={3}>
            <CarInfo
              title={"Tổng tiền"}
              title1={`+ ${wallet} VND`}
              title2={`+ ${wallet} VND tháng này`}
              icon={
                <Button color="success">
                  <LocalAtmIcon />
                </Button>
              }
            />
            <CarInfo
              title={"Khóa học đã tạo"}
              title1={` ${courses.length} Khóa học `}
              title2={` ${courses.length} khóa học tháng này`}
              icon={
                <Button color="error">
                  <CreditScore />
                </Button>
              }
            />
            <CarInfo
              title={"Khóa học đã đăng"}
              title1={`+ ${courses.length} Khóa`}
              title2={`+ ${courses.length} Khóa tháng này`}
              icon={
                <Button color="warning">
                  <CastForEducationIcon />
                </Button>
              }
            />
            <CardButton
              onClick={handleOpenWallet}
              icon={<PointOfSaleIcon />}
              content="rút tiền"
            />
          </Grid>
        </Box>

        <Box>
          <TabContext value={currentTab}>
            <Box>
              <TabList onChange={handleChangeTab}>
                <Tab label="Danh sách người mua" value="1" />
                <Tab label="Lịch sử gút tiền" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: colorGrey }}>
                      <TableCell align="left" sx={{ width: theme.spacing(10) }}>
                        ID
                      </TableCell>
                      <TableCell align="left">INFO</TableCell>
                      <TableCell align="left">Money</TableCell>
                      <TableCell align="left">Date buying</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderDetails.map((orderDetail) => {
                      return <Row value={orderDetail} key={orderDetail.id} />;
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value="2">
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: grey[300] }}>
                      <TableCell align="left" sx={{ width: theme.spacing(10) }}>
                        ID
                      </TableCell>
                      <TableCell align="left">INFO</TableCell>
                      <TableCell align="left">Money</TableCell>
                      <TableCell align="left">Status</TableCell>
                      <TableCell align="left">Date</TableCell>
                      <TableCell align="left">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {walletNotGet.map((wallet, index) => {
                      return wallet.user.id === currentUser.id ? (
                        <Row2 value={wallet} />
                      ) : (
                        <></>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
          </TabContext>
        </Box>
      </LayoutContentAdmin>
    </LayoutAdmin>
  );
}
