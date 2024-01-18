import React from 'react'
import "./SideBar.css"
import {AiOutlineClose} from "react-icons/ai"
import { AppDesc, Button} from ".."
const index = ({handleSideBar, open }) => {
  if (open) {
    document.body.style.overflowY = "hidden";
  }
  else {
    document.body.style.overflowY = "scroll";
  }
  return (
    <>
      <div>
        {open && <div onClick={handleSideBar} className='side-overlay'></div>}
        <div className={`side-contain ${open && "side-contain-active"} xxs:w-[20rem] xs:w-[90%] md:w-[30rem]`}>
          <div className='flex flex-col justify-between h-full'>
            <div>
              <div className='min-h-[10vh] bg-background_primary flex justify-between px-5 items-center'>
                <AppDesc>Shopping Bag</AppDesc>
                <AiOutlineClose onClick={handleSideBar} className="cursor-pointer" color='#724B50' size={25}/>
              </div>
              {/* Product card Here  */}
              <div>
                <AppDesc>Product Here</AppDesc>
              </div>
              {/* Product card Here  */}
            </div>
            <div className='px-5'>
              {/* <HR /> */}
              <div className='flex justify-between'>
                <AppDesc className={"font-secondary_font lg:text-xl"}>Product</AppDesc>
                <AppDesc className={"font-secondary_font lg:text-xl"}>Total</AppDesc>
              </div>
              {/* <HR /> */}
              <div className='lg:flex justify-between px-1 py-4 gap-5'>
                <div className='flex-1 my-5 lg:my-0'>
                  <Button
                    title="View Cart"
                    className={"w-full bg-inherit text-primary h-12 lg:h-14"}
                    textClass="text-sm w-full"
                    textStyle={{ color: "var(--primary-color)" }}
                  />
                </div>
                <div className='flex-1'>
                  <Button
                    title="Checkout"
                    className={"w-full h-12 lg:h-14"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default index
