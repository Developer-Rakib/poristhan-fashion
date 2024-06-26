import React from 'react';
import toast from 'react-hot-toast';

const NewsLetter = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
        toast.success(`Successfully Subscibed`)
        e.target.value.reset()

    }
    return (
        <div className='mb-12 sm:mb-20 mt-7 sm:mt-10'>
            <h1 className="text-3xl sm:text-4xl border-b-4  mb-3 mt-4 border-primary inline-block">News Letter</h1>
            <div style={{ backgroundImage: 'url("https://dlcdnimgs.asus.com/websites/global/products/eZwnQPTSRcn68Lwd/img/kv/OPTIMIZATION_banner.jpg")', fontFamily: 'Oswald' }} className='h-[300px] sm:h-[400px] bg-center bg-cover mb-16 w-full px-2 rounded-md sm:rounded-none sm:px-0  flex justify-center items-center text-white Container'>
                <div>
                    <h3 className="text-base sm:text-2xl uppercase text-white tracking-wider">SPECIAL <span className='text-primary'>OFFER</span> FOR SUBSCRIPTION</h3>
                    <h2 style={{ fontFamily: '' }} className=" text-xl sm:text-3xl font-semibold  sm:font-bold my-2 sm:my-0">GET INSTANT DISCOUNT FOR MEMBERSHIP</h2>
                    <p style={{ fontFamily: 'Open Sans,sans-serif' }} className='italic text-white sm:text-base text-sm py-4 sm:py-2 px-6'>Subscribe our newsletter and all latest news of our
                        latest product, promotion and offers </p>
                    <form className='px-8' onSubmit={handleSubmit} style={{ fontFamily: 'Open Sans,sans-serif' }} >
                        <input className='h-10 sm:h-12 w-7/12 sm:w-6/12 px-5 mx-auto border-2 bg-inherit rounded-l-full border-r-0' type="email" name="email" id="" placeholder='Enter Email' required />

                        <button type='submit' style={{ fontFamily: 'Open Sans, sans-serif', letterSpacing: '1.5px' }} className="hover:bg-white transition w-[6rem] sm:w-32 mx-auto text-center bg-primary  hover:text-black rounded-r-full text-white border-2 border-primary py-1.5 sm:py-2.5 ">Subscribe</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewsLetter;