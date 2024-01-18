import React, { useEffect,useState } from "react";
import { AppDesc, StarRating, LoadingOverlay } from "../components";
import { useParams } from "react-router-dom";
import { singleProduct } from "../http/product";
import { addWishlist } from "../http/wishlist";
import { toast } from "react-toastify";
import {
  ReviewForm,
  Reviews,
  Details,
  Details2,
  MobileDetails,
  ProductDetailFeatured,
  ProductImages,
} from "../components";
import { addToCart } from "../redux/cartSlice";
import { useDispatch } from 'react-redux'




const Product = ({ updateCartLen, handleSideBar }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [size, setSize] = useState("S");
  const [color, setColor] = useState("blue");
  const [cart, setCart] = useState(0);
  const options = ["S", "M", "L", "XL"];

  const [refresh,setRefresh] = useState(false);
  const handleRefresh = ()=>setRefresh(prevState => !prevState);
  const handleProductCarousel = (e) => {
  };

  const handleSize = (el) => {
    setSize(el);
  };
  const handleColor = (el) => {
    setColor(el);
  };
  const handleHeartButton = (el) => {
  };
  const handleCartButton = (el) => {
    setCart(cart + 1);
  };

  //fetch product details
  const [product, setProduct] = useState(null);
  const [loading,setLoading]  = useState(false);
  async function fetchProduct() {
    setLoading(true);
    const value = await singleProduct(id);
    setLoading(false);
    setProduct(value.product);
  }

  useEffect(() => {
    fetchProduct();
  }, [id,refresh]);

  if (!product || product === null) return <LoadingOverlay />;
  const accordion = [
    {
      title: "Colour",
      content: product?.color.toUpperCase(),
    },
    {
      title: "Fabric",
      content: product?.fabric.toUpperCase(),
    }
  ];

  // add product in wishlist
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

  // add product into the cart
  const addItemToCart = (item) => {
    const obj = {
      ...item,
      quantity: 1,
      size: size.toLowerCase()
    }
    dispatch(addToCart(obj));
    updateCartLen();
    window.scrollTo(0, 0);
    handleSideBar();
    // toast.success("Item Successfully Added To Cart ! \n");
  }
  if(loading) return <LoadingOverlay/>
  return (
    <>
      <div className="my-8 mx-6 md:mx-[3.5rem]">
        <div className="flex flex-col-reverse flex-1 lg:flex-row">
          <div className="flex flex-col flex-1 md:justify-center md:items-center lg:justify-start lg:items-start">
            <Details product={product} accordion={accordion} options={options} />
            <Details2
              size={size}
              product={product}
              options={options}
              handleColor={handleColor}
              handleSize={handleSize}
              addProductWishlist={addProductWishlist}
              handleCartButton={addItemToCart}
            />
          </div>
          <div className=" flex-1 lg:mt-0 flex justify-center items-center">
            <ProductImages product={product} />
          </div>
        </div>
        {/* mobile view  */}
        <MobileDetails
          product={product}
          accordion={accordion}
          handleColor={handleColor}
          handleSize={handleSize}
          options={options}
          addProductWishlist={addProductWishlist}
          handleHeartButton={handleHeartButton}
          handleCartButton={addItemToCart}
        />
        <div className="flex items-center justify-center flex-col">
          <StarRating rating={product?.rating} review={product?.reviews.length} className=" my-3 space-y-3 md:my-10" />
          <div className="flex space-y-8 flex-col w-full md:w-[95%]">
            <ReviewForm productId={product?._id} handleRefresh={handleRefresh}/>
            {product.reviews.length === 0 ? (
              <div className="p-10">
                <AppDesc>No Reviews yet. Be the first to review</AppDesc>
              </div>
            )
              : (
                product.reviews.map((review, key) => (
                  <Reviews review={review} key={key} />
                ))
              )
            }
          </div>
        </div>
        <ProductDetailFeatured handleProductCarousel={handleProductCarousel} />
      </div>
    </>
  );
};

export default Product;
