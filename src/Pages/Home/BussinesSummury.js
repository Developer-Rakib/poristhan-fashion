import React from 'react';
import { FaTools } from 'react-icons/fa';
import { MdReviews } from 'react-icons/md';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { GiClothes } from "react-icons/gi";


const BussinesSummury = () => {
    return (
        <div className='flex pt-5 justify-evenly flex-wrap sm:flex-nowrap Container'>
            <div style={{ fontFamily: 'Open Sans', boxShadow: '#f15048 0px 1px 4px' }} className='flex w-9/12 sm:w-[370px] h-18 px-4 sm:h-auto sm:px-6 py-5 sm:py-6 rounded-xl m-3 sm:m-2 justify-center items-center'>
                <GiClothes className='text-[#f15048] text-2xl sm:text-5xl'></GiClothes >
                <h1 className="text-2xl sm:text-3xl ml-3">100+ Products</h1>
            </div>


            <div style={{ fontFamily: 'Open Sans', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }} className='flex w-9/12 sm:w-[370px] bg-[#f15048] sm:h-auto h-18 text-white px-4 py-5 sm:py-6 rounded-xl m-3 sm:m-2 justify-center items-center'>
                <MdReviews className=' text-2xl sm:text-5xl'></MdReviews>
                <h1 className="text-2xl sm:text-3xl ml-3">10K+ Reviews</h1>
            </div>
            <div style={{ fontFamily: 'Open Sans', boxShadow: '#f15048 0px 1px 4px' }} className='flex w-9/12 sm:w-[370px] h-18 px-4 sm:h-auto sm:px-6 py-5 sm:py-6  rounded-xl m-3 sm:m-2 justify-center items-center'>
                <RiCustomerService2Fill className='text-[#f15048] text-2xl sm:text-5xl'></RiCustomerService2Fill>
                <h1 className="text-2xl sm:text-3xl ml-">100k+ Customers</h1>
            </div>
        </div>
    );
};

export default BussinesSummury;