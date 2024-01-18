import React from "react";
import { Button, Heading, StoreCarousel } from "../../../components";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const StoreComp = ({ title, products, addItemToCart, category }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const kurtisProduct = products.filter((item) => item.category === 'kurtis');
  const dressesProduct = products.filter((item) => item.category === 'dress');
  const suitsProduct = products.filter((item) => item.category === 'suits');
  const nightProduct = products.filter((item) => item.category === 'night-suits');
  const bottomProduct = products.filter((item) => item.category === 'bottom-wear');
  if (!kurtisProduct || kurtisProduct.length === 0) return <LoadingOverlay />
  if(pathname === '/store/kurtis') return <Navigate to="/productslist/kurtis/Explore_Kurtis" state={kurtisProduct} replace/>
  if(pathname === '/store/dress') return <Navigate to="/productslist/dress/Explore_Dresses" state={dressesProduct} replace/>
  if(pathname === '/store/suits') return <Navigate to="/productslist/suits/Explore_Suits" state={suitsProduct} replace/>
  if(pathname === '/store/night') return <Navigate to="/productslist/night-suits/Explore_Night_Suits" state={nightProduct} replace/>
  if(pathname === '/store/bottom') return <Navigate to="/productslist/bottom-wear/Explore_Bottom_Wear" state={bottomProduct} replace/>
  return (
    <div>
      <Heading className=" flex justify-center items-center mt-16 ">
        {title.replaceAll("_"," ")}
      </Heading>
      {title === 'Explore_Kurtis' && <StoreCarousel products={kurtisProduct} addItemToCart={addItemToCart} />}
      {title === 'Explore_Dresses' && <StoreCarousel products={dressesProduct} addItemToCart={addItemToCart} />}
      {title === 'Explore_Suits' && <StoreCarousel products={suitsProduct} addItemToCart={addItemToCart} />}
      {title === 'Explore_Night_Suits' && <StoreCarousel products={nightProduct} addItemToCart={addItemToCart} />}
      {title === 'Explore_Bottom_Wear' && <StoreCarousel products={bottomProduct} addItemToCart={addItemToCart} />}
      <div className="flex justify-center items-center">
        <Button title={"Load More"} handleSubmit={() =>
          navigate(`/productslist/${category}/${title}`,
            {
              state: title === 'Explore_Kurtis' ? kurtisProduct : title === 'Explore_Dresses' ? dressesProduct :title === 'Explore_Suits' ? suitsProduct : title === 'Explore_Night_Suits' ? nightProduct :title === 'Explore_Bottom_Wear' && bottomProduct
            }
          )
        }
        />
      </div>
    </div>
  );
};

export default StoreComp;
