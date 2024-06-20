import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import Paper from "@mui/material/Paper";
import { grey } from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";

import {
  Avatar,
  Button,
  Divider,
  FormControl,
  Grid,
  Icon,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  TextField,
  styled,
} from "@mui/material";
import theme from "../../../theme";
import React, { useEffect, useState } from "react";
import { findeEducators, getAllEducator, insertUser } from "../../../api/auth";
import { handleApiRequest, handleApiResponse } from "../../../api/instance";
import LayoutAdmin, { LayoutContentAdmin } from "./layout/LayoutAdmin";
import AvatarCustom from "../../layouts/AvatarCustom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const colorGrey = grey[200];
const ButtonAction = styled(Button)({
  padding: 0,
  minWidth: "30px",
  height: "30px",
  marginLeft: theme.spacing(2),
});

const ContentWeight = styled(Typography)({
  fontWeight: "500",
});

const Content = styled(Typography)({
  color: grey[600],
});

function TableCellInfo({ educator }) {
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
            gap: "8px",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "30px",
              height: "30px",
            }}
          >
            <AvatarCustom src={educator.avatar} name={educator.username} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontWeight: "500",
              }}
            >{`${educator.lastName} ${educator.firstName}`}</Typography>
            <Box>
              <Typography
                align="left"
                sx={{
                  fontSize: "12px",
                }}
              >{`${educator.email}`}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </TableCell>
  );
}

function RownIconText({ iconComponent, title, content }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: theme.spacing(2),
      }}
    >
      <Box sx={{ display: "flex", flex: "row" }}>
        <Icon
          component={iconComponent}
          sx={{ marginRight: theme.spacing(1) }}
        />
        <Typography>{title}</Typography>
      </Box>
      <Box>
        <Typography fontSize={"15px"}>{content}</Typography>
      </Box>
    </Box>
  );
}

function RowMoreInfoEducator({ open, value, editMode, setEditMode }) {
  const [user, setUser] = useState(value);
  const [educator, setEducator] = useState({});
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [city, setCity] = useState(user.city);
  const [zipCode, setZipCode] = useState(user.zipCode);
  const [address, setAddress] = useState(user.address);
  const [description, setDescription] = useState(user.educator.description);
  const [updateUserState, setUpdateUserState] = useState(value);

  useEffect(() => {
    setUser(value);
    setEducator(value.educator);
  }, [value]);

  const handleChangeFirst = (e) => {
    setFirstName(e.target.value);
    setUpdateUserState({ ...updateUserState, firstName: e.target.value });
  };
  const handleChangeLast = (e) => {
    setLastName(e.target.value);
    setUpdateUserState({ ...updateUserState, lastName: e.target.value });
  };
  const handleChangeCity = (e) => {
    setCity(e.target.value);
    setUpdateUserState({ ...updateUserState, city: e.target.value });
  };
  const handleChangeZipCode = (e) => {
    setZipCode(e.target.value);

    setUpdateUserState({ ...updateUserState, zipCode: e.target.value });
  };
  const handleChangeAddress = (e) => {
    setAddress(e.target.value);

    setUpdateUserState({ ...updateUserState, address: e.target.value });
  };
  const handleChangeDesc = (e) => {
    setDescription(e.target.value);
    setUpdateUserState({
      ...updateUserState,
      educator: {
        description: e.target.value,
        biography: user.educator.biography,
        id: user.educator.id,
      },
    });
  };

  const handleSubmit = () => {
    // update info user
    insertUser(updateUserState).then((response) => {
      handleApiResponse(
        response,
        // request success
        (userResponse) => {
          setUser(userResponse);
        },
        // request error
        (err) => {
          console.log("edit error");
        }
      );
    });
    setEditMode(false);
  };

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Grid
        container
        spacing={4}
        sx={{
          height: "500px",
          mt: "0px",
          mb: "16px",
        }}
      >
        <Grid item xs={4} sx={{ height: "100%" }}>
          <Paper sx={{ height: "100%", padding: theme.spacing(2) }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                margin: theme.spacing(3, 0),
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box sx={{ width: "60px", height: "60px" }}>
                <AvatarCustom src={user.avatar} name={user.name} />
              </Box>
              <Box>
                <ContentWeight align="center">{`${user.lastName} ${user.firstName}`}</ContentWeight>
                <Content align="center">{`${educator.biography}`}</Content>
              </Box>
            </Box>
            <Divider />
            <Grid container sx={{ py: theme.spacing(3) }}>
              <Grid
                item
                xs={4}
                sx={{
                  borderRight: "1px solid #ccc",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Content>Khóa học</Content>
              </Grid>
              <Grid item xs={4} sx={{ borderRight: "1px solid #ccc" }}>
                <ContentWeight align="center">55</ContentWeight>
                <Content align="center">Đã tạo</Content>
              </Grid>
              <Grid item xs={4} sx={{}}>
                <ContentWeight align="center">55</ContentWeight>
                <Content align="center">Đã bán</Content>
              </Grid>
            </Grid>
            <Divider />
            <Box sx={{ margin: theme.spacing(2, 0) }}>
              <RownIconText
                iconComponent={MailOutlineIcon}
                title={"Email"}
                content={user.email}
              />
              <RownIconText
                iconComponent={PhoneIcon}
                title={"Phone"}
                content={user.phone}
              />
              <RownIconText
                iconComponent={PlaceIcon}
                title={"Địa chỉ"}
                content={user.address}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid
          item
          xs={8}
          sx={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <Paper sx={{}}>
            <Box sx={{ padding: theme.spacing(2, 2) }}>
              <ContentWeight>Thông tin cá nhân</ContentWeight>
            </Box>
            <Divider />
            <Box sx={{ padding: theme.spacing(2, 3) }}>
              <Grid
                container
                spacing={2}
                sx={{
                  height: theme.spacing(8),
                  padding: theme.spacing(0.5, 3),
                }}
              >
                <Grid item xs={6}>
                  <TextField
                    id="outlined-read-only-input"
                    label="Họ"
                    size="small"
                    defaultValue={user.lastName}
                    InputProps={{
                      readOnly: editMode,
                    }}
                    value={lastName}
                    onChange={handleChangeLast}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-read-only-input"
                    label="Tên"
                    defaultValue={user.firstName}
                    size="small"
                    InputProps={{
                      readOnly: editMode,
                    }}
                    value={firstName}
                    onChange={handleChangeFirst}
                  />
                </Grid>
              </Grid>
              <Divider />
              <Grid
                container
                spacing={2}
                sx={{
                  height: theme.spacing(8),
                  padding: theme.spacing(0.5, 3),
                }}
              >
                <Grid item xs={6}>
                  <TextField
                    id="outlined-read-only-input"
                    label="Thành Phố"
                    defaultValue={user.city}
                    size="small"
                    InputProps={{
                      readOnly: editMode,
                    }}
                    value={city}
                    onChange={handleChangeCity}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-read-only-input"
                    label="Zip Code"
                    defaultValue={user.zipCode}
                    size="small"
                    InputProps={{
                      readOnly: editMode,
                    }}
                    value={zipCode}
                    onChange={handleChangeZipCode}
                  />
                </Grid>
              </Grid>
              <Divider />
              <Grid
                container
                spacing={2}
                sx={{
                  height: theme.spacing(8),
                  padding: theme.spacing(0.5, 3),
                }}
              >
                <Grid item>
                  <TextField
                    id="outlined-read-only-input"
                    label="Address"
                    defaultValue={user.address}
                    size="small"
                    InputProps={{
                      readOnly: editMode,
                    }}
                    value={address}
                    onChange={handleChangeAddress}
                  />
                </Grid>
              </Grid>
            </Box>
          </Paper>
          <Paper
            sx={{
              marginTop: theme.spacing(2),
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
            }}
          >
            <Box sx={{ padding: theme.spacing(1, 2) }}>
              <Content>About me</Content>
            </Box>
            <Divider />
            <Box sx={{ padding: theme.spacing(1, 1), overflow: "auto" }}>
              <TextField
                label=""
                multiline
                rows={3}
                fullWidth
                InputProps={{
                  readOnly: editMode,
                }}
                value={description}
                onChange={handleChangeDesc}
              />
            </Box>
            {!editMode && (
              <Box sx={{ display: "flex", justifyContent: "end", p: "8px" }}>
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  sx={{ width: "max-content" }}
                  onClick={handleSubmit}
                >
                  Save Edit
                </Button>
              </Box>
            )}
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
  const [editmode, setEditMode] = useState(false);

  useEffect(() => {
    setUser(value);
    setEducator(value.educator);
  }, [value]);

  const handleToggleOpenRow = () => setOpen(!open);
  const handleEdit = () => setEditMode(!editmode);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {user?.id}
        </TableCell>
        <TableCellInfo educator={user} />
        <TableCell align="left">{user?.phone}</TableCell>
        <TableCell align="left">{user?.fat}</TableCell>
        <TableCell align="left">{user?.carbs}</TableCell>
        <TableCell align="left">
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ButtonAction
              onClick={handleToggleOpenRow}
              color={!open ? "secondary" : "error"}
            >
              {open ? <CloseIcon /> : <VisibilityOutlinedIcon />}
            </ButtonAction>
            <ButtonAction onClick={handleEdit}>
              <EditIcon />
            </ButtonAction>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <RowMoreInfoEducator
            open={open}
            value={user}
            editMode={!editmode}
            setEditMode={setEditMode}
          />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function InputSearch({ placeholder, sx, onChange, onClickSearch }) {
  const handleChange = (e) => {
    let value = e.target.value;
    if (onChange) {
      onChange(value);
    }
  };
  const handleClickButton = () => {
    if (onClickSearch) {
      onClickSearch();
    }
  };
  return (
    <FormControl>
      <OutlinedInput
        onChange={handleChange}
        sx={{
          height: theme.spacing(5),
          ...sx,
        }}
        placeholder={placeholder || "Tìm kiếm"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleClickButton}>
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
      onChange(valueItem);
    }
  };
  return (
    <FormControl>
      <InputLabel
        sx={{
          overflow: "visible",
          lineHeight: "0.4370em",
          "&.Mui-focused": {
            lineHeight: "1.436em",
          },
        }}
        id="sort-by-label"
      >
        Sort by
      </InputLabel>
      <Select
        labelId="sort-by-label"
        id="sort-by-label"
        label="Sort by"
        sx={{
          height: theme.spacing(5),
          width: theme.spacing(20),
        }}
        onChange={handleOnChange}
        value={value}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={"id"}>ID</MenuItem>
        <MenuItem value={"lastName"}>name</MenuItem>
        <MenuItem value={"phone"}>Phone</MenuItem>
        {/* <MenuItem value={'course total'}>Course total</MenuItem> */}
      </Select>
    </FormControl>
  );
}

export default function EducatorAdmin() {
  const [educators, setEducators] = useState([]);
  const [educatorsOrgin, setEducatorsOrigin] = useState([]);

  const [sortBy, setSortBy] = useState("");
  const [pageTotal, setPageTotal] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);

  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllEducator(pageNumber, pageSize).then((response) => {
      handleApiResponse(
        response,
        // success
        (response) => {
          let totalPageResponse = response.totalPages;
          setPageTotal(totalPageResponse);
          let educatorResponse = response.content;
          setEducators(educatorResponse);

          setEducatorsOrigin(educatorResponse);
        }
      );
    });
  }, [pageNumber]);

  useEffect(() => {
    // console.log(educators)
  }, [educators]);

  useEffect(() => {
    if (!sortBy) {
      setEducators([...educatorsOrgin]);
    } else {
      console.log(sortBy);
      let newValue = handleSortBy([...educatorsOrgin]);
      setEducators(newValue);
    }
  }, [sortBy]);

  const handleNumberPage = (e, page) => {
    setPageNumber(page - 1);
  };

  // get key sort by
  const handleSortByKey = (key) => {
    setSortBy(key);
  };
  // get key when you have the key
  const handleSortBy = (value) => {
    let reslut = value.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return -1;
      }
      if (a[sortBy] > b[sortBy]) {
        return 1;
      }
      return 0;
    });
    return reslut;
  };

  const handleChangeSearch = (value) => {
    setSearch(value);
  };
  const handleClickButtonSearch = () => {
    findeEducators(search, pageNumber, pageSize).then((response) => {
      handleApiResponse(
        response,
        // success
        (response) => {
          console.log(response);
        }
      );
    });
  };
  return (
    <LayoutAdmin sx={{ minHeight: "100%" }}>
      <LayoutContentAdmin
        sx={{
          backgroundColor: "inherit",
          marginTop: 0,
          paddingTop: theme.spacing(2),
        }}
      >
        <Typography variant="h5" fontWeight={"500"}>
          List Educator
        </Typography>
      </LayoutContentAdmin>
      <LayoutContentAdmin>
        <Box sx={{ padding: theme.spacing(2), display: "flex" }}>
          <InputSearch
            sx={{ marginRight: theme.spacing(2) }}
            placeholder={"Id, Name, Phone"}
            onClickSearch={handleClickButtonSearch}
            onChange={handleChangeSearch}
          />
          <SortBySelect onChange={handleSortByKey} />
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow sx={{ backgroundColor: colorGrey }}>
                <TableCell align="left" sx={{ width: theme.spacing(10) }}>
                  ID
                </TableCell>
                <TableCell align="left">INFO</TableCell>
                <TableCell align="left">PHONE</TableCell>
                <TableCell align="left">COURSE</TableCell>
                <TableCell align="left">STATUS</TableCell>
                <TableCell align="left" sx={{ textAlign: "center" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {educators.map((educator) => {
                return <Row value={educator} key={educator.id} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <Divider/> */}
        <Box sx={{ padding: theme.spacing(2), display: "flex" }}>
          <Pagination
            count={pageTotal}
            variant="outlined"
            shape="rounded"
            onChange={handleNumberPage}
          />
        </Box>
      </LayoutContentAdmin>
    </LayoutAdmin>
  );
}
