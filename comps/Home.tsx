"use client";
import { useState } from "react";
import { BannerDataTypes, ProductsTypes } from "../app/page";
import FooterBanner from "../comps/FooterBanner";
import MainBanner from "./MainBanner";
import Products from "../app/Products";
import { useEffect } from "react";

interface HomeProps {
  products: ProductsTypes[];
  bannerData: BannerDataTypes[];
}

const Home = ({ products, bannerData }: HomeProps) => {
  const [sortOption, setSortOption] = useState<string>("default");
  const [isGrid4x3, setIsGrid4x3] = useState<boolean>(false); // false = 3x4, true = 4x3

  // Function to sort products based on price
  const getSortedProducts = () => {
    if (!products) return [];
    
    const productsCopy = [...products];
    
    switch (sortOption) {
      case "low-to-high":
        return productsCopy.sort((a, b) => a.price - b.price);
      case "high-to-low":
        return productsCopy.sort((a, b) => b.price - a.price);
      default:
        return productsCopy; // Return original order
    }
  };

  const sortedProducts = getSortedProducts();
  


  return (
    <main>
      {/* === MAIN BANNER  */}
      <MainBanner banner={bannerData[0]} />

      <section className="  mb-4 flex items-center flex-col">
        <h1
          className=" headTitle px-8 py-4 sm:py-2 sm:text-4xl text-2xl text-secondary
         font-sans font-extrabold sm:rounded-t-3xl"
        >
          Best Selling Headphones
        </h1>
        {/* <p className=" text-base text-secondary">Best in the Market</p> */}
        
        {/* Sort by Price Selector */}
        <div className="mt-4 mb-2 flex items-center gap-4">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="default">Sort by Price</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
          
          <button
            onClick={() => {
              setIsGrid4x3(!isGrid4x3);
              console.log(`Grid layout changed to: ${!isGrid4x3 ? '4x3' : '3x4'}`);
            }}
            className="px-4 py-2 bg-dim hover:bg-dim text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isGrid4x3 ? 'Switch to 3×4' : 'Switch to 4×3'}
          </button>
        </div>
      </section>

      {/* === SHOW PRODUCTS  */}
      <section
        className={`grid grid-cols-2 sm:grid-cols-3 ${isGrid4x3 ? 'md:grid-cols-4' : 'md:grid-cols-3'} lg:mx-20 overflow-hidden`}
      >
        {/* === MAP PRODUCTS  */}
        {sortedProducts?.map((products: ProductsTypes) => {
          return <Products key={products._id} products={products} />;
        })}
      </section>

      {/* ==== FOOTER BANNER  */}
      <FooterBanner bannerData={bannerData && bannerData[1]} />
    </main>
  );
};

export default Home;
