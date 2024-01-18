import React, { useState } from "react";




const ProductImages = ({ product }) => {
  const [img,setImg] = useState(product?.images[0]);
  return (
    <>
      <div className=" mt-8 lg:mt-0 flex flex-col justify-center items-center md:w-[60%]">
        <img
          src={img}
          className=" xl:min-h-[80vh] pb-10 lg:pb-5 2xl:pb-0 w-[100%] object-contain "
          alt="suit1"
        />
        <div className="flex flex-row justify-around md:justify-evenly items-center content-center w-[100%] gap-2 pb-5">
          {
            product?.images.map((item, key) => (
              <div key={key}>
                <img onClick={() => setImg(item)} height="100px" width="100px" style={{ cursor: 'pointer', alignSelf: 'center' }} src={item} alt="img1" />
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default ProductImages;
