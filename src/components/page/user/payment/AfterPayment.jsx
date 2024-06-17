import { Alert, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { confirmVnPay } from "../../../../api/pay/vnpay";
import { handleApiResponse } from "../../../../api/instance";

export default function AfterPayment() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const [alert, setAlert] = useState("");
    const [severityAlert, setSeverityAlert] = useState("success");

    useEffect(() => {
        let url = params.get("url");
        let query = location.search;
        if (url && query) {
            confirmVnPay(`${url}${query}`)
                .then(response => {
                    handleApiResponse(response,
                        // success
                        (reslut) => {
                            setAlert(reslut);
                            setSeverityAlert("success");
                        },
                        // failed
                        (err) => {
                            setAlert(err);
                            setSeverityAlert("error");
                        }
                    )
                });
        }

    }, [])

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Alert sx={{ textAlign: 'center', margin: 'auto' }}>
                <Typography variant="h3">
                    Thanh toán thành công
                </Typography>
            </Alert>
        </Box>
    )
}