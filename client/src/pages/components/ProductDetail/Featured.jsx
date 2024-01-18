import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { useNavigate } from "react-router-dom";
import { Heading, LoadingOverlay, ProductCard4 } from "../../../components";
import { recommndedProducts } from "../../../http/product";

const Featured = ({ handleProductCarousel }) => {
  const navigate = useNavigate();
  const responsive = {
    one: {
      breakpoint: { max: 4000, min: 1920 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 1920, min: 1420 },
      items: 5,
    },
    bigTablet: {
      breakpoint: { max: 1420, min: 1150 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1150, min: 905 },
      items: 3,
    },
    five: {
      breakpoint: { max: 905, min: 575 },
      items: 2,
    },
    six: {
      breakpoint: { max: 575, min: 0 },
      items: 1,
    },
  };

  // recommended Products logic

  const [recommndedProd, setRecommendedProd] = useState(null);
  async function fetchRecommeded() {
    const value = await recommndedProducts();
    setRecommendedProd(value.products);
  }

  useEffect(() => {
    fetchRecommeded();
  }, [])

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };



  if (!recommndedProd || recommndedProd === null) return <LoadingOverlay />
  return (
    <>
      <div>
        <Heading className=" mb-12 mt-12 ">Related Products</Heading>
        <Carousel
          ssr
          autoPlay
          autoPlaySpeed={2000}
          infinite
          draggable
          responsive={responsive}
        >
          {
            recommndedProd.map((item, i) => (
              <div key={i}>
                <ProductCard4
                  item={item}
                  relatedProduct={true}
                  handleProductClick={handleProductClick}
                />
              </div>
            ))}
        </Carousel>
      </div>
    </>
  );
};

export default Featured;
