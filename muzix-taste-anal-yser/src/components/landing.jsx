import '../App.css';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


import justin from '../images/iloveimg-compressed(1)/pngegg.png';
import arctic from "../images/arctic-monkeys.png"  
import olivia from "../images//iloveimg-compressed(1)/olivia.png"
import taylor from "../images/iloveimg-compressed(1)/taylor.png"


const Button = ({ onClick }) => {
 
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  
  return (
    <div>
    <div className="flex flex-col items-center pt-32  ">
      <div className='Bono md:text-5xl  md:mt-0 text-3xl  text-cyan-900'>
        Hey, Ready to Know what
      </div>
      <span className='text-gray-800 Bono md:text-5xl text-3xl'> ✨INTERNET✨ </span>
      <span className='text-cyan-900  Bono md:text-5xl text-3xl'>  Thinks about your MUSIC Taste </span>
      
      <button
        onClick={onClick}
        className="mt-20 md:mt-20 inline-flex items-center h-10 px-6 py-6 text-2xl text-indigo-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
      >
       <span>Authenticate</span>
        <svg className="w-4 h-4 ml-3 fill-current" viewBox="0 0 20 20">
          <path
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </button>
  <div className='md:flex flex-row items-center ml-0 md:visible hidden'>
  <img className='md:w-1/6  mt-20 md:mt-10' src={olivia} alt="jsu" />
      <img className='md:w-1/6  mt-20 md:mt-10' src={taylor} alt="jsu" />
      <img className='md:w-1/4  ml-10 mr-10 mt-20 md:mt-10' src={arctic} alt="jsu" />
      <img className='md:w-1/3  mt-20 md:mt-10' src={justin} alt="jsu" />
      </div>
     </div>

      <div>    <section className='mt-10 mx-20  '>
     <div className='md:hidden visible'>
 {/* i want a slider here */}
 <Slider {...sliderSettings}>
 <img className="w-1/8 h-auto max-h-60" src={arctic} alt="arctic" />
 <img className="w-1/8 h-auto max-h-60" src={taylor} alt="taylor" />
    <img className="w-1/4 h-auto max-h-60 " src={justin} alt="justin" />
          <img className="w-1/8 h-auto max-h-60" src={olivia} alt="olivia" />
          
          
          
        </Slider>
  </div>
     </section>
     </div>
   
      <section className=" dark:text-gray-600 mt-20">
	<div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
		<p className="p-2 text-sm font-medium tracki text-center uppercase">How it works</p>
		<h2 className="mb-12 text-4xl font-bold leadi text-center sm:text-5xl">Frequently Asked Questions</h2>
		<div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 dark:divide-gray-700">
			<details>
				<summary className="py-2 outline-none cursor-pointer focus:underline">This is Based on what data?</summary>
				<div className="px-4 pb-4">
					<p>uhh Source? Trust me broo , NOO OFC kidding THE DATA WE USED is obtained by webscraping REDDIT <svg className="w-4 h-4 inline ml-3 fill-current" viewBox="0 0 20 20">
          <path
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg></p>
				</div>
			</details>
			<details>
				<summary className="py-2 outline-none cursor-pointer focus:underline"> How can be some music better than other?</summary>
				<div className="px-4 pb-4">
					<p>Anything which includes Taylor swift is bad</p>
				</div>
			</details>
		</div>
	</div>
</section>

<section className='flex flex-col items-center mt-10 pb-10 text-3xl Bono text-gray-500'>
  <div> made by rahul with  <svg className="w-4 h-4  inline fill-current" viewBox="0 0 20 20">
          <path
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg> </div>
</section>
    </div>
   
    // </div>
  );
}; 

export default Button;
