import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { redirect, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppDesc, AppText, Button, Heading, HR, InputBox, LoadingOverlay, Overlay, ProductCard3, Radio, Text } from '../../../components'
import { newOrder } from '../../../http/order';
import { emptyCart } from '../../../redux/cartSlice';
import { Price } from '../../../utility/Price';
import { BsCheck2Circle } from "react-icons/bs"



const CheckoutComp = (props) => {
  const [loading2, setLoading2] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile, loading, updateCartLen } = props;

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  // handle payment options 
  const [paymentOption, setPaymentOption] = useState(null);
  const handlePayment = (e) => {
    setPaymentOption(e.target.value);
  }
  const data = JSON.parse(localStorage.getItem("cart"));
  const price = Price();
  const delivery = (paymentOption === null || paymentOption === 'online' ? 0 : 99);
  const totalPrice = price + delivery;
  const [user, setUser] = useState({
    name: profile?.user?.name || '',
    email: profile?.user?.email || '',
    phone: profile?.user?.phone || "",
    address: profile?.user?.address || "",
    state: profile?.user?.state || "",
    city: profile?.user?.city || "",
    postalCode: profile?.user?.postalCode || "",
  })

  const { name, email, phone, address, state, city, postalCode } = user;
  async function handleSubmit() {
    if (data === null || data.length === 0) {
      toast.error("Please add products");
      return;
    }
    if (name === "", email === "", phone === "", address === "", state === "", city === "", postalCode === '') {
      toast.error("Please enter in all fields");
      return;
    }
    if (paymentOption === null) {
      toast.error("Please select a payment option");
      return;
    }
    const shippingObj = {
      name,
      email,
      phoneNo: phone,
      address,
      state,
      city,
      pinCode: postalCode
    }
    setLoading2(true);
    const value = await newOrder(shippingObj, paymentOption);
    if (value.code === "ERR_NETWORK") {
      toast.error("Some error occured");
      setLoading2(false);
      return;
    }
    if (!value.success) {
      toast.error(value.message);
      setLoading2(false);
      return;
    }
    else if (value.method === 'cod') {
      setLoading2(false);
      localStorage.removeItem("cart");
      dispatch(emptyCart());
      updateCartLen();
      setShowModal(true);
    }
    else if (value.method === 'online') {
      const { ccavenueUrl, accessCode, encRequest } = value;
      document.getElementById("nonseamless").action = ccavenueUrl;
      document.getElementById("access_code").value = accessCode;
      document.getElementById("encRequest").value = encRequest;
      document.redirect.submit();
      setLoading2(false);
    }
  }

  // handle order Confirm model
  const [showModal, setShowModal] = useState(false);

  const handleClick = (url) => {
    setShowModal(false);
    navigate(url);
  }


  if (loading || loading2) return <LoadingOverlay />
  return (
    <div className='px-5 py-10  md:px-16'>
      <Heading className={"text-5xl"}>Checkout</Heading>
      {/* Left Section Div of Checkout Page  */}
      <div className='lg:flex justify-center gap-10 lg:h-[1000px]'>
        <div className='py-5 flex flex-col gap-5 lg:flex-[2] lg:h-[80%]'>
          <div className='flex'>
            <AppDesc className={"text-xl font-bold"}>Shipping Details</AppDesc>
          </div>
          <div className='flex flex-col lg:flex-row gap-5'>
            <InputBox
              handleChange={(e) => handleChange(e)}
              placeholder={"Name"}
              name="name"
              value={name}
            />
          </div>
          <div className='flex flex-col gap-5'>
            <InputBox
              handleChange={(e) => handleChange(e)}
              placeholder={"Email"}
              name="email"
              value={email}
            />
            <InputBox
              handleChange={(e) => handleChange(e)}
              placeholder={"Phone No."}
              name="phone"
              value={phone}
            />
          </div>
          <InputBox
            handleChange={(e) => handleChange(e)}
            placeholder={"Street Address"}
            name="address"
            value={address}
          />
          <InputBox
            handleChange={(e) => handleChange(e)}
            placeholder={"Town/City"}
            name="city"
            value={city}
          />
          {/* <div className='flex flex-col lg:flex-row gap-5'> */}
          <InputBox
            handleChange={(e) => handleChange(e)}
            placeholder={"PIN"}
            name="postalCode"
            value={postalCode}
          />
          <InputBox
            handleChange={(e) => handleChange(e)}
            placeholder={"State"}
            name="state"
            value={state}
          />
          <InputBox
            handleChange={(e) => handleChange(e)}
            placeholder={"Country"}
            value="India"
            readOnly
          />
          {/* </div> */}
          <div className='hidden lg:flex flex-col justify-start py-5'>
            <Radio
              label={"Pay Online"}
              handleRadio={handlePayment}
              value="online"
              name="payment"
              className={"lg:pl-20 font-bold"}
              chechClassName={"lg:left-0"}

            />
            <HR />
            <Radio
              label={"Cash on Delivery"}
              handleRadio={handlePayment}
              value="cod"
              name="payment"
              className={"lg:pl-20 font-bold"}
              chechClassName={"lg:left-0"}
            />
            <HR />
          </div>
          <div className='flex flex-col justify-start'>
            <AppText><b>Note: </b>Free Delivery on all orders paid by online payment methods.</AppText>
            <br />
            <AppText><b>Note: </b>Free earings on all Kurtis and Suits.</AppText>
          </div>
        </div>
        {/* Right Section Div of Checkout Page  */}
        <div className='py-5 lg:flex-1 flex flex-col justify-between h-auto '>
          <div className=' h-[75%]'>
            <div className='flex'>
              <AppDesc className={"text-xl font-bold"}>Your Orders</AppDesc>
            </div>
            <HR />
            {
              (!data || data.length === 0) ?
                <div>
                  <AppDesc>No Products in the cart</AppDesc>
                </div>
                :
                <div>
                  <div className='flex justify-between'>
                    <AppDesc className={"font-secondary_font lg:text-xl"}>Product</AppDesc>
                    <AppDesc className={"font-secondary_font lg:text-xl"}>Total</AppDesc>
                  </div>
                  <HR />
                </div>
            }
            <div className={`w-full h-auto max-h-96 lg:${(!data || data?.length === 0) ? `h-[10%]` : `h-[79%]`} lg:max-h-[85%] overflow-scroll checkout-div-scroll`}>
              {
                (!data || data.length === 0) ?
                  <p></p>
                  :
                  data.map((item, key) => (
                    <div key={key} className='flex w-full justify-between my-5'>
                      <div className='h-full w-full flex items-center justify-start gap-3 flex-[2]'>
                        <ProductCard3 img={item?.images[0]} />
                        <AppDesc>{item?.name}</AppDesc>
                      </div>
                      <div className='flex-1 flex justify-end items-center'>
                        <AppText>₹{item?.price} X {item?.quantity}</AppText>
                      </div>
                    </div>
                  ))
              }
            </div>
          </div>
          <div className='flex-1'>
            <HR />
            <div className='flex justify-between'>
              <Text className={"font-secondary_font"}>Subtotal</Text>
              <Text className={"font-secondary_font"}>₹{price}.00</Text>
            </div>
            <HR />
            <div className='flex justify-between'>
              <Text className={"font-secondary_font"}>Delivery Charges</Text>
              <Text className={"font-secondary_font"}>₹{delivery}.00</Text>
            </div>
            <HR />
            <div className='flex justify-between'>
              <Text className={"font-secondary_font"}>Total</Text>
              <Text className={"font-secondary_font"}>₹{totalPrice}.00</Text>
            </div>
            <div className='lg:hidden flex flex-col justify-start py-5'>
              <Radio
                label={"Pay Online"}
                handleRadio={handlePayment}
                value="online"
                name="payment"
                className={"lg:pl-16 font-bold"}
                chechClassName={"md:left-0"}
              />
              <HR />
              <Radio
                label={"Cash on Delivery"}
                handleRadio={handlePayment}
                value="cod"
                name="payment"
                className={"lg:pl-20 font-bold"}
                chechClassName={"md:left-0"}
              />
              <HR />
            </div>
            <div className='my-5'>
              <Button
                title="Place Order"
                handleSubmit={handleSubmit}
                className={"w-full bg-inherit group text-primary my-10 h-12 lg:h-14"}
                textStyle={{ color: "var(--primary-color)", "&:hover": { color: 'white' } }}
                textClass={"text-primary group-hover:text-white"}
              />
            </div>
          </div>
        </div>
      </div>
      {
        showModal && (
          <Overlay>
            <div className='modal-content px-10 py-16 flex flex-col justify-center gap-5 h-[550px] md:h-[680px] lg:w-[600px] lg:border border-primary lg:px-32 items-center' style={{ borderRadius: 20 }}>
              <BsCheck2Circle className='text-[120px] text-primary' />
              <AppDesc>Thankyou!</AppDesc>
              <AppDesc>Order Placed Successfully</AppDesc>
              <div className='flex gap-5'>
                <Button
                  title="My Orders"
                  handleSubmit={() => { handleClick("/profile/orders") }}
                />
                <Button
                  title="Shop"
                  handleSubmit={() => { handleClick("/store") }}
                />
              </div>
            </div>
          </Overlay>
        )
      }
    </div>
  )
}

export default CheckoutComp
