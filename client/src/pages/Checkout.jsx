import React, { useEffect, useState } from 'react'
import { LoadingOverlay } from '../components';
import { userProfile } from '../http/profile'
import CheckoutComp from './components/Checkout/CheckoutComp'
import {toast} from "react-toastify"

const Checkout = ({updateCartLen}) => {

  //user fetch logic
  const [profile, setProfile] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    const value = await userProfile();
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
      setProfile(value);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchUser();
  }, [])

  if(loading) return <LoadingOverlay/>
  return (
    <>
      <CheckoutComp updateCartLen={updateCartLen} profile={profile} loading={loading} />
    </>
  )
}

export default Checkout
