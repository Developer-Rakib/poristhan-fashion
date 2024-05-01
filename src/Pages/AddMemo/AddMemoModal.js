import React, { useState } from 'react'

function AddMemoModal({ sellerNames, memo, addMemoFanction, modalError }) {
    // console.log(sellerNames);
    const [newSeller, setNewSeller] = useState(false)
    // console.log(newSeller);
    return (
        <dialog id="my_modal_5" className="modal text-center modal-bottom sm:modal-middle z-30">
            <div className="modal-box relative ">
                <h3 className="font-bold  text-lg">Add a new memo</h3>
                <div className="form-control w-36  mx-auto">
                    <label className="cursor-pointer label">
                        <span className="label-text">New Seller</span>
                        <input onChange={() => setNewSeller(!newSeller)} type="checkbox" className="toggle toggle-primary" />
                    </label>
                </div>
                <div className="modal-action">

                    <form onSubmit={(e) => addMemoFanction(e)} className=' flex flex-col w-full'>
                        {/* if there is a button in form, it will close the modal */}
                        <div className='flex w-full justify-center items-end'>
                            {
                                newSeller ?


                                    <div class="w-full my-2 sm:w-[120px]  mx-2">
                                        <label for="newSellerName" class="block text-sm font-medium leading-6 text-gray-900">New Seller</label>
                                        <div class="">
                                            <input required type="text" name="newSellerName" id="newSellerName" autocomplete="address-level2" class="block w-full rounded-md border-0 text-center p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    :
                                    <div class="w-full my-2 sm:w-[120px]  mx-2">
                                        <label for="sellerName" class="block text-sm font-medium leading-6 text-gray-900">Seller Name</label>
                                        <div class="">
                                            <select id="sellerName" name="sellerName" autocomplete="sellerName" class="bg-white block w-full capitalize rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                                {
                                                    sellerNames?.map(sName => {
                                                        return (
                                                            <option >{sName}</option>
                                                        )
                                                    })
                                                }

                                            </select>
                                        </div>
                                    </div>
                            }
                            <div class="w-full my-2 sm:w-[120px]  mx-2">
                                <label for="memoNo" class="block text-sm font-medium leading-6 text-gray-900">Memo No</label>
                                <div class="">
                                    <input required type="number" name="memoNo" id="memoNo" autocomplete="address-level2" class="block w-full rounded-md border-0 text-center p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <button type='submit' className="px-6 py-2 mb-2 ml-4 bg-green-600 text-white rounded-md">Save</button>
                        </div>
                        <p className='text-red-500'>{modalError}</p>

                    </form>

                    <form method="dialog" className='absolute top-2 right-2'>
                        {/* if there is a button in form, it will close the modal */}
                        <button className="h-8 w-8 bg-gray-500 text-white rounded-full">X</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default AddMemoModal