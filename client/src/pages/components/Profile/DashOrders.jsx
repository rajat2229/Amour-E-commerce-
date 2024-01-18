import React, { useEffect, useState } from 'react'
import { AppDesc, AppText, HR, LoadingOverlay, Text } from '../../../components'
import { HiArrowNarrowRight } from 'react-icons/hi'
import Ordered from "../../../assets/ordered.svg"
import { useNavigate } from 'react-router-dom';
import { getOrders } from '../../../http/order';
import { toast } from 'react-toastify';
import { formatedDate} from '../../../utility/Date';

const DashOrders = () => {
  const navigate = useNavigate();
  

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchOrders() {
    const value = await getOrders();
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
      setOrders(value.order.reverse());
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchOrders();
  }, [])
  if (loading) return <LoadingOverlay />
  return (
    <div className='max-h-[80vh] lg:mt-20 overflow-scroll wish-div'>
      {/* For large Screen sizes  */}
      <table className='wish-table hidden overflow-scroll lg:table'>
        <thead>
          <tr>
            <th> <Text>Order Id</Text>  </th>
            <th> <Text>Date</Text>  </th>
            <th> <Text>Status</Text>  </th>
            <th> <Text>Total</Text>  </th>
          </tr>
        </thead>
        <tbody>
          {
            orders.length === 0 ?
            <tr>
              <td colSpan={4} className="p-10">
                <div className='py-10 flex-[2] flex justify-center items-center'>
                  <Text>No Orders Yet</Text>
                </div>
              </td>
            </tr>
            :
            orders.map((item, key) => (
              <tr key={key}>
                <td>
                  <div className='h-full w-full flex items-center justify-center px-10 gap-5'>
                    <Text>{item?._id}</Text>
                  </div>
                </td>
                <td><Text>{item?.createdAt.slice(0, 10)}</Text></td>
                <td >
                  <Text>{item?.orderStatus}</Text>
                </td>
                <td >
                  <div className='h-full w-full flex items-center justify-center gap-3'>
                    <Text>₹ {item?.totalPrice}</Text>
                    <HiArrowNarrowRight onClick={() => navigate("/order/" + item?._id)} className="cursor-pointer" color='#724B50' size={20} />
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      {/* For large Screen sizes  */}
      {/* For small Screen sizes  */}
      <div className='lg:hidden'>
        <div className='px-1'>
          {
            orders.length === 0 ?
            <div className='py-10 flex-[2] flex justify-center items-center'>
              <Text>No Product in the wishlist Yet</Text>
            </div>
            :
            orders.map((item, key) => (
              <div key={key} onClick={() => navigate("/order/"+item?._id)}>
                <div className='flex py-5'>
                  <div className='flex justify-center items-center gap-4'>
                    <img src={Ordered} alt="" />
                    <div>
                      <small className='font-primary_font text-primary'>{item?.orderStatus}</small>
                      <p className='font-secondary_font text-primary'>on {formatedDate(item?.createdAt)}</p>
                    </div>
                  </div>
                </div>
                <div className='flex justify-between items-center py-5'>
                  <div className='h-full w-full flex flex-col items-start justify-start gap-3 flex-[2]'>
                    <AppDesc>Order Id: </AppDesc>
                    <Text>{item?._id}</Text>
                  </div>
                  <div className='flex-1 flex flex-col justify-center items-center'>
                    <AppDesc>Total Price: </AppDesc>
                    <AppText>₹ {item?.totalPrice}</AppText>
                  </div>
                </div>
                <HR />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default DashOrders
