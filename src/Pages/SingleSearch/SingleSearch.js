import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBack2Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import EditEntryModal from '../Shared/EditEntryModal';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import useRole from '../../Hooks/useRole';
import Loader from '../Shared/Loader';

function SingleSearch() {
    const [singleEntry, setSingleEntry] = useState(undefined)
    const [editModal, setEditModal] = useState(null)
    let [user, loading, error] = useAuthState(auth)
    let [role, roleLoading] = useRole(user)

    // states 
    // let totalItemQty = 0;


    // function
    // console.log(singleEntry?.status);
    function hangleSearch(e) {
        e.preventDefault();
        let value = e.target[0].value;
        if (document.getElementById('dataForm')) {
            document.getElementById('dataForm').reset()
        }


        // console.log(value);
        axios.get(`http://13.235.246.2:5000/order/${value}`).then(res => {
            // console.log(res);
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
                axios.delete(`http://13.235.246.2:5000/order/${order._id}`)
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

    if (loading || roleLoading) {
        return <Loader />
    }
    return (
        <div className='mt-[65px] min-h-screen'>

            <form onSubmit={hangleSearch} className="join mb-6" id='searcheForm'>
                <input type='number' required className="input h-[40px] input-bordered join-item" placeholder="Memo No / ID" />
                <button type='submit' className="btn  bg-teal-600 text-white h-[40px] min-h-[40px] px-6 join-item rounded-r-full border-[1px] border-teal-600 ">Search</button>
            </form>

            {
                singleEntry === undefined ? <p className='text-gray-500 px-8'>Please enter a memo no or booking ID and hit the Search Button.</p>
                    :
                    setSingleEntry.length > 0 ?
                        <section className=" py-1 bg-blueGray-50">
                            <div className="w-full lg:w-10/12 sm:px-12 px-6 mx-auto mt-2">
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border pt-6">

                                    <div className="rounded-t bg-white mb-0 px-6 pt-2">
                                        <div className="text-center flex justify-between">

                                            <p className='text-gray-600'>{singleEntry.bookingDate}</p>
                                            <div>
                                                {
                                                    role === "admin" &&
                                                    <div>
                                                        <button onClick={() => handleDelete(singleEntry)} className="bg-orange-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
                                                            Delete
                                                        </button>
                                                        {/* modal  */}
                                                        <label onClick={() => setEditModal(true)} for="my-modal-4" id='modalBtn' className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 cursor-pointer">
                                                            Edit
                                                        </label>

                                                        {/* modal  */}
                                                        {
                                                            editModal &&
                                                            <EditEntryModal
                                                                order={singleEntry}
                                                                setOrder={setSingleEntry}
                                                                setEditModal={setEditModal}
                                                            />
                                                        }

                                                    </div>
                                                }
                                                <p className={`${singleEntry.status === "Pending" ? "bg-yellow-600" : singleEntry.status === "Deliverd" ? "bg-green-500" : singleEntry.status === "Cancel" ? "bg-red-500" : singleEntry.status === "Return" ? "bg-red-500" : singleEntry.status === "Pertial Return" ? "bg-green-500" : "bg-green-500"
                                                    } font-semibold  border-0 text-white text-center px-4 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded-full text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150 mt-1`}>{singleEntry.status}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-auto px-4 lg:px-10 py-10 pt-6">
                                        <form id='dataForm'>

                                            <div className="flex flex-wrap justify-center">
                                                <div className="w-full lg:w-[20%] px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label className="text-teal-900 block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                            Seller Name
                                                        </label>
                                                        <input type="text" className="border border-gray-300 text-center capitalize px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white text-gray-00 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" disabled value={singleEntry?.sellerName} />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-2/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label className="text-teal-900 block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                            Memo
                                                        </label>
                                                        <input type="email" className="border border-gray-300 text-center px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white text-gray-00 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" disabled value={singleEntry.memo} />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-[20%] px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label className="text-teal-900 block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                            Booking ID
                                                        </label>
                                                        <input type="text" className="border border-gray-300 text-center px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white text-gray-00 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" disabled value={singleEntry.bookingID} />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-2/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label className="text-teal-900 block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                            D. CH.
                                                        </label>
                                                        <input type="text" className="border border-gray-300 text-center px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white text-gray-00 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" disabled value={singleEntry.d_ch} />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-2/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label className="text-teal-900 block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                            Advance
                                                        </label>
                                                        <input type="text" className="border border-gray-300 text-center px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white text-gray-00 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" disabled value={singleEntry.advance} />
                                                    </div>
                                                </div>


                                                <div className="w-full lg:w-2/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label className="text-teal-900 block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                            Exchange
                                                        </label>
                                                        <input type="text" className="border border-gray-300 text-center px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white text-gray-00 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" disabled value={singleEntry.exchange ? "Yes" : "No"} />
                                                    </div>
                                                </div>


                                                <div className="w-full lg:w-2/12 px-4">
                                                    <div className="relative w-full mb-3">
                                                        <label className="text-teal-900 block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                            Amount
                                                        </label>
                                                        <input type="text" className="border border-gray-300 text-center px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white text-gray-00 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" disabled value={singleEntry.amount} />
                                                    </div>
                                                </div>
                                                <div className="w-full lg:w-2/12 px-2">
                                                    <div className="relative w-full mb-3 text-center">
                                                        <label className="text-teal-900 block uppercase text-blueGray-600 text-xs font-bold mb-1" htmlfor="grid-password">
                                                            Item
                                                        </label>

                                                        <div className='flex justify-center sm:justify-start'>
                                                            <div className=" flex justify-center">
                                                                <div className='flex flex-col'>
                                                                    {singleEntry.item.map((item, index) => {
                                                                        return <div className='flex ml-2 mr-1' key={index}>
                                                                            <input defaultValue={Object.keys(item)} type="text" id="item" name={`item${index}`} disabled className={`${singleEntry.status === "Pertial Return" && "line-through border-red-400 text-red-500"} text-center thro mt-1 block w-[80px] py-2 px-3 border  bg-white text-gray-00 rounded-l-md shadow focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                                                            />
                                                                            <input defaultValue={Object.values(item)} type="text" id="item" name={`qty${index}`} className={`${singleEntry.status === "Pertial Return" && "line-through border-red-400 text-red-500"} text-center mt-1 block w-[40px] py-2 px-3 border border-l-0   bg-white text-gray-00 rounded-r-md shadow focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                                                                disabled
                                                                            />
                                                                        </div>
                                                                    })}
                                                                </div>
                                                            </div>
                                                            {
                                                                singleEntry.status === "Pertial Return" &&
                                                                <div className=" flex justify-center border-l-2">
                                                                    <div className='flex flex-col'>
                                                                        {singleEntry.partial.PItem.map((item, index) => {

                                                                            return <div className='flex mx-1 text-green-600' key={index}>
                                                                                <input defaultValue={Object.keys(item)} type="text" id="item" name={`item${index}`} disabled className="text-center thro mt-1 block w-[80px] py-2 px-3 border text-green-600 border-green-400 bg-white font-semibold text-gray-00 rounded-l-md shadow focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                                />
                                                                                <input defaultValue={Object.values(item)} type="text" id="item" name={`qty${index}`} className="text-center mt-1 block w-[40px]  border-l-0 py-2 px-3 border border-green-400 bg-white font-semibold text-gray-00 rounded-r-md shadow focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                                    disabled
                                                                                />
                                                                            </div>
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>

                                                    </div>

                                                </div>


                                            </div>

                                            {/* note  */}
                                            <div className="flex flex-wrap">
                                                <div className="w-full lg:w-12/12 px-4 mt-2">
                                                    <div className="relative w-full mb-3 text-left">
                                                        <textarea type="text" className="px-3 py-3 border border-gray-300 placeholder-blueGray-300 text-blueGray-600 bg-white text-gray-00 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" disabled rows="4">{singleEntry.note ? singleEntry.note : "No note..."}</textarea>
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

                        :
                        <p className='text-red-500'>Sorry ! no Entry in this date for this seller.</p>
            }





        </div >
    )
}

export default SingleSearch