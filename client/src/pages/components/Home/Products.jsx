import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppDesc, AppText, Button, Heading, LoadingOverlay, ProductCard1, ProductCard2 } from '../../../components'
import styles from '../../../style'
import { getExploreProducts } from '../../../http/product';

const Pro = [];




const Products = () => {
  const navigate = useNavigate();
  // explore products
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchExploreProducts = async () => {
      setLoading(true);
      const response = await getExploreProducts();
      setLoading(false);
      const obj1 = {
        p1: response?.products[0].product,
        p2: response?.products[1].product,
        float: "md:justify-end"
      }
      const obj2 = {
        p1: response?.products[2].product,
        p2: response?.products[3].product,
        float: "md:justify-start"
      }
      if (Pro.length === 0) {
        Pro.push(obj1);
        Pro.push(obj2);
      }
    }
    if(Pro.length === 0)
    fetchExploreProducts();
  }, [])
  if (loading) return <LoadingOverlay />
  return (
    <div className='px-5 xs:px-10 py-16'>
      <div className={`flex flex-col gap-3 w-full`}>
        <Heading>Explore our Proudcts</Heading>
        <AppDesc>Latest from the house of Amour</AppDesc>
        {
          Pro.map((item, key) =>
            <div key={key} className={`flex w-full justify-between ${item.float} md:justify-start my-3`}>
              <div className='flex-wrap lg:mx-5 w-10 md:w-44 lg:w-60'>
                <ProductCard1 img={item?.p1.images[0]} name={item?.p1.name} price={item?.p1.price} id={item?.p1._id}/>
                <AppText className={"text-center"}>{(key % 2 == 0) ? "Kurits & Suits" : "Dresses & Nightsuits"}</AppText>
              </div>
              <div>
                <ProductCard2 img={item?.p2.images[0]} name={item?.p2.name} price={item?.p2.price} id={item?.p2._id}/>
              </div>
            </div>
          )
        }
        <div className={`${styles.flexCenter} lg:mt-10`}>
          <Button
            handleSubmit={() => navigate('/store')}
            title="Load More"
          />
        </div>
      </div>
    </div>
  )
}

export default Products
