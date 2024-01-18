import { Box, Grid, Stack, styled, Typography } from '@mui/material'
import React, { useContext } from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CategoryIcon from '@mui/icons-material/Category';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Early, Orders, ProductList, Products, Reviews, Users } from "../components";
import Main from './Main';

const Text = styled(Typography)(({ theme }) => (({
    fontSize: 16,
    fontFamily: 'Nunito,sans-serif',
    fontWeight: 600
})))



const nav = [
    { icon: <DashboardIcon style={{ color: '#724b50' }} />, text: 'Dashboard', link: '/dashboard' },
    { icon: <CategoryIcon style={{ color: '#724b50' }} />, text: 'Products', link: '/dashboard/products' },
    { icon: <ListAltIcon style={{ color: '#724b50' }} />, text: 'Orders', link: '/dashboard/orders' },
    { icon: <AccountCircleIcon style={{ color: '#724b50' }} />, text: 'Users', link: '/dashboard/users' },
    // { icon: <RssFeedIcon style={{color:'#724b50'}} />, text: 'Blogs',link:'/dashboard/blogs' },
    { icon: <CategoryIcon style={{ color: '#724b50' }} />, text: 'Add Product', link: '/dashboard/products/new' },
    // { icon: <RateReviewIcon style={{color:'#724b50'}} />, text: 'Add Blog',link:'/dashboard/blog/new' },
    { icon: <AccountCircleIcon style={{ color: '#724b50' }} />, text: 'Early Signup', link: '/dashboard/early' },
    { icon: <RateReviewIcon style={{ color: '#724b50' }} />, text: 'Reviews', link: '/dashboard/reviews' },
]

const DashBoard = () => {
    const user = JSON.parse(localStorage.getItem("WEB_APP_ADMIN"));
    const location = useLocation();
    const navigate = useNavigate();
    // if(user === null) return <Navigate to="/" replace={true}/>
    // if(user.role === 'user') return <Navigate to="/" replace={true}/>
    if (user !== "" && user !== null && user !== undefined) {
        return (
            <>
                <Grid container>
                    <Grid sx={{ background: '#ffffff', height: 'auto' }} xs={12} md={3} item>
                        <Stack sx={{ padding: { lg: 13, md: 8 }, gap: { lg: 7, md: 5, xs: 5 }, display: 'flex', flexDirection: { xs: 'row', md: 'column' }, overflowX: { xs: 'scroll', md: 'inherit' }, mt: { xs: 4, md: 0 } }}>
                            {
                                nav.map((item, key) => (
                                    <Box key={key} onClick={() => { navigate(`${item.link}`) }} sx={{ display: 'flex', flexDirection: 'row', gap: 2, width: '100%', cursor: 'pointer' }}>
                                        {item.icon}
                                        <Text>{item.text}</Text>
                                    </Box>
                                ))
                            }
                        </Stack>
                    </Grid>
                    <Grid xs={12} md={9} item>
                        {
                            location.pathname === '/dashboard' ?
                                <Main />
                                :
                                location.pathname === '/dashboard/products/new' ?
                                    <Products />
                                    :
                                    location.pathname === '/dashboard/users' ?
                                        <Users />
                                        :
                                        location.pathname === '/dashboard/reviews' ?
                                            <Reviews />
                                            :
                                            location.pathname === '/dashboard/products' ?
                                                <ProductList />
                                                :
                                                location.pathname === '/dashboard/early' ?
                                                    <Early />
                                                    :
                                                    location.pathname === '/dashboard/orders' &&
                                                    <Orders />
                        }
                    </Grid>
                </Grid>
            </>
        )
    }
    else{
        return <Navigate to="/" replace/>
    }
}

export default DashBoard
