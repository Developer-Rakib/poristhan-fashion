import React, { useState } from 'react'
import EditRoleModal from './EditRoleModal'
import axios from 'axios';
import toast from 'react-hot-toast';

function SingelUser({ singleUser, i, refetch }) {
    const [roleModal, setRoleModal] = useState(null)


    const editRole = (e) => {
        e.preventDefault();

        // console.log(e.target[0].value);
        // console.log(singleUser);
        const updatedRole = {
            role: e.target[0].value
        }
        axios.put(`http://65.0.95.143:5000/user/editRole/${singleUser?.email}`, updatedRole)
            .then(data => {
                console.log(data.data);
                if (data?.data.acknowledged) {
                    setRoleModal(false);
                    toast.success(`${singleUser.email} has been Successfully Made ${updatedRole.role}`)
                    refetch()
                }
            }).catch(error => {
                console.log(error.response);
                if (error.response.status === 403) {
                    toast.error("You are Not Admin")
                }
            })

    }

    return (
        <tr key={singleUser._id} className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
            <th scope="row" className="px-3 sm:pr-0 sm:pl-8 py-2  sm:py-4 font-medium text-gray-900 dark:text-white whitespace-nowraptext-[13px]">
                {i + 1}
            </th>
            <td className="py-2 text-[11px] sm:text-[13px] sm:py-4">
                {singleUser.email}
            </td>
            <td className="py-2 text-[11px] sm:text-[13px] sm:py-4">
                {
                    singleUser?.role ? singleUser.role : "visitor"
                }
            </td>
            <td
                className="py-2 text-[13px] sm:py-4 text-center">
                {/* <button
                    onClick={() => document.getElementById('my_modal_10').showModal()}
                    // onClick={() => editRole(singleUser)}
                    className="h-5 sm:h-6  sm:px-3 bg-green-400 border-none hover:bg-green-600 rounded-full text-white">Edit Role
                </button> */}
                <label
                    onClick={() => setRoleModal(true)}
                    for="my_modal_10" className="h-6 sm:h-6 text-[10px] sm:text-[13px] px-2 sm:px-3 bg-cyan-600 border-none hover:bg-cyan-700 rounded-full text-white cursor-pointer">
                    Edit
                </label>

                {
                    roleModal &&
                    <EditRoleModal
                        editRole={editRole}
                        setRoleModal={setRoleModal}
                        singleUser={singleUser}

                    />
                }
            </td>
            {/* <td
                                            className="py-2 text-[13px] sm:py-4 text-center">

                                            
                                        </td> */}
        </tr>
    )
}

export default SingelUser