import React from 'react';
import { Link } from 'react-router-dom';
import smallLogo from '../../img/smallLogo.png';

const Footer = () => {
    return (
        <>
            <footer className="footer  p-10 bg-neutral text-neutral-content">
                <div className='mx-auto sm:mx-0'>
                    <img src={smallLogo} alt="" />
                    <p>Computer Village<br />A Shop of Parts of Computer</p>
                </div>
                <div className=''>
                    <span className="footer-title">Services</span>
                    <Link to={''} className="link link-hover">Branding</Link>
                    <Link to={''} className="link link-hover">Design</Link>
                    <Link to={''} className="link link-hover">Marketing</Link>
                    <Link to={''} className="link link-hover">Advertisement</Link>
                </div>
                <div>
                    <span className="footer-title">Company</span>
                    <Link to={''} className="link link-hover">About us</Link>
                    <Link to={''} className="link link-hover">Contact</Link>
                    <Link to={''} className="link link-hover">Jobs</Link>
                    <Link to={''} className="link link-hover">Press kit</Link>
                </div>
                <div>
                    <span className="footer-title">Legal</span>
                    <Link to={''} className="link link-hover">Terms of use</Link>
                    <Link to={''} className="link link-hover">Privacy policy</Link>
                    <Link to={''} className="link link-hover">Cookie policy</Link>
                </div>
            </footer>
            <footer className="footer px-10 py-4 border-t bg-neutral text-neutral-content border-base-300 ">
            <p className='mx-auto flex flex-col  sm:flex-row'>Copyright © 2022 - All right reserved by <a className='text-primary hover:underline hover:tracking-wide transition-all  ' href="https://github.com/Developer-Rakib">Developer Rakib</a></p>
                
            </footer>
        </>
    );
};

export default Footer;