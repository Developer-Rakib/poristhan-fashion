import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import SingleSearch from '../SingleSearch/SingleSearch';
import axios from 'axios';
import { useQuery } from 'react-query';
import toast from 'react-hot-toast';

function EditEntryModal({ order, setEditModal, setOrder }) {
    const { isLoading, error, data: memo } = useQuery('memo', () =>
        axios.get('https://server.poristhan-fashion.xyz/memo')
    )

    const [status, setSatus] = useState(null)

    useEffect(() => {
        setSatus(order.status)
    }, [order])


    let itemName = [
        "BLC",
        "BLS",
        "DBLS",
        "BLP",
        "BLB",
        "BLF",
        "HPC",
        "HPS",
        "SHPS",
        "HPP",
        "HPB",
        "HPF",
        "SKC",
        "SKS",
        "SSKS",
        "SKP",
        "SKB",
        "SKF",
        "EMC",
        "EMS",
        "EMP",
        "EMF",
        "CHC",
        "CHS",
        "CHP",
        "CHF",
        "CMC",
        "CMS",
        "CMP",
        "CMF",
        "RMC",
        "RMS",
        "RMP",
        "RMF",
        "OCC",
        "OCS",
        "OCP",
        "OCF",
        "NPC",
        "NPS",
        "NPP",
        "NPF",
    ]
    let itemInner = itemName.map(itSt => <option>{itSt}</option>,)

    function handleInfoSave(e) {
        e.preventDefault();
        e.preventDefault();

        const formData = new FormData(e.target);
        const formatedData = Array.from(formData.entries())
        // console.log(formData);


        let bookingData = {}
        formatedData.map((data) => {
            let obj = {
                ...bookingData,
                [data[0]]: data[1],
            }
            bookingData = obj
        })

        if (bookingData.bookingID.toString().length !== 8) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid ID !",
            });
            return;
        }
        // console.log(bookingData);
        let partialItem = []
        for (let i = 0; i <= order.item.length; i++) {
            // console.log("hi");
            if (bookingData[`item${i}`]) {
                // console.log(bookingData[`item${i}`], ":", bookingData[`qty${i}`]);
                partialItem.push({ [bookingData[`item${i}`]]: parseInt(bookingData[`qty${i}`]) })
            }
        };
        // console.log(item);

        let bookingMemo = parseInt(bookingData.memo);

        let sellerName = undefined;
        for (const [key, value] of Object.entries(memo.data[0])) {
            for (let i = 0; i < value.length; i++) {
                if (bookingMemo >= value[i] && bookingMemo <= (value[i]) + 99) {
                    sellerName = key
                }
            }
        }
        // console.log(sellerName);

        if (sellerName === undefined || sellerName === "_id") {
            Swal.fire({
                icon: "error",
                title: "Opps...",
                text: `Memo not found, Please add new memo`,
            });
            return;
        }
        let editedData = {
            sellerName: sellerName,
            memo: bookingMemo,
            bookingID: bookingData.bookingID,
            d_ch: parseInt(bookingData.d_ch),
            item: order.item,
            amount: parseInt(bookingData.amount),
            advance: parseInt(bookingData.advance),
            partial: { PAmount: bookingData.partial_amount || null, PItem: partialItem },
            exchange: order.exchange,
            status: bookingData.status,
            bookingDate: order.bookingDate,
            tracking_code: order.tracking_code,
            recipient_phone: bookingData.recipient_phone,
            note: bookingData.note || order.note
        }

        // console.log(editedData);


        axios.put(`https://server.poristhan-fashion.xyz/order/update/${order._id}`, editedData)
            .then(data => {
                console.log(data.data);
                if ((data.data.matchedCount || data.data.upsertedCount) > 0) {
                    toast.success("Entry updated")
                    document.getElementById('my-modal-4').checked = false;
                    setOrder(editedData)
                    setEditModal(false)
                }
                else {
                    toast.error("Something is wrong, please try again")
                }
            })
    }
    // console.log(document.getElementById('my-modal-4').checked);

    function handleSelect(e) {
        const selectedItem = document.getElementById("status").value;
        setSatus(selectedItem)
    }
    return (
        <>
            <input type="checkbox" id="my-modal-4" class="modal-toggle" />
            <label for="my-modal-4" class="modal cursor-pointer">
                <label class="modal-box relative" for="">
                    <label onClick={() => setEditModal(false)} htmlFor="my-modal-4" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
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
                                    <div className="col-span-6 sm:col-span-2 ">
                                        <label htmlFor="bookingID" className="block text-sm font-medium text-gray-700">ID NO</label>
                                        <input type={"number"} id="bookingID" name="bookingID" autocomplete="country-name" defaultValue={order.bookingID} className="text-center mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div class="col-span-6 sm:col-span-2">
                                        <label for="recipient_phone" class="block text-sm font-medium leading-6 text-gray-900">Mobile</label>
                                        <div class="">
                                            <input defaultValue={order.recipient_phone} type="number" name="recipient_phone" id="recipient_phone" min={7} class="block w-full text-center rounded-md border-0 tracking-wider p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
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

                                    <div className="col-span-6 sm:col-span-6 flex sm:flex-row flex-col justify-center items-center sm:items-end">
                                        {
                                            status === "Pertial Return" &&
                                            <>

                                                <div className='flex flex-col sm:w-[50%]'>
                                                    {
                                                        order.partial?.PItem.length > 0 ?
                                                            order.partial.PItem.map((item, index) => {

                                                                return <div className='flex mx-2' key={index}>

                                                                    <select defaultValue={Object.keys(item)} type="text" id="item" name={`item${index}`} class="bg-white text-center mt-1 block w-[100px]  rounded-md border-0 py-2 px-2  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                                                        {itemInner}
                                                                    </select>



                                                                    <input defaultValue={Object.values(item)} type="text" id="item" name={`qty${index}`} className="text-center mt-1 block w-[60px] py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                    />
                                                                </div>
                                                            })

                                                            :

                                                            order.item.map((item, index) => {

                                                                return <div className='flex mx-2' key={index}>

                                                                    <select defaultValue={Object.keys(item)} type="text" id="item" name={`item${index}`} class="bg-white text-center mt-1 block w-[100px]  rounded-md border-0 py-2 px-2  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                                                        {itemInner}
                                                                    </select>



                                                                    <input defaultValue={Object.values(item)} type="text" id="item" name={`qty${index}`} className="text-center mt-1 block w-[60px] py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                    />
                                                                </div>
                                                            })
                                                    }
                                                </div>
                                                <div className=" sm:w-[140px] mt-1 sm:mt-0">

                                                    <label htmlFor="partial_amount" className="block text-sm font-medium text-gray-700">Partial Amount</label>
                                                    <input defaultValue={order?.partial?.PAmount} type={"number"} id="partial_amount" name="partial_amount" autocomplete="country-name" className="text-center mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    />
                                                </div>
                                            </>
                                        }
                                    </div>

                                    <textarea defaultValue={order.note} name='note' id='note' className="col-span-6 sm:col-span-6 textarea textarea-bordered" placeholder="Note"></textarea>

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
        </>
    )
}

export default EditEntryModal