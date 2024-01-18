import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography } from "@mui/material"
import api from "../api/api"
import { DashCard } from '../components';

const Main = () => {
    const getCookie = JSON.parse(localStorage.getItem("WEB_APP_ADMIN"));
    const [count, setCount] = useState({
        blogCount: 0,
        productCount: 0,
        userCount: 0,
        orderCount: 0
    })
    useEffect(() => {
        const fetchCount = async () => {
            try {
                const res = await api.get("/stats",
                    { headers: { "token": getCookie } }
                );
                setCount({
                    blogCount: res.data.newsletterCount,
                    productCount: res.data.productsCount,
                    userCount: res.data.usersCount,
                    orderCount: res.data.ordersCount
                })
            } catch (error) {
            }
        }
        fetchCount();
    }, [getCookie])
    return (
        <Box sx={{ margin: 8 }}>
            <Box sx={{ textAlign: 'center' }}>
                {/* <Typography sx={{ font: '600 30px Laila,sans-serif' }}>Dashboard</Typography> */}
            </Box>
            <Grid container sx={{ mt: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
                <DashCard
                    title={'Products'}
                    counts={count.productCount}
                    link="/dashboard/products"
                />
                <DashCard
                    title={'Orders'}
                    counts={count.orderCount}
                    link="/dashboard/orders"
                />
                <DashCard
                    title={'Users'}
                    counts={count.userCount}
                    link="/dashboard/users"
                />
                <DashCard
                    title={'Early Registers'}
                    counts={count.blogCount}
                    link="/dashboard/early"
                />
            </Grid>
        </Box>
    )
}

export default Main
