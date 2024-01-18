import React, { useEffect, useState } from 'react'
import { Box, Button, Stack, styled, TextField, Typography } from '@mui/material'
import { toast } from 'react-toastify';
import LoadingOverlay from '../utils/LoadingOverlay';
import api from '../api/api';
import { DropDown } from '../components';



const Btn = styled(Button)(({ theme }) => ({
    fontFamily: 'Nunito,sans-serif',
    fontWeight: 400,
    marginTop: 2,
    padding:"10px",
    background: '#724b50',
    "&:hover": {
        background: '#724b50',
    }
}))


const Products = () => {
    const getCookie = JSON.parse(localStorage.getItem("WEB_APP_ADMIN")) ;
    const [productContent, setProductContent] = useState({
        name: "",
        price: '',
        stock: '',
        description: '',
        color:''
    });
    const [category, setCategory] = useState('kurtis');
    const [images, setImages] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const { name, price, stock, description,color } = productContent;
    const handleChange = (e) => {
        setProductContent({ ...productContent, [e.target.name]: e.target.value })
    }
    const postDetails = async (e) => {
        const pics = e.target.files[0];
        if (pics === undefined) {
            toast.info("Please select a Image");
        }
        if (images.length === 6) {
            toast.info("You selected all the images already");
            return;
        }
        if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "Woofet");
            data.append("cloud_name", "dvt5ndw4d");
            await fetch("https://api.cloudinary.com/v1_1/dvt5ndw4d/image/upload", {
                method: 'post',
                body: data
            })
                .then((res) => res.json())
                .then(data => {
                    if (e.target.name === 'pic1') {
                        setImages(images => [...images, data.url.toString()]);
                    }
                    setRefresh(!refresh);
                })
                .catch(err => {
                })
        }
        else {
            toast.info("Only png or jpeg format")
            return;
        }
    }
    const handleProductSubmit = async () => {
        if (name !== '' && price !== '' && stock !== '' && description !== "" && category !== '') {
            setIsSubmit(true);
            if (images.length < 2) {
                toast.info("Please enter at least two images");
                setIsSubmit(false);
                return;
            }
            try {
                const response = await api.post("/admin/products/new", {
                    name: name,
                    price: price,
                    fabric: stock,
                    color:color,
                    description: description,
                    category: category,
                    images: images
                },
                    { headers: ({ 'token': getCookie }) }
                );
                setIsSubmit(false);
                toast.success("Product created");
                setProductContent({
                    name: '',
                    price: '',
                    stock: '',
                    description: ''
                })
                setCategory("");
                setImages([]);
            } catch (error) {
                setIsSubmit(false);
                toast.error("Check the fileds");
            }
        }
        else {
            setIsSubmit(false);
            toast.error("Please enter all the fileds");
        }
    }
    const handleDropValue = (val) => {
        setCategory(val);
    }
    useEffect(() => {
    }, [refresh])
    if (isSubmit) return <LoadingOverlay />
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', overflow: 'hidden' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'auto', background: 'white', width: '90%', mb: 7 }}>
                    <Stack sx={{ padding: 10, display: 'flex', gap: 2, width: '100%' }}>
                        <Typography sx={{ fontSize: 30, textAlign: 'center', margin: 2, fontFamily: 'Laila,sans-serif', fontWeight: 600 }}>Create Product</Typography>
                        <TextField onChange={handleChange} name='name' value={name} id="outlined-start-adornment" sx={{ width: '100%' }} placeholder="Name of product"
                        />
                        <TextField onChange={handleChange} type="number" name='price' value={price} id="outlined-start-adornment" sx={{ width: '100%' }} placeholder="Price"
                        />
                        <TextField onChange={handleChange} type="text" name='color' value={color} id="outlined-start-adornment" sx={{ width: '100%' }} placeholder="Color"
                        />
                        <TextField onChange={handleChange} type="text" name='stock' value={stock} id="outlined-start-adornment" sx={{ width: '100%' }} placeholder="Enter Fabric"
                        />
                        <textarea onChange={handleChange} name="description" value={description} className='textArea' id="" cols="30" rows="5" placeholder='Description'></textarea>
                        <DropDown
                            inputVal={category}
                            handleDropValue={handleDropValue}
                            option={['kurtis','suits','night-suits','dresses','bottom-wear']}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <div style={{ display: 'flex', gap: 10, flexDirection: 'column', alignItems: 'center' }}>
                                <label className='cursor-pointer bg-background_secondary text-white p-5 py-3 rounded my-5' htmlFor="images">Select images</label>
                                <input id='images' name='pic1' onChange={(e) => postDetails(e)} style={{ width: '100%' }} className='avatarFile2 hidden' type="file" readOnly multiple={true} />
                                <div className='flex gap-10 my-5'>
                                    {
                                        images.length === 0 ?
                                            <p>Please select images</p>
                                            :
                                            images.map((img, key) =>
                                                <img key={key} style={{ height: 100, width: 100 }} src={img} alt="uploadImage" />
                                            )}
                                </div>
                            </div>
                        </div>
                        <Btn onClick={handleProductSubmit} variant='contained' >Add Product</Btn>
                    </Stack>
                </Box>
            </Box>
        </>
    )
}

export default Products
