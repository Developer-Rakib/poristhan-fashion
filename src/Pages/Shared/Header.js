import React, { useState } from 'react';
import '../Style/Style.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { GoThreeBars } from 'react-icons/go';
import { MdDashboardCustomize, MdOutlineClose } from 'react-icons/md';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init'
import Loader from './Loader';
import useRole from '../../Hooks/useRole';

const Header = () => {
    let [toggle, setToggle] = useState(false);
    const [user, loading] = useAuthState(auth);
    let [role, roleLoading] = useRole(user)

    let navigat = useNavigate();

    // console.log(user);
    const navBtnHndle = () => {
        setToggle(!toggle)
    }

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                navigat('/login')
                toast.success('Logout Succes!')
                localStorage.removeItem('accessToken')
            })
    }

    if (loading) {
        return <Loader></Loader>
    }
    // console.log(role);
    return (
        <div className='header-container py-4 sm:py-[12px] fixed top-0 w-full'>
            <nav
                className='flex justify-center items-start  md:justify-between md:px-28 px-5 md:items-center'
            >
                {
                    user &&
                    <label htmlFor="dashboard-drower" tabIndex="1" className="md:hidden absolute left-6  top-[22px]">
                        <MdDashboardCustomize className='h-5 w-5'></MdDashboardCustomize>
                    </label>
                }
                {/* <img className='sm:w-52 w-48' src={logo} alt="" /> */}
                <h2 className='w-[150px] text-[#f15048] tracking-wide headerLogo'>Poristhan Fashion</h2>

                <span onClick={navBtnHndle} className='md:hidden cursor-pointer absolute right-6 text-xl top-[20px]'>{toggle ? <MdOutlineClose></MdOutlineClose> : <GoThreeBars></GoThreeBars>}</span>

                <ul onClick={navBtnHndle} className={`flex flex-col text-center md:justify-end z-10  md:flex-row md:top-0 left-0 w-full md:relative md:opacity-100  absolute  py-4 md:py-0 duration-500 ${toggle ? " opacity-100 visible  top-14" : " top-[-250px] opacity-0 invisible"} sm:visible`}>
                    <NavLink className={({ isActive }) => (isActive ? 'activeLink' : 'navLink')} to={"/"}>Home</NavLink>
                    {/* {
                        user && <>
                            <NavLink className={({ isActive }) => (isActive ? 'activeLink' : 'navLink')} to={"/dashboard"}>Dashboard</NavLink>

                        </>
                    } */}



                    {
                        user && <>


                            {
                                role === "admin" &&
                                <>
                                    <NavLink className={({ isActive }) => (isActive ? 'activeLink' : 'navLink')} to={"/createOrder"}>Create Order</NavLink>
                                    <NavLink className={({ isActive }) => (isActive ? 'activeLink' : 'navLink')} to={"/bookingEntry"}>Entry</NavLink>
                                </>
                            }

                            <NavLink className={({ isActive }) => (isActive ? 'activeLink' : 'navLink')} to={"/searchByDate"}>Search by Date</NavLink>
                            <NavLink className={({ isActive }) => (isActive ? 'activeLink' : 'navLink')} to={"/singleSearch"}>Search by ID</NavLink>

                            {
                                role === "admin" &&
                                <>
                                    <NavLink className={({ isActive }) => (isActive ? 'activeLink' : 'navLink')} to={"/addMemo"}>Add Memo</NavLink>

                                    <NavLink className={({ isActive }) => (isActive ? 'activeLink' : 'navLink')} to={"/dashboard"}>Dashboard</NavLink>


                                    <NavLink className={({ isActive }) => (isActive ? 'activeLink' : 'navLink')} to={"/manageUsers"}>Manage Users</NavLink>
                                </>
                            }
                        </>
                    }




                    {user ?
                        // <button onClick={handleLogout} className='uppercase my-0.5 md:my-0 text-left   mx-auto md:mx-0 md:pb-0.5' >LogOut</button>
                        <NavLink onClick={handleLogout} className={({ isActive }) => (isActive ? 'activeLink' : 'navLink')} to={"/login"}>LogOut</NavLink>
                        :
                        <NavLink className={({ isActive }) => (isActive ? 'activeLink' : 'navLink')} to={"/login"}>Login</NavLink>
                    }
                </ul>
            </nav>
        </div>
    );
};

export default Header;