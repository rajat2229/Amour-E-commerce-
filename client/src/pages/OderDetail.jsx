import React, { useEffect, useState } from "react";
import {
  Heading,
  OrderDetail,
  ShippingDetails,
  TrackingDetails,
  LoadingOverlay,
} from "../components";
import { useParams } from "react-router-dom";
import { getOrderDetail } from "../http/order";
import {toast} from "react-toastify"
const OrderDetails = () => {

  const {id} = useParams();

  const [orderDetail,setOrderDetail] = useState([]);
  const [loading,setLoading] = useState(false);

  async function fetchOrderDetail(){
    setLoading(true);
    const value = await getOrderDetail(id);
    if (value.code === "ERR_NETWORK") {
      toast.error("Some error occured");
      setLoading(false);
      return;
    }
    if (!value.success) {
      toast.error(value.message);
      setLoading(false);
      return;
    }
    else {
      setOrderDetail(value.order);
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchOrderDetail();
  },[])



  if(loading && orderDetail?.createdAt !== undefined) return <LoadingOverlay/>
  return (
    <div className="px-5 py-10 md:px-16">
      <Heading className={"text-5xl mb-10"}>My Orders</Heading>
      <div className="flex justify-center items-start flex-wrap ">
        {/* Right Section Div of Checkout Page  */}
        <section className=" w-[100%] lg:w-[75%] px-4 sm:px-8 lg:px-12  ">
          <div className="lg:flex justify-center gap-10">
            <div className="py-5 lg:flex-1 flex flex-col justify-between h-auto">
              <div className="space-y-6">
                <TrackingDetails order={orderDetail}/>
                {/* shipping details  */}
                <ShippingDetails info={orderDetail?.shippingInfo}/>
                {/* order details  */}
                <OrderDetail 
                createdAt={orderDetail?.createdAt}
                orderedItems={orderDetail?.orderItems}
                deliveryCharges={orderDetail?.deliveryCharges}
                subTotalPrice={orderDetail?.subTotalPrice}
                totalPrice={orderDetail?.totalPrice}
                paymentMethod={orderDetail?.paymentMethod}
                orderStatus={orderDetail?.orderStatus}
                paymentStatus={orderDetail?.paymentStatus}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OrderDetails;
