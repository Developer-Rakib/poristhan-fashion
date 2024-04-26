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
        <div className='mt-[70px]'>
            <AddOrderInfo />
            {/* <Banner></Banner>
            <Parts></Parts>
            <BussinesSummury></BussinesSummury>
            <Reviews></Reviews>
            <AdsSection></AdsSection>
            <NewsLetter></NewsLetter> */}
        </div>
    );
};

export default Home;