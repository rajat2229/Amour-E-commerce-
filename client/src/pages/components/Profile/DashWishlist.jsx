import React, { useEffect, useState } from 'react'
import { AppDesc, AppText, Button, HR, LoadingOverlay, ProductCard3, SmallBtn, Text } from '../../../components'
import { AiOutlineClose } from "react-icons/ai"
import { deleteProductFromWishList, fetchWishList } from '../../../http/wishlist';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


const DashWishlist = () => {
  const navigate = useNavigate();
  const [wishItems, setWishItems] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWishlistItems = async () => {
    const value = await fetchWishList();
    if (value.code === "ERR_NETWORK") {
      toast.error("Some error occured");
      return;
    }
    if (!value.success) {
      if(value.message === 'Wishlist not found'){
        setWishItems([]);
        return;
      }
      toast.error(value.message);
      return;
    }
    else {
      setWishItems(value.wishlist.products);
    }
  }


  const handleRemove = async (id) => {
    setLoading(true);
    const value = await deleteProductFromWishList(id);
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
      toast.success("Product removed from wishlist");
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchWishlistItems();
  }, [loading])
  if (!wishItems || wishItems === null) return <LoadingOverlay />
  return (
    <div className='max-h-[80vh] lg:mt-20 overflow-x-scroll wish-div'>
      {/* For large Screen sizes  */}
      <table className='wish-table hidden lg:table'>
        <thead>
          <tr>
            <th> <Text>Product Name</Text>  </th>
            <th> <Text>Price</Text>  </th>
            {/* <th> <Text>Stock Status</Text>  </th> */}
          </tr>
        </thead>
        <tbody>
          {
            wishItems.length === 0 ?
              <tr>
                <td colSpan={2} className="p-10">
                  <div className='py-10 flex-[2] flex justify-center items-center'>
                    <Text>No Product in the wishlist Yet</Text>
                  </div>
                </td>
              </tr>
              :
              wishItems.map((item, key) => (
                <tr key={key}>
                  <td>
                    <div className='h-full w-full flex items-center justify-start px-10 gap-5'>
                      <ProductCard3 img={item?.images[0]} />
                      <Text>{item?.name}</Text>
                    </div>
                  </td>
                  <td><Text>₹ {item?.price}</Text></td>
                  <td >
                    <div className='h-full w-full flex gap-4 items-center justify-center'>
                      <Button
                        handleSubmit={() => navigate("/product/" + item?._id)}
                        title="Buy" />
                      <AiOutlineClose onClick={() => handleRemove(item?._id)} className="cursor-pointer" color='#724B50' size={25} />
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
            wishItems.length === 0 ?
              <div className='py-10 flex-[2] flex justify-center items-center'>
                <Text>No Product in the wishlist Yet</Text>
              </div>
              :
              wishItems.map((item, key) => (
                <div key={key}>
                  <div className='flex justify-end'>
                    <AiOutlineClose onClick={() => handleRemove(item?._id)} className="cursor-pointer" color='#724B50' size={18} />
                  </div>
                  <div className='flex justify-between items-center pb-3'>
                    <div className='h-full w-full flex items-center justify-start gap-2 flex-[2]'>
                      <ProductCard3 img={item?.images[0]} />
                      <div className='flex flex-col justify-center items-start'>
                        <AppDesc>{item?.name}</AppDesc>
                        <AppText>₹ {item?.price}</AppText>
                      </div>
                    </div>
                    <div className='flex-1 flex justify-end items-center'>
                      <SmallBtn
                        handleSubmit={() => navigate("/product/" + item?._id)}
                        title="Buy Now"
                        style={{ padding: '0px 20px' }}
                      />
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

export default DashWishlist
