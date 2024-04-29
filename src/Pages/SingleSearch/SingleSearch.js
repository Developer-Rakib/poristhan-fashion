import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBack2Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import EditEntryModal from '../Shared/EditEntryModal';

function SingleSearch() {
    const [singleEntry, setSingleEntry] = useState(undefined)
    // states 
    // let totalItemQty = 0;


    // function

    function hangleSearch(e) {
        e.preventDefault();
        let value = e.target[0].value;
        // console.log(value);
        axios.get(`http://localhost:5000/order/${value}`).then(res => {
            console.log(res);
            if (res.data.success) {
                setSingleEntry(res.data.result);
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${res.data.message}`,
                });
            }
        })



    }
    function handleDelete(order) {
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${order.memo} no memo entry?`,
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
                            // const restOrders = orders.filter(o => order._id !== o._id);
                            setSingleEntry(undefined)
                            document.getElementById('searcheForm').reset()
                        }
                        else {
                            toast.error('Somthing is wrong !')
                        }
                    })

            }
        })
    }
    return (
        <div className='mt-[65px]'>

            <form onSubmit={hangleSearch} className="join mb-6" id='searcheForm'>
                <input type='number' required className="input h-[40px] input-bordered join-item" placeholder="Memo No / ID" />
                <button type='submit' className="btn  h-[40px] min-h-[40px] px-6 join-item rounded-r-full border-[1px]">Search</button>
            </form>

            {
                singleEntry === undefined ? <p className='text-gray-500'>Please enter a memo no or booking ID and hit the Search Button.</p>
                    :
                    setSingleEntry.length > 0 ?
                        <section className=" py-1 bg-blueGray-50">
                            <div className="w-full lg:w-10/12 px-4 mx-auto mt-6">
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">

                                    <div className="rounded-t bg-white mb-0 px-6 pt-2">
                                        <div className="text-center flex justify-between">
                                            <p>{singleEntry.bookingDate}</p>
                                            {/* <h6 className="text-blueGray-700 text-2xl">
                                                Entry Details
                                            </h6> */}
                                            <div>
                                                <button onClick={() => handleDelete(singleEntry)} className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
                                                    Delete
                                                </button>
                                                {/* modal  */}
                                                <label for="my-modal-4" className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 cursor-pointer">
                                                    Edit
                                                </label>

                                                {/* modal  */}
                                                <EditEntryModal
                                                    order={singleEntry}
                                                />


                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-auto px-4 lg:px-10 py-10 pt-6">
                                        <form>

                                            <div className="flex flex-wrap justify-center">
                                                <div className="w-full lg:w-3/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                            Seller Name
                                                        </label>
                                                        <input type="text" className="border-0 text-center capitalize px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" disabled value={singleEntry?.sellerName} />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-2/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                            Memo
                                                        </label>
                                                        <input type="email" className="border-0 text-center px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" disabled value={singleEntry.memo} />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-3/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                            Booking ID
                                                        </label>
                                                        <input type="text" className="border-0 text-center px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" disabled value={singleEntry.bookingID} />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-2/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                            D. CH.
                                                        </label>
                                                        <input type="text" className="border-0 text-center px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" disabled value={singleEntry.d_ch} />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-2/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                            Advance
                                                        </label>
                                                        <input type="text" className="border-0 text-center px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" disabled value={singleEntry.advance} />
                                                    </div>
                                                </div>


                                                <div className="w-full lg:w-2/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                            Exchange
                                                        </label>
                                                        <input type="text" className="border-0 text-center px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" disabled value={singleEntry.exchange ? "Yes" : "No"} />
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-2/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                            Status
                                                        </label>
                                                        <input type="text" className="border-0 text-center px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" disabled value={singleEntry.status} />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-2/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                            Amount
                                                        </label>
                                                        <input type="text" className="border-0 text-center px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" disabled value={singleEntry.amount} />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-2/12 px-2">
                                                    <div className="relative w-full mb-3">
                                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-1" htmlfor="grid-password">
                                                            Item
                                                        </label>

                                                        <div className=" flex justify-center">
                                                            <div className='flex flex-col'>
                                                                {singleEntry.item.map((item, index) => {

                                                                    return <div className='flex mx-2' key={index}>
                                                                        <input defaultValue={Object.keys(item)} type="text" id="item" name={`item${index}`} disabled className="text-center mt-1 block w-[100px] py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                        />
                                                                        <input defaultValue={Object.values(item)} type="text" id="item" name={`qty${index}`} className="text-center mt-1 block w-[60px] py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                            disabled
                                                                        />
                                                                    </div>
                                                                })}
                                                            </div>
                                                        </div>
                                                        {/* <input type="text" className="border-0 text-center px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" disabled value={singleEntry.status} /> */}
                                                    </div>
                                                </div>

                                            </div>

                                            {/* note  */}
                                            <div className="flex flex-wrap">
                                                <div className="w-full lg:w-12/12 px-4 mt-2">
                                                    <div className="relative w-full mb-3 text-left">
                                                        <textarea type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" disabled rows="4">{singleEntry.note ? singleEntry.note : "No note..."}</textarea>
                                                    </div>
                                                </div>
                                            </div>


                                        </form>
                                    </div>
                                </div>
                                <footer className="relative  pt-8 pb-6 mt-2">
                                    <div className="container mx-auto px-4">
                                        <div className="flex flex-wrap items-center md:justify-between justify-center">
                                            <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                                                <div className="text-sm text-blueGray-500 font-semibold py-1">
                                                    Made by <a href="https://www.creative-tim.com" className="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Rakib</a>.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </footer>
                            </div>
                        </section>
                        // <div className='sm:px-10 px-2 pb-5'>
                        //     {/* <h5 className="text-lg text-center sm:text-left font-bold  mb-2 text-primary">Mange All Orders</h5> */}

                        //     <div className="relative  overflow-x-auto shadow-md sm:rounded-lg">
                        //         <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                        //             <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        //                 <tr>

                        //                     <th scope="col" className="py-2 sm:py-3">
                        //                         Seller Name
                        //                     </th>
                        //                     <th scope="col" className="py-2  sm:py-3">
                        //                         Memo
                        //                     </th>
                        //                     <th scope="col" className="py-2 text-center sm:py-3">
                        //                         ID
                        //                     </th>
                        //                     <th scope="col" className="py-2 text-center sm:py-3">
                        //                         Item
                        //                     </th>
                        //                     <th scope="col" className="py-2 text-center sm:py-3">
                        //                         QTY
                        //                     </th>
                        //                     <th scope="col" className="py-2 text-center sm:py-3">
                        //                         D. CH.
                        //                     </th>
                        //                     <th scope="col" className="py-2 text-center sm:py-3">
                        //                         Advance
                        //                     </th>
                        //                     <th scope="col" className="py-2 text-center sm:py-3">
                        //                         Amount
                        //                     </th>
                        //                     <th scope="col" className="py-2 text-center sm:py-3">
                        //                         Exchange
                        //                     </th>
                        //                     <th scope="col" className="py-2 text-center sm:py-3">
                        //                         Status
                        //                     </th>

                        //                 </tr>
                        //             </thead>
                        //             <tbody>
                        //                 <tr key={singleEntry._id} className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                        //                     <th scope="row" className="pl-2 pr-1 sm:pr-0 sm:pl-5 py-2  sm:py-4 font-medium capitalize dark:text-white whitespace-nowraptext-[13px]">
                        //                         {singleEntry.sellerName}
                        //                     </th>
                        //                     {/* <td className="py-2 text-[12px] sm:text-[13px] sm:py-4 capitalize">
                        //                         {singleEntry.sellerName}
                        //                     </td> */}
                        //                     <td className="py-2   text-[12px] sm:text-[13px] sm:py-4">
                        //                         {singleEntry.memo}
                        //                     </td>
                        //                     <td className="py-2 text-[12px] sm:text-[13px]  text-center sm:py-4">
                        //                         {singleEntry.bookingID}
                        //                     </td>
                        //                     <td className="py-2 text-[12px] sm:text-[13px]  text-center sm:py-4">
                        //                         {singleEntry.item.map((item, b) => {

                        //                             Object.values(item).map(i => {
                        //                                 totalItemQty = totalItemQty + i;
                        //                             })
                        //                             return <p key={b}>{`${Object.keys(item)} ( ${Object.values(item)} )`}</p>
                        //                         })}
                        //                     </td>
                        //                     <td className="py-2 text-[12px] sm:text-[13px]  text-center sm:py-4">
                        //                         {totalItemQty}
                        //                     </td>
                        //                     <td className="py-2 text-[12px] sm:text-F[13px]  text-center sm:py-4">
                        //                         {singleEntry.d_ch}
                        //                     </td>
                        //                     <td className="py-2 text-[12px] sm:text-[13px]  text-center sm:py-4">
                        //                         {singleEntry.advance}
                        //                     </td>
                        //                     <td className="py-2 text-[12px] sm:text-[13px]  text-center sm:py-4">
                        //                         {singleEntry.amount}
                        //                     </td>
                        //                     <td className="py-2 text-[12px] sm:text-[13px]  text-center sm:py-4">
                        //                         {singleEntry.exchange ? "Yes" : "No"}
                        //                     </td>
                        //                     <td className="py-2 text-[12px] sm:text-[13px] text-center sm:py-4 relative ">


                        //                         {/* modal btn  */}
                        //                         <label for="my-modal-4" className="">
                        //                             <FaRegEdit
                        //                                 className='absolute right-0 top-0 text-yellow-600 cursor-pointer'></FaRegEdit>
                        //                         </label>

                        //                         {/* modal  */}
                        //                         <input type="checkbox" id="my-modal-4" className="modal-toggle" />
                        //                         <label for="my-modal-4" className="modal cursor-pointer">
                        //                             <label className="modal-box relative" for="">
                        //                                 <label htmlFor="my-modal-4" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        //                                 <form onSubmit={handleInfoSave}>
                        //                                     <div className="shadow  overflow-hidden sm:rounded-md">
                        //                                         <div className="px-4 py-4 bg-gray-50 sm:px-6">
                        //                                             <h3 className="text-lg leading-6 font-medium text-gray-900">Update Information</h3>
                        //                                         </div>
                        //                                         <div className="px-4 py-5 bg-white sm:p-6">
                        //                                             <div className="grid grid-cols-6 gap-3">

                        //                                                 <div className="col-span-6 sm:col-span-2">
                        //                                                     <label htmlFor="memo" className="block text-sm font-medium text-gray-700">Memo</label>
                        //                                                     <input id="memo" name="memo"
                        //                                                         type="text" defaultValue={singleEntry.memo} autocomplete="country-name" className="text-center mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

                        //                                                     />
                        //                                                 </div>
                        //                                                 <div className="col-span-6 sm:col-span-4 ">
                        //                                                     <label htmlFor="bookingID" className="block text-sm font-medium text-gray-700">ID NO</label>
                        //                                                     <input type={"number"} id="bookingID" name="bookingID" autocomplete="country-name" defaultValue={singleEntry.bookingID} className="text-center mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        //                                                     />
                        //                                                 </div>
                        //                                                 <div className="col-span-6 sm:col-span-2">
                        //                                                     <label htmlFor="d_ch" className="block text-sm font-medium text-gray-700">D. CH.</label>
                        //                                                     <input id="d_ch" name="d_ch"
                        //                                                         type="text" autocomplete="d_ch" defaultValue={singleEntry.d_ch} className="text-center mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

                        //                                                     />
                        //                                                 </div>
                        //                                                 <div className="col-span-6 sm:col-span-2">
                        //                                                     <label htmlFor="advance" className="block text-sm font-medium text-gray-700">Advance</label>
                        //                                                     <input type={"number"} id="advance" name="advance" autocomplete="country-name" defaultValue={singleEntry.advance} className="text-center mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        //                                                     />
                        //                                                 </div>
                        //                                                 <div className="col-span-6 sm:col-span-2">
                        //                                                     <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                        //                                                     <input type={"number"} id="amount" name="amount" autocomplete="country-name" defaultValue={singleEntry.amount} className="text-center mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        //                                                     />
                        //                                                 </div>

                        //                                                 <div className="col-span-6 sm:col-span-6 flex justify-center">
                        //                                                     <div className=''>
                        //                                                         <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                        //                                                         <div className="">
                        //                                                             <select defaultValue={singleEntry.status} onChange={handleSelect} id="status" name="status" autocomplete="status" className="bg-white text-center block w-full rounded-md border-0 py-2 px-2  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                        //                                                                 <option className='text-yellow-700'>Pending</option>
                        //                                                                 <option className='text-green-700'>Deliverd</option>
                        //                                                                 <option className='text-red-500'>Cancel</option>
                        //                                                                 <option className='text-red-700'>Return</option>
                        //                                                                 <option className='text-green-700'>Pertial Return</option>
                        //                                                             </select>
                        //                                                         </div>
                        //                                                     </div>
                        //                                                 </div>

                        //                                                 <div className="col-span-6 sm:col-span-6 flex justify-center items-end">
                        //                                                     {
                        //                                                         status === "Pertial Return" &&
                        //                                                         <>

                        //                                                             <div className='flex flex-col w-[50%]'>
                        //                                                                 {singleEntry.item.map((item, index) => {

                        //                                                                     return <div className='flex mx-2' key={index}>
                        //                                                                         <input defaultValue={Object.keys(item)} type="text" id="item" name={`item${index}`} disabled className="text-center mt-1 block w-[100px] py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        //                                                                         />
                        //                                                                         <input defaultValue={Object.values(item)} type="text" id="item" name={`qty${index}`} className="text-center mt-1 block w-[60px] py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        //                                                                         />
                        //                                                                     </div>
                        //                                                                 })}
                        //                                                             </div>
                        //                                                             <div className="w-[140px]">

                        //                                                                 <label htmlFor="partial_amount" className="block text-sm font-medium text-gray-700">Partial Amount</label>
                        //                                                                 <input type={"number"} id="partial_amount" name="partial_amount" autocomplete="country-name" className="text-center mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        //                                                                 />
                        //                                                             </div>
                        //                                                         </>
                        //                                                     }
                        //                                                 </div>

                        //                                                 <textarea className="col-span-6 sm:col-span-6 textarea textarea-bordered" placeholder="Note"></textarea>

                        //                                             </div>
                        //                                         </div>
                        //                                         <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        //                                             <button

                        //                                                 type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                        //                                         </div>
                        //                                     </div>
                        //                                 </form>
                        //                             </label>
                        //                         </label>
                        //                         <p className='text-green-500'>{singleEntry.status}</p>


                        //                         <span onClick={() => handleDelete(singleEntry)} className='cursor-pointer'>
                        //                             <RiDeleteBack2Line className='text-red-600 absolute text-[15px] top-6  right-0' />
                        //                         </span>
                        //                     </td>

                        //                 </tr>


                        //             </tbody>
                        //         </table>

                        //     </div>


                        // </div >
                        :
                        <p className='text-red-500'>Sorry ! no Entry in this date for this seller.</p>
            }





        </div >
    )
}

export default SingleSearch