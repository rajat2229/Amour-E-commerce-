import React, { useEffect, useState } from 'react';
import api from '../api/api';

import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, styled, Typography } from '@mui/material'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoadingOverlay from '../utils/LoadingOverlay';
const MDBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
        display: "block"
    },
    [theme.breakpoints.down('sm')]: {
        display: "block"
    },
}))
function OrderDetailsMD({ orderId, status, paymentStatus, itemQty, amount, actions, color = "white", handleClick, handleProductDelete }) {
    return (
        <tr style={(color === "white") ? {
            display: "flex",
            background: `${color}`,
            color: "black",
            width: "100%",
            border: '2px solid #e2e2e2'
        } : {
            display: "flex",
            background: `${color}`,
            color: "white",
            width: "100%",
            border: '2px solid #e2e2e2'
        }}>
            <td onClick={handleClick} style={{
                width: "100%",
                textAlign: "center",
                padding: "8px",
                cursor: 'pointer',
            }}>{orderId}</td>
            <td style={{
                width: "100%",
                textAlign: "center",
                padding: "8px",
                color: status === 'Confirmed' ? 'green' : status === 'Status' ? 'white' : 'red'
            }}>{status}</td>
            <td style={{
                width: "100%",
                textAlign: "center",
                padding: "8px",
                color: paymentStatus === 'completed' ? 'green' : paymentStatus === 'Payment Status' ? 'white' : 'red'
            }}>{paymentStatus}</td>
            <td style={{
                width: "100%",
                textAlign: "center",
                padding: "8px"
            }}>{itemQty}</td>
            <td style={{
                width: "100%",
                textAlign: "center",
                padding: "8px"
            }}>{amount}</td>
            <td style={{
                width: "100%",
                textAlign: "center",
                padding: "8px"
            }}>{(typeof (actions) === 'string') ? actions : <Box>
                <DeleteIcon onClick={handleProductDelete} sx={{ cursor: 'pointer' }} />
                <OpenInNewIcon onClick={handleClick} sx={{
                    marginRight: "8px",
                    cursor: 'pointer'
                }} />
            </Box>}</td>
        </tr>
    )
}
const Orders = () => {
    const navigate = useNavigate();
    const getCookie = JSON.parse(localStorage.getItem("WEB_APP_ADMIN"));
    const [orderList, setOrderList] = useState(null);
    const [refreshData, setRefreshData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleClick = async (orderId) => {
        navigate("/order/" + orderId)
    }
    // funtion for deleting user
    const handleProductDelete = async (userId) => {
        try {
            await api.delete(`/admin/order/${userId}`,
                { headers: ({ 'token': getCookie }) }
            )
            toast.success("Order deleted successfully");
            setRefreshData(!refreshData);
        } catch (error) {
        }
    }
    useEffect(() => {
        const getOrders = async () => {
            setIsLoading(true);
            try {
                const res = await api.get("admin/orders/", { headers: ({ 'token': getCookie }) });
                // console.table(res.data.orders.map((item)=> item.shippingInfo))
                // console.table(res.data.orders.map((item)=> item.paymentInfo))
                // console.table(res.data.orders)
                setOrderList(res.data.orders.reverse());
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        }
        getOrders();
    }, [getCookie, refreshData])
    if (isLoading) return <LoadingOverlay />

    return (

        <Box style={{ overflowY: 'scroll', maxHeight: '80vh' }}>
            <Box sx={{ margin: 5 }}>
                <Typography sx={{ font: '600 30px Laila,sans-serif', textAlign: "center", padding: "32px" }}>Orders</Typography>
                <MDBox>
                    <table style={{
                        width: "100%",
                        borderCollapse: 'collapse'
                    }}>
                        <tbody>
                            <OrderDetailsMD orderId="OrderId" paymentStatus={"Payment Status"} status="Status" itemQty="ItemQty" amount="Amount" date="Date" actions="Actions" color="#724b50" />
                            {
                                orderList === null ?
                                    <Typography>No orders to display</Typography>
                                    :
                                    orderList.map((item, key) =>
                                        <OrderDetailsMD
                                            key={key}
                                            orderId={item._id}
                                            status={item.orderStatus}
                                            itemQty={item.orderItems.length}
                                            amount={item.totalPrice}
                                            paymentStatus={item.paymentStatus}
                                            // date={item.paidAt.slice(0, 10)}
                                            handleClick={() => handleClick(item._id)}
                                            handleProductDelete={() =>
                                                handleProductDelete(item._id)}
                                        />
                                    )
                            }
                        </tbody>
                    </table>
                </MDBox>
            </Box>
        </Box>
    )
}

export default Orders




