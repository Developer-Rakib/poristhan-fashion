import axios from 'axios';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import axiosPrivate from '../../api/axiosPrivate';
import auth from '../../firebase.init';

const EditBookingModal = ({ setMyinfoModal, profile }) => {
    // const { cuntry, education, linkedinProfile, number, streetAddress } = profile;
    // console.log(profile);
    const [user, loading] = useAuthState(auth);
    const handleInfoSave = (e) => {
        e.preventDefault()
        // const profile = {
        //     email: user.email,
        //     name: user.displayName,
        //     education: `${e.target.education.value || education}`,
        //     streetAddress: `${e.target.streetAddress.value || streetAddress}`,
        //     cuntry: `${e.target.cuntry.value || cuntry}`,
        //     number: `${e.target.number.value || number}`,
        //     linkedinProfile: `${e.target.linkdedin.value || linkedinProfile}`
        // }
        // console.log(profile);
        // axiosPrivate.put(`https://computer-village.onrender.com/profile/${user?.email}`, profile)
        //     .then(data => {
        //         console.log(data.data);
        //         if ((data.data.matchedCount || data.data.upsertedCount) > 0) {
        //             toast.success("Your profile is Updated")
        //             setMyinfoModal(null)
        //             // refetch()
        //         }
        //     })

    }
    return (
        <div>
            <input type="checkbox" id="bookingEdit-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box sm:ml-48 h-[500px]  sm:h-[480px]">
                    <label htmlFor="bookingEdit-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                    <div className='w-11/12 '>
                        <div className="sm:mr-">
                            <div className="md:grid md:grid-cols-3 md:gap-6">
                                <div className="mt-5 md:mt-0 md:col-span-3">
                                    <form onSubmit={handleInfoSave}>
                                        <div className="shadow overflow-hidden sm:rounded-md">
                                            <div className="px-4 py-4 bg-gray-50 sm:px-6">
                                                <h3 className="text-lg leading-6 font-medium text-gray-900">Update Information</h3>
                                            </div>
                                            <div className="px-4 py-5 bg-white sm:p-6">
                                                <div className="grid grid-cols-6 gap-3">


                                                    <div className="col-span-6 sm:col-span-6">
                                                        <label htmlFor="education" className="block text-sm font-medium text-gray-700">Education</label>
                                                        <input type="text" name="education" id="education" autocomplete="family-name" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

                                                        />
                                                    </div>


                                                    <div className="col-span-6 sm:col-span-3">
                                                        <label htmlFor="cuntry" className="block text-sm font-medium text-gray-700">Cuntry</label>
                                                        <input id="cuntry" name="cuntry"
                                                            type="text" autocomplete="country-name" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

                                                        />
                                                    </div>
                                                    <div className="col-span-6 sm:col-span-3">
                                                        <label htmlFor="number" className="block text-sm font-medium text-gray-700">Number</label>
                                                        <input type={"number"} id="number" name="number" autocomplete="country-name" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        />
                                                    </div>

                                                    <div className="col-span-6">
                                                        <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">Street address</label>
                                                        <input type="text" name="streetAddress" id="street-address" autocomplete="street-address" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                                    </div>
                                                    <div className="col-span-6">
                                                        <label htmlFor="linkdedin" className="block text-sm font-medium text-gray-700">Linkedin Profile Link</label>
                                                        <input type="text" name="linkdedin" id="linkdedin" autocomplete="linkdedin" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                                <button

                                                    type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EditBookingModal;