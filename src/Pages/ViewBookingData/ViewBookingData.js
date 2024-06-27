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
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../firebase.init'
import useRole from '../../Hooks/useRole'
// let key = process.env.REACT_APP_MF_Api_Key
export default function ViewBookingData() {
    // const { isLoading: isLoading2, error: err, data: orders } = useQuery('orders', () =>
    //     axios.get('https://server.poristhan-fashion.xyz/orders')
    // )
    const { isLoading, error, data: memo } = useQuery('memo', () =>
        axios.get('https://server.poristhan-fashion.xyz/memo')
    )
    let [sellerNames, setSellerNames] = useState([])
    let [orders, setOrders] = useState(undefined)
    let [loading, setLoading] = useState(null)
    let [pItem, setPItem] = useState([])
    let [user] = useAuthState(auth)
    let [role, roleLoading] = useRole(user)
    let [totalQtyCount, setTotalQtyCount] = useState(0)
    let [deliverQty, setDeliverQty] = useState(0)
    let [cancelQty, setCancelQty] = useState(0)
    let [itemsTotal, setitemsTotal] = useState([])
    let count = 0
    // console.log(totalQtyCount);


    useEffect(() => {
        setCancelQty(totalQtyCount - deliverQty);
    }, [totalQtyCount, deliverQty])

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
        setLoading(true);
        // setOrders([]);

        // startDate.moment().format("MMM DD yyyy")
        let bookingDate = moment(startDate).format('MMM DD yyyy');
        let sName = e.target[1].value;
        // console.log(sN);
        pItem = {}
        // console.log(bookingDate);
        axios.get(`https://server.poristhan-fashion.xyz/orders/${sName}?bookingDate=${bookingDate}`).then(res => {
            setOrders(res.data);
            setLoading(false)
            res.data.forEach(order => {

                const tqc = order.item.map((item) => {
                    const tqc2 = Object.values(item).map(i => {
                        return count = count + Object.values(item)[0];
                    })
                    return tqc2
                })

                setTotalQtyCount(tqc[tqc.length - 1][0]);


                if (order.status === "Deliverd") {
                    order?.item.forEach(itm => {
                        if (pItem[Object.keys(itm)[0]]) {
                            pItem[Object.keys(itm)[0]] = pItem[Object.keys(itm)[0]] + Object.values(itm)[0];
                        }
                        else {
                            pItem[Object.keys(itm)[0]] = Object.values(itm)[0];
                        }
                    });
                }
                else if (order.status === "Pertial Return") {
                    order?.partial.PItem.forEach(itm => {
                        if (pItem[Object.keys(itm)[0]]) {
                            pItem[Object.keys(itm)[0]] = pItem[Object.keys(itm)[0]] + Object.values(itm)[0];
                        }
                        else {
                            pItem[Object.keys(itm)[0]] = Object.values(itm)[0];
                        }
                    });
                }
            })
            setPItem(pItem);
            // console.log(pItem);
            let deliveryCount = 0;
            Object.values(pItem).forEach(pValue => {
                // console.log(pValue);
                deliveryCount = deliveryCount + parseInt(pValue)
            })
            setDeliverQty(deliveryCount);
            // setCancelQty(totalQtyCount - deliveryCount);
            // console.log(totalQtyCount);
        })
    }
    // console.log(Object.keys(pItem));

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
                axios.delete(`https://server.poristhan-fashion.xyz/order/${order._id}`)
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


    function handleReceive() {

        const updatedItems = orders.map(upItem => {
            // let allItem = []
            if (upItem.status === "Pending" && upItem.exchange === false) {
                setLoading(true);

                // console.log(upItem.exchange);

                // upItem.status = "Deliverd";
                // allItem.push(upItem)
                axios.get(`https://portal.steadfast.com.bd/api/v1/status_by_cid/${upItem.bookingID}`, {
                    headers: {
                        'Api-Key': `${process.env.REACT_APP_F_Api_Key}`,
                        'Secret-Key': `${process.env.REACT_APP_F_Secret_Key}`
                    }
                }).then(data => {

                    if (data.data.status === 200) {
                        setLoading(false);
                        // console.log(data.data.delivery_status);

                        // status = data.data.delivery_status
                        if (data.data.delivery_status === "delivered" || data.data.delivery_status === "cancelled") {
                            // console.log(data.data);
                            const editedData = {
                                status: data.data.delivery_status === "delivered" ? "Deliverd" : "Cancel"
                            }
                            axios.put(`https://server.poristhan-fashion.xyz/order/update/${upItem._id}`, editedData)
                                .then(data => {
                                    if ((data.data.matchedCount || data.data.upsertedCount) > 0) {
                                        // upItem.status = data.data.delivery_status === "delivered" ? "Deliverd" : "Cancel"
                                        // allItem.push(upItem)
                                        setLoading(false);


                                    }
                                    else {
                                        // allItem.push(upItem)
                                        setLoading(false);
                                    }
                                })
                        }
                        // else if (data.data.delivery_status === "partial_delivered") {
                        //     console.log(data.data.delivery_status);
                        // }
                    }
                }).catch(res => {
                    if (res.response.status) {
                        axios.get(`https://portal.steadfast.com.bd/api/v1/status_by_cid/${upItem.bookingID}`, {
                            headers: {
                                'Api-Key': `${process.env.REACT_APP_MF_Api_Key}`,
                                'Secret-Key': `${process.env.REACT_APP_MF_Secret_Key}`
                            }
                        }).then(data => {
                            setLoading(false);
                            if (data.data.status === 200) {
                                // setLoading(false);
                                // status = data.data.delivery_status
                                if (data.data.delivery_status === "delivered" || data.data.delivery_status === "cancelled") {
                                    const editedData = {
                                        status: data.data.delivery_status === "delivered" ? "Deliverd" : "Cancel"
                                    }
                                    axios.put(`https://server.poristhan-fashion.xyz/order/update/${upItem._id}`, editedData)
                                        .then(data => {
                                            if ((data.data.matchedCount || data.data.upsertedCount) > 0) {
                                                // upItem.status = data.data.delivery_status === "delivered" ? "Deliverd" : "Cancel"
                                                // allItem.push(upItem)
                                                setLoading(false);
                                            }
                                            else {
                                                // allItem.push(upItem)
                                                setLoading(false);
                                            }
                                        })
                                }
                            }
                        }).catch(res => {
                            // console.log(res.response.status);
                            setLoading(false);
                        })
                    }
                })


            }
            // else {
            // allItem.push(upItem)
            // }
            return upItem
        })
        // setOrders(updatedItems);
    }




    async function handleReturn() {
        let rtnMemo = []
        // console.log(rtnMemo.length);
        rtnMemo.map(rtn => {
            axios.get(`https://server.poristhan-fashion.xyz/order/${rtn}`)
                .then(data => {
                    if (data?.data?.result?.status !== 'Return') {
                        console.log(data?.data?.result?.status, " ", rtn);
                    }

                    // if (data.data.result.status === 'Pending') {
                    //     console.log(data.data.result.status, " ", data.data.result.memo);
                    //     // const editedData = {
                    //     //     status: 'Return'
                    //     // }
                    //     // axios.put(`https://server.poristhan-fashion.xyz/order/update/${data.data.result._id}`, editedData)
                    //     //     .then(data => {

                    //     //         console.log(data.data);
                    //     //         // if ((data.data.matchedCount || data.data.upsertedCount) > 0) {

                    //     //         // }
                    //     //     })
                    // }
                    // else {
                    // console.log(data.data.result.status, " ", data.data.result.memo);
                    // }

                    // if (data.data.result.status === 'Cancel') {
                    //     // console.log(data.data.result);
                    //     const editedData = {
                    //         status: 'Return'
                    //     }
                    //     axios.put(`https://server.poristhan-fashion.xyz/order/update/${data.data.result._id}`, editedData)
                    //         .then(data => {

                    //             console.log(data.data);
                    //             // if ((data.data.matchedCount || data.data.upsertedCount) > 0) {

                    //             // }
                    //         })
                    // }




                })
        })



        // get cancel by month
        // let totaAmount = 0
        // let totaAmountarr = []


        // pItem = {}
        // for (let i = 1; i < 13; i++) {
        //     // Jun 01 2024
        //     const date = `Jun ${i < 10 ? "0" : ""}${i} 2024`;

        //     // console.log(date);
        //     axios.get(`https://server.poristhan-fashion.xyz/orders/all?bookingDate=${date}`)
        //         .then(res => {
        //             // console.log(i, res.data);
        //             res.data.map((itm) => {
        //                 if (itm.status === 'Cancel') {
        //                     // itm?.item.forEach(singItm => {
        //                     //     if (pItem[Object.keys(singItm)[0]]) {
        //                     //         pItem[Object.keys(singItm)[0]] = pItem[Object.keys(singItm)[0]] + Object.values(singItm)[0];
        //                     //     }
        //                     //     else {
        //                     //         pItem[Object.keys(singItm)[0]] = Object.values(singItm)[0];
        //                     //     }
        //                     // });
        //                     // totaAmount = totaAmount + dt.amount;
        //                     // totaAmountarr.push(dt.amount);
        //                     itm?.item.forEach(singItm => {

        //                         console.log(singItm);
        //                     })
        //                     // console.log(itm);
        //                 }


        //             })

        //         })



        // }
        // setPItem(pItem);
        // console.log(pItem);

        // console.log(itemsTotal);
    }
    async function handleExport() {


        // const XLSX = await import("https://cdn.sheetjs.com/xlsx-0.19.2/package/xlsx.mjs");

        // const worksheet = XLSX.utils.json_to_sheet(orders)

        // const workbook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

        // XLSX.writeFile(workbook, "Employee Lists.xlsx", { compression: true });
    }



    if (isLoading || roleLoading) {
        return <Loader></Loader>
    }

    return (
        <div className='mt-[65px] min-h-screen'>

            <div className='text-center w-[85%] mx-auto'>

                <div className="join mb-5">
                    <div>
                        <div>
                            <DatePicker
                                className=' rounded-l-md w-[110px] sm:w-32 text-center h-[3rem] border-[1px] select-bordered'
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
                        <select className="select select-bordered join-item capitalize w-[95px] sm:w-[110px]">
                            <option className='capitalize'>all</option>
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
            </div>

            {
                loading ? <Loader /> :
                    <div className=''>
                        {
                            orders === undefined ? <p className='text-gray-500 px-10'>Please pick a date and seller name and hit the Search Button.</p>
                                :
                                orders.length > 0 ?

                                    <div className='flex flex-col-reverse justify-center sm:flex-row'>
                                        <div className='w-[95%] mx-auto  sm:w-[85%] sm:px-6 px-2 pb-5'>

                                            <div className="relative  overflow-x-auto shadow-md sm:rounded-lg">
                                                <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                        <tr>
                                                            <th scope="col" className="py-2 sm:text-[12px] text-[9px]  sm:py-3">

                                                            </th>
                                                            <th scope="col" className="py-2 sm:text-[12px] text-[9px] sm:py-3">
                                                                Seller Name
                                                            </th>
                                                            <th scope="col" className="py-2 sm:text-[12px] text-[9px]  sm:py-3">
                                                                Memo
                                                            </th>
                                                            <th scope="col" className="py-2 sm:text-[12px] text-[9px] text-center sm:py-3">
                                                                ID
                                                            </th>
                                                            <th scope="col" className="py-2 sm:text-[12px] text-[9px] text-center sm:py-3 ">
                                                                Item
                                                            </th>
                                                            {/* <th scope="col" className="py-2 sm:text-[12px] text-[9px] text-center sm:py-3">
                                                                QTY
                                                            </th> */}
                                                            <th scope="col" className="py-2 sm:text-[12px] text-[9px] text-center sm:py-3">
                                                                D. CH.
                                                            </th>
                                                            <th scope="col" className="py-2 sm:text-[12px] text-[9px] text-center sm:py-3">
                                                                Advance
                                                            </th>
                                                            <th scope="col" className="py-2 sm:text-[12px] text-[9px] text-center sm:py-3">
                                                                Amount
                                                            </th>
                                                            <th scope="col" className="py-2 sm:text-[12px] text-[9px] sm:pr-4 text-center sm:py-3">
                                                                Status
                                                            </th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            orders.map((order, i) => {

                                                                // console.log(order.status);
                                                                // pItem = { selname: "rakiv" }

                                                                // if (order.status === "Deliverd") {

                                                                // }


                                                                // console.log(count);
                                                                return <SingleBookingData
                                                                    order={order}
                                                                    handleDelete={handleDelete}
                                                                    i={i}
                                                                    role={role}
                                                                />
                                                            }
                                                            )
                                                        }


                                                    </tbody>
                                                </table>

                                            </div>


                                        </div >

                                        <div className='mr-1 sm:mr-4 mb-8'>
                                            {/* <p>Total qty: <span>{totalQtyCount}</span></p> */}
                                            <div className="relative w-[60%] mx-auto sm:w-full overflow-x-auto shadow-md sm:rounded-lg">
                                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                                                        <tr className='border-b'>
                                                            <th scope="col" className="pl-5 py-2 text-[11px] sm:text-[12px] bg-gray-50 dark:bg-gray-800">
                                                                Total QTY
                                                            </th>
                                                            <th scope="col" className="px-5 text-center py-2 text-[11px] sm:text-[12px]">
                                                                {totalQtyCount}
                                                            </th>
                                                        </tr>

                                                        <tr className='border-b'>
                                                            <th scope="col" className="pl-5 py-2 text-[11px] sm:text-[12px] bg-gray-50 dark:bg-gray-800">
                                                                Deliverd
                                                            </th>
                                                            <th scope="col" className="px-5 text-center py-2 text-[11px] sm:text-[12px]">
                                                                {deliverQty}
                                                            </th>
                                                        </tr>

                                                        <tr className=''>
                                                            <th scope="col" className="pl-5 py-2 text-[11px] sm:text-[12px] bg-gray-50 dark:bg-gray-800">
                                                                Cancel/Pending
                                                            </th>
                                                            <th scope="col" className="px-5 text-center py-2 text-[11px] sm:text-[12px]">
                                                                {cancelQty}
                                                            </th>
                                                        </tr>
                                                        {
                                                            deliverQty > 0 &&
                                                            <tr className='border-t'>
                                                                <th scope="col" className="pl-5 pt-2 text-[11px] sm:text-[12px] bg-gray-50 dark:bg-gray-800">
                                                                    Item name
                                                                </th>
                                                                <th scope="col" className="px-5 pt-2 text-center text-[11px] sm:text-[12px]">
                                                                    QTY
                                                                </th>
                                                            </tr>
                                                        }
                                                    </thead>
                                                    <tbody>

                                                        {
                                                            Object.keys(pItem).map((pi, i) => {
                                                                // console.log(pi);

                                                                return (
                                                                    <tr key={i} >
                                                                        <th scope="row" className="px-6 py-1 text-[11px] sm:text-[12px] font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                                                            {pi}
                                                                        </th>
                                                                        <td className="px-6 text-center py-1 text-[11px] sm:text-[12px]">
                                                                            {pItem[`${pi}`]}
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }

                                                            )
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                            {
                                                role === "admin" &&

                                                <>
                                                    <button onClick={handleReceive} className="mt-4 bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
                                                        Update All
                                                    </button>



                                                    {/* <button onClick={handleExport} className="mt-3 bg-fuchsia-500 text-white active:bg-fuchsia-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
                                                        Export Data
                                                    </button> */}
                                                </>
                                            }
                                        </div>
                                    </div>
                                    :
                                    <p className='text-red-500'>Sorry ! no Entry in this date for this seller.</p>
                        }
                    </div>
            }

            <button onClick={handleReturn} className="mt-3 bg-orange-500 text-white active:bg-orange-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
                Check
            </button>
        </div >
    )
}
