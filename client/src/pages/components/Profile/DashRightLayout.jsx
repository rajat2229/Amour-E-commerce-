import React, { useContext } from 'react'
import suit1 from "../../../assets/Home/show.png";
import { AppDesc } from '../../../components';
import { AuthContext } from '../../../Context/userContext';
import {toast} from "react-toastify"
const DashRightLayout = () => {
  const {setUser} = useContext(AuthContext);

  const handleLogout = ()=>{
    toast.success("Logout successfully");
    setUser(null);
    localStorage.removeItem("WEB_APP");
    window.location.reload();
  }

  return (
    <div className="hidden lg:flex flex-col justify-center items-center">
      <div className=" hidden w-[250px] h-[300px] bg-background_primary lg:flex justify-center items-center rounded-b-full ">
        <img src={suit1} alt="suit" className='object-contain h-[40vh] 2xl:h-[32vh] ml-5' />
      </div>
      <AppDesc handleClick={handleLogout} className={"font-bold py-3 cursor-pointer"}>Logout</AppDesc>
    </div>
  )
}

export default DashRightLayout
