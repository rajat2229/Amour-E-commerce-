import { Box,styled, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from '../api/api'

// MD = Desktop
// SM = Mobile

const MDBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
        display: "block"
    },
    [theme.breakpoints.down('sm')]: {
        display: "none"
    },
}))
function OrderDetailsMD({ userId, email, name, role, color }) {

    return (
        <tr style={(color === "white") ? {
            display: "flex",
            background: `${color}`,
            color: "black",
            width: "100%"
        } : {
            display: "flex",
            background: `${color}`,
            color: "white",
            width: "100%"
        }}>
            <td style={{
                width: "100%",
                textAlign: "center",
                padding: "8px"
            }}>{userId}</td>
            <td style={{
                width: "100%",
                textAlign: "center",
                padding: "8px"
            }}>{email}</td>
        </tr>
    )
}
const Early = () => {
    const getCookie = JSON.parse(localStorage.getItem("WEB_APP_ADMIN")) ;
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    // funtion for fetching users
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/newsletter/all`, {
                headers: ({ 'token': getCookie })
            })
            setUsers(res.data.newsletters);
            setLoading(false);
        } catch (error) {
        }
    }
    // Basic useEffect
    useEffect(() => {
        fetchUsers();
    }, [])
    return (
        <Box sx={{ overflowY: 'scroll', height: '100vh' }}>
            <Box>
                <Typography sx={{ font: '600 30px Laila,sans-serif', textAlign: "center", padding: "32px" }}>Early SignUp</Typography>
                <MDBox>
                    <table style={{
                        width: "100%"
                    }}>
                        <tbody>
                            <OrderDetailsMD userId="UserId" email="Email" color="#724b50" />
                            {
                                    users.length === 0 ?
                                        <tr style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'20vh'}}>
                                            <td style={{fontSize:25,fontFamily:'Nunito,sans-serif'}}>Nothing to Display</td>
                                        </tr>
                                        :
                                        users.map((item, key) => (
                                            <OrderDetailsMD key={key} userId={item._id} email={item.email} color="white" />
                                        ))
                            }
                        </tbody>
                    </table>
                </MDBox>
            </Box>
        </Box>
    )
}

export default Early
