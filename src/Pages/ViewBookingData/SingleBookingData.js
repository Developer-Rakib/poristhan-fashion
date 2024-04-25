import React, { useState } from 'react'
import { FaRegEdit } from "react-icons/fa";


const SingleBookingData = ({ order, i }) => {
    // states 
    const [status, setSatus] = useState(null)
    let totalItemQty = 0;


    // function
    function handleInfoSave(e) {
        e.preventDefault();
        console.log("saved");
    }
    function handleSelect(e) {
        const selectedItem = document.getElementById("status").value;
        setSatus(selectedItem)
    }


    return (
        <tr key={order._id} className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
            <th scope="row" className="pl-2 pr-1 sm:pr-0 sm:pl-5 py-2  sm:py-4 font-medium text-gray-900 dark:text-white whitespace-nowraptext-[13px]">
                {i + 1}
            </th>
            <td className="py-2 text-[12px] sm:text-[13px] sm:py-4 capitalize">
                {order.sellerName}
            </td>
            <td className="py-2   text-[12px] sm:text-[13px] sm:py-4">
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
                {order.advance}
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
                                                type="text" defaultValue={order.memo} autocomplete="country-name" className="text-center mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-4 ">
                                            <label htmlFor="bookingID" className="block text-sm font-medium text-gray-700">ID NO</label>
                                            <input type={"number"} id="bookingID" name="bookingID" autocomplete="country-name" defaultValue={order.bookingID} className="text-center mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-2">
                                            <label htmlFor="d_ch" className="block text-sm font-medium text-gray-700">D. CH.</label>
                                            <input id="d_ch" name="d_ch"
                                                type="text" autocomplete="d_ch" defaultValue={order.d_ch} className="text-center mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-2">
                                            <label htmlFor="advance" className="block text-sm font-medium text-gray-700">Advance</label>
                                            <input type={"number"} id="advance" name="advance" autocomplete="country-name" defaultValue={order.advance} className="text-center mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-2">
                                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                                            <input type={"number"} id="amount" name="amount" autocomplete="country-name" defaultValue={order.amount} className="text-center mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-6 flex justify-center">
                                            <div className=''>
                                                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                                                <div class="">
                                                    <select defaultValue={order.status} onChange={handleSelect} id="status" name="status" autocomplete="status" class="bg-white text-center block w-full rounded-md border-0 py-2 px-2  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                                        <option className='text-yellow-700'>Pending</option>
                                                        <option className='text-green-700'>Deliverd</option>
                                                        <option className='text-red-500'>Cancel</option>
                                                        <option className='text-red-700'>Return</option>
                                                        <option className='text-green-700'>Pertial Return</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-6 sm:col-span-6 flex justify-center items-end">
                                            {
                                                status === "Pertial Return" &&
                                                <>

                                                    <div className='flex flex-col w-[50%]'>
                                                        {order.item.map((item, index) => {

                                                            return <div className='flex mx-2' key={index}>
                                                                <input defaultValue={Object.keys(item)} type="text" id="item" name={`item${index}`} disabled className="text-center mt-1 block w-[100px] py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                />
                                                                <input defaultValue={Object.values(item)} type="text" id="item" name={`qty${index}`} className="text-center mt-1 block w-[60px] py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                />
                                                            </div>
                                                        })}
                                                    </div>
                                                    <div className="w-[140px]">

                                                        <label htmlFor="partial_amount" className="block text-sm font-medium text-gray-700">Partial Amount</label>
                                                        <input type={"number"} id="partial_amount" name="partial_amount" autocomplete="country-name" className="text-center mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        />
                                                    </div>
                                                </>
                                            }
                                        </div>

                                        <textarea className="col-span-6 sm:col-span-6 textarea textarea-bordered" placeholder="Note"></textarea>

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
}

export default SingleBookingData