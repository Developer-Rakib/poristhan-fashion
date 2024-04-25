import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { NavLink } from 'react-router-dom'
import Loader from '../Shared/Loader'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment, { fn } from 'moment'
import SingleBookingData from './SingleBookingData'

export default function ViewBookingData() {
    // const { isLoading: isLoading2, error: err, data: orders } = useQuery('orders', () =>
    //     axios.get('http://localhost:5000/orders')
    // )
    const { isLoading, error, data: memo } = useQuery('memo', () =>
        axios.get('http://localhost:5000/memo')
    )
    let [sellerNames, setSellerNames] = useState([])
    let [orders, setOrders] = useState([])

    useEffect(() => {
        if (memo?.data) {
            for (const [key, value] of Object.entries(memo?.data[0])) {
                if (!sellerNames.includes(key)) {
                    sellerNames.push(key)
                }
            }

        }
        const sName = sellerNames.filter((s) => {
            return s !== "_id"
        })
        setSellerNames(sName)
    }, [memo])
    // console.log(sellerNames);
    // useEffect(() => {
    // }, [])
    const [startDate, setStartDate] = useState(new Date());

    function hangleSearch(e) {
        e.preventDefault();
        // startDate.moment().format("MMM DD yyyy")
        let bookingDate = moment(startDate).format('MMM DD yyyy');
        let sName = e.target[1].value;
        axios.get(`http://localhost:5000/orders/${sName}?bookingDate=${bookingDate}`).then(res => {
            // console.log(res.data);
            setOrders(res.data);
        })
    }
    // console.log(orders);

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div>
            {/* <DatePicker
                    showIcon
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                /> */}


            <div className='text-right'>
                <NavLink className={({ isActive }) => (isActive ? 'activeLink' : 'navLink')} to={"/"}>Home</NavLink>
            </div>

            <div className='text-center w-[80%] mx-auto'>
                <DatePicker
                    className='border-2 rounded text-center py-1'
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    required
                    form="external-form"
                    showYearDropdown
                    dateFormat="MMM d yyyy"
                    yearDropdownItemNumber={15}
                    scrollableYearDropdown
                />
                <form onSubmit={(e) => hangleSearch(e)} id="external-form" className='text-center'>
                    <select id="sellerName" name="" autocomplete="item-name" class="bg-white block mx-auto my-1 text-center rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 capitalize" >
                        {
                            sellerNames.map((sellerName, i) => {
                                return <option className='capitalize'>{sellerName}</option>
                            })
                        }
                    </select>
                    <input className='bg-emerald-500 cursor-pointer mt-1 mb-4 text-white px-2 py-1 rounded-md pb-1' type="submit" value={"Search"} />
                </form>
            </div>


            <div className='sm:px-10 px-2 pb-5'>
                {/* <h5 className="text-lg text-center sm:text-left font-bold  mb-2 text-primary">Mange All Orders</h5> */}

                <div className="relative  overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-2  sm:py-3">

                                </th>
                                <th scope="col" className="py-2 sm:py-3">
                                    Seller Name
                                </th>
                                <th scope="col" className="py-2  sm:py-3">
                                    Memo
                                </th>
                                <th scope="col" className="py-2 text-center sm:py-3">
                                    ID
                                </th>
                                <th scope="col" className="py-2 text-center sm:py-3">
                                    Item
                                </th>
                                <th scope="col" className="py-2 text-center sm:py-3">
                                    QTY
                                </th>
                                <th scope="col" className="py-2 text-center sm:py-3">
                                    D. CH.
                                </th>
                                <th scope="col" className="py-2 text-center sm:py-3">
                                    Advance
                                </th>
                                <th scope="col" className="py-2 text-center sm:py-3">
                                    Amount
                                </th>
                                <th scope="col" className="py-2 text-center sm:py-3">
                                    Status
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((order, i) =>
                                    <SingleBookingData
                                        order={order}
                                        i={i}
                                    />)
                            }


                        </tbody>
                    </table>

                </div>


            </div >
        </div >
    )
}
