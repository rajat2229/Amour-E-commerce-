import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getOrder, updateOrderStatus, updatePaymentStatus } from '../http/order';
import LoadingOverlay from '../utils/LoadingOverlay';
import AppDesc from '../components/Text/AppDesc';
import Heading from '../components/Text/Heading';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { toast } from 'react-toastify';
import Button from '../components/Button/Button';

const OrderDetail = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const fetchOrderDetail = async () => {
      setLoading(true);
      const response = await getOrder(id);
      setLoading(false);
      setOrder(response.order);
    }
    fetchOrderDetail();
  }, [refresh])


  // select handling
  const [age, setAge] = React.useState('');
  const handleChange = async (event, id) => {
    setAge(event.target.value);
    const res = await updateOrderStatus(event.target.value, id);
    if (res.success) {
      setRefresh(!refresh);
      toast.success(res.orderStatus);
    }
    else {
      toast.error(res.message);
    }
  };
  const [age2, setAge2] = React.useState('');
  const handleChange2 = async (event, id) => {
    setAge2(event.target.value);
    const res = await updatePaymentStatus(event.target.value, id);
    console.log(res);
    if (res.success) {
      setRefresh(!refresh);
      toast.success(res.message);
    }
    else {
      toast.error(res.message);
    }
  };
  if (loading) return <LoadingOverlay />
  return (
    <div className='px-10 py-24 flex w-full'>
      <div className='flex-1 border-r-4 border-background_secondary'>
        <div>
          <Button
            title={"Back"}
            handleSubmit={() => navigate("/dashboard/orders")}
          />
        </div>
        <div className='orderDetail flex flex-col justify-start items-start gap-3 mt-10 max-h-screen overflow-y-scroll'>
          <Heading>Ordered Items</Heading>
          {
            order?.orderItems.map((item, key) => (
              <div key={key} className='flex gap-10'>
                <div>
                  <img src={item?.product?.images[0]} alt="product" className='w-28' />
                </div>
                <div className='flex flex-col items-start'>
                  <AppDesc>Name:{"  "}{item?.product?.name} </AppDesc>
                  <AppDesc>Price:{"  "}₹{item?.product?.price}</AppDesc>
                  <AppDesc>Size:{"  "}{item?.size.toUpperCase()}</AppDesc>
                  <AppDesc>Quantity:{"  "}{item?.quantity}</AppDesc>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <div className='flex-1  flex flex-col justify-start items-center gap-16 '>
        <div className='flex flex-col justify-start items-start gap-3'>
          <Heading>Shipping Info</Heading>
          <AppDesc>Name: {order?.shippingInfo?.name}</AppDesc>
          <AppDesc>Email: {order?.shippingInfo?.email}</AppDesc>
          <AppDesc>Phone No.: {order?.shippingInfo?.phoneNo}</AppDesc>
          <AppDesc>Address: {order?.shippingInfo?.address}</AppDesc>
          <AppDesc>Pin Code: {order?.shippingInfo?.pinCode}</AppDesc>
          <AppDesc>City: {order?.shippingInfo?.city}</AppDesc>
          <AppDesc>State: {order?.shippingInfo?.state}</AppDesc>
          <AppDesc>Payment Method: {order?.paymentMethod}</AppDesc>
          <AppDesc>Payment Status: {order?.paymentStatus}</AppDesc>
          <AppDesc>Order Date: {order?.createdAt.slice(0, 10)}</AppDesc>
        </div>
        <div className={"flex w-full px-10 justify-center items-center"}>
          <div className='flex-1 text-left flex flex-col justify-center items-center'>
            <AppDesc>Order Status</AppDesc>
            <div className='w-2/3'>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{order?.orderStatus}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={(e) => handleChange(e, order?._id)}
                >
                  <MenuItem value={"Received"}>Received</MenuItem>
                  <MenuItem value={"Confirmed"}>Confirmed</MenuItem>
                  <MenuItem value={"Cancelled"}>Cancel</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className='flex-1 text-left flex flex-col justify-center items-center'>
            <AppDesc>Payment Status</AppDesc>
            <div className='w-2/3'>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{order?.paymentStatus}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age2}
                  label="Age"
                  onChange={(e) => handleChange2(e, order?._id)}
                >
                  <MenuItem value={"pending"}>Pending</MenuItem>
                  <MenuItem value={"completed"}>Confirmed</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
