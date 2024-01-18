import React from "react";
import { Hero, NewsLetter, Products, Animation, FeaturedProducts } from "../components";

const Home = () => {
  return (
    <div style={{ paddingBottom: 20 }}>
      <Hero />
      <Products />
      <FeaturedProducts/>
      <Animation />
      <NewsLetter />
    </div>
  );
};

export default Home;
