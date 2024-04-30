import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBack2Line } from "react-icons/ri";
import EditEntryModal from '../Shared/EditEntryModal';

const SingleBookingData = ({ order, handleDelete, i }) => {
    // states 
    const [editModal, setEditModal] = useState(null)
    const [singleEntry, setSingleEntry] = useState(order)


    let totalItemQty = 0;


    // function





    return (
        <tr key={singleEntry._id} className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
            <th scope="row" className="pl-2 pr-1 sm:pr-0 sm:pl-5 py-2  sm:py-4 font-medium text-gray-900 dark:text-white whitespace-nowraptext-[13px]">
                {i + 1}
            </th>
            <td className="py-2 text-[12px] sm:text-[13px] sm:py-4 capitalize">
                {singleEntry.sellerName}
            </td>
            <td className="py-2   text-[12px] sm:text-[13px] sm:py-4">
                {singleEntry.memo}
            </td>
            <td className="py-2 text-[12px] sm:text-[13px]  text-center sm:py-4">
                {singleEntry.bookingID}
            </td>
            <td className="py-2 text-[12px] sm:text-[13px]  text-center sm:py-4">
                {singleEntry.item.map((item, b) => {

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
                {singleEntry.d_ch}
            </td>
            <td className="py-2 text-[12px] sm:text-[13px]  text-center sm:py-4">
                {singleEntry.advance}
            </td>
            <td className="py-2 text-[12px] sm:text-[13px]  text-center sm:py-4">
                {singleEntry.amount}
            </td>
            <td className="py-2 text-[12px] sm:text-[13px] text-center sm:py-4 relative ">


                {/* modal btn  */}
                <label onClick={() => setEditModal(true)} for="my-modal-4" class="">
                    <FaRegEdit
                        className='absolute right-0 top-0 text-yellow-600 cursor-pointer'></FaRegEdit>
                </label>

                {/* modal  */}
                {
                    editModal &&
                    <EditEntryModal
                        order={singleEntry}
                        setEditModal={setEditModal}
                        setOrder={setSingleEntry}
                    />
                }


                <p
                    className={`font-semibold ${singleEntry.status === "Pending" ? "text-yellow-600" : singleEntry.status === "Deliverd" ? "text-green-600" : singleEntry.status === "Cancel" ? "text-red-600" : singleEntry.status === "Return" ? "text-red-600" : singleEntry.status === "Pertial Return" ? "text-green-600" : "text-green-600"
                        }`}>
                    {singleEntry.status}
                </p>


                {/* {!singleEntry.paid &&

            <p className='text-red-500'>Unpaid</p>
        }
        {
            (!singleEntry.shipped && singleEntry.paid) && <p className='text-green-500'>Pending</p>
        }
        {
            singleEntry.shipped && <p className='text-green-700'>Paid</p>
        } */}
                <span onClick={() => handleDelete(order)} className='cursor-pointer'>
                    <RiDeleteBack2Line className='text-red-600 absolute text-[15px] top-6  right-0' />
                </span>
            </td>


        </tr>
    )
}

export default SingleBookingData