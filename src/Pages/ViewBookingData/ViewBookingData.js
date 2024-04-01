import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { NavLink } from 'react-router-dom'
import Loader from '../Shared/Loader'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment, { fn } from 'moment'

export default function ViewBookingData() {
    const { isLoading: isLoading2, error: err, data: orders } = useQuery('orders', () =>
        axios.get('http://localhost:5000/orders')
    )
    const { isLoading, error, data: memo } = useQuery('memo', () =>
        axios.get('http://localhost:5000/memo')
    )
    let [sellerNames, setSellerNames] = useState([])

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
        console.log(moment(startDate).format('MMM DD yyyy'));


    }

    if (isLoading || isLoading2) {
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
                <form onSubmit={hangleSearch} id="external-form" className='text-center'>
                    <select id="item" name="" autocomplete="item-name" class="bg-white block mx-auto my-1 text-center rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 capitalize" >
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
                                    Amount
                                </th>
                                <th scope="col" className="py-2 text-center sm:py-3">
                                    Status
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.data?.map((order, i) => {
                                    let totalItemQty = 0;
                                    return (
                                        <tr key={order._id} className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                                            <th scope="row" className="pl-2 pr-1 sm:pr-0 sm:pl-5 py-2  sm:py-4 font-medium text-gray-900 dark:text-white whitespace-nowraptext-[13px]">
                                                {i + 1}
                                            </th>
                                            <td className="py-2 text-[12px] sm:text-[13px] sm:py-4 capitalize">
                                                {order.sellerName}
                                            </td>
                                            <td className="py-2 w-48  text-[12px] sm:text-[13px] sm:py-4">
                                                {order.memo}
                                            </td>
                                            <td className="py-2 text-[12px] sm:text-[13px]  text-center sm:py-4">
                                                {order.bookingID}
                                            </td>
                                            <td className="py-2 text-[12px] sm:text-[13px]  text-center sm:py-4">
                                                {order.item.map((item, b) => {

                                                    Object.values(item).map(i => {
                                                        totalItemQty = totalItemQty + i;
                                                    })
                                                    return <p key={b}>{`${Object.keys(item)} ( ${Object.values(item)} )`}</p>
                                                })}
                                            </td>
                                            <td className="py-2 text-[12px] sm:text-[13px]  text-center sm:py-4">
                                                {totalItemQty}
                                            </td>
                                            <td className="py-2 text-[12px] sm:text-[13px]  text-center sm:py-4">
                                                {order.d_ch}
                                            </td>
                                            <td className="py-2 text-[12px] sm:text-[13px]  text-center sm:py-4">
                                                {order.amount}
                                            </td>
                                            <td className="py-2 text-[12px] sm:text-[13px] text-center sm:py-4">
                                                <p className='text-green-500'>{order.status}</p>

                                                {/* {!order.paid &&

                                                <p className='text-red-500'>Unpaid</p>
                                            }
                                            {
                                                (!order.shipped && order.paid) && <p className='text-green-500'>Pending</p>
                                            }
                                            {
                                                order.shipped && <p className='text-green-700'>Paid</p>
                                            } */}

                                            </td>
                                            {/* <td className="py-2 text-[12px] sm:text-[13px] text-center sm:py-4">
                                            {!order.paid &&

                                                <button
                                                    onClick={() => hnadleDelete(order._id, order.name)}
                                                    className='btn mr-1 btn-xs bg-red-500 text-white border-none'>Cancel</button>}



                                            {(!order.shipped && order.paid) && <button
                                                onClick={() => handleShip(order._id, order.name)}
                                                className='btn mr-1 btn-xs bg-red-500 text-white border-none'>Ship</button>
                                            }
                                            {
                                                order.shipped && <p className='text-green-700'>Sipped</p>
                                            }

                                        </td> */}
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>

            </div >
        </div>
    )
}
