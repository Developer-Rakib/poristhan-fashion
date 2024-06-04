import React from 'react';
import AdsSection from './AdsSection';
import Banner from './Banner';
import BussinesSummury from './BussinesSummury';
import NewsLetter from './NewsLetter';
import Parts from './Parts';
import Reviews from './Reviews';
import AddOrderInfo from './AddOrderInfo/AddOrderInfo';

const Home = () => {
    return (
        <div className='mt-[50px]'>

            {/* <Banner></Banner> */}
            <p className='mt-16'>Welcome to</p>
            <h1 className='text-4xl text-[#f15048]'>Poristhan Fashion</h1>
            <p>Some features will be added soon</p>

            {/* <Parts></Parts> */}
            <BussinesSummury></BussinesSummury>

            {/* <Reviews></Reviews> */}
            {/* <AdsSection></AdsSection> */}
            <NewsLetter></NewsLetter>
        </div>
    );
};

export default Home;