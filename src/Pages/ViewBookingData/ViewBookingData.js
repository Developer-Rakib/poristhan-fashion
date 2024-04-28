import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { NavLink } from 'react-router-dom'
import Loader from '../Shared/Loader'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment, { fn } from 'moment'
import SingleBookingData from './SingleBookingData'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'

export default function ViewBookingData() {
    // const { isLoading: isLoading2, error: err, data: orders } = useQuery('orders', () =>
    //     axios.get('http://localhost:5000/orders')
    // )
    const { isLoading, error, data: memo } = useQuery('memo', () =>
        axios.get('http://localhost:5000/memo')
    )
    let [sellerNames, setSellerNames] = useState([])
    let [orders, setOrders] = useState(undefined)

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
    function handleDelete(order) {
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${order.memo} no. memo entry?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it'
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log(order._id);
                axios.delete(`http://localhost:5000/order/${order._id}`)
                    .then(data => {
                        // console.log(data);
                        if (data.data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                `${order.memo} no. memo entry has been deleted!`,
                                'success'
                            )
                            const restOrders = orders.filter(o => order._id !== o._id);
                            setOrders(restOrders)
                        }
                        else {
                            toast.error('Somthing is wrong !')
                        }
                    })

            }
        })
    }
    // console.log(orders);

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div className='mt-[65px]'>

            <div className='text-center w-[80%] mx-auto'>

                <div className="join mb-5">
                    <div>
                        <div>
                            <DatePicker
                                className=' rounded-l-md w-32 text-center h-[3rem] border-[1px] select-bordered'
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                required
                                form="external-form"
                                showYearDropdown
                                dateFormat="MMM d yyyy"
                                yearDropdownItemNumber={15}
                                scrollableYearDropdown
                            />
                        </div>
                    </div>
                    <form onSubmit={(e) => hangleSearch(e)} id="external-form">
                        <select className="select select-bordered join-item capitalize">
                            {
                                sellerNames.map((sellerName, i) => {
                                    return <option className='capitalize'>{sellerName}</option>
                                })
                            }
                        </select>
                        <div className="indicator">
                            <button className="btn join-item">Search</button>
                        </div>
                    </form>

                </div>
                {/* <DatePicker
                    className='border-2 rounded-md w-32 text-center py-1.5'
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    required
                    form="external-form"
                    showYearDropdown
                    dateFormat="MMM d yyyy"
                    yearDropdownItemNumber={15}
                    scrollableYearDropdown
                /> */}
                {/* <form onSubmit={(e) => hangleSearch(e)} id="external-form" className='text-center'>
                    <select id="sellerName" name="" autocomplete="item-name" class="bg-white  block mx-auto my-1 text-center rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-base  sm:leading-6 capitalize" >
                        {
                            sellerNames.map((sellerName, i) => {
                                return <option className='capitalize '>{sellerName}</option>
                            })
                        }
                    </select>
                    <input className='bg-emerald-500 cursor-pointer mt-1 mb-4 text-white px-2 py-1 rounded-md pb-1' type="submit" value={"Search"} />
                </form> */}
            </div>

            {
                orders === undefined ? <p className='text-gray-500'>Please pick a date and seller name and hit the Search Button.</p>
                    :
                    orders.length > 0 ?
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
                                                    handleDelete={handleDelete}
                                                    i={i}
                                                />)
                                        }


                                    </tbody>
                                </table>

                            </div>


                        </div >
                        :
                        <p className='text-red-500'>Sorry ! no Entry in this date for this seller.</p>
            }

        </div >
    )
}
