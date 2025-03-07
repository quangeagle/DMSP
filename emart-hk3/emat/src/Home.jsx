import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import SwiperSection from './SwiperSection';
import ProductBlock from './ProductBlock';

import Footer from './footer';
import './app.css';

// Group products into chunks of a specified size
const groupProducts = (products, itemsPerGroup) => {
  let grouped = [];
  for (let i = 0; i < products.length; i += itemsPerGroup) {
    grouped.push(products.slice(i, i + itemsPerGroup));
  }
  return grouped;
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3004/product/get')
      .then(res => {
        setProducts(res.data);
        setGroupedProducts(groupProducts(res.data, 5));
      })
      .catch(err => console.log(err));
  }, []);

  const swiperImages = [
    'logo2.png', 'logo3.png', 'logo10.png', 'logo4.png',
    'logo8.png', 'logo6.png', 'logo5.png'
  ];

  return (
    <>
      <div className='bg-slate-100 '>
        <SwiperSection images={swiperImages} />

        <div className='mr-32 ml-32 mt-24 pt-20'>
          {/* Image cards at the top */}
          <div className='h-52 mt-10 flex justify-between mb-10'>
            {["sale1.jpg", "sale2.jpg", "sale3.jpg"].map((imgSrc, idx) => (
              <div key={idx} className='relative w-96 h-52 overflow-hidden rounded-lg border border-gray-300'>
                <img src={imgSrc} className='transition-transform transform hover:scale-110 hover:opacity-50' />
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center p-2">
                  {idx === 0 ? "NO BRAND" : idx === 1 ? "NÔNG SẢN SẠCH" : "CHỈ CÓ TRÊN EMART"}
                </div>
              </div>
            ))}
          </div>

          {/* First product slider */}
          <div className='h-auto bg-white'>
            <div className='mb-10 pt-5 pl-6 pb-4 font-bold text-xl border-b-4'>
              SẢN PHẨM BÁN CHẠY
            </div>
            <div className="h-auto">
              <div className="swiper-container w-full h-auto group">
                <Swiper
                  navigation={true}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  {groupedProducts.map((productGroup, index) => (
                    <SwiperSlide key={index} className=" items-center bg-white text-black text-lg flex justify-between">
                      {productGroup.map((product) => (
                        <ProductBlock key={product.id} product={product} />
                      ))}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>

        {/* Second product section with image */}
        <div className='h-[330px] bg-white mt-9 mx-32 mb-24'>
  <div className=' pt-5 pl-6 pb-4 font-bold text-xl border-b-4'>
    SẢN PHẨM BÁN CHẠY
  </div>
  <div className='flex flex-row'>
    <div className=''>
      <img 
        src="sale4.jpg" 
        className="w-72 object-cover border border-gray-300" 
      />
    </div>
    <div className=' grid grid-cols-4 gap-4'>
      {products.slice(0, 4).map(product => (
        <ProductBlock key={product.id} product={product} />
      ))}
    </div>
  </div>
</div>



        <Footer />
      </div>
     
    </>
  );
};

export default Home;