import React from "react";
import Carousel from "react-multi-carousel";
import { useNavigate } from "react-router-dom";
import { LoadingOverlay, ProductCard4 } from "../../../components";
import { addWishlist } from "../../../http/wishlist";
import {toast} from 'react-toastify'
const ProductCarousel = ({ products,addItemToCart }) => {
  const navigate = useNavigate();

  const responsive = {
    one: {
      breakpoint: { max: 4000, min: 1600 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1324 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1324, min: 830 },
      items: 3,
    },
    five: {
      breakpoint: { max: 830, min: 464 },
      items: 2,
    },
    six: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const addProductWishlist = async (id) => {
    const value = await addWishlist(id);
    if (value.code === "ERR_NETWORK") {
      toast.error("Some error occured");
      return;
    }
    if (!value.success) {
      toast.error(value.message);
      return;
    } else {
      toast.success("Product added in wishlist");
    }
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  if (!products || products === null || products === undefined)
    return <LoadingOverlay />;

  return (
    <>
      <div className="mb-6">
        <Carousel
          ssr
          autoPlay
          autoPlaySpeed={2000}
          infinite
          draggable
          responsive={responsive}
        >
          {products.map((item, i) => (
            <div key={i}>
              <ProductCard4
                item={item}
                handleProductClick={handleProductClick}
                handleHeartButton={addProductWishlist}
                addItemToCart={addItemToCart}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default ProductCarousel;
