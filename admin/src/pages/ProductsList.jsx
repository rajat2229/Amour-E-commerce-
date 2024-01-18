import { Box, Button, Modal, styled, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import api from '../api/api';

import { toast } from 'react-toastify'
import LoadingOverlay from '../utils/LoadingOverlay';
// MD = Desktop
// SM = Mobile

const MDBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
        display: "block"
    },
    [theme.breakpoints.down('sm')]: {
        display: "block"
    },
}))

// const SMBox = styled(Box)(({theme}) => ({
//     [theme.breakpoints.down('sm')]:{
//         display: "block"
//     },
//     [theme.breakpoints.up('sm')]:{
//         display: "none"
//     },
// }))

function OrderDetailsMD({ orderId, status, category, amount, actions, color = "white", handleDelete, handleUpdate }) {
    console.log(category);
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
            <td style={{
                width: "100%",
                textAlign: "center",
                padding: "8px"
            }}>{orderId}</td>
            <td style={{
                width: "100%",
                textAlign: "center",
                padding: "8px"
            }}>{status}</td>
            <td style={{
                width: "100%",
                textAlign: "center",
                padding: "8px"
            }}>{category}</td>
            {/* <td style={{
                width: "100%",
                textAlign: "center",
                padding: "8px"
            }}>{itemQty}</td> */}
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
                <CreateIcon onClick={handleUpdate} sx={{
                    marginRight: "8px",
                    cursor: 'pointer'
                }} />
                <DeleteIcon sx={{ cursor: 'pointer' }} onClick={handleDelete} />
            </Box>}</td>
        </tr>
    )
}



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [ProductDetail, setProductDetail] = useState('');
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [stock, setStock] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const getCookie = JSON.parse(localStorage.getItem("WEB_APP_ADMIN"));
    const handleClose = () => {
        setOpen(false)
        setAmount('');
        setName('');
        setStock('');
    };
    async function fetchProduts() {
        setLoading(true);
        setIsLoading(true);
        try {
            const res = await api.get('/products?page=2');
            setProducts(res.data.products);
            setLoading(false);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.warn(error);
        }
    }

    async function handleDelete(id) {
        try {
            const res = await api.delete(`admin/product/${id}`,
                { headers: ({ 'token': getCookie }) }
            )
            toast.success("Product deleted success")
            setRefresh(!refresh);
        } catch (error) {
        }
    }

    async function handleUpdate(id) {
        setError(false);
        setLoading2(true);
        setOpen(true);
        try {
            const res = await api.get(`/product/${id}`,
                { headers: ({ 'token': getCookie }) }
            )
            setProductDetail(res.data.product);
            setName(res.data.product.name);
            setStock(res.data.product.stock);
            setAmount(res.data.product.price);
            setLoading2(false);
        } catch (err) {
            console.warn(err);
        }
    }
    async function handleUpdateProduct(id) {
        setError(false);
        try {
            const res = await api.put(`admin/product/${id}`,
                {
                    name: name,
                    price: amount,
                    stock: stock
                },
                { headers: ({ 'token': getCookie }) }
            )
            toast.success("Product Info Updated Successfully")
            setRefresh(!refresh);
            setOpen(false);
            setError(false);
            setStock("");
            setName('');
            setAmount("");
        } catch (error) {
            setError(true);
            console.warn(error);
        }
    }
    useEffect(() => {
        fetchProduts();
    }, [refresh])
    if (isLoading) return <LoadingOverlay />

    return (
        <Box sx={{ maxHeight: '80vh', overflowY: 'scroll' }}>
            <Box sx={{ margin: 2 }}>
                <Typography sx={{ font: '600 30px Laila,sans-serif', textAlign: "center", padding: "32px" }}>ProductList</Typography>
                <MDBox>
                    <table style={{
                        width: "100%"
                    }}>
                        <tbody>
                            <OrderDetailsMD orderId="ProductId" status="Name" category={"Category"} itemQty="Stock" amount="Amount" actions="Actions" color="#724b50" />
                            {
                                loading ?
                                    <tr>
                                        <td>Loading......</td>
                                    </tr>
                                    :
                                    products.map(({ _id, name, price, stock,category }, key) => (
                                            <OrderDetailsMD key={_id} orderId={_id} category={category} status={name} itemQty={stock} amount={price}
                                                handleUpdate={() => { handleUpdate(_id) }}
                                                handleDelete={() => handleDelete(_id)} />
                                    ))
                            }
                        </tbody>
                    </table>
                </MDBox>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <h3>Update Product</h3>
                        {error && <p style={{ color: 'red' }}>Please Enter all Fields</p>}
                        {
                            loading2
                                ?
                                <Typography sx={{ minHeight: '10vh', width: '200', textAlign: 'center', fontFamily: 'Laila,sans-serif', fontWeight: 600, fontSize: 20 }}>Loading.....</Typography>
                                :
                                <>
                                    <div style={{ padding: 10 }}>
                                        <label>New Name</label>
                                        {name !== '' && <input style={{ padding: 10, margin: '10px 20px', border: '1px solid black' }} onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter the new name" />}
                                        <br />
                                    </div>
                                    {/* <div style={{ padding: 10 }}>
                                        <label>Stock  </label>
                                        <input style={{ padding: 10, margin: '0 57px',border:'1px solid black' }} onChange={(e) => setStock(e.target.value)} value={stock} placeholder="Enter the new stock" />
                                        <br />
                                    </div> */}
                                    <div style={{ padding: 10 }}>
                                        <label>Price    </label>
                                        <input style={{ padding: 10, margin: '10px 20px', border: '1px solid black' }} onChange={(e) => setAmount(e.target.value)} value={amount} placeholder="Enter the new Price" />
                                    </div>
                                    <Box sx={{ marginTop: 5, display: 'flex', justifyContent: 'space-evenly' }}>
                                        <Button onClick={() => { handleUpdateProduct(ProductDetail._id) }}>Update</Button>
                                        <Button onClick={handleClose}>Cancel</Button>
                                    </Box>
                                </>
                        }
                    </Box>

                </Modal>
            </Box>
        </Box>
    )
}

export default ProductList




