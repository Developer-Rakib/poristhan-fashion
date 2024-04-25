import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { NavLink } from 'react-router-dom'
import Loader from '../Shared/Loader'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment, { fn } from 'moment'
import { FaRegEdit } from "react-icons/fa";

export default function ViewBookingData() {
    // const { isLoading: isLoading2, error: err, data: orders } = useQuery('orders', () =>
    //     axios.get('http://localhost:5000/orders')
    // )
    const { isLoading, error, data: memo } = useQuery('memo', () =>
        axios.get('http://localhost:5000/memo')
    )
    let [sellerNames, setSellerNames] = useState([])
    let [orders, setOrders] = useState([])
    const [status, setSatus] = useState(null)

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
    function handleInfoSave() {
        console.log("hi");
    }
    function handleSelect(e) {
        // console.log(e);
    }
    function hangleSearch(e) {
        e.preventDefault();
        // startDate.moment().format("MMM DD yyyy")
        let bookingDate = moment(startDate).format('MMM DD yyyy');
        let sName = e.target[1].value;

        axios.get(`http://localhost:5000/orders/${sName}?bookingDate=${bookingDate}`).then(res => {
            // console.log(res.data);
            setOrders(res.data);
        })

        // console.log(`http://localhost:5000/orders/${sName}?bookingDate=${bookingDate}`)

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
                                    Amount
                                </th>
                                <th scope="col" className="py-2 text-center sm:py-3">
                                    Status
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((order, i) => {
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
                                            <td className="py-2 text-[12px] sm:text-F[13px]  text-center sm:py-4">
                                                {order.d_ch}
                                            </td>
                                            <td className="py-2 text-[12px] sm:text-[13px]  text-center sm:py-4">
                                                {order.amount}
                                            </td>
                                            <td className="py-2 text-[12px] sm:text-[13px] text-center sm:py-4 relative">


                                                {/* modal btn  */}
                                                <label for="my-modal-4" class="">
                                                    <FaRegEdit
                                                        className='absolute right-0 top-0 text-red-600 cursor-pointer'></FaRegEdit>
                                                </label>

                                                {/* modal  */}
                                                <input type="checkbox" id="my-modal-4" class="modal-toggle" />
                                                <label for="my-modal-4" class="modal cursor-pointer">
                                                    <label class="modal-box relative" for="">
                                                        <label htmlFor="my-modal-4" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                                        <form onSubmit={handleInfoSave}>
                                                            <div className="shadow  overflow-hidden sm:rounded-md">
                                                                <div className="px-4 py-4 bg-gray-50 sm:px-6">
                                                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Update Information</h3>
                                                                </div>
                                                                <div className="px-4 py-5 bg-white sm:p-6">
                                                                    <div className="grid grid-cols-6 gap-3">

                                                                        <div className="col-span-6 sm:col-span-2">
                                                                            <label htmlFor="memo" className="block text-sm font-medium text-gray-700">Memo</label>
                                                                            <input id="memo" name="memo"
                                                                                type="text" autocomplete="country-name" className="text-center mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

                                                                            />
                                                                        </div>
                                                                        <div className="col-span-6 sm:col-span-4 ">
                                                                            <label htmlFor="bookingID" className="block text-sm font-medium text-gray-700">ID NO</label>
                                                                            <input type={"number"} id="bookingID" name="bookingID" autocomplete="country-name" className="text-center mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                            />
                                                                        </div>
                                                                        <div className="col-span-6 sm:col-span-2">
                                                                            <label htmlFor="d_ch" className="block text-sm font-medium text-gray-700">D. CH.</label>
                                                                            <input id="d_ch" name="d_ch"
                                                                                type="text" autocomplete="d_ch" className="text-center mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

                                                                            />
                                                                        </div>
                                                                        <div className="col-span-6 sm:col-span-2">
                                                                            <label htmlFor="advance" className="block text-sm font-medium text-gray-700">Advance</label>
                                                                            <input type={"number"} id="advance" name="advance" autocomplete="country-name" className="text-center mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                            />
                                                                        </div>
                                                                        <div className="col-span-6 sm:col-span-2">
                                                                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                                                                            <input type={"number"} id="amount" name="amount" autocomplete="country-name" className="text-center mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                            />
                                                                        </div>
                                                                        <div className="col-span-6 sm:col-span-2">
                                                                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                                                                            <div class="">
                                                                                <select id="status" name={`status`} autocomplete="status" class="bg-white text-center block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                                                                    <option>Pending</option>
                                                                                    <option>Cancel</option>
                                                                                    <option>Return</option>
                                                                                    <option>Pertial Return</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>




                                                                    </div>
                                                                </div>
                                                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                                                    <button

                                                                        type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </label>
                                                </label>





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
