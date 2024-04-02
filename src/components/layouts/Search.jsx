import { Button, InputBase, alpha, styled } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import theme from "../../theme";

const SearchWrapper = styled('div')(({ theme }) => ({
    //   position: 'relative',
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    border: '1px solid gray',
    [theme.breakpoints.up('sm')]: {
        // marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 0),
    //   position: 'absolute',
    width: '10%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '90%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 2),
        // vertical padding + font size from searchIcon
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


export default function Search() {

    return (
        <SearchWrapper>
            <StyledInputBase
                placeholder="Tìm kiếm..."
                inputProps={{ 'aria-label': 'search' }} />

                <Button disableElevation
                variant="contained"
                    sx={{
                        width: '100%',
                        // backgroundColor: theme.palette.text.primary,
                        color: theme.palette.background.default,
                        border:'none'
                    }}>
                    <SearchIcon />
                </Button>
        </SearchWrapper>
    )
}